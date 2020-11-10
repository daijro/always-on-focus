// ==UserScript==
// @name          Always on focus
// @namespace     daijro
// @description   Trick websites into thinking the tab is always on focus
// @include *
// @run-at       document-start
// ==/UserScript==

unsafeWindow.onblur = null;
unsafeWindow.blurred = false;

unsafeWindow.document.hasFocus = function () {return true;};
unsafeWindow.window.onFocus = function () {return true;};

Object.defineProperty(document, "hidden", { value : false});
Object.defineProperty(document, "mozHidden", { value : false});
Object.defineProperty(document, "msHidden", { value : false});
Object.defineProperty(document, "webkitHidden", { value : false});
Object.defineProperty(document, 'visibilityState', { get: function () { return "visible"; } });

unsafeWindow.document.onvisibilitychange = undefined;

for (event_name of ["visibilitychange", "webkitvisibilitychange", "blur"]) {
  window.addEventListener(event_name, function(event) {
        event.stopImmediatePropagation();
    }, true);
}