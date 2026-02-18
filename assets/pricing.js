(function () {
  let cache = null;

  async function loadPricing() {
    if (cache) return cache;
    try {
      const resp = await fetch("/assets/pricing.json", { cache: "no-store" });
      cache = await resp.json();
      return cache;
    } catch (e) {
      return null;
    }
  }

  function formatPrice(symbol, amount) {
    return `${symbol}${amount}`;
  }

  async function applyPricing() {
    const cfg = await loadPricing();
    if (!cfg || !cfg.plans) return;

    const lang = (document.documentElement.lang || "").startsWith("en") ? "en" : "zh";
    const symbol = (cfg.currency_symbol && (cfg.currency_symbol[lang] || cfg.currency_symbol.en)) || "$";

    document.querySelectorAll("[data-price]").forEach((el) => {
      const key = el.getAttribute("data-price");
      const plan = cfg.plans[key];
      if (!plan || typeof plan.amount !== "number") return;
      el.textContent = formatPrice(symbol, plan.amount);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyPricing);
  } else {
    applyPricing();
  }
})();