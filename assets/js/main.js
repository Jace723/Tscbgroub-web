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
  }

  function openArticle(id, opener) {
    var list = window.INSIGHTS || [];
    var article = null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) { article = list[i]; break; }
    }
    if (!article || !modal) return;
    currentArticle = article;
    modalOpener = opener || doc.activeElement;
    renderArticle(article);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    doc.body.classList.add("no-scroll");
    if (modalScroll) modalScroll.scrollTop = 0;
    var closeBtn = $("#modalClose");
    if (closeBtn) closeBtn.focus();
  }

  function closeArticle() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    doc.body.classList.remove("no-scroll");
    currentArticle = null;
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
    var subject = (l === "en" ? "[Enquiry] " : "[문의] ") +
      (g("topic") ? g("topic") + " — " : "") + (g("company") || g("name") || "");
    var bodyLines = [
      (l === "en" ? "Name: " : "성함: ") + g("name"),
      (l === "en" ? "Company: " : "회사명: ") + g("company"),
      (l === "en" ? "Email: " : "이메일: ") + g("email"),
      (l === "en" ? "Phone: " : "연락처: ") + g("phone"),
      (l === "en" ? "Area of enquiry: " : "문의 분야: ") + g("topic"),
      "",
      (l === "en" ? "Message" : "문의 내용"),
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
