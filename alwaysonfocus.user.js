// ==UserScript==
// @name          Always on focus
// @namespace     https://github.com/daijro/always-on-focus
// @author        daijro
// @version       1.5.1
// @description   Prevents websites from knowing that you switched tabs or unfocused the window
// @include       *
// @updateURL     https://github.com/daijro/always-on-focus/raw/main/alwaysonfocus.user.js
// @downloadURL   https://github.com/daijro/always-on-focus/raw/main/alwaysonfocus.user.js
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

Object.defineProperty(document, "visibilityState", {get: () => "visible"});
Object.defineProperty(document, "webkitVisibilityState", {get: () => "visible"});

unsafeWindow.document.onvisibilitychange = undefined;


// element constructors to allow blur events on
const blurWhitelist = [
    HTMLInputElement,
    HTMLAnchorElement,
    HTMLSpanElement,
    HTMLParagraphElement,
]

// element constructors to block mouseleave and mouseout events on
const hoverBlacklist = [
    HTMLIFrameElement,
    HTMLHtmlElement,
    HTMLBodyElement,
    HTMLHeadElement,
    HTMLFrameSetElement, // obsolete but included for completeness
    HTMLFrameElement // obsolete but included for completeness
];

var event_handler = (event) => {
    // if the event is blur, and the target is an whitelisted type, allow it
    if (event.type === 'blur'
        && blurWhitelist.some(type => event.target instanceof type)
        || event.target.classList.contains('ql-editor')) { // quill js fix
        return;
    }
    // if the event is mouseleave or mouseout, and the target is an blacklisted type, block it
    if (['mouseleave', 'mouseout'].includes(event.type)
        && !hoverBlacklist.some(type => event.target instanceof type)) {
        return;
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
