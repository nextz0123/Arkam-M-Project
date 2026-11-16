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
