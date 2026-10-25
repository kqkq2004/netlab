// site.js: every page of my portfolio loads this file.
// It holds the one list of weeks, draws the navigation bar, and fills the home page.
// For a new week: add one entry to WEEKS (path is relative to the docs folder).
const WEEKS = [
  {
    week: 2,
    path: "index.html",
    title: "Engineering foundations",
    blurb: "A switched network described as data, checked, built in Mininet and documented from the same file.",
    tags: ["YAML", "Mininet", "Git"],
  },
  {
    week: 3,
    path: "week3/index.html",
    title: "Inside the forwarding path",
    blurb: "Four routers in a ring: static routes, a summary route, path checks and a link failure.",
    tags: ["Static routes", "LPM", "traceroute"],
  },
];

(function () {
  const root = new URL("../", document.currentScript.src); // site.js lives in docs/assets/
  const url = (path) => new URL(path, root).href;
  const clean = (href) => href.split(/[?#]/)[0].replace(/index\.html$/, "");
  const here = clean(location.href);

  function el(tag, props, children) {
    const node = Object.assign(document.createElement(tag), props || {});
    for (const child of children || []) node.append(child);
    return node;
  }

  // The navigation bar, at the top of every page that loads this script.
  const nav = el("nav", { className: "site-nav" });
  nav.append(el("a", { className: "brand", href: url("home/index.html"), textContent: "Programmable Networks · 4966" }));
  const tabs = [{ label: "Home", path: "home/index.html" }].concat(
    WEEKS.map((w) => ({ label: "Week " + w.week, path: w.path }))
  );
  for (const tab of tabs) {
    const a = el("a", { className: "tab", href: url(tab.path), textContent: tab.label });
    if (clean(a.href) === here) a.setAttribute("aria-current", "page");
    nav.append(a);
  }
  document.body.prepend(nav);

  // The week cards, on the home page only.
  const grid = document.getElementById("weeks");
  if (grid) {
    for (const w of WEEKS) {
      grid.append(
        el("a", { className: "week-card", href: url(w.path) }, [
          el("span", { className: "num", textContent: "Week " + w.week }),
          el("h3", { textContent: w.title }),
          el("p", { textContent: w.blurb }),
          el("div", { className: "tags" }, w.tags.map((t) => el("span", { textContent: t }))),
        ])
      );
    }
  }
})();