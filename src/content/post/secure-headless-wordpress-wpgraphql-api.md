---
title: "How to Secure Your Headless WordPress & WPGraphQL API"
pubDate: "Sep 05 2025"
updatedDate: "Sep 05 2025"
description: "Learn how to secure your headless WordPress site by protecting the WPGraphQL API. This guide covers authentication, application passwords, and best practices to lock down the /graphql endpoint."
tags:
  [
    "headless WordPress security",
    "WPGraphQL authentication",
    "secure WordPress GraphQL",
    "protect WordPress API",
    "WordPress application passwords",
    "headless WordPress best practices",
    "WordPress GraphQL endpoint",
  ]
category: wordpress
image: /og/secure-headless-wordpress-wpgraphql-api.png
---

Going headless with WordPress is awesome. You get a world-class CMS on the backend and the freedom to use modern frontend frameworks like Astro, Next.js, Nuxt, or SvelteKit. But with this new architecture comes a new set of security considerations.

One of the biggest mistakes developers make is leaving their GraphQL endpoint wide open. A public `/graphql` endpoint is like leaving the blueprints to your house on the front lawn. It allows anyone to:

- **Introspect your entire schema**, revealing your data structures, custom post types, and fields.
- **Run complex, resource-intensive queries** that could slow down or even crash your server (a form of DoS attack).
- **Potentially access private or draft content** if permissions aren’t perfectly configured.

This guide walks you through a multi-layered approach to locking down your WPGraphQL endpoint so only your frontend application can talk to it.

## WPGraphQL Plugin Security Options

WPGraphQL includes a built-in option to restrict access to authenticated users only.

**Steps to enable:**

1. In the WordPress dashboard, go to **GraphQL → Settings**.
2. Toggle **Restrict Endpoint to Authenticated Users**.
3. Save changes.

From now on, any unauthenticated request to `https://yourdomain.com/graphql` will be blocked. This is your first line of defense.

## WordPress Application Passwords

WordPress has a native feature called [**Application Passwords**](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/). It generates credentials specifically for external apps without exposing your main login password.

**How to create one:**

1. Go to **Users → Profile** in the WordPress admin.
2. Scroll to **Application Passwords**.
3. Enter a descriptive name (e.g., `Astro Frontend`) and click **Add New Application Password**.
4. Copy the generated password immediately (it won’t be shown again).

You’ll use this password to authenticate API requests from your frontend.

## Making Authenticated API Calls

Let’s use that Application Password to securely query your WordPress backend.

### 1. Store credentials in environment variables

Never hardcode secrets into your components. Instead, create a `.env.local` file in your frontend project:

```env
# .env.local
WP_GRAPHQL_URL="https://yourdomain.com/graphql"
WP_USER="your_wordpress_username"
WP_APP_PASSWORD="your-generated-app-password"
```

> ✅ Add `.env.local` to `.gitignore` so credentials don’t end up in version control.

### 2. Create a reusable fetch helper

Here’s a safe `fetchAPI` function you can reuse across your app:

```javascript
// lib/graphql.js

/**
 * Perform an authenticated fetch to the WordPress GraphQL API.
 * @param {string} query - The GraphQL query string.
 * @param {object} [variables={}] - Query variables.
 * @returns {Promise<any>} - GraphQL response data.
 */
export async function fetchAPI(query, variables = {}) {
  const endpoint = process.env.WP_GRAPHQL_URL;
  const username = process.env.WP_USER;
  const password = process.env.WP_APP_PASSWORD;

  if (!endpoint) {
    throw new Error("WP_GRAPHQL_URL is not defined in environment variables.");
  }

  const headers = { "Content-Type": "application/json" };

  // Add Basic Auth if credentials exist
  if (username && password) {
    headers["Authorization"] = "Basic " + btoa(`${username}:${password}`);
  } else {
    console.warn(
      "WordPress credentials not set. Falling back to unauthenticated request."
    );
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error("GraphQL errors:", json.errors);
    throw new Error("Failed to fetch from WordPress API");
  }

  return json.data;
}
```

Now you can query WordPress safely:

```javascript
const query = `
  query GetPosts {
    posts {
      nodes {
        title
        slug
      }
    }
  }
`;

fetchAPI(query).then((data) => console.log(data));
```

## Advanced Security Layers (Defense in Depth)

Application-level auth is good, but production sites need extra safeguards. Here are a few options:

### 1. Add a Secret Header

Require all requests to `/graphql` to include a private header.

**Frontend fetch:**

```javascript
const headers = {
  "Content-Type": "application/json",
  "X-Secret-Request-Header": process.env.SECRET_HEADER_KEY,
};
```

**.env.local**

```env
SECRET_HEADER_KEY="a-very-long-random-string"
```

**Nginx config example:**

```nginx
location = /graphql {
  if ($http_x_secret_request_header != "a-very-long-random-string") {
    return 403; # Forbidden
  }
  try_files $uri $uri/ /index.php?$args;
}
```

### 2. Firewall or Hosting Rules

- Whitelist only your frontend app or serverless function IPs.
- Deny all other requests to `/graphql`.
- Require the secret header in firewall rules.

### 3. Disable the WordPress REST API (if unused)

If you don’t use REST, disable it for anonymous visitors:

```php
<?php
// functions.php

add_filter('rest_api_init', function () {
    if (!is_user_logged_in()) {
        wp_die(
            'The REST API is disabled for public access.',
            'rest_api_disabled',
            array('status' => 401)
        );
    }
});
```

This blocks public access to endpoints like `/wp-json/wp/v2/users`, preventing user enumeration attacks.

---

## Resources

- [WPGraphQL Security Docs](https://www.wpgraphql.com/docs/security/)
- [WordPress Application Passwords](https://wordpress.org/documentation/article/application-passwords/)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)

✅ With these layers in place, your `/graphql` endpoint is protected from unauthorized access while still letting your frontend communicate securely.
