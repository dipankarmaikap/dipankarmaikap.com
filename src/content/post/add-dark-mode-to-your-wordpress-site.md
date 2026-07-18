---
title: "How to Add Dark Mode to Your WordPress Site"
pubDate: "July 18 2020"
updatedDate: "Feb 20 2025"
description: "Learn how to add a dark mode toggle to your WordPress site using CSS and JavaScript. Improve user experience and accessibility with this simple guide."
tags:
  [
    "WordPress dark mode",
    "Dark mode",
    "CSS dark theme",
    "JavaScript toggle theme",
    "WordPress UI customization",
  ]
category: wordpress
ogFilename: theme.ts
ogLanguage: javascript
ogCode: |-
  toggle_theme.onclick = () => {

    let theme = localStorage.getItem("theme");
    changeTheme(theme);
  };
---

Dark mode is a highly requested feature that enhances user experience by reducing eye strain and improving readability in low-light environments. In this guide, I'll show you how to add dark mode to your WordPress site using CSS and JavaScript.

## Why Add Dark Mode?

- Improves readability in low-light conditions
- Enhances visual appeal
- Provides a modern user experience
- Helps reduce eye strain

## Writing the Dark Mode CSS

To implement dark mode, you need to define custom CSS rules. Use your browser's inspect tool to identify existing styles and create their dark mode variants.

For example, if your default `<h1>` color is black but should be white in dark mode, use the following CSS:

```css
h1 {
  color: black;
}
.dark h1 {
  color: white;
}
```

This method requires minimal CSS.

## Adding a Dark Mode Toggle Button

A toggle button allows users to switch between light and dark themes. Insert this HTML into an HTML widget in Elementor or your theme:

```html
<i id="toggle_theme_button" aria-hidden="true" class=""></i>
```

Initially, the button has no class, and we will dynamically assign one via JavaScript.

## Storing User Preferences

To maintain consistency across page reloads, store the user’s preference in `localStorage`.

```js
window.addEventListener("DOMContentLoaded", () => {
  var theme = localStorage.getItem("theme");
  if (!theme) {
    localStorage.setItem("theme", "light");
  }
  setInitialTheme(theme);
});
```

This ensures that the preferred theme is applied immediately when the page loads.

## Applying the Initial Theme

The `setInitialTheme` function applies the appropriate class to the `body` element and updates the toggle button icon.

```js
var toggle_theme = document.getElementById("toggle_theme_button");

function setInitialTheme(theme) {
  document.body.classList.add(theme);
  if (theme === "dark") {
    toggle_theme.classList.add("icon-sun");
  } else {
    toggle_theme.classList.add("icon-moon");
  }
}
```

## Implementing the Toggle Functionality

Now, we add an event listener to switch themes when the button is clicked.

```js
toggle_theme.addEventListener("click", () => {
  var theme = localStorage.getItem("theme");
  changeTheme(theme);
});
```

## Updating the Theme Dynamically

The `changeTheme` function toggles the theme, updates `localStorage`, and adjusts the button icon.

```js
function changeTheme(theme) {
  if (theme === "light") {
    localStorage.setItem("theme", "dark");
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    toggle_theme.classList.add("icon-sun");
    toggle_theme.classList.remove("icon-moon");
  } else {
    localStorage.setItem("theme", "light");
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    toggle_theme.classList.add("icon-moon");
    toggle_theme.classList.remove("icon-sun");
  }
}
```

## Conclusion

You now have a fully functional dark mode on your WordPress site! Users can switch themes easily, and their preference is stored for future visits.
