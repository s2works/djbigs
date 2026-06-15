// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Nav: add backdrop once scrolled off the hero ---------- */
const nav = document.querySelector(".nav");
if (nav) {
  const onNavScroll = () => nav.classList.toggle("scrolled", window.scrollY > 60);
  window.addEventListener("scroll", onNavScroll, { passive: true });
  onNavScroll();
}

/* ---------- Mobile menu (hamburger) ---------- */
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");
if (navToggle && mobileMenu) {
  const setMenu = (open) => {
    mobileMenu.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobileMenu.setAttribute("aria-hidden", String(!open));
  };
  navToggle.addEventListener("click", () =>
    setMenu(navToggle.getAttribute("aria-expanded") !== "true")
  );
  // Close after tapping a link
  mobileMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => setMenu(false))
  );
  // Close on Escape, or when resizing up to desktop
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 560) setMenu(false);
  });
}

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll(".section");
revealEls.forEach((el) => el.setAttribute("data-reveal", ""));

if (prefersReduced || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => observer.observe(el));
}

/* ---------- Parallax (depth on images) ---------- */
const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]"));
const tiltEls = Array.from(document.querySelectorAll("[data-tilt]"));
const isFinePointer = window.matchMedia("(pointer: fine)").matches;

if (!prefersReduced && parallaxEls.length) {
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.getAttribute("data-parallax")) || 0.15;
      const rect = el.getBoundingClientRect();
      // distance of element center from viewport center
      const offset = rect.top + rect.height / 2 - vh / 2;
      el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
    });
    ticking = false;
  };
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
}

/* ---------- 3D tilt on hover (desktop / fine pointer only) ---------- */
if (!prefersReduced && isFinePointer) {
  const MAX = 7; // degrees
  tiltEls.forEach((el) => {
    el.style.perspective = "900px";
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform =
        `perspective(900px) rotateY(${(px * MAX).toFixed(2)}deg) rotateX(${(-py * MAX).toFixed(2)}deg) translateZ(0)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
    });
  });
}
