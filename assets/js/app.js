/* ==========================================================================
   TRBK — Baza Wiedzy  ·  silnik aplikacji
   - Cała nawigacja i wyszukiwarka budują się z danych (content.js).
   - Routing po adresie URL (#/rola/artykul) → każdy artykuł ma własny link.
   - Brak zależności zewnętrznych. Działa również z pliku (file://).
   ========================================================================== */
(function () {
  "use strict";

  var DATA = window.KB_CONTENT || { brand: { name: "Baza Wiedzy" }, roles: [] };
  var LS = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ----- Ikony (inline SVG, currentColor) ------------------------------- */
  function svg(d, opts) {
    opts = opts || {};
    var s = opts.size || 18;
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="' + (opts.sw || 1.7) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  }
  var I = {
    search: function (o) { return svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>', o); },
    close: function (o) { return svg('<path d="M18 6 6 18M6 6l12 12"/>', o); },
    menu: function (o) { return svg('<path d="M3 6h18M3 12h18M3 18h18"/>', o); },
    chevDown: function (o) { return svg('<path d="m6 9 6 6 6-6"/>', o); },
    chevRight: function (o) { return svg('<path d="m9 6 6 6-6 6"/>', o); },
    sun: function (o) { return svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>', o); },
    moon: function (o) { return svg('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>', o); },
    arrowLeft: function (o) { return svg('<path d="M19 12H5M12 19l-7-7 7-7"/>', o); },
    arrowRight: function (o) { return svg('<path d="M5 12h14M12 5l7 7-7 7"/>', o); },
    extLink: function (o) { return svg('<path d="M7 17 17 7M8 7h9v9"/>', o); },
    printer: function (o) { return svg('<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M6 14h12v8H6z"/>', o); },
    download: function (o) { return svg('<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>', o); },
    hash: function (o) { return svg('<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>', o); },
    share: function (o) { return svg('<circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="M8.3 10.7 15.7 6.3M8.3 13.3l7.4 4.4"/>', o); },
    info: function (o) { return svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>', o); },
    bulb: function (o) { return svg('<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/>', o); },
    warn: function (o) { return svg('<path d="M10.3 3.6 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>', o); },
    danger: function (o) { return svg('<circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/>', o); },
    check: function (o) { return svg('<path d="M20 6 9 17l-5-5"/>', o); },
    checkCircle: function (o) { return svg('<circle cx="12" cy="12" r="9"/><path d="m9 12 2 2 4-4"/>', o); },
    home: function (o) { return svg('<path d="M3 11.5 12 4l9 7.5M5 10v10h14V10"/>', o); },
    image: function (o) { return svg('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-4.5-4.5L6 21"/>', o); },
    play: function (o) { return svg('<circle cx="12" cy="12" r="9"/><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none"/>', o); },
    link: function (o) { return svg('<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/>', o); },
    file: function (o) { return svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>', o); },
    book: function (o) { return svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>', o); },
    hardhat: function (o) { return svg('<path d="M2 18h20M4 18a8 8 0 0 1 16 0M10 5a2 2 0 0 1 4 0M9 5.5V9M15 5.5V9M12 4v5"/>', o); },
    handshake: function (o) { return svg('<path d="m11 17 2 2 4-4M3 12l4-4 5 4 3-2 6 5M7 8l-4 4v4h3"/>', o); },
    briefcase: function (o) { return svg('<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20"/>', o); },
    palette: function (o) { return svg('<path d="M12 22a10 10 0 1 1 10-10c0 3-3 3-5 3h-1a2 2 0 0 0-1 4 2 2 0 0 1-2 3z"/><circle cx="7.5" cy="11.5" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16.5" cy="11.5" r="1"/>', o); },
    cart: function (o) { return svg('<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L22 7H5"/>', o); },
    headset: function (o) { return svg('<path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2zM20 14a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2zM18 16v1a4 4 0 0 1-4 4h-2"/>', o); },
    truck: function (o) { return svg('<path d="M2 5h11v11H2zM13 8h4l3 3v5h-7M6 19a1.6 1.6 0 1 0 0-3 1.6 1.6 0 0 0 0 3zM17 19a1.6 1.6 0 1 0 0-3 1.6 1.6 0 0 0 0 3z"/>', o); },
    store: function (o) { return svg('<path d="M3 9 4 4h16l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6"/>', o); },
    tools: function (o) { return svg('<path d="M14.7 6.3a4 4 0 0 0 5 5l-8 8a2.8 2.8 0 0 1-4-4zM6 8l3 3M3 21l4-4"/>', o); },
    clipboard: function (o) { return svg('<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M9 12l2 2 4-4"/>', o); },
    building: function (o) { return svg('<rect x="5" y="2" width="14" height="20" rx="1"/><path d="M9 6h2M13 6h2M9 10h2M13 10h2M9 14h2M13 14h2M10 22v-4h4v4"/>', o); },
    bolt: function (o) { return svg('<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>', o); },
    phone: function (o) { return svg('<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 5 5L20 17l-1 4h-1A15 15 0 0 1 3 6V5a2 2 0 0 1 2-2z"/>', o); },
    users: function (o) { return svg('<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5.5M22 20a6 6 0 0 0-4-5.6"/>', o); },
    question: function (o) { return svg('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3M12 17h.01"/>', o); },
    cornerDown: function (o) { return svg('<path d="M9 10 4 15l5 5M4 15h12a4 4 0 0 0 4-4V4"/>', o); }
  };
  function icon(name, o) { return (I[name] || I.book)(o); }

  /* ----- Helpers -------------------------------------------------------- */
  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function slugify(s) {
    return norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "sekcja";
  }
  var DIA = { "ą":"a","ć":"c","ę":"e","ł":"l","ń":"n","ó":"o","ś":"s","ż":"z","ź":"z" };
  function norm(s) {
    s = String(s == null ? "" : s);
    var out = "";
    for (var i = 0; i < s.length; i++) {
      var ch = s[i], low = ch.toLowerCase();
      var rep = DIA[low] || (low.length === 1 ? low : ch);
      out += rep;
    }
    return out;
  }
  function stripTags(html) { return String(html == null ? "" : html).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ----- Indeks ról / artykułów ----------------------------------------- */
  var ROLE_BY_ID = {}, ARTICLE_INDEX = [], FLAT_BY_ROLE = {};
  (DATA.roles || []).forEach(function (role) {
    ROLE_BY_ID[role.id] = role;
    if (role.soon) return;
    var flat = [];
    (role.groups || []).forEach(function (g) {
      (g.items || []).forEach(function (a) {
        a._role = role; a._group = g;
        flat.push(a);
        ARTICLE_INDEX.push({
          roleId: role.id, roleTitle: role.title, id: a.id,
          title: a.title, summary: a.summary || "", tags: (a.tags || []),
          body: extractText(a.blocks || []),
          url: "#/" + role.id + "/" + a.id
        });
      });
    });
    FLAT_BY_ROLE[role.id] = flat;
  });
  function extractText(blocks) {
    var parts = [];
    (blocks || []).forEach(function (b) {
      if (!b) return;
      ["text", "html", "title", "caption", "summary", "label", "q", "a", "note", "name", "k", "v"].forEach(function (f) {
        if (b[f]) parts.push(stripTags(b[f]));
      });
      if (b.items) b.items.forEach(function (it) {
        if (typeof it === "string") parts.push(stripTags(it));
        else if (it) {
          ["text", "title", "html", "q", "a", "label", "note", "name", "k", "v", "meta", "caption"].forEach(function (f) { if (it[f]) parts.push(stripTags(it[f])); });
          if (it.blocks) parts.push(extractText(it.blocks));
        }
      });
      if (b.rows) b.rows.forEach(function (r) { (r || []).forEach(function (c) { parts.push(stripTags(c)); }); });
      if (b.head) b.head.forEach(function (c) { parts.push(stripTags(c)); });
      if (b.steps) b.steps.forEach(function (s) { parts.push(stripTags(s.title) + " " + stripTags(s.html)); });
    });
    return parts.join(" ");
  }
  function findArticle(roleId, artId) {
    var role = ROLE_BY_ID[roleId];
    if (!role || role.soon) return null;
    var flat = FLAT_BY_ROLE[roleId] || [];
    for (var i = 0; i < flat.length; i++) if (flat[i].id === artId) return { role: role, article: flat[i], flat: flat, index: i };
    return null;
  }

  /* ====================================================================== *
   *  RENDER: bloki treści
   * ====================================================================== */
  var hCounter = 0;
  function renderBlocks(blocks) { return (blocks || []).map(renderBlock).join(""); }
  function renderBlock(b) {
    if (!b) return "";
    switch (b.t) {
      case "lead": return '<p class="block-lead">' + b.html + "</p>";
      case "p": return "<p>" + b.html + "</p>";
      case "h": {
        var lvl = b.lvl === 3 ? 3 : 2;
        var id = b.id || (slugify(b.text) + "-" + (++hCounter));
        b._id = id;
        return "<h" + lvl + ' id="' + id + '">' + escapeHtml(b.text) +
          '<button type="button" class="heading-anchor" aria-label="Kopiuj link do tej sekcji" data-anchor="' + id + '">' + I.share({ size: 15 }) + "</button></h" + lvl + ">";
      }
      case "ul": return "<ul>" + (b.items || []).map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";
      case "ol": return "<ol>" + (b.items || []).map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ol>";
      case "kv": return '<div class="kv">' + (b.items || []).map(function (it) {
        return '<div class="kv__row"><div class="kv__k">' + escapeHtml(it.k) + '</div><div class="kv__v">' + it.v + "</div></div>";
      }).join("") + "</div>";
      case "check": {
        var items = (b.items || []);
        return '<div class="checklist" data-checklist="' + (b.id || slugify(b.title || "lista")) + '">' +
          (b.title ? '<div class="checklist__title"><span>' + escapeHtml(b.title) + '</span><span class="checklist__progress" data-progress>0/' + items.length + "</span></div>" : "") +
          items.map(function (txt, i) {
            return '<label class="check-item"><input type="checkbox" data-ci="' + i + '"><span class="check-box">' + I.check({ size: 13, sw: 2.4 }) + '</span><span class="check-item__text">' + txt + "</span></label>";
          }).join("") + "</div>";
      }
      case "steps": return '<div class="steps">' + (b.items || []).map(function (s, i) {
        return '<div class="step"><div class="step__num">' + (i + 1) + '</div><div class="step__body"><div class="step__title">' + escapeHtml(s.title) + "</div>" + (s.html ? "<div>" + s.html + "</div>" : "") + "</div></div>";
      }).join("") + "</div>";
      case "note": {
        var v = b.variant || "info";
        var ic = v === "tip" ? I.bulb : v === "warn" ? I.warn : v === "danger" ? I.danger : v === "success" ? I.checkCircle : I.info;
        return '<div class="note note--' + v + '"><div class="note__ic">' + ic({ size: 20 }) + '</div><div class="note__body">' +
          (b.title ? '<div class="note__title">' + escapeHtml(b.title) + "</div>" : "") + b.html + "</div></div>";
      }
      case "table": {
        var head = "<thead><tr>" + (b.head || []).map(function (h) { return "<th>" + escapeHtml(h) + "</th>"; }).join("") + "</tr></thead>";
        var body = "<tbody>" + (b.rows || []).map(function (r) {
          return "<tr>" + (r || []).map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>";
        }).join("") + "</tbody>";
        return '<div class="table-wrap"><table class="tbl">' + (b.caption ? "<caption>" + escapeHtml(b.caption) + "</caption>" : "") + head + body + "</table></div>";
      }
      case "accordion": return '<div class="accordion">' + (b.items || []).map(function (it, i) {
        var open = it.open ? "true" : "false";
        return '<div class="acc-item" data-open="' + open + '"><button class="acc-head" aria-expanded="' + open + '">' +
          "<span>" + escapeHtml(it.q || it.title) + '</span><span class="acc-ic">' + I.chevDown({ size: 18 }) + '</span></button><div class="acc-panel"><div class="acc-panel-inner">' +
          (it.blocks ? renderBlocks(it.blocks) : (it.html || "")) + "</div></div></div>";
      }).join("") + "</div>";
      case "tabs": {
        var gid = "tabs-" + (++hCounter);
        var btns = (b.items || []).map(function (it, i) {
          return '<button class="tab-btn" role="tab" aria-selected="' + (i === 0 ? "true" : "false") + '" data-tab="' + i + '" id="' + gid + "-t" + i + '">' + escapeHtml(it.label) + "</button>";
        }).join("");
        var panels = (b.items || []).map(function (it, i) {
          return '<div class="tab-panel" role="tabpanel" data-panel="' + i + '"' + (i === 0 ? "" : " hidden") + ">" + (it.blocks ? renderBlocks(it.blocks) : (it.html || "")) + "</div>";
        }).join("");
        return '<div class="tabs" data-tabs="' + gid + '"><div class="tabs__list" role="tablist">' + btns + "</div>" + panels + "</div>";
      }
      case "cards": return '<div class="cards">' + (b.items || []).map(function (c) {
        return '<div class="card">' +
          '<div class="card__top">' + (c.icon ? '<span class="card__ic">' + icon(c.icon, { size: 17 }) + "</span>" : "") +
          '<span class="card__title">' + escapeHtml(c.title) + "</span>" +
          (c.tag ? '<span class="card__tag">' + escapeHtml(c.tag) + "</span>" : "") + "</div>" +
          '<div class="card__body">' + (c.html || "") + "</div></div>";
      }).join("") + "</div>";
      case "img": return '<figure class="media">' + (b.src
        ? '<div class="media__frame"><img src="' + escapeHtml(b.src) + '" alt="' + escapeHtml(b.alt || "") + '" loading="lazy"></div>'
        : '<div class="media__ph"><span class="ph-ic">' + I.image({ size: 30 }) + "</span><strong>" + escapeHtml(b.alt || "Miejsce na zdjęcie") + "</strong><span>" + escapeHtml(b.placeholder || "Dodaj zdjęcie ustawiając pole „src” w content.js.") + "</span></div>") +
        (b.caption ? '<figcaption class="media__cap">' + escapeHtml(b.caption) + "</figcaption>" : "") + "</figure>";
      case "video": return '<figure class="media">' + (b.embed
        ? '<div class="media__frame video-embed"><iframe src="' + escapeHtml(b.embed) + '" title="' + escapeHtml(b.caption || "Film") + '" allowfullscreen loading="lazy"></iframe></div>'
        : '<div class="media__ph"><span class="ph-ic">' + I.play({ size: 32 }) + "</span><strong>" + escapeHtml(b.title || "Miejsce na film instruktażowy") + "</strong><span>" + escapeHtml(b.placeholder || "Wklej adres osadzenia (np. YouTube) w polu „embed” w content.js.") + "</span></div>") +
        (b.caption ? '<figcaption class="media__cap">' + escapeHtml(b.caption) + "</figcaption>" : "") + "</figure>";
      case "files": return '<div class="files">' + (b.items || []).map(function (f) {
        var inner = '<span class="file-item__ic">' + escapeHtml((f.type || "PDF").toUpperCase()) + "</span>" +
          '<span class="file-item__meta"><span class="file-item__name">' + escapeHtml(f.name) + "</span>" +
          (f.note ? '<span class="file-item__note">' + escapeHtml(f.note) + "</span>" : "") + "</span>" +
          '<span class="file-item__dl">' + I.download({ size: 18 }) + "</span>";
        return f.href ? '<a class="file-item" href="' + escapeHtml(f.href) + '" download>' + inner + "</a>" : '<div class="file-item">' + inner + "</div>";
      }).join("") + "</div>";
      case "links": return '<div class="linklist">' + (b.items || []).map(function (l) {
        return '<a href="' + escapeHtml(l.href || "#") + '"' + (l.external ? ' target="_blank" rel="noopener"' : "") + ">" +
          '<span class="ll-ext">' + (l.external ? I.extLink({ size: 16 }) : I.link({ size: 16 })) + "</span><span>" + escapeHtml(l.label) + "</span>" +
          (l.note ? '<span class="ll-note">' + escapeHtml(l.note) + "</span>" : "") + "</a>";
      }).join("") + "</div>";
      case "quote": return '<blockquote class="quote">' + b.html + (b.cite ? "<cite>" + escapeHtml(b.cite) + "</cite>" : "") + "</blockquote>";
      case "divider": return '<hr class="divider">';
      default: return "";
    }
  }

  /* ====================================================================== *
   *  RENDER: szkielet, sidebar, topbar
   * ====================================================================== */
  function buildShell() {
    var app = document.getElementById("app");
    app.innerHTML =
      '<div class="scrim" data-scrim></div>' +
      '<div class="layout">' +
        '<aside class="sidebar" id="sidebar" aria-label="Nawigacja główna">' + sidebarHTML() + "</aside>" +
        '<div class="main">' +
          '<header class="topbar">' +
            '<button class="icon-btn hamburger" data-burger aria-label="Otwórz menu" aria-expanded="false">' + I.menu({ size: 20 }) + "</button>" +
            '<nav class="topbar__crumbs" data-crumbs aria-label="Ścieżka"></nav>' +
            '<div class="topbar__spacer"></div>' +
            '<button class="topbar__search" data-search-open aria-label="Szukaj">' + I.search({ size: 16 }) + "<span>Szukaj…</span><span class=\"kbd\">⌘K</span></button>" +
            '<button class="icon-btn" data-search-open data-search-mobile aria-label="Szukaj">' + I.search({ size: 19 }) + "</button>" +
            '<button class="icon-btn" data-theme-toggle aria-label="Przełącz motyw">' + I.sun({ size: 19 }) + "</button>" +
          "</header>" +
          '<div id="view" tabindex="-1"></div>' +
        "</div>" +
      "</div>" +
      searchModalHTML();
    app.setAttribute("aria-busy", "false");
    app.removeAttribute("aria-busy");
  }

  function sidebarHTML() {
    var nav = (DATA.roles || []).map(function (role) {
      if (role.soon) {
        return '<div class="nav-role"><div class="nav-role__head" disabled aria-disabled="true">' +
          '<span class="role-ic">' + icon(role.icon, { size: 15 }) + "</span><span>" + escapeHtml(role.title) + "</span>" +
          '<span class="nav-role__badge">Wkrótce</span></div></div>';
      }
      var groups = (role.groups || []).map(function (g) {
        var links = (g.items || []).map(function (a) {
          return '<a class="nav-link" href="#/' + role.id + "/" + a.id + '" data-link="' + role.id + "/" + a.id + '"><span class="dot"></span><span>' + escapeHtml(a.title) + "</span></a>";
        }).join("");
        return '<div class="nav-group">' + (g.label ? '<div class="nav-group__label">' + escapeHtml(g.label) + "</div>" : "") + links + "</div>";
      }).join("");
      return '<div class="nav-role" data-role="' + role.id + '" data-open="true">' +
        '<button class="nav-role__head" data-role-toggle="' + role.id + '" aria-expanded="true">' +
        '<span class="role-ic">' + icon(role.icon, { size: 15 }) + "</span><span>" + escapeHtml(role.title) + '</span><span class="chev">' + I.chevDown({ size: 16 }) + "</span></button>" +
        '<div class="nav-role__body">' + groups + "</div></div>";
    }).join("");

    return '<div class="sidebar__brand"><a href="#/" style="display:flex;gap:11px;align-items:center" aria-label="Strona główna">' +
        '<span class="brand-mark">' + escapeHtml((DATA.brand && DATA.brand.mark) || "T") + "</span>" +
        '<span class="brand-text"><strong>' + escapeHtml((DATA.brand && DATA.brand.name) || "TRBK") + "</strong><span>" + escapeHtml((DATA.brand && DATA.brand.tagline) || "Baza wiedzy") + "</span></span></a></div>" +
      '<button class="sidebar__search" data-search-open>' + I.search({ size: 16 }) + "<span>Szukaj w bazie…</span><span class=\"kbd\">⌘K</span></button>" +
      '<nav class="sidebar__nav" aria-label="Działy">' + nav + "</nav>" +
      '<div class="sidebar__foot"><span>' + escapeHtml((DATA.brand && DATA.brand.name) || "TRBK") + " · SOP</span><span>" + escapeHtml((DATA.brand && DATA.brand.version) || "v1.0") + "</span></div>";
  }

  function searchModalHTML() {
    return '<div class="search-overlay" data-search-overlay role="dialog" aria-modal="true" aria-label="Wyszukiwarka">' +
      '<div class="search-modal">' +
        '<div class="search-input-wrap">' + I.search({ size: 20 }) +
          '<input class="search-input" type="text" placeholder="Szukaj procedur, instrukcji, dostawców…" data-search-input aria-label="Szukaj" autocomplete="off" spellcheck="false">' +
          '<button class="icon-btn search-esc" data-search-close aria-label="Zamknij">' + I.close({ size: 18 }) + "</button>" +
        "</div>" +
        '<div class="search-results" data-search-results></div>' +
        '<div class="search-foot"><span class="sf"><span class="kbd">↑</span><span class="kbd">↓</span> nawigacja</span>' +
          '<span class="sf"><span class="kbd">↵</span> otwórz</span><span class="sf"><span class="kbd">esc</span> zamknij</span></div>' +
      "</div></div>";
  }

  /* ====================================================================== *
   *  WIDOKI: home + artykuł
   * ====================================================================== */
  function renderHome() {
    var roles = DATA.roles || [];
    var cards = roles.map(function (role) {
      var count = role.soon ? 0 : (FLAT_BY_ROLE[role.id] || []).length;
      if (role.soon) {
        return '<div class="role-card is-soon"><div class="role-card__top"><span class="role-card__ic">' + icon(role.icon, { size: 22 }) +
          '</span><span class="role-card__name">' + escapeHtml(role.title) + '</span><span class="role-card__soon">Wkrótce</span></div>' +
          '<div class="role-card__desc">' + escapeHtml(role.desc || "Materiały w przygotowaniu.") + "</div>" +
          '<div class="role-card__foot">Dział planowany</div></div>';
      }
      var first = (FLAT_BY_ROLE[role.id] || [])[0];
      var href = first ? "#/" + role.id + "/" + first.id : "#/";
      return '<a class="role-card" href="' + href + '"><div class="role-card__top"><span class="role-card__ic">' + icon(role.icon, { size: 22 }) +
        '</span><span class="role-card__name">' + escapeHtml(role.title) + "</span></div>" +
        '<div class="role-card__desc">' + escapeHtml(role.desc || "") + "</div>" +
        '<div class="role-card__foot"><span class="role-card__count">' + I.book({ size: 14 }) + " " + count + " " + plural(count, "artykuł", "artykuły", "artykułów") + "</span></div></a>";
    }).join("");

    var quick = (DATA.quickLinks || []).map(function (q) {
      return '<a class="quick-link" href="' + escapeHtml(q.href) + '"><span class="quick-link__ic">' + icon(q.icon || "cornerDown", { size: 18 }) +
        '</span><span><span class="quick-link__t">' + escapeHtml(q.title) + "</span><br><span class=\"quick-link__s\">" + escapeHtml(q.sub || "") + "</span></span></a>";
    }).join("");

    var firstRole = roles.find(function (r) { return !r.soon; });
    var startHref = "#/";
    if (firstRole && FLAT_BY_ROLE[firstRole.id] && FLAT_BY_ROLE[firstRole.id][0]) startHref = "#/" + firstRole.id + "/" + FLAT_BY_ROLE[firstRole.id][0].id;

    var view = $("#view");
    view.innerHTML = '<div class="home">' +
      '<section class="home__hero">' +
        '<div class="home__kicker">' + escapeHtml((DATA.brand && DATA.brand.name) || "TRBK") + " · Wewnętrzna baza wiedzy</div>" +
        '<h1 class="home__title">' + escapeHtml((DATA.home && DATA.home.title) || "Wszystko, czego potrzebujesz, by zacząć.") + "</h1>" +
        '<p class="home__sub">' + escapeHtml((DATA.home && DATA.home.sub) || "Procedury, standardy i odpowiedzi na najczęstsze pytania — w jednym miejscu.") + "</p>" +
        '<div class="home__cta"><a class="btn btn--primary" href="' + startHref + '">' + I.book({ size: 17 }) + " Rozpocznij wdrożenie</a>" +
          '<button class="btn btn--ghost" data-search-open>' + I.search({ size: 16 }) + " Szukaj " + '<span class="kbd">⌘K</span></button></div>' +
      "</section>" +
      '<div class="home__section-label">Działy / role</div><div class="role-cards">' + cards + "</div>" +
      (quick ? '<div class="home__section-label">Szybki dostęp</div><div class="quick-grid">' + quick + "</div>" : "") +
    "</div>";

    setCrumbs([]);
    setActiveNav(null);
    document.title = ((DATA.brand && DATA.brand.name) || "TRBK") + " — Baza Wiedzy";
    setMeta((DATA.home && DATA.home.sub) || "Wewnętrzna baza wiedzy TRBK.");
    $("#view").focus();
    window.scrollTo(0, 0);
  }

  function renderArticle(ctx) {
    hCounter = 0;
    var a = ctx.article, role = ctx.role;
    var blocksHTML = renderBlocks(a.blocks || []);

    var meta = '<div class="article__meta">' +
      ((a.tags && a.tags.length) ? '<div class="tag-row">' + a.tags.map(function (t) { return '<span class="tag">' + escapeHtml(t) + "</span>"; }).join("") + "</div>" : "") +
      (a.updated ? '<span class="m">' + I.clipboard({ size: 14 }) + " Aktualizacja: " + escapeHtml(a.updated) + "</span>" : "") +
      '<span class="m">' + I.book({ size: 14 }) + " " + readingTime(a) + " min czytania</span>" +
      '<span class="meta-print"><button data-print>' + I.printer({ size: 15 }) + " Drukuj / PDF</button></span>" +
    "</div>";

    var prev = ctx.flat[ctx.index - 1], next = ctx.flat[ctx.index + 1];
    var prevnext = '<nav class="prevnext" aria-label="Sąsiednie artykuły">' +
      (prev ? '<a class="prev" href="#/' + role.id + "/" + prev.id + '"><span class="pn-dir">' + I.arrowLeft({ size: 14 }) + " Poprzedni</span><span class=\"pn-title\">" + escapeHtml(prev.title) + "</span></a>" : '<span class="empty"></span>') +
      (next ? '<a class="next" href="#/' + role.id + "/" + next.id + '"><span class="pn-dir">Następny ' + I.arrowRight({ size: 14 }) + "</span><span class=\"pn-title\">" + escapeHtml(next.title) + "</span></a>" : '<span class="empty"></span>') +
    "</nav>";

    var view = $("#view");
    view.innerHTML = '<div class="content-wrap">' +
      '<article class="article">' +
        '<div class="article__eyebrow">' + escapeHtml(role.title) + (a._group && a._group.label ? " · " + escapeHtml(a._group.label) : "") + "</div>" +
        '<h1 class="article__title">' + escapeHtml(a.title) + "</h1>" +
        (a.summary ? '<p class="article__lead">' + escapeHtml(a.summary) + "</p>" : "") +
        meta + blocksHTML + prevnext +
      "</article>" +
      '<aside class="toc" aria-label="Spis treści"></aside>' +
    "</div>";

    buildTOC();
    wireArticleInteractions(role.id, a.id);
    setCrumbs([{ label: role.title, href: "#/" + role.id + "/" + a.id }, { label: a.title }]);
    setActiveNav(role.id + "/" + a.id);
    document.title = a.title + " · " + role.title + " — " + ((DATA.brand && DATA.brand.name) || "TRBK");
    setMeta(a.summary || stripTags(blocksHTML).slice(0, 150));
    $("#view").focus();
    window.scrollTo(0, 0);
  }

  function render404() {
    $("#view").innerHTML = '<div class="home"><section class="home__hero"><div class="home__kicker">404</div>' +
      '<h1 class="home__title">Nie znaleziono strony</h1><p class="home__sub">Ten artykuł nie istnieje lub został przeniesiony.</p>' +
      '<div class="home__cta"><a class="btn btn--primary" href="#/">' + I.home({ size: 16 }) + " Strona główna</a></div></section></div>";
    setCrumbs([{ label: "Nie znaleziono" }]); setActiveNav(null);
    document.title = "Nie znaleziono — " + ((DATA.brand && DATA.brand.name) || "TRBK");
  }

  /* ----- ToC + scroll spy ---------------------------------------------- */
  var spyObserver = null;
  function buildTOC() {
    var toc = $(".toc"), article = $(".article");
    if (!toc || !article) return;
    var heads = $all("h2[id], h3[id]", article);
    if (heads.length < 2) { toc.style.display = "none"; var cw = $(".content-wrap"); if (cw) cw.classList.add("no-toc"); return; }
    toc.innerHTML = '<div class="toc__label">Na tej stronie</div><ul class="toc__list">' +
      heads.map(function (h) {
        return '<li><a href="#' + (location.hash.split("#")[1] || "") + "#" + h.id + '" class="' + (h.tagName === "H3" ? "lvl-3" : "") + '" data-toc="' + h.id + '">' + escapeHtml(h.textContent.replace("#", "").trim()) + "</a></li>";
      }).join("") + "</ul>";

    $all("[data-toc]", toc).forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var el = document.getElementById(link.getAttribute("data-toc"));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    if (spyObserver) spyObserver.disconnect();
    var map = {};
    $all("[data-toc]", toc).forEach(function (l) { map[l.getAttribute("data-toc")] = l; });
    spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          $all("[data-toc]", toc).forEach(function (l) { l.classList.remove("active"); });
          if (map[en.target.id]) map[en.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-80px 0px -70% 0px", threshold: 0 });
    heads.forEach(function (h) { spyObserver.observe(h); });
  }

  /* ----- Interakcje w artykule (checklisty, accordiony, taby) ----------- */
  /* ----- Kopiowanie do schowka + toast -------------------------------- */
  function copyText(t) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(t);
    return new Promise(function (res, rej) {
      try {
        var ta = document.createElement("textarea");
        ta.value = t; ta.setAttribute("readonly", "");
        ta.style.position = "fixed"; ta.style.top = "-1000px"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        var ok = document.execCommand("copy");
        document.body.removeChild(ta);
        ok ? res() : rej();
      } catch (e) { rej(e); }
    });
  }
  var toastTimer = null;
  function showToast(msg) {
    var t = document.getElementById("trbk-toast");
    if (!t) { t = document.createElement("div"); t.id = "trbk-toast"; t.className = "toast"; document.body.appendChild(t); }
    t.innerHTML = I.check({ size: 15, sw: 2.4 }) + "<span>" + escapeHtml(msg) + "</span>";
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2000);
  }

  function wireArticleInteractions(roleId, artId) {
    // Checklisty — zaznaczenia NIE są zapisywane (bieżąca kontrola w trakcie pracy).
    $all(".checklist").forEach(function (list) {
      var boxes = $all('input[type="checkbox"]', list);
      var prog = $("[data-progress]", list);
      function refresh() {
        var done = boxes.filter(function (b) { return b.checked; }).length;
        if (prog) prog.textContent = done + "/" + boxes.length;
      }
      boxes.forEach(function (box) { box.addEventListener("change", refresh); });
      refresh();
    });

    // Accordiony
    $all(".acc-head").forEach(function (head) {
      head.addEventListener("click", function () {
        var item = head.closest(".acc-item");
        var open = item.getAttribute("data-open") === "true";
        item.setAttribute("data-open", open ? "false" : "true");
        head.setAttribute("aria-expanded", open ? "false" : "true");
      });
    });

    // Taby
    $all(".tabs").forEach(function (tabs) {
      var btns = $all(".tab-btn", tabs), panels = $all(".tab-panel", tabs);
      btns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var idx = btn.getAttribute("data-tab");
          btns.forEach(function (b) { b.setAttribute("aria-selected", b === btn ? "true" : "false"); });
          panels.forEach(function (p) { p.hidden = p.getAttribute("data-panel") !== idx; });
        });
        btn.addEventListener("keydown", function (e) {
          var i = btns.indexOf(btn);
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            var ni = e.key === "ArrowRight" ? (i + 1) % btns.length : (i - 1 + btns.length) % btns.length;
            btns[ni].focus(); btns[ni].click();
          }
        });
      });
    });

    // Druk
    var printBtn = $("[data-print]");
    if (printBtn) printBtn.addEventListener("click", function () { window.print(); });

    // Nagłówki: przycisk udostępniania — kopiuje link do artykułu + toast.
    $all("[data-anchor]").forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        var url = location.href.split("#")[0] + "#/" + roleId + "/" + artId;
        copyText(url).then(function () { showToast("Link skopiowany"); })
                     .catch(function () { showToast("Nie udało się skopiować"); });
      });
    });
  }

  /* ----- Topbar helpers ------------------------------------------------- */
  function setCrumbs(items) {
    var c = $("[data-crumbs]"); if (!c) return;
    var html = '<a href="#/">' + I.home({ size: 15 }) + "</a>";
    items.forEach(function (it, i) {
      html += '<span class="sep">' + I.chevRight({ size: 14 }) + "</span>";
      if (it.href && i < items.length - 1) html += '<a href="' + it.href + '">' + escapeHtml(it.label) + "</a>";
      else html += '<span class="cur">' + escapeHtml(it.label) + "</span>";
    });
    c.innerHTML = html;
  }
  function setActiveNav(key) {
    $all(".nav-link").forEach(function (l) {
      if (l.getAttribute("data-link") === key) { l.setAttribute("aria-current", "page"); }
      else l.removeAttribute("aria-current");
    });
  }
  function setMeta(text) {
    var m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", String(text || "").slice(0, 160));
  }
  function readingTime(a) {
    var words = (a.summary || "").split(/\s+/).length + extractText(a.blocks || []).split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
  }
  function plural(n, one, few, many) {
    if (n === 1) return one;
    var d = n % 10, h = n % 100;
    if (d >= 2 && d <= 4 && (h < 10 || h >= 20)) return few;
    return many;
  }

  /* ====================================================================== *
   *  WYSZUKIWARKA
   * ====================================================================== */
  var searchState = { open: false, hits: [], active: 0 };
  function openSearch() {
    var ov = $("[data-search-overlay]"); if (!ov) return;
    ov.classList.add("open"); searchState.open = true;
    var input = $("[data-search-input]");
    input.value = ""; runSearch("");
    setTimeout(function () { input.focus(); }, 30);
  }
  function closeSearch() {
    var ov = $("[data-search-overlay]"); if (!ov) return;
    ov.classList.remove("open"); searchState.open = false;
  }
  function runSearch(q) {
    var box = $("[data-search-results]");
    var nq = norm(q).trim();
    var tokens = nq.split(/\s+/).filter(Boolean);

    if (!tokens.length) {
      // Stan początkowy: skróty / popularne
      var sugg = (DATA.searchSuggestions || []).map(function (s) {
        return { roleTitle: "Skróty", title: s.title, url: s.href, summary: s.sub || "", _score: 0, _normTitle: norm(s.title), _normBody: norm(s.sub || "") };
      });
      renderHits(sugg, [], "Popularne");
      return;
    }

    var hits = [];
    ARTICLE_INDEX.forEach(function (doc) {
      var nt = norm(doc.title), ns = norm(doc.summary), ntags = norm(doc.tags.join(" ")), nb = norm(doc.body);
      var hay = nt + "  " + ntags + "  " + ns + "  " + nb;
      var ok = true, score = 0;
      tokens.forEach(function (tk) {
        if (hay.indexOf(tk) === -1) { ok = false; return; }
        if (nt.indexOf(tk) !== -1) score += 12;
        if (ntags.indexOf(tk) !== -1) score += 7;
        if (ns.indexOf(tk) !== -1) score += 5;
        var c = nb.split(tk).length - 1; score += Math.min(c, 5) * 2;
        if (nt.indexOf(tk) === 0) score += 6; // prefix tytułu
      });
      if (ok) hits.push({ doc: doc, score: score, nt: nt, nb: nb, ns: ns });
    });
    hits.sort(function (a, b) { return b.score - a.score; });
    renderHits(hits.slice(0, 24).map(function (h) {
      return { roleTitle: h.doc.roleTitle, title: h.doc.title, url: h.doc.url, summary: h.doc.summary, body: h.doc.body, _normTitle: h.nt, _normBody: h.nb, _normSum: h.ns };
    }), tokens, null);
  }

  function renderHits(hits, tokens, groupLabelOverride) {
    var box = $("[data-search-results]");
    searchState.hits = hits; searchState.active = 0;
    if (!hits.length) {
      box.innerHTML = '<div class="search-empty">Brak wyników. Spróbuj innego hasła, np. <strong>materiały</strong>, <strong>rynek wtórny</strong>, <strong>raport</strong>.</div>';
      return;
    }
    // Grupowanie wg roli
    var groups = [], order = [];
    hits.forEach(function (h) {
      var g = groupLabelOverride || h.roleTitle;
      if (order.indexOf(g) === -1) { order.push(g); groups[g] = []; }
      groups[g].push(h);
    });
    var idx = 0, html = "";
    order.forEach(function (g) {
      html += '<div class="search-group"><div class="search-group__label">' + escapeHtml(g) + "</div>";
      groups[g].forEach(function (h) {
        h._i = idx;
        var titleHTML = tokens && tokens.length ? highlight(h.title, h._normTitle || norm(h.title), tokens) : escapeHtml(h.title);
        var snip = makeSnippet(h, tokens);
        html += '<a class="search-hit' + (idx === 0 ? " active" : "") + '" href="' + escapeHtml(h.url) + '" data-hit="' + idx + '">' +
          '<div class="search-hit__top"><span class="search-hit__title">' + titleHTML + "</span>" +
          '<span class="search-hit__badge">' + escapeHtml(h.roleTitle) + "</span></div>" +
          (snip ? '<div class="search-hit__snippet">' + snip + "</div>" : "") + "</a>";
        idx++;
      });
      html += "</div>";
    });
    box.innerHTML = html;

    $all(".search-hit", box).forEach(function (el) {
      el.addEventListener("mouseenter", function () { setActiveHit(parseInt(el.getAttribute("data-hit"), 10)); });
      el.addEventListener("click", function (e) { e.preventDefault(); go(el.getAttribute("href")); closeSearch(); });
    });
  }
  function makeSnippet(h, tokens) {
    var body = h.summary || h.body || "";
    if (!body) return tokens && tokens.length ? "" : escapeHtml(h.summary || "");
    if (!tokens || !tokens.length) return escapeHtml(body.slice(0, 120));
    var nb = norm(body), pos = -1;
    for (var i = 0; i < tokens.length; i++) { var p = nb.indexOf(tokens[i]); if (p !== -1 && (pos === -1 || p < pos)) pos = p; }
    var start = 0, prefix = "";
    if (pos > 48) { start = pos - 40; prefix = "… "; }
    var slice = body.slice(start, start + 150);
    return prefix + highlight(slice, norm(slice), tokens) + (start + 150 < body.length ? " …" : "");
  }
  function highlight(orig, normLower, tokens) {
    var ranges = [];
    tokens.forEach(function (t) {
      if (!t) return; var i = 0, p;
      while ((p = normLower.indexOf(t, i)) !== -1) { ranges.push([p, p + t.length]); i = p + t.length; }
    });
    if (!ranges.length) return escapeHtml(orig);
    ranges.sort(function (a, b) { return a[0] - b[0]; });
    var merged = [];
    ranges.forEach(function (r) {
      var last = merged[merged.length - 1];
      if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]); else merged.push([r[0], r[1]]);
    });
    var out = "", pos = 0;
    merged.forEach(function (r) {
      out += escapeHtml(orig.slice(pos, r[0])) + "<mark>" + escapeHtml(orig.slice(r[0], r[1])) + "</mark>";
      pos = r[1];
    });
    out += escapeHtml(orig.slice(pos));
    return out;
  }
  function setActiveHit(i) {
    var box = $("[data-search-results]");
    var hits = $all(".search-hit", box);
    if (!hits.length) return;
    i = Math.max(0, Math.min(i, hits.length - 1));
    searchState.active = i;
    hits.forEach(function (el, k) { el.classList.toggle("active", k === i); });
    var el = hits[i]; if (el) el.scrollIntoView({ block: "nearest" });
  }

  /* ====================================================================== *
   *  ROUTING
   * ====================================================================== */
  function parseHash() {
    var h = (location.hash || "").replace(/^#\/?/, "");
    h = h.split("#")[0]; // odetnij ewentualną kotwicę sekcji
    var parts = h.split("/").filter(Boolean);
    return parts;
  }
  function route() {
    var parts = parseHash();
    if (parts.length === 0) return renderHome();
    var roleId = parts[0], artId = parts[1];
    var role = ROLE_BY_ID[roleId];
    if (!role || role.soon) return render404();
    if (!artId) {
      var first = (FLAT_BY_ROLE[roleId] || [])[0];
      if (first) { location.replace("#/" + roleId + "/" + first.id); return; }
      return render404();
    }
    var ctx = findArticle(roleId, artId);
    if (!ctx) return render404();
    // upewnij się, że rola jest rozwinięta w nawigacji
    var roleEl = $('.nav-role[data-role="' + roleId + '"]');
    if (roleEl) { roleEl.setAttribute("data-open", "true"); var hd = $(".nav-role__head", roleEl); if (hd) hd.setAttribute("aria-expanded", "true"); }
    renderArticle(ctx);
    closeMobileNav();
  }
  function go(href) { if (location.hash === href) route(); else location.hash = href; }

  /* ====================================================================== *
   *  Motyw, mobile nav, zdarzenia globalne
   * ====================================================================== */
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    var btn = $("[data-theme-toggle]");
    if (btn) btn.innerHTML = t === "dark" ? I.moon({ size: 19 }) : I.sun({ size: 19 });
    var tc = document.querySelector('meta[name="theme-color"]');
  }
  function initTheme() {
    var saved = LS.get("trbk-theme");
    var t = saved || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(t);
  }
  function toggleTheme() {
    var cur = document.documentElement.getAttribute("data-theme");
    var t = cur === "dark" ? "light" : "dark";
    applyTheme(t); LS.set("trbk-theme", t);
  }
  function openMobileNav() {
    $("#sidebar").classList.add("open");
    $("[data-scrim]").classList.add("show");
    var b = $("[data-burger]"); if (b) b.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMobileNav() {
    var sb = $("#sidebar"); if (sb) sb.classList.remove("open");
    var sc = $("[data-scrim]"); if (sc) sc.classList.remove("show");
    var b = $("[data-burger]"); if (b) b.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function bindEvents() {
    document.addEventListener("click", function (e) {
      var t = e.target;
      if (t.closest("[data-search-open]")) { e.preventDefault(); openSearch(); return; }
      if (t.closest("[data-search-close]")) { closeSearch(); return; }
      if (t.closest("[data-theme-toggle]")) { toggleTheme(); return; }
      if (t.closest("[data-burger]")) { var sb = $("#sidebar"); sb.classList.contains("open") ? closeMobileNav() : openMobileNav(); return; }
      if (t.closest("[data-scrim]")) { closeMobileNav(); return; }
      var roleToggle = t.closest("[data-role-toggle]");
      if (roleToggle) {
        var roleEl = roleToggle.closest(".nav-role");
        var open = roleEl.getAttribute("data-open") === "true";
        roleEl.setAttribute("data-open", open ? "false" : "true");
        roleToggle.setAttribute("aria-expanded", open ? "false" : "true");
        return;
      }
      var navLink = t.closest(".nav-link");
      if (navLink && window.innerWidth <= 920) { setTimeout(closeMobileNav, 120); }
      // klik w overlay (poza modalem) zamyka
      if (t.hasAttribute("data-search-overlay")) { closeSearch(); }
    });

    // Wyszukiwarka: input + klawiatura
    var input = $("[data-search-input]");
    if (input) input.addEventListener("input", function () { runSearch(input.value); });

    document.addEventListener("keydown", function (e) {
      var isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && (e.key === "k" || e.key === "K")) { e.preventDefault(); searchState.open ? closeSearch() : openSearch(); return; }
      if (e.key === "/" && !searchState.open && !/^(input|textarea)$/i.test((e.target.tagName || "")) && !e.target.isContentEditable) { e.preventDefault(); openSearch(); return; }
      if (!searchState.open) { if (e.key === "Escape") closeMobileNav(); return; }
      if (e.key === "Escape") { e.preventDefault(); closeSearch(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); setActiveHit(searchState.active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActiveHit(searchState.active - 1); }
      else if (e.key === "Enter") {
        var hits = $all(".search-hit");
        var el = hits[searchState.active];
        if (el) { e.preventDefault(); go(el.getAttribute("href")); closeSearch(); }
      }
    });

    window.addEventListener("hashchange", route);
    window.addEventListener("resize", function () { if (window.innerWidth > 920) closeMobileNav(); });
  }

  /* ====================================================================== *
   *  START
   * ====================================================================== */
  function boot() {
    buildShell();
    initTheme();
    bindEvents();
    route();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
