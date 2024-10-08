import './index.css';
import './cloak-mode.css';
import './polyfills';

import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
// Polyfill needed for Firefox < 122
// https://bugzilla.mozilla.org/show_bug.cgi?id=1423593
// import '@formatjs/intl-segmenter/polyfill';
import { render } from 'preact';
import { HashRouter } from 'react-router-dom';

import { App } from './app';
import { initActivateLang } from './utils/lang';

initActivateLang();

if (import.meta.env.DEV) {
  import('preact/debug');
}

render(
  <I18nProvider i18n={i18n}>
    <HashRouter>
      <App />
    </HashRouter>
  </I18nProvider>,
  document.getElementById('app'),
);

// Storage cleanup
setTimeout(() => {
  try {
    // Clean up iconify localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('iconify')) {
        localStorage.removeItem(key);
      }
    });
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith('iconify')) {
        sessionStorage.removeItem(key);
      }
    });

    // Clean up old settings key
    localStorage.removeItem('settings:boostsCarousel');
  } catch (e) {}
}, 5000);

window.__CLOAK__ = () => {
  document.body.classList.toggle('cloak');
};
