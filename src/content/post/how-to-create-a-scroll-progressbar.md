---
title: "How to create a scroll progressbar"
pubDate: "November 27 2020"
updatedDate: "Feb 26 2025"
description: "Learn how to create a scroll progress bar using JavaScript and CSS. Track scroll percentage and update a progress bar dynamically."
image:
  url: "/cover-image.webp"
  alt: "A representative cover image for the article."
tags:
  [
    "scroll progress bar",
    "javascript progress bar",
    "css progress bar",
    "scroll indicator",
    "web development",
    "javascript tutorial",
    "frontend design",
  ]
category: web-development
---

Let’s explore how to build a scroll progress bar and integrate it into any website, whether it’s a static site or a content management system (CMS) like WordPress. This feature is straightforward to implement and enhances user experience by visually indicating scroll position.

## Step 1: Designing the Progress Bar

The progress bar consists of two simple HTML elements: a container and a highlight bar.

```html
<div class="scroll-bar-container">
  <div id="scrollBarHighlight" class="scroll-bar-highlight"></div>
</div>
```

- The outer `<div>` (`scroll-bar-container`) serves as the background container, typically styled with a light color.
- The inner `<div>` (`scroll-bar-highlight`) represents the progress indicator, styled with a contrasting color.
  Next, we’ll style these elements with CSS.

## Step 2: Styling with CSS

Here’s the CSS to design the progress bar:

```css
.scroll-bar-container {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #f1f1f1;
  height: 4px;
  z-index: 100;
}

.scroll-bar-highlight {
  background-color: #3e3eff;
  height: 100%;
  width: 0;
}
```

- The `.scroll-bar-container` is fixed at the top of the page, spanning the full width with a subtle background color (`#f1f1f1`) and a height of `4px`. The `z-index: 100` ensures it stays above other content.
- The `.scroll-bar-highlight` starts with a width of `0` and inherits the container’s height. Its vibrant color (`#3e3eff`) will expand as the user scrolls.

## Step 3: Adding JavaScript Functionality

Now, let’s make the progress bar dynamic using JavaScript:

```javascript
window.onscroll = function () {
  renderProgressBar();
};

function renderProgressBar() {
  // Select the progress bar element
  const progressBar = document.getElementById("scrollBarHighlight");

  // Get scroll and height values
  const currentScrollHeight = document.documentElement.scrollTop;
  const totalContentHeight = document.documentElement.scrollHeight;
  const viewportHeight = document.documentElement.clientHeight;

  // Calculate maximum scrollable height
  const totalScrollHeight = totalContentHeight - viewportHeight;

  // Calculate scroll percentage
  const scrollPercentage = (currentScrollHeight / totalScrollHeight) * 100;

  // Update progress bar width
  progressBar.style.width = `${scrollPercentage}%`;
}
```

## How It Works

1. **Event Listener:** The `window.onscroll` event triggers `renderProgressBar` whenever the user scrolls.
2. **Element Selection:** We retrieve the progress bar using its ID (`scrollBarHighlight`).
3. **Scroll Calculations:**
   - `scrollTop`: Current scroll position from the top of the document.
   - `scrollHeight`: Total height of the document, including off-screen content.
   - `clientHeight`: Height of the visible viewport.
   - Subtracting `viewportHeight` from `totalContentHeight` gives the maximum scrollable distance.
4. **Percentage Logic:** Dividing `currentScrollHeight` by `totalScrollHeight` yields a value between 0 and 1. Multiplying by 100 converts this to a percentage (0–100).
5. **Width Update:**
   The `style.width` property of the progress bar is set to the calculated percentage, visually reflecting the scroll progress.

For more details on DOM properties, consult the [MDN Element API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element).

## Final Thoughts

That’s it! With just HTML, CSS, and JavaScript, you’ve created a functional scroll progress bar. It’s lightweight, customizable, and works across modern browsers. Experiment with colors, heights, or even animations to suit your site’s design.

Thanks for reading! Stay curious and keep building.
