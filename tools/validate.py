#!/usr/bin/env python3
"""Static QA for the tscbgroup-web static site.

Checks
  1. HTML tag balance and duplicate ids
  2. Local href / src targets exist (broken relative paths)
  3. data-i18n / data-i18n-ph / data-i18n-aria keys exist in assets/js/i18n.js
  4. Braces balance in CSS and JS (string/comment aware)
  5. Assets referenced by CSS url() exist
"""
import os
import re
import sys
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = ["index.html", "about.html", "what-we-do.html", "insight-b.html", "contact.html"]
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link",
        "meta", "param", "source", "track", "wbr"}
errors, warnings = [], []


class Checker(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.stack = []
        self.ids = {}
        self.i18n, self.i18n_ph, self.i18n_aria = [], [], []
        self.i18n_alt = []
        self.refs = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        for key in ("id",):
            if key in a and a[key]:
                if a[key] in self.ids:
                    errors.append(f"{self.path}: duplicate id #{a[key]}")
                self.ids[a[key]] = True
        if "data-i18n" in a:
            self.i18n.append(a["data-i18n"])
        if "data-i18n-ph" in a:
            self.i18n_ph.append(a["data-i18n-ph"])
        if "data-i18n-aria" in a:
            self.i18n_aria.append(a["data-i18n-aria"])
        if "data-i18n-alt" in a:
            self.i18n_alt.append(a["data-i18n-alt"])
        for key in ("href", "src", "action", "poster"):
            if key in a and a[key]:
                self.refs.append((key, a[key]))
        if tag not in VOID:
            self.stack.append((tag, self.getpos()[0]))

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID and self.stack and self.stack[-1][0] == tag:
            self.stack.pop()

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if not self.stack:
            errors.append(f"{self.path}: stray </{tag}> at line {self.getpos()[0]}")
            return
        if self.stack[-1][0] == tag:
            self.stack.pop()
            return
        # find a matching open tag deeper in the stack
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                unclosed = [t for t, _ in self.stack[i + 1:]]
                errors.append(
                    f"{self.path}: </{tag}> at line {self.getpos()[0]} closes an outer tag; "
                    f"unclosed inside: {unclosed}"
                )
                del self.stack[i:]
                return
        errors.append(f"{self.path}: </{tag}> at line {self.getpos()[0]} has no opening tag")


def check_html():
    parsed = {}
    for page in PAGES:
        path = os.path.join(ROOT, page)
        if not os.path.exists(path):
            errors.append(f"missing page: {page}")
            continue
        html = open(path, encoding="utf-8").read()
        c = Checker(page)
        c.feed(html)
        c.close()
        if c.stack:
            errors.append(f"{page}: unclosed tags {c.stack}")
        parsed[page] = c
        for key, ref in c.refs:
            if ref.startswith(("http://", "https://", "mailto:", "tel:", "#", "data:", "javascript:")):
                continue
            target = os.path.normpath(os.path.join(ROOT, ref.split("#")[0].split("?")[0]))
            if not os.path.exists(target):
                errors.append(f"{page}: broken {key} -> {ref}")
    return parsed


def check_i18n(parsed):
    js = open(os.path.join(ROOT, "assets", "js", "i18n.js"), encoding="utf-8").read()
    body = js[js.index("var DICT = {"):]
    keys = set(re.findall(r'^\s{4}"([^"]+)":\s*\{', body, re.M))
    used = set()
    for page, c in parsed.items():
        for key in c.i18n + c.i18n_ph + c.i18n_aria + c.i18n_alt:
            used.add(key)
            if key not in keys:
                errors.append(f"{page}: data-i18n key '{key}' not defined in i18n.js")
    # keys referenced from inline scripts / data files
    ins = open(os.path.join(ROOT, "assets", "js", "insights.js"), encoding="utf-8").read()
    for m in re.findall(r'data-i18n="([^"]+)"', ins) + re.findall(r'\bt\("([^"]+)"\)', ins):
        used.add(m)
    for m in re.findall(r'\bt\("([^"]+)"\)', open(os.path.join(ROOT, "assets", "js", "main.js"), encoding="utf-8").read()):
        used.add(m)
        if m not in keys:
            errors.append(f"main.js: i18n key '{m}' not defined")
    for key in re.findall(r'"([a-zA-Z0-9._]+)"', open(os.path.join(ROOT, "assets", "js", "main.js"), encoding="utf-8").read()):
        pass
    unused = sorted(k for k in keys - used if not k.startswith(("book.", "art", "ind.")))
    if unused:
        warnings.append("i18n keys defined but unused: " + ", ".join(unused))
    return keys


def balance(text, pairs, name, path):
    """Bracket balance that ignores string literals and comments."""
    stack = []
    i, n = 0, len(text)
    quote = None
    while i < n:
        ch = text[i]
        nxt = text[i + 1] if i + 1 < n else ""
        if quote:
            if ch == "\\":
                i += 2
                continue
            if ch == quote:
                quote = None
            i += 1
            continue
        if ch in "\"'`":
            quote = ch
            i += 1
            continue
        if name == "js" and ch == "/" and nxt == "/":
            i = text.find("\n", i)
            if i == -1:
                break
            continue
        if name == "js" and ch == "/" and nxt == "*":
            j = text.find("*/", i + 2)
            i = (j + 2) if j != -1 else n
            continue
        if name == "css" and ch == "/" and nxt == "*":
            j = text.find("*/", i + 2)
            i = (j + 2) if j != -1 else n
            continue
        if ch in pairs:
            stack.append((ch, i))
        elif ch in pairs.values():
            if not stack:
                errors.append(f"{path}: unbalanced '{ch}'")
                return
            opener, pos = stack.pop()
            if pairs[opener] != ch:
                errors.append(f"{path}: '{opener}' at {pos} closed by '{ch}'")
                return
        i += 1
    if stack:
        line = text.count("\n", 0, stack[-1][1]) + 1
        errors.append(f"{path}: unclosed '{stack[-1][0]}' at line {line}")


def check_css_assets():
    css_path = os.path.join(ROOT, "assets", "css", "style.css")
    css = open(css_path, encoding="utf-8").read()
    balance(css, {"{": "}"}, "css", "assets/css/style.css")
    for url in re.findall(r"url\(([^)]+)\)", css):
        u = url.strip("'\" ")
        if u.startswith(("data:", "http")):
            continue
        target = os.path.normpath(os.path.join(ROOT, "assets", "css", u))
        if not os.path.exists(target):
            errors.append(f"style.css: missing url({u})")


def check_js():
    for f in ("i18n.js", "main.js", "insights.js"):
        path = os.path.join(ROOT, "assets", "js", f)
        src = open(path, encoding="utf-8").read()
        balance(src, {"{": "}", "(": ")", "[": "]"}, "js", f"assets/js/{f}")


def main():
    parsed = check_html()
    check_i18n(parsed)
    check_css_assets()
    check_js()
    print(f"pages: {', '.join(PAGES)}")
    print(f"errors: {len(errors)}  warnings: {len(warnings)}")
    for w in warnings:
        print("  WARN", w)
    for e in errors:
        print("  ERR ", e)
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
