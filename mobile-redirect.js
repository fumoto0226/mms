(function () {
  const ua = navigator.userAgent || navigator.vendor || "";
  const touchPoints = navigator.maxTouchPoints || 0;
  const isMobileUa =
    /Mobi|Android|iPhone|iPad|iPod|Opera Mini|BlackBerry|IEMobile|WPDesktop|Tablet|EdgA|CriOS|Firefox/i.test(
      ua
    );
  const isTouchMac = /macintosh|mac os x/i.test(ua) && touchPoints > 1;
  const isTouchPhoneViewport =
    touchPoints > 0 && Math.min(window.innerWidth || 0, window.innerHeight || 0) <= 520;
  const isMobile = isMobileUa || isTouchMac || isTouchPhoneViewport;
  const script = document.currentScript;
  const scriptBase = script ? new URL(".", script.src) : new URL(".", window.location.href);

  if (!isMobile) {
    return;
  }

  window.__MMS_MOBILE_BLOCKED__ = true;
  document.documentElement.classList.add("mms-mobile-blocked");

  if (!document.getElementById("mms-mobile-warning-style")) {
    const style = document.createElement("style");
    style.id = "mms-mobile-warning-style";
    style.textContent = `
      html.mms-mobile-blocked,
      html.mms-mobile-blocked body {
        margin: 0 !important;
        min-height: 100% !important;
        overflow: hidden !important;
        background: #d8d8d8 !important;
      }

      html.mms-mobile-blocked body > * {
        display: none !important;
      }

      html.mms-mobile-blocked body > #mms-mobile-warning {
        position: fixed !important;
        inset: 0 !important;
        z-index: 2147483647 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 24px !important;
        background: #d8d8d8 !important;
        color: #111 !important;
        font-family: "DotGothic16", "Noto Sans JP", sans-serif !important;
        text-align: center !important;
      }

      #mms-mobile-warning .mms-mobile-warning__panel {
        width: min(100%, 400px) !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 22px !important;
      }

      #mms-mobile-warning .mms-mobile-warning__gif {
        width: min(68vw, 240px) !important;
        height: auto !important;
        image-rendering: auto !important;
      }

      #mms-mobile-warning h1 {
        margin: 0 !important;
        color: #111 !important;
        font-size: clamp(20px, 6vw, 28px) !important;
        letter-spacing: 0.08em !important;
        font-weight: 400 !important;
      }

      #mms-mobile-warning p {
        margin: 0 !important;
        color: #8f8f8f !important;
        font-size: 12px !important;
        line-height: 1.9 !important;
        white-space: pre-line !important;
      }
    `;
    document.head.appendChild(style);
  }

  const mountWarning = function () {
    if (!document.body || document.getElementById("mms-mobile-warning")) {
      return;
    }

    const warning = document.createElement("div");
    warning.id = "mms-mobile-warning";
    warning.setAttribute("aria-live", "polite");
    warning.innerHTML =
      '<div class="mms-mobile-warning__panel">' +
      '<img class="mms-mobile-warning__gif" src="' +
      new URL("img/loading.gif", scriptBase).href +
      '" alt="loading" />' +
      '<h1>PCでご覧ください</h1>' +
      "<p>このサイトは\nPC環境での閲覧を推奨しております。\n\nより良い体験のため、\nパソコンからアクセスしてください。</p>" +
      "</div>";

    document.body.appendChild(warning);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountWarning, { once: true });
  } else {
    mountWarning();
  }
})();
