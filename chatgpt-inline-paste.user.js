// ==UserScript==
// @name         ChatGPT: Ctrl+Shift+V to paste long text inline
// @namespace    local.chatgpt.nopasteattach
// @version      1.2
// @description  Paste 3,500 or more characters inline in the ChatGPT composer with Ctrl+Shift+V.
// @author       zizhengwu
// @homepageURL  https://github.com/zizhengwu/chatgpt_ctrl_shift_v_to_paste_long_text_inline
// @supportURL   https://github.com/zizhengwu/chatgpt_ctrl_shift_v_to_paste_long_text_inline/issues
// @downloadURL  https://raw.githubusercontent.com/zizhengwu/chatgpt_ctrl_shift_v_to_paste_long_text_inline/main/chatgpt-inline-paste.user.js
// @updateURL    https://raw.githubusercontent.com/zizhengwu/chatgpt_ctrl_shift_v_to_paste_long_text_inline/main/chatgpt-inline-paste.user.js
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
  "use strict";

  const MIN_LENGTH = 3500;
  const COMPOSER = '#prompt-textarea[contenteditable="true"], textarea#prompt-textarea';
  let inlinePaste = false;

  window.addEventListener("keydown", (e) => {
    inlinePaste = e.ctrlKey && e.shiftKey && !e.altKey && !e.metaKey
      && e.key.toLowerCase() === "v";
  }, true);

  const reset = () => { inlinePaste = false; };
  window.addEventListener("keyup", reset, true);
  window.addEventListener("blur", reset);

  window.addEventListener("paste", (e) => {
    if (!inlinePaste) return;
    reset();

    if (!e.target.closest?.(COMPOSER)) return;
    const data = e.clipboardData;
    if (!data || data.files.length || data.getData("text/plain").length < MIN_LENGTH) return;

    // Skip the site's paste handler and let the browser insert plain text at the caret.
    e.stopImmediatePropagation();
  }, true);
})();
