const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};let e;function n(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}t.stopBtn.setAttribute("disabled",!0),t.startBtn.addEventListener("click",(function(r){r.target.setAttribute("disabled",!0),e=setInterval(n,1e3),t.stopBtn.removeAttribute("disabled")})),t.stopBtn.addEventListener("click",(function(n){clearInterval(e),t.startBtn.removeAttribute("disabled"),n.target.setAttribute("disabled",!0)}));
//# sourceMappingURL=01-color-switcher.3effd93e.js.map
