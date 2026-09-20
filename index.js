/* Portfolio — marquee, hero grid cells, scroll reveals, image fallbacks. */

const TICKER = [
  "TypeScript",
  "React + Next.js",
  "Node + Python APIs",
  "PostgreSQL",
  "Docker + CI/CD",
  "AWS",
];

// Hero cells: [column, row, animation delay in seconds] on the --cell module grid.
const CELLS = [[2, 1, 0], [5, 3, 2.6], [8, 2, 5.2], [11, 4, 1.4], [3, 5, 7], [13, 1, 3.8]];

// Marquee — two identical rows so translateX(-50%) loops seamlessly.
const track = document.querySelector(".ticker-track");
if (track) {
  const row = document.createElement("div");
  row.className = "ticker-row";
  row.append(...TICKER.map((t) => {
    const s = document.createElement("span");
    s.className = "ticker-item";
    s.textContent = t;
    return s;
  }));
  track.append(row, row.cloneNode(true));
}

const cells = document.querySelector(".cells");
if (cells) {
  const unit = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--cell"));
  cells.append(...CELLS.map(([cx, cy, d]) => {
    const el = document.createElement("div");
    el.className = "cell";
    el.style.left = cx * unit + "px";
    el.style.top = cy * unit + "px";
    el.style.setProperty("--d", d + "s");
    return el;
  }));
}

const reveals = document.querySelectorAll("[data-reveal]");
if (!("IntersectionObserver" in window)) {
  reveals.forEach((el) => el.classList.add("in"));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });
  reveals.forEach((el) => io.observe(el));
}

// Drop any image that fails to load so the slot's placeholder label shows through.
document.querySelectorAll(".shot img").forEach((img) => {
  img.addEventListener("error", () => img.remove());
  if (img.complete && !img.naturalWidth) img.remove();
});
