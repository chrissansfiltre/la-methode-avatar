/* Le bandeau cookies du design rubber hose : Microsoft Clarity ne se charge qu'après « Accepter ».
   Le choix est gardé dans localStorage (même clé que les autres pages du site). Un lien avec
   onclick="openCookiePrefs()" rouvre le bandeau. Le lien « En savoir plus » vient de data-cookies. */
(function () {
  var KEY = 'csf_cookie_consent', CLARITY = 'wwniwwb0xp';
  var moi = document.currentScript, versCookies = (moi && moi.dataset.cookies) || 'cookies.html';

  function chargerClarity() {
    if (window.__clarityLoaded) return; window.__clarityLoaded = true;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY);
  }

  var css = '#rh-cookies{position:fixed;left:16px;right:16px;bottom:16px;z-index:95;display:none;max-width:720px;margin:0 auto;background:#FBFAF7;color:#0B0B0B;border:1.5px solid #0B0B0B;border-radius:18px;box-shadow:6px 6px 0 #0B0B0B;font:400 14.5px/1.55 Inter,system-ui,sans-serif}'
    + '#rh-cookies::after{content:"";position:absolute;inset:6px;border:1.5px dashed rgba(11,11,11,.22);border-radius:13px;pointer-events:none}'
    + '#rh-cookies .rh-in{position:relative;z-index:1;display:flex;align-items:center;gap:18px;flex-wrap:wrap;padding:18px 22px}'
    + '#rh-cookies p{margin:0;flex:1 1 300px;color:#2F2F2D}#rh-cookies a{color:#F96C22;text-underline-offset:3px}'
    + '#rh-cookies .rh-boutons{display:flex;gap:10px;flex-shrink:0}'
    + '#rh-cookies button{cursor:pointer;font:600 14px/1 Inter,system-ui,sans-serif;border-radius:999px;padding:13px 20px;border:1.5px solid #0B0B0B;transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s}'
    + '#rh-cookies button:hover{transform:translate(-2px,-2px);box-shadow:3px 3px 0 #0B0B0B}'
    + '#rh-cookies .rh-non{background:transparent;color:#0B0B0B}#rh-cookies .rh-oui{background:#0B0B0B;color:#fff}';

  function monter() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var b = document.createElement('div'); b.id = 'rh-cookies'; b.setAttribute('role', 'dialog'); b.setAttribute('aria-label', 'Consentement cookies');
    b.innerHTML = '<div class="rh-in"><p>🍪 Ce site utilise des cookies pour améliorer ton expérience. <a href="' + versCookies + '">En savoir plus</a></p>'
      + '<div class="rh-boutons"><button type="button" class="rh-non">Refuser</button><button type="button" class="rh-oui">Accepter</button></div></div>';
    document.body.appendChild(b);
    var choisir = function (v) { try { localStorage.setItem(KEY, v); } catch (e) {} b.style.display = 'none'; if (v === 'accepted') chargerClarity(); };
    b.querySelector('.rh-oui').onclick = function () { choisir('accepted'); };
    b.querySelector('.rh-non').onclick = function () { choisir('refused'); };
    window.openCookiePrefs = function () { b.style.display = 'block'; };
    var c = null; try { c = localStorage.getItem(KEY); } catch (e) {}
    if (c === 'accepted') chargerClarity(); else if (c !== 'refused') b.style.display = 'block';
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', monter); else monter();
})();
