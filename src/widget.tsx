import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import tailwindCss from './index.css?inline';

// Overrides so the calculator sits nicely inside a WordPress page section
// instead of assuming it owns the full viewport.
const WIDGET_OVERRIDES_CSS = `
  :host { all: initial; display: block; }
  .min-h-screen { min-height: 0 !important; }
`;

const MOUNT_SELECTOR = '[data-ondeg-roi-widget], #ondeg-roi-widget';

function mount(el: Element) {
  if (el.hasAttribute('data-ondeg-roi-mounted')) return;
  el.setAttribute('data-ondeg-roi-mounted', 'true');

  const shadowHost = el as HTMLElement;
  const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

  const style = document.createElement('style');
  style.textContent = tailwindCss + WIDGET_OVERRIDES_CSS;
  shadowRoot.appendChild(style);

  const appContainer = document.createElement('div');
  shadowRoot.appendChild(appContainer);

  createRoot(appContainer).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

function init(root: ParentNode = document) {
  root.querySelectorAll(MOUNT_SELECTOR).forEach(mount);
}

declare global {
  interface Window {
    OndegROIWidget?: { init: typeof init };
  }
}

window.OndegROIWidget = { init };

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => init());
} else {
  init();
}
