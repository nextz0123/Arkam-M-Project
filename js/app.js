/* =====================================================
   MYVERSE — Interactions & Animations
   ===================================================== */

// =====================================================
// CAPAS (POSTERS REAIS)
// -----------------------------------------------------
// Cada item pode ter uma propriedade "cover" com o URL
// da imagem. Exemplo:
//
//   { title: "Interstellar", meta: "Sci-Fi · 2014", rating: "★ 10/10",
//     cover: "images/movies/interstellar.jpg", fav: true }
//
// - Se existir "cover", a imagem é usada como capa.
// - Se não existir, cai no fallback (ícone/gradiente).
// - As imagens podem ficar numa pasta "images/" local
//   ou ser URLs externos (TMDB, etc.).
// =====================================================

const COLLECTIONS = {
  movies: [
    { title: "Interstellar", meta: "Sci-Fi · 2014", rating: "★ 10/10", icon: "🚀", fav: true },
    { title: "Your Name", meta: "Anime Film · 2016", rating: "★ 9/10", icon: "🌙", fav: true },
    { title: "Blade Runner 2049", meta: "Sci-Fi · 2017", rating: "★ 9/10", icon: "🌆" },
    { title: "Whiplash", meta: "Drama · 2014", rating: "★ 9/10", icon: "🥁" },
    { title: "Spirited Away", meta: "Anime · 2001", rating: "★ 10/10", icon: "🏮", fav: true },
    { title: "Dune: Part Two", meta: "Sci-Fi · 2024", rating: "★ 9/10", icon: "🏜️" },
    { title: "The Grand Budapest Hotel", meta: "Comedy · 2014", rating: "★ 8/10", icon: "🏨" },
    { title: "Everything Everywhere All at Once", meta: "Absurdist · 2022", rating: "★ 9/10", icon: "🥯", fav: true },
  ],
  anime: [
    { title: "FMA: Brotherhood", meta: "64 EP · 2009", rating: "★ 10/10", icon: "⚗️", fav: true },
    { title: "Steins;Gate", meta: "24 EP · 2011", rating: "★ 10/10", icon: "⏳", fav: true },
    { title: "Attack on Titan", meta: "87 EP · 2013", rating: "★ 9/10", icon: "⚔️" },
    { title: "Violet Evergarden", meta: "13 EP · 2018", rating: "★ 9/10", icon: "💌" },
    { title: "Demon Slayer", meta: "55 EP · 2019", rating: "★ 8/10", icon: "🗡️" },
    { title: "Death Note", meta: "37 EP · 2006", rating: "★ 9/10", icon: "📓", fav: true },
  ],
  games: [
    { title: "The Witcher 3", meta: "RPG · 320h played", rating: "★ 10/10", icon: "🐺", fav: true },
    { title: "Elden Ring", meta: "Soulslike · 210h", rating: "★ 10/10", icon: "🗡️", fav: true },
    { title: "Red Dead Redemption 2", meta: "Action · 180h", rating: "★ 10/10", icon: "🤠" },
    { title: "Hollow Knight", meta: "Metroidvania · 90h", rating: "★ 9/10", icon: "🐛" },
    { title: "Hades", meta: "Roguelike · 120h", rating: "★ 9/10", icon: "💀" },
    { title: "Outer Wilds", meta: "Exploration · 40h", rating: "★ 10/10", icon: "🪐", fav: true },
    { title: "God of War", meta: "Action · 110h", rating: "★ 9/10", icon: "🪓" },
    { title: "Stardew Valley", meta: "Cozy · 260h", rating: "★ 9/10", icon: "🌾" },
  ],
};

// =====================================================
// CONSTELLATION PARTICLES
// Pontinhos que flutuam, se ligam entre si por linhas
// e se conectam ao cursor quando ele se move.
// =====================================================
(function constellation() {
  const canvas = document.getElementById("stars");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let stars = [];
  let mouse = { x: null, y: null };
  let raf;

  const CONFIG = {
    density: 9000,        // px² por estrela (menor = mais estrelas)
    maxStars: 130,        // limite de estrelas
    linkDist: 130,        // distância p/ ligar estrela-estrela
    mouseDist: 190,       // distância p/ ligar ao cursor
    speed: 0.25,          // velocidade do movimento
    starColor: "167,139,250",   // roxo secundário
    mouseColor: "99,91,255",    // roxo primário
    accentChance: 0.12,   // 12% das estrelas são menta
    accentColor: "163,230,197",
  };

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const target = Math.min(
      CONFIG.maxStars,
      Math.floor((canvas.width * canvas.height) / CONFIG.density)
    );
    while (stars.length < target) stars.push(makeStar());
    stars.length = target;
  }

  function makeStar() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * CONFIG.speed * 2,
      vy: (Math.random() - 0.5) * CONFIG.speed * 2,
      r: Math.random() * 1.6 + 0.6,
      accent: Math.random() < CONFIG.accentChance,
      tw: Math.random() * Math.PI * 2,   // fase do twinkle
      twSpeed: 0.02 + Math.random() * 0.03,
    };
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const s of stars) {
      // movimento
      s.x += s.vx;
      s.y += s.vy;
      s.tw += s.twSpeed;
      if (s.x < 0 || s.x > canvas.width) s.vx *= -1;
      if (s.y < 0 || s.y > canvas.height) s.vy *= -1;

      // twinkle (brilho pulsante)
      const alpha = 0.45 + Math.sin(s.tw) * 0.3;
      const color = s.accent ? CONFIG.accentColor : CONFIG.starColor;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color},${alpha})`;
      ctx.fill();
    }

    // linhas estrela ↔ estrela
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < CONFIG.linkDist) {
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = `rgba(${CONFIG.starColor},${(1 - dist / CONFIG.linkDist) * 0.18})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // linhas cursor ↔ estrela
    if (mouse.x !== null) {
      for (const s of stars) {
        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < CONFIG.mouseDist) {
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${CONFIG.mouseColor},${(1 - dist / CONFIG.mouseDist) * 0.45})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          // leve atração da estrela em direção ao cursor
          s.x -= dx * 0.0012;
          s.y -= dy * 0.0012;
        }
      }
    }

    raf = requestAnimationFrame(draw);
  }

  window.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener("mouseleave", () => { mouse.x = null; });
  window.addEventListener("resize", resize);

  // pausa quando a aba está oculta (economia de bateria)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else draw();
  });

  resize();
  draw();
})();

// ---------- RENDER POSTER GRIDS ----------
function posterCard(item, index) {
  return `
    <article class="poster-card reveal" style="--reveal-delay: ${index * 70}ms">
      <div class="poster-media ${item.art || ""}">
        ${item.cover
          ? `<img class="poster-img" src="${item.cover}" alt="${item.title}" loading="lazy">`
          : item.icon}
        ${item.fav ? '<span class="poster-fav">♥ Favorite</span>' : ""}
      </div>
      <div class="poster-info">
        <h4>${item.title}</h4>
        <p>${item.meta}</p>
        <div class="poster-rating">${item.rating}</div>
      </div>
    </article>`;
}

function renderGrid(id, items) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = items.map(posterCard).join("");
}
renderGrid("grid-movies", COLLECTIONS.movies);
renderGrid("grid-anime", COLLECTIONS.anime);
renderGrid("grid-games", COLLECTIONS.games);

// ---------- MARQUEE (seamless duplicate) ----------
const track = document.querySelector(".marquee-track");
if (track) track.appendChild(track.querySelector(".marquee-group").cloneNode(true));

// ---------- SCROLL REVEAL (stagger via data-delay) ----------
document.querySelectorAll("[data-delay]").forEach(el => {
  el.style.setProperty("--reveal-delay", el.dataset.delay + "ms");
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ---------- NUMBER TICKER ----------
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const start = performance.now();
    counterObserver.unobserve(el);
    (function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(target * eased).toLocaleString("en-US");
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  });
}, { threshold: 0.5 });

document.querySelectorAll("[data-count]").forEach(el => counterObserver.observe(el));

// ---------- THEME TOGGLE (dark default, salvo em localStorage) ----------
const themeToggle = document.getElementById("themeToggle");
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.textContent = theme === "light" ? "☀️" : "🌙";
  localStorage.setItem("arkham-theme", theme);
}
applyTheme(localStorage.getItem("arkham-theme") || "dark");
themeToggle.addEventListener("click", () => {
  applyTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");
});

// ---------- NAVBAR SCROLL STATE ----------
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 10);
}, { passive: true });

// ---------- MOBILE MENU ----------
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ---------- SUBTLE PARALLAX (hero decorative elements) ----------
const parallaxEls = document.querySelectorAll("[data-parallax]");
let parallaxTicking = false;
window.addEventListener("scroll", () => {
  if (parallaxTicking) return;
  parallaxTicking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    if (y < window.innerHeight * 1.2) {
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallax);
        el.style.transform = `translateY(${y * speed * 0.15}px)`;
      });
    }
    parallaxTicking = false;
  });
}, { passive: true });

// ---------- ACTIVE NAV LINK ON SCROLL ----------
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navAnchors.forEach(a =>
      a.classList.toggle("active-link", a.getAttribute("href") === "#" + entry.target.id)
    );
  });
}, { rootMargin: "-30% 0px -60% 0px" });
sections.forEach(s => sectionObserver.observe(s));
