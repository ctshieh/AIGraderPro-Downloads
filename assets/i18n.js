(function () {
  const dict = {
    zh: {
      hero_btn_download: "下載 macOS 版",
      hero_btn_workflow: "看流程",
      cap_sub: "為高等教育的評量流程設計：可控、可解釋、可擴充。",
      chip1_title: "10×",
      chip1_desc: "減少重複工時",
      chip2_title: "可追溯",
      chip2_desc: "步驟化評分",
      chip3_title: "本機優先",
      chip3_desc: "資料最小外傳",
      dl_auto_latest: "按鈕會自動指向最新 Release",
      btn_download: "下載",
      btn_contact: "聯絡",
nav_cap: "能力",
      nav_wf: "流程",
      nav_dl: "下載",
      nav_pr: "授權",
      nav_ct: "聯絡",

      hero_title: "AI Grader Pro",
      hero_subtitle: "精準的學術閱卷系統",
      hero_desc: "Local-first 的智慧閱卷與分析工具：步驟化評分、Rubric 拆解、批次 PDF 工作流與報告輸出。支援 macOS / Windows / Linux。",

      cap_title: "核心能力",
      wf_title: "工作流程",
      dl_title: "下載",
      ct_title: "聯絡",

      pr_title: "授權與定價",
      pr_sub: "以年度授權為主；Personal / Business 價格可於後台配置（可選）。",
      pr_std_title: "Personal（年度）",
      pr_per_year: "/ 年",
      pr_item1: "步驟化評分 + Rubric 引擎",
      pr_item2: "批次 PDF 工作流 + 報告輸出",
      pr_item3: "支援 macOS / Windows / Linux",
      pr_btn_try: "前往下載",
      pr_btn_contact: "聯絡洽詢",
      pr_bus_title: "Business（年度）",
      pr_bus_note: "適合教學團隊與系所：可提供額外支援與授權管理。",
      pr_btn_get_quote: "取得報價",

      wfSvgTitle: "工作流總覽",
      wfLane1: "出題",
      wfBox1: "模板 / 題庫",
      wfBox2: "Rubric 設定",
      wfBox2b: "配分 • 準則 • 模式",
      wfBox3: "考卷 PDF 輸出",
      wfLane2: "閱卷",
      wfBox4: "題目卷 PDF + 作答卷 PDF",
      wfBox4b: "批次匯入",
      wfBox5: "步驟化評分",
      wfBox5b: "可解釋 • 可追溯",
      wfBox6: "報告與分析",
      wfBox6b: "PDF 匯出"
    },
    en: {
      hero_btn_download: "Download (macOS)",
      hero_btn_workflow: "View workflow",
      cap_sub: "Designed for higher-education grading: controllable, explainable, and extensible.",
      chip1_title: "10×",
      chip1_desc: "Less repetitive work",
      chip2_title: "Traceable",
      chip2_desc: "Step-wise scoring",
      chip3_title: "Local-first",
      chip3_desc: "Minimal data exposure",
      dl_auto_latest: "Buttons always point to the latest release",
      btn_download: "Download",
      btn_contact: "Contact",
nav_cap: "Capabilities",
      nav_wf: "Workflow",
      nav_dl: "Download",
      nav_pr: "Licensing",
      nav_ct: "Contact",

      hero_title: "AI Grader Pro",
      hero_subtitle: "Precision Academic Grading System",
      hero_desc: "Local-first grading & analytics for educators: explainable scoring, rubric decomposition, batch PDF workflow, and exportable reports. Supports macOS / Windows / Linux.",

      cap_title: "Capabilities",
      wf_title: "Workflow",
      dl_title: "Download",
      ct_title: "Contact",

      pr_title: "Licensing & Pricing",
      pr_sub: "Annual licensing. Personal / Business pricing can be configured via an admin panel (optional).",
      pr_std_title: "Personal (Annual)",
      pr_per_year: "/ year",
      pr_item1: "Step-wise grading + rubric engine",
      pr_item2: "Batch PDF workflow + exportable reports",
      pr_item3: "macOS / Windows / Linux support",
      pr_btn_try: "Download",
      pr_btn_contact: "Contact",
      pr_bus_title: "Business (Annual)",
      pr_bus_note: "For teaching teams and departments: additional support and license management.",
      pr_btn_get_quote: "Get a quote",

      wfSvgTitle: "Workflow Overview",
      wfLane1: "Design",
      wfBox1: "Template / Question Bank",
      wfBox2: "Rubric Setup",
      wfBox2b: "points • criteria • modes",
      wfBox3: "Exam PDF Output",
      wfLane2: "Grading",
      wfBox4: "Question PDF + Answers",
      wfBox4b: "batch import",
      wfBox5: "Step-wise Scoring",
      wfBox5b: "explainable • traceable",
      wfBox6: "Report + Analytics",
      wfBox6b: "PDF export"
    }
  };

  function setText(lang) {
    const d = dict[lang] || dict.zh;
    document.documentElement.lang = (lang === "en") ? "en" : "zh-Hant";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (d[key]) el.textContent = d[key];
    });

    // Update inline SVG if present
    const svg = document.querySelector(".wf-figure svg");
    if (svg) {
      Object.keys(d).forEach((k) => {
        const node = svg.getElementById(k);
        if (node) node.textContent = d[k];
      });
    }
  }

  async function ensureInlineSvg() {
    const fig = document.querySelector(".wf-figure");
    if (!fig) return;

    // If already inline, done
    if (fig.querySelector("svg")) return;

    const img = fig.querySelector("img");
    if (!img) return;

    try {
      const resp = await fetch(img.getAttribute("src"), { cache: "force-cache" });
      const txt = await resp.text();
      const wrap = document.createElement("div");
      wrap.innerHTML = txt;
      const svg = wrap.querySelector("svg");
      if (!svg) return;
      fig.innerHTML = "";
      fig.appendChild(svg);
    } catch (e) {}
  }

  function setToggle(lang) {
    document.querySelectorAll(".langswitch__btn").forEach((b) => {
      const active = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  async function apply(lang) {
    await ensureInlineSvg();
    setText(lang);
        if (window.__FH_PRICING__ && window.__FH_PRICING__.applyPricing) await window.__FH_PRICING__.applyPricing(lang);
setToggle(lang);
    localStorage.setItem("fh_lang", lang);
  }

  function init() {
    const saved = localStorage.getItem("fh_lang") || "zh";
    apply(saved);
    document.querySelectorAll(".langswitch__btn").forEach((b) => {
      b.addEventListener("click", () => apply(b.getAttribute("data-lang")));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();