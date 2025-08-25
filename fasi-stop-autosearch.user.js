// ==UserScript==
// @name         Fasi Tariffario - Stop Auto Search (FIX)
// @namespace    giacomo-utils
// @version      1.1
// @description  Disable automatic search while typing in the FASI tariffario. Search will only trigger on Enter key or by clicking "Cerca".
// @match        https://www.fasi.it/tariffario/*
// @match        https://www.fasi.it/tariffario/
// @run-at       document-idle
// @grant        none
// @updateURL    https://raw.githubusercontent.com/jack1852/fasi-stop-autosearch/main/fasi-stop-autosearch.user.js
// @downloadURL  https://raw.githubusercontent.com/jack1852/fasi-stop-autosearch/main/fasi-stop-autosearch.user.js
// ==/UserScript==
(function () {
  /**
   * STEP 1: Find the search input field
   */
  function findSearchInput() {
    return document.querySelector(
      'input[type="search"], input[placeholder*="cerca" i], input[name*="search" i]'
    );
  }

  /**
   * STEP 2: Install patch on the input
   */
  function install(input) {
    if (!input || input.__fasiStopInstalled) return;
    input.__fasiStopInstalled = true;

    let allowOnce = false;

    // Stop propagation unless temporarily allowed
    const stopper = (e) => { if (!allowOnce) e.stopImmediatePropagation(); };
    input.addEventListener('input', stopper, true);
    input.addEventListener('keyup', stopper, true);
    input.addEventListener('change', stopper, true);

    /**
     * STEP 3: Trigger search manually
     */
    const triggerSearch = () => {
      allowOnce = true;
      try {
        input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
        input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
        input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true, cancelable: true }));
      } finally {
        setTimeout(() => { allowOnce = false; }, 0);
      }
    };

    /**
     * STEP 4: Bind Enter key
     */
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        triggerSearch();
      }
    }, true);

    /**
     * STEP 5: Bind or create "Cerca" button
     */
    let btn = document.querySelector('button[type="submit"], button[aria-label*="cerca" i], .search-submit');
    if (!btn) {
      btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = 'Cerca';
      btn.style.marginLeft = '0.5rem';
      input.insertAdjacentElement('afterend', btn);
    }
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerSearch();
    }, true);

    /**
     * STEP 6: Handle dynamic replacement (SPA)
     */
    const mo = new MutationObserver(() => {
      const current = findSearchInput();
      if (current && current !== input) {
        mo.disconnect();
        install(current);
      }
    });
    mo.observe(document.documentElement, { subtree: true, childList: true });
  }

  /**
   * STEP 7: Retry until input is found
   */
  let tries = 0;
  const interval = setInterval(() => {
    const input = findSearchInput();
    if (input) {
      clearInterval(interval);
      install(input);
    } else if (++tries > 40) {
      clearInterval(interval);
    }
  }, 250);
})();
