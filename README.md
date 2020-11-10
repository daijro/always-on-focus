# Always on focus
Userscript to trick websites into thinking the tab is always on focus

---
## Installation

1. Download the [Tampermonkey](https://www.tampermonkey.net/) browser extension

2. Click [here](https://github.com/daijro/always-on-focus/raw/main/alwaysonfocus.user.js) to install the userscript

3. Toggle the userscript on/off from the Tampermonkey dashboard


<hr width=50>


## What it does

Always on focus is a lightweight userscript that prevents websites from knowing that you switched tabs or unfocused the window. This is a fork of [this userscript](https://userscripts-mirror.org/scripts/review/177284) that adds these:

- Disables the [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)

- Disables the `window.onblur()` event and and sets `window.hasFocus()` and `window.onFocus()` to always true ([Ex.](https://www.codingwithjesse.com/demo/2007-05-16-detect-browser-window-focus/))

- Removes the `visibilitychange`, `webkitvisibilitychange`, and `blur` event listeners ([Ex.](http://daniemon.com/tech/webapps/page-visibility/))


#### Example:

Here is an example website that changes color when the window isn't focused:

![Preview](https://github.com/daijro/always-on-focus/blob/main/preview/preview.gif)
