// ==UserScript==
// @name          Always on focus
// @namespace     https://github.com/daijro/always-on-focus
// @author        daijro
// @version       1.3
// @description   Prevents websites from knowing that you switched tabs or unfocused the window
// @include       *
// @run-at        document-start
// ==/UserScript==


unsafeWindow.onblur = null;
unsafeWindow.blurred = false;

unsafeWindow.document.hasFocus = () => true;
unsafeWindow.window.onFocus = () => true;

// kill dom property names
[
    "hidden",
    "mozHidden",
    "msHidden",
    "webkitHidden"
].forEach(prop_name => {
    Object.defineProperty(document, prop_name, {value: false});
})

Object.defineProperty(document, "visibilityState", {get: () => "visible", value: "visible"});
Object.defineProperty(document, "webkitVisibilityState", {get: () => "visible", value: "visible"});

unsafeWindow.document.onvisibilitychange = undefined;


var event_handler = (event) => {
    if (["blur", "mouseleave", "mouseout"].includes(event.type) && event.target instanceof HTMLInputElement) {
        return // exclude input elements
    }
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
}

// kill event listeners
[
    "visibilitychange",
    "webkitvisibilitychange",
    "blur",
    "hasFocus",
    "mouseleave",
    "mouseout",
    "mozvisibilitychange",
    "msvisibilitychange"
].forEach(event_name => {
    window.addEventListener(event_name, event_handler, true);
    document.addEventListener(event_name, event_handler, true);
})
