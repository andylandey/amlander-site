(function() {
  const CONSENT_KEY = 'aml_cookie_consent';
  const GA_ID = 'G-P00Z4FSV44';

  function loadGA() {
    if (window.gaLoaded) return;
    window.gaLoaded = true;
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function getConsent() { return localStorage.getItem(CONSENT_KEY); }
  function setConsent(value) { localStorage.setItem(CONSENT_KEY, value); }

  function showBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML =
      '<div class="cc-inner">' +
        '<p>We use cookies to understand how visitors use our site (via Google Analytics). No personal data is sold or shared.</p>' +
        '<div class="cc-buttons">' +
          '<button id="cc-accept" class="cc-btn cc-accept">Accept</button>' +
          '<button id="cc-reject" class="cc-btn cc-reject">Reject</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);

    var style = document.createElement('style');
    style.textContent = `
      #cookie-consent-banner{position:fixed;bottom:0;left:0;right:0;background:#0d1b2a;color:#fff;padding:18px 24px;z-index:9999;box-shadow:0 -2px 10px rgba(0,0,0,0.2);font-family:inherit;}
      .cc-inner{max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;}
      .cc-inner p{margin:0;font-size:0.9rem;flex:1;min-width:240px;line-height:1.5;}
      .cc-buttons{display:flex;gap:10px;flex-shrink:0;}
      .cc-btn{padding:10px 20px;border-radius:6px;border:none;font-size:0.9rem;font-weight:600;cursor:pointer;}
      .cc-accept{background:#ff8c42;color:#0d1b2a;}
      .cc-reject{background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.4);}
      @media (max-width:600px){.cc-inner{flex-direction:column;align-items:stretch;}.cc-buttons{justify-content:stretch;}.cc-btn{flex:1;}}
    `;
    document.head.appendChild(style);

    document.getElementById('cc-accept').addEventListener('click', function() {
      setConsent('granted'); banner.remove(); loadGA();
    });
    document.getElementById('cc-reject').addEventListener('click', function() {
      setConsent('denied'); banner.remove();
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    var consent = getConsent();
    if (consent === 'granted') loadGA();
    else if (consent !== 'denied') showBanner();
  });
})();
