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
        background: #7b7b7b !important;
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
        background:
          radial-gradient(circle at top, rgba(255, 255, 255, 0.12), transparent 45%),
          linear-gradient(180deg, #8a8a8a 0%, #7b7b7b 52%, #686868 100%) !important;
        color: #f6f6f6 !important;
        font-family: "Hiragino Sans", "Yu Gothic", "Noto Sans JP", sans-serif !important;
        text-align: center !important;
      }

      #mms-mobile-warning .mms-mobile-warning__panel {
        width: min(100%, 420px) !important;
        padding: 32px 24px !important;
        border: 1px solid rgba(255, 255, 255, 0.22) !important;
        border-radius: 18px !important;
        background: rgba(255, 255, 255, 0.12) !important;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18) !important;
        backdrop-filter: blur(12px) !important;
      }

      #mms-mobile-warning h1 {
        margin: 0 0 22px !important;
        color: #f6f6f6 !important;
        font-size: clamp(30px, 9vw, 38px) !important;
        letter-spacing: 0.08em !important;
        font-weight: 700 !important;
      }

      #mms-mobile-warning p {
        margin: 0 !important;
        color: rgba(246, 246, 246, 0.86) !important;
        font-size: 16px !important;
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
