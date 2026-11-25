/* ==========================================================================
   main.js — header, drawer, reveal, insight viewer, enquiry form
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var $ = function (sel, ctx) { return (ctx || doc).querySelector(sel); };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel));
  };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- header state -------------------------------------------------- */
  var header = $("#siteHeader");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- navigation drawer --------------------------------------------- */
  var drawer = $("#navDrawer");
  var menuBtn = $("#menuBtn");
  var drawerClose = $("#drawerClose");
  var lastFocus = null;

  function openDrawer() {
    if (!drawer) return;
    lastFocus = doc.activeElement;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    doc.body.classList.add("no-scroll");
    if (drawerClose) drawerClose.focus();
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    doc.body.classList.remove("no-scroll");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  if (menuBtn) menuBtn.addEventListener("click", openDrawer);
  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
  if (drawer) {
    drawer.addEventListener("click", function (ev) {
      if (ev.target === drawer) closeDrawer();
      var link = ev.target.closest ? ev.target.closest("a") : null;
      if (link) closeDrawer();
    });
  }

  /* ---- reveal on scroll ---------------------------------------------- */
  var revealNodes = $$(".reveal");
  if (revealNodes.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealNodes.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      revealNodes.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---- insight viewer ------------------------------------------------ */
  var modal = $("#insightModal");
  var modalTitle = $("#modalArticleTitle");
  var modalBody = $("#modalArticleBody");
  var modalMeta = $("#modalArticleMeta");
  var modalAuthor = $("#modalArticleAuthor");
  var modalScroll = $("#modalScroll");
  var currentArticle = null;
  var modalOpener = null;

  function lang() {
    return window.TSCBi18n ? window.TSCBi18n.lang : "ko";
  }

  function dictValue(key, code, fallback) {
    var dict = window.TSCBi18n && window.TSCBi18n.dict;
    var entry = dict && dict[key];
    if (!entry) return fallback || "";
    if (entry[code] != null) return entry[code];
    return entry.ko != null ? entry.ko : fallback || "";
  }

  function baseTitle() {
    if (!doc.body) return doc.title;
    var tk = doc.body.getAttribute("data-title-ko");
    var te = doc.body.getAttribute("data-title-en");
    var tz = doc.body.getAttribute("data-title-zh");
    var byLang = { ko: tk, en: te, zh: tz };
    return byLang[lang()] || tk || te || tz || doc.title;
  }

  /* ---- share targets & ?post= deep links ----------------------------- */
  var shareLinks = $$("[data-share]");
  var shareHost = "";
  var canon = doc.querySelector('link[rel="canonical"]');
  if (canon && canon.href) shareHost = canon.href.split("#")[0].split("?")[0];

  function shareUrl(id) {
    var base = shareHost || (window.location.origin + window.location.pathname);
    var l = lang();
    return base + "?post=" + encodeURIComponent(id) + (l === "ko" ? "" : "&lang=" + l);
  }

  function urlFor(postId) {
    var q = [];
    if (postId) q.push("post=" + encodeURIComponent(postId));
    if (lang() !== "ko") q.push("lang=" + lang());
    return window.location.pathname + (q.length ? "?" + q.join("&") : "");
  }

  function replaceUrl(id) {
    if (!window.history || typeof window.history.replaceState !== "function") return;
    try {
      window.history.replaceState(
        id ? { post: id } : null,
        "",
        urlFor(id)
      );
    } catch (e) {
      /* some hosts refuse history writes — sharing and reading still work */
    }
  }

  function idFromUrl() {
    var m = /[?&]post=([^&#]*)/.exec(window.location.search || "");
    if (!m) return "";
    try {
      return decodeURIComponent(m[1].replace(/\+/g, " "));
    } catch (e) {
      return "";
    }
  }

  function syncShare(article) {
    if (!article || !shareLinks.length) return;
    var l = lang();
    var url = shareUrl(article.id);
    var title = (article.title && (article.title[l] || article.title.ko)) || "";
    var targets = {
      x:
        "https://twitter.com/intent/tweet?text=" + encodeURIComponent(title) +
        "&url=" + encodeURIComponent(url),
      facebook: "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url),
      linkedin:
        "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url)
    };
    shareLinks.forEach(function (el) {
      var target = targets[el.getAttribute("data-share")];
      if (target) el.setAttribute("href", target);
    });
  }

  shareLinks.forEach(function (el) {
    el.addEventListener("click", function (ev) {
      var href = el.getAttribute("href");
      if (!currentArticle || !href || href === "#") {
        ev.preventDefault();
        return;
      }
      /* the anchor's own target/rel open the network in a safe new tab */
    });
  });

  function renderArticle(article) {
    if (!article) return;
    var l = lang();
    modalMeta.innerHTML =
      '<span class="cat">' + article.cat[l] + "</span>" +
      "<span>" + article.date[l] + "</span>" +
      "<span>" + article.read[l] + "</span>";
    modalTitle.textContent = article.title[l];
    modalBody.innerHTML = article.body[l];
    if (modalAuthor && window.INSIGHT_AUTHOR) {
      modalAuthor.innerHTML = window.INSIGHT_AUTHOR[l];
    }
    doc.title = article.title[l] + " — INSIGHT B";
    syncShare(article);
  }

  function openArticle(id, opener) {
    var list = window.INSIGHTS || [];
    var article = null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) { article = list[i]; break; }
    }
    if (!article && window.TSCB_ARCHIVE) {
      for (var j = 0; j < window.TSCB_ARCHIVE.length; j++) {
        if (window.TSCB_ARCHIVE[j].slug === id) {
          var item = window.TSCB_ARCHIVE[j];
          var catKeys = { esg: "insight.filter.esg", ai: "insight.filter.ai", bm: "insight.filter.bm" };
          var catKey = catKeys[item.cat];
          var catLabel = {
            ko: dictValue(catKey, "ko", "인사이트"),
            en: dictValue(catKey, "en", "Insight"),
            zh: dictValue(catKey, "zh", "洞察")
          };
          var original = item.body || ("<p>" + (item.desc || item.title) + "</p>" +
            '<p style="margin-top:20px"><a class="btn btn--outline" href="' + item.url + '" target="_blank" rel="noopener">' +
            dictValue("insight.archive.origin", lang(), "tscbgroup.com 원문 보기 →") + "</a></p>");
          var noteEn = dictValue("insight.archive.koNote", "en", "");
          var noteZh = dictValue("insight.archive.koNote", "zh", "");
          article = {
            id: item.slug,
            cat: catLabel,
            date: { ko: item.date, en: item.date, zh: item.date },
            read: { ko: "아카이브", en: "Archive", zh: "档案" },
            title: { ko: item.title, en: item.title, zh: item.title },
            body: {
              ko: original,
              en: (noteEn ? '<p class="art-note">' + noteEn + "</p>" : "") + original,
              zh: (noteZh ? '<p class="art-note">' + noteZh + "</p>" : "") + original
            }
          };
          break;
        }
      }
    }
    if (!article || !modal) return false;
    currentArticle = article;
    modalOpener = opener || null;
    renderArticle(article);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    doc.body.classList.add("no-scroll");
    if (modalScroll) modalScroll.scrollTop = 0;
    replaceUrl(article.id);
    var closeBtn = $("#modalClose");
    if (closeBtn) closeBtn.focus();
    return true;
  }

  /* ---- archive filter & grid ----------------------------------------- */
  var archGrid = $("#archiveGrid");
  var archMore = $("#archiveMore");
  var archSearch = $("#archiveSearch");
  var filterTabs = $$(".filter-tab");
  if (archGrid && window.TSCB_ARCHIVE) {
    var activeFilter = "all";
    var searchTerm = "";
    var limit = 12;

    function catName(code) {
      var key = code === "esg" ? "insight.filter.esg" : code === "ai" ? "insight.filter.ai" : code === "bm" ? "insight.filter.bm" : "insight.cat.insight";
      return dictValue(key, lang(), "INSIGHT");
    }

    function renderArchive() {
      var filtered = window.TSCB_ARCHIVE.filter(function (p) {
        if (activeFilter !== "all" && p.cat !== activeFilter) return false;
        if (searchTerm) {
          var hay = (p.title + " " + p.desc + " " + p.slug).toLowerCase();
          if (hay.indexOf(searchTerm) === -1) return false;
        }
        return true;
      });
      var slice = filtered.slice(0, limit);
      var readLabel = dictValue("insight.cardRead", lang(), "읽기");
      archGrid.innerHTML = slice.map(function (p) {
        var excerpt = p.desc ? (p.desc.length > 110 ? p.desc.slice(0, 110) + "…" : p.desc) : "";
        return '<button type="button" class="archive-card" data-arch-slug="' + p.slug.split('"').join("&quot;") + '">' +
          '<div><div class="ac-meta"><span class="ac-cat">' + catName(p.cat) + '</span><span>' + p.date + '</span></div>' +
          '<h3>' + p.title.split("<").join("&lt;") + '</h3>' +
          (excerpt ? '<p>' + excerpt.split("<").join("&lt;") + '</p>' : '') +
          '</div><span class="ac-foot">' + readLabel + ' →</span></button>';
      }).join("");
      if (archMore) {
        archMore.hidden = filtered.length <= limit;
      }
      $$("[data-arch-slug]").forEach(function (el) {
        el.addEventListener("click", function () {
          openArticle(el.getAttribute("data-arch-slug"), el);
        });
      });
    }

    filterTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        filterTabs.forEach(function (t) { t.classList.remove("is-active"); });
        tab.classList.add("is-active");
        activeFilter = tab.getAttribute("data-filter") || "all";
        limit = 12;
        renderArchive();
      });
    });

    if (archSearch) {
      archSearch.addEventListener("input", function () {
        searchTerm = archSearch.value.trim().toLowerCase();
        limit = 12;
        renderArchive();
      });
    }

    if (archMore) {
      archMore.addEventListener("click", function () {
        limit += 18;
        renderArchive();
      });
    }

    renderArchive();
    doc.addEventListener("tscb:langchange", function () { renderArchive(); });
  }

  /* ---- FAQ category filter & search ---------------------------------- */
  var faqGrid = $("#faqList");
  var faqTabs = $$(".faq-filter-tab");
  var faqSearch = $("#faqSearch");
  if (faqGrid && faqTabs.length) {
    var activeFaqCat = "esg";
    var faqTerm = "";
    function filterFaq() {
      var blocks = $$("[data-faq-cat]");
      blocks.forEach(function (el) {
        var cat = el.getAttribute("data-faq-cat") || "";
        var matchCat = faqTerm ? true : (activeFaqCat === "all" || cat === activeFaqCat);
        var matchTerm = !faqTerm || el.textContent.toLowerCase().indexOf(faqTerm) !== -1;
        el.hidden = !(matchCat && matchTerm);
      });
    }
    filterFaq();
    faqTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        faqTabs.forEach(function (t) { t.classList.remove("is-active"); });
        tab.classList.add("is-active");
        activeFaqCat = tab.getAttribute("data-faq-filter") || "all";
        filterFaq();
      });
    });
    if (faqSearch) {
      faqSearch.addEventListener("input", function () {
        faqTerm = faqSearch.value.trim().toLowerCase();
        filterFaq();
      });
    }
  }

  function closeArticle() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    doc.body.classList.remove("no-scroll");
    currentArticle = null;
    replaceUrl(null);
    doc.title = baseTitle();
    if (modalOpener && modalOpener.focus) modalOpener.focus();
  }

  $$("[data-article]").forEach(function (btn) {
    btn.addEventListener("click", function (ev) {
      ev.preventDefault();
      openArticle(btn.getAttribute("data-article"), btn);
    });
  });

  if (modal) {
    var mClose = $("#modalClose");
    if (mClose) mClose.addEventListener("click", closeArticle);
    modal.addEventListener("click", function (ev) {
      if (ev.target === modal) closeArticle();
    });
  }

  /* ---- open the shared article on load (?post=) ---------------------- */
  function openFromUrl() {
    var id = idFromUrl();
    if (id) openArticle(id, null);
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", openFromUrl);
  } else {
    openFromUrl();
  }

  /* ---- enquiry form -------------------------------------------------- */
  var form = $("#contactForm");
  var status = $("#formStatus");
  var success = $("#formSuccess");
  var submitBtn = $("#formSubmit");
  var submitLabel = $("#formSubmitLabel");
  var mailtoBtn = $("#mailtoBtn");
  var ENDPOINT = "https://formsubmit.co/ajax/info@tscbgroup.com";
  var FALLBACK = "https://formsubmit.co/info@tscbgroup.com";

  function say(message, kind) {
    if (!status) return;
    status.textContent = message;
    status.className = "form-status is-visible " + (kind === "error" ? "is-error" : "is-info");
  }

  function clearStatus() {
    if (!status) return;
    status.className = "form-status";
    status.textContent = "";
  }

  function buildMailto() {
    if (!form) return "mailto:info@tscbgroup.com";
    var g = function (n) {
      var el = form.elements[n];
      return el && el.value ? String(el.value).trim() : "";
    };
    var l = lang();
    var labels = {
      ko: { subject: "[문의] ", name: "성함: ", company: "회사명: ", email: "이메일: ", phone: "연락처: ", topic: "문의 분야: ", message: "문의 내용" },
      en: { subject: "[Enquiry] ", name: "Name: ", company: "Company: ", email: "Email: ", phone: "Phone: ", topic: "Area of enquiry: ", message: "Message" },
      zh: { subject: "【咨询】", name: "姓名：", company: "公司：", email: "电子邮箱：", phone: "联系电话：", topic: "咨询领域：", message: "咨询内容" }
    }[l] || null;
    if (!labels) labels = { subject: "[문의] ", name: "성함: ", company: "회사명: ", email: "이메일: ", phone: "연락처: ", topic: "문의 분야: ", message: "문의 내용" };
    var subject = labels.subject +
      (g("topic") ? g("topic") + " — " : "") + (g("company") || g("name") || "");
    var bodyLines = [
      labels.name + g("name"),
      labels.company + g("company"),
      labels.email + g("email"),
      labels.phone + g("phone"),
      labels.topic + g("topic"),
      "",
      labels.message,
      g("message")
    ];
    return "mailto:info@tscbgroup.com?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(bodyLines.join("\n"));
  }

  if (mailtoBtn) {
    var refreshMailto = function () { mailtoBtn.setAttribute("href", buildMailto()); };
    refreshMailto();
    if (form) {
      form.addEventListener("input", refreshMailto);
      form.addEventListener("change", refreshMailto);
    }
    mailtoBtn.addEventListener("click", function () { mailtoBtn.setAttribute("href", buildMailto()); });
  }

  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      clearStatus();

      var honey = form.elements["_honey"];
      if (honey && honey.value) return;

      if (typeof form.reportValidity === "function" && !form.reportValidity()) {
        say(window.TSCBi18n ? window.TSCBi18n.t("contact.invalid.text") : "필수 항목을 확인해 주세요.", "error");
        return;
      }

      var data = {};
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name) return;
        if (el.type === "checkbox" && !el.checked) return;
        data[el.name] = el.value;
      });
      var l = form.querySelector('input[name="_language"]');
      if (l) l.value = lang();
      data._language = lang();
      if (data.email) data._replyto = data.email;
      data._subject = lang() === "en"
        ? "[Enquiry] " + (data.topic || "Website") + " — " + (data.company || data.name || "")
        : lang() === "zh"
          ? "【咨询】" + (data.topic || "网站") + " — " + (data.company || data.name || "")
          : "[문의] " + (data.topic || "웹사이트") + " — " + (data.company || data.name || "");

      var sending = window.TSCBi18n ? window.TSCBi18n.t("contact.f.sending") : "전송 중…";
      if (submitBtn) submitBtn.disabled = true;
      if (submitLabel) submitLabel.textContent = sending;

      var finish = function (ok) {
        if (submitBtn) submitBtn.disabled = false;
        if (submitLabel && window.TSCBi18n) submitLabel.textContent = window.TSCBi18n.t("contact.f.submit");
        if (ok) {
          form.style.display = "none";
          if (success) success.classList.add("is-visible");
          clearStatus();
          if (success && success.scrollIntoView) {
            success.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
          }
        } else {
          say(
            (window.TSCBi18n ? window.TSCBi18n.t("contact.error.title") + " — " : "") +
            (window.TSCBi18n ? window.TSCBi18n.t("contact.error.text") : "전송에 실패했습니다."),
            "error"
          );
          if (mailtoBtn) {
            mailtoBtn.setAttribute("href", buildMailto());
            mailtoBtn.classList.add("pulse");
            setTimeout(function () { mailtoBtn.classList.remove("pulse"); }, 2400);
          }
        }
      };

      if (!window.fetch) { finish(false); return; }

      var payload = [];
      for (var key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          payload.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        }
      }

      fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload.join("&")
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (json) {
            var ok = res.ok && String(json.success) !== "false";
            return ok;
          });
        })
        .then(finish)
        .catch(function () {
          /* network or CORS failure — keep the page, show the error and the email route */
          finish(false);
        });
    });

    var again = $("#formAgain");
    if (again) {
      again.addEventListener("click", function () {
        if (success) success.classList.remove("is-visible");
        form.style.display = "";
        form.reset();
        var hiddenLang = form.querySelector('input[name="_language"]');
        if (hiddenLang) hiddenLang.value = lang();
        if (mailtoBtn) mailtoBtn.setAttribute("href", buildMailto());
        var first = form.querySelector("input, select, textarea");
        if (first) first.focus();
        clearStatus();
      });
    }
  }

  /* ---- keyboard ------------------------------------------------------ */
  doc.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape" || ev.key === "Esc") {
      if (modal && modal.classList.contains("is-open")) closeArticle();
      else if (drawer && drawer.classList.contains("is-open")) closeDrawer();
    }
  });

  /* ---- language change hooks ----------------------------------------- */
  doc.addEventListener("tscb:langchange", function () {
    if (currentArticle) renderArticle(currentArticle);
    if (mailtoBtn) mailtoBtn.setAttribute("href", buildMailto());
    if (form) {
      var hiddenLang = form.querySelector('input[name="_language"]');
      if (hiddenLang) hiddenLang.value = lang();
    }
  });

  /* ---- drawer close on desktop resize -------------------------------- */
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1080 && drawer && drawer.classList.contains("is-open")) closeDrawer();
  });

  /* expose the classic endpoint for no-JS fallbacks / debugging */
  if (form && !form.getAttribute("action")) form.setAttribute("action", FALLBACK);
})();
