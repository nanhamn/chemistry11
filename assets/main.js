/* ===== Химия 11 — общий скрипт ===== */
(function () {
  const PAGES = [
    { href: "index.html", id: "home", title: "Главная" },
    { href: "atom.html", id: "atom", title: "Атом" },
    { href: "structure.html", id: "structure", title: "Вещество" },
    { href: "reactions.html", id: "reactions", title: "Реакции" },
    { href: "inorganic.html", id: "inorganic", title: "Неорганика" },
    { href: "applied.html", id: "applied", title: "Химия и жизнь" },
    { href: "table.html", id: "table", title: "Таблица" },
    { href: "quiz.html", id: "quiz", title: "Тест" }
  ];

  // --- Тема ---
  function getTheme() {
    try { return localStorage.getItem("chem-theme"); } catch (e) { return null; }
  }
  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("chem-theme", t); } catch (e) {}
    const b = document.getElementById("theme-btn");
    if (b) b.textContent = t === "dark" ? "☀️" : "🌙";
  }
  const saved = getTheme();
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));

  document.addEventListener("DOMContentLoaded", function () {
    const current = document.body.dataset.page || "home";

    // --- Шапка ---
    const header = document.getElementById("site-header");
    if (header) {
      header.className = "topbar";
      header.innerHTML =
        '<div class="topbar-inner">' +
        '<a class="logo" href="index.html"><span class="logo-mark">Х11</span>Химия · 11 класс</a>' +
        '<nav class="nav" id="nav">' +
        PAGES.map(p => '<a href="' + p.href + '"' + (p.id === current ? ' class="active"' : "") + ">" + p.title + "</a>").join("") +
        "</nav>" +
        '<button class="icon-btn menu-btn" id="menu-btn" aria-label="Меню">☰</button>' +
        '<button class="icon-btn" id="theme-btn" aria-label="Сменить тему"></button>' +
        "</div>";
      document.getElementById("menu-btn").onclick = () => document.getElementById("nav").classList.toggle("open");
      document.getElementById("theme-btn").onclick = () =>
        setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
      setTheme(document.documentElement.getAttribute("data-theme"));
    }

    // --- Подвал ---
    const footer = document.getElementById("site-footer");
    if (footer) {
      footer.className = "footer";
      footer.innerHTML = "Химия · 11 класс — учебный сайт. Материалы для самостоятельной подготовки.";
    }

    // --- Оглавление ---
    const toc = document.getElementById("toc");
    const content = document.querySelector(".content");
    if (toc && content) {
      const heads = content.querySelectorAll("h2[id]");
      toc.innerHTML = "<h4>Содержание</h4>" +
        Array.from(heads).map(h => '<a href="#' + h.id + '">' + h.textContent + "</a>").join("");
      const links = toc.querySelectorAll("a");
      const onScroll = () => {
        let idx = 0;
        heads.forEach((h, i) => { if (h.getBoundingClientRect().top < 120) idx = i; });
        links.forEach((l, i) => l.classList.toggle("current", i === idx));
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    // --- Кнопка «наверх» ---
    const top = document.createElement("button");
    top.className = "to-top"; top.textContent = "↑"; top.setAttribute("aria-label", "Наверх");
    top.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.appendChild(top);
    window.addEventListener("scroll", () => top.classList.toggle("show", window.scrollY > 600), { passive: true });
  });
})();
