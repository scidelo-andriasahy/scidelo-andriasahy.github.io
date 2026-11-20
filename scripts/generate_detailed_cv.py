# -*- coding: utf-8 -*-
"""Auto-generates Comprehensive Multi-Page Engineering CV PDFs (FR & EN) directly from data/content.js.
Runs automatically both locally and inside GitHub Actions (.github/workflows/deploy.yml) on every update!
"""
import datetime
import html
import json
import os
import re
import shutil
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT_JS = ROOT / "data" / "content.js"
PDF_DIR = ROOT / "assets" / "pdfs"
SITE_URL = "https://scidelo-andriasahy.github.io"


def find_browser():
    candidates = [
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
        "google-chrome",
        "google-chrome-stable",
        "chromium",
        "chromium-browser",
    ]
    for c in candidates:
        if os.path.isabs(c) and os.path.exists(c):
            return c
        found = shutil.which(c)
        if found:
            return found
    raise RuntimeError("No Chrome/Chromium/Edge binary found for PDF generation.")


def load_data():
    raw = CONTENT_JS.read_text(encoding="utf-8")
    start = raw.find("{")
    end = raw.rfind("};") + 1
    return json.loads(raw[start:end])


LINK_RE = re.compile(r"<a\s+[^>]*href=['\"]([^'\"]+)['\"][^>]*>(.*?)</a>", re.IGNORECASE | re.DOTALL)


def strip_html(s):
    return html.unescape(re.sub(r"<[^>]+>", "", str(s or ""))).strip()


def esc(s):
    return html.escape(str(s or ""), quote=True)


def render_rich(s):
    """Preserve embedded <a href='...'>text</a> as clean clickable links and strip/escape all other text safely."""
    s = str(s or "")
    out = []
    last = 0
    for m in LINK_RE.finditer(s):
        before = html.unescape(re.sub(r"<[^>]+>", "", s[last:m.start()]))
        out.append(esc(before))
        href = abs_url(m.group(1))
        label = strip_html(m.group(2))
        out.append(f'<a href="{esc(href)}">{esc(label)}</a>')
        last = m.end()
    tail = html.unescape(re.sub(r"<[^>]+>", "", s[last:]))
    out.append(esc(tail))
    return "".join(out)


def abs_url(u):
    if not u:
        return ""
    u = str(u).strip()
    if u.startswith(("http://", "https://", "mailto:", "tel:")):
        return u
    return f"{SITE_URL}/{u.lstrip('/')}"


def resolve_entity_url(label, entity_links):
    if not label or not entity_links:
        return None
    clean = label.strip()
    if clean in entity_links:
        return entity_links[clean]
    low = clean.lower()
    for k, v in entity_links.items():
        if k.lower() == low:
            return v
    return None


def linkify_item(label, entity_links):
    url = resolve_entity_url(label, entity_links)
    if url and url.startswith("http"):
        return f'<a href="{esc(url)}" class="skill-chip">{esc(label)}</a>'
    return f'<span class="skill-chip">{esc(label)}</span>'


def build_html(data, lang):
    d = data[lang]
    entity_links = data.get("entityLinks", {})
    is_fr = (lang == "fr")
    ident = d["identity"]
    contacts = ident.get("contacts", {})
    about = d["about"]

    # Collect all distinct tools/tags from projects & experiences not already listed in skills
    listed_lower = set()
    for cat in d.get("skills", {}).get("categories", []):
        for it in cat.get("items", []):
            listed_lower.add(it.strip().lower())

    extra_tools = []
    seen_extra = set()
    for p in d.get("projects", {}).get("items", []):
        for t in p.get("tags", []):
            k = t.strip().lower()
            if k and k not in listed_lower and k not in seen_extra:
                seen_extra.add(k)
                extra_tools.append(t.strip())
    for e in d.get("experience", {}).get("items", []):
        if e.get("type") == "assoc":
            continue
        for t in e.get("tags", []):
            k = t.strip().lower()
            if k and k not in listed_lower and k not in seen_extra:
                seen_extra.add(k)
                extra_tools.append(t.strip())

    # Portrait data URI (compressed crisp 240x240 JPEG if Pillow available, else raw fallback)
    portrait_html = ""
    portrait_file = ROOT / ident.get("image", "assets/images/portrait_studio_dark.png")
    if portrait_file.exists():
        import base64, io
        try:
            from PIL import Image
            im = Image.open(portrait_file).convert("RGB")
            im.thumbnail((240, 240), Image.Resampling.LANCZOS)
            buf = io.BytesIO()
            im.save(buf, format="JPEG", quality=88, optimize=True)
            b64 = base64.b64encode(buf.getvalue()).decode("ascii")
            ext = "jpeg"
        except Exception:
            b64 = base64.b64encode(portrait_file.read_bytes()).decode("ascii")
            ext = "png" if portrait_file.suffix.lower() == ".png" else "jpeg"
        portrait_html = f'<img src="data:image/{ext};base64,{b64}" alt="{esc(ident["name"])}" class="portrait">'

    # Titles & labels (clean, executive, zero mention of "liens cliquables" or "1 projet = 1 repo")
    doc_subtitle = "Curriculum Vitae Détaillé — Ingénieur Systèmes Embarqués, Robotique & Électronique de Puissance" if is_fr else "Comprehensive Engineering Curriculum Vitae"
    sec_profile = "Profil & Objectif PFE" if is_fr else "Profile & PFE Engineering Objective"
    sec_skills = "Compétences Techniques, Outils & Environnements" if is_fr else "Technical Skills, Tools & Engineering Environments"
    sec_lang_int = "Langues & Centres d'Intérêt" if is_fr else "Languages & Personal Interests"
    sec_exp = "Expériences Professionnelles & Engagements" if is_fr else "Professional Experience & Leadership"
    sec_proj = "Projets Techniques & R&D" if is_fr else "Technical & R&D Projects"
    sec_edu = "Formation Académique" if is_fr else "Academic Background"
    sec_cert = "Certifications, Attestations Officielles & Distinctions" if is_fr else "Certifications, Official Attestations & Honors"
    sec_bib = d.get("ui", {}).get("bibTitle", "Références techniques & Bibliographie de travail" if is_fr else "Technical References & Engineering Bibliography")
    lbl_spec = "Domaines d'expertise" if is_fr else "Core Specialties"
    lbl_other_tools = "Autres outils & technologies maîtrisés" if is_fr else "Additional Tools & Technologies"
    lbl_lang = "Langues" if is_fr else "Languages"
    lbl_int = "Centres d'intérêt" if is_fr else "Interests"
    lbl_avail = "Disponibilité" if is_fr else "Availability"
    lbl_report = "Rapport PDF" if is_fr else "PDF Report"
    lbl_video = "Démo Vidéo" if is_fr else "Video Demo"
    lbl_details = "Fiche projet" if is_fr else "Project page"
    today_str = datetime.date.today().strftime("%d/%m/%Y" if is_fr else "%Y-%m-%d")
    footer_note = (
        f"CV Détaillé généré automatiquement depuis le portfolio en ligne ({SITE_URL}) — Mise à jour : {today_str}"
        if is_fr
        else f"Comprehensive CV automatically generated from the online portfolio ({SITE_URL}) — Updated: {today_str}"
    )

    # Build Specialties chips
    specs_html = "".join(f'<span class="spec-chip">{esc(s)}</span>' for s in ident.get("specialties", []))

    # Build Skills rows
    skills_rows = []
    for cat in d.get("skills", {}).get("categories", []):
        chips = "".join(linkify_item(it, entity_links) for it in cat.get("items", []))
        skills_rows.append(f'<div class="skill-row"><div class="skill-cat">{esc(cat["title"])}</div><div class="skill-list">{chips}</div></div>')
    if extra_tools:
        chips = "".join(linkify_item(it, entity_links) for it in extra_tools)
        skills_rows.append(f'<div class="skill-row"><div class="skill-cat">{esc(lbl_other_tools)}</div><div class="skill-list">{chips}</div></div>')

    # Build Languages & Interests
    langs_html = "".join(
        f'<li><strong>{esc(l["lang"])}</strong> <span class="muted">— {esc(l["level"])}</span></li>'
        for l in about.get("languages", [])
    )
    ints_html = "".join(f'<span class="soft-chip">{esc(i)}</span>' for i in about.get("interests", []))

    # Build Experiences
    exp_blocks = []
    for e in d.get("experience", {}).get("items", []):
        org_url = e.get("organizationUrl", "")
        org_html = f'<a href="{esc(org_url)}">{esc(strip_html(e["organization"]))}</a>' if org_url else render_rich(e["organization"])
        loc = f' · {esc(strip_html(e["location"]))}' if e.get("location") else ""
        bullets = "".join(f'<li>{render_rich(b)}</li>' for b in e.get("bullets", []))
        tags = "".join(f'<span class="mini-tag">{esc(t)}</span>' for t in e.get("tags", []))
        proofs = ""
        if e.get("proofs"):
            plinks = " · ".join(f'<a href="{esc(abs_url(pr["url"]))}">{esc(strip_html(pr["label"]))}</a>' for pr in e["proofs"])
            proofs = f'<div class="inline-links">{plinks}</div>'
        exp_blocks.append(f"""
        <div class="entry">
            <div class="entry-head">
                <div>
                    <span class="entry-title">{render_rich(e["role"])}</span>
                    <span class="entry-org"> — {org_html}{loc}</span>
                </div>
                <span class="entry-date">{esc(e["period"])}</span>
            </div>
            <ul class="bullet-list">{bullets}</ul>
            {f'<div class="mini-tags">{tags}</div>' if tags else ''}
            {proofs}
        </div>""")

    # Build Projects
    proj_blocks = []
    for p in d.get("projects", {}).get("items", []):
        links_arr = []
        gh = (p.get("links") or {}).get("github", "")
        rep = (p.get("links") or {}).get("report", "")
        vid = p.get("video", "")
        if gh:
            links_arr.append(f'<a href="{esc(gh)}">GitHub</a>')
        if rep:
            links_arr.append(f'<a href="{esc(abs_url(rep))}">{esc(lbl_report)}</a>')
        if vid and vid.startswith("http"):
            links_arr.append(f'<a href="{esc(vid)}">{esc(lbl_video)}</a>')
        links_arr.append(f'<a href="{SITE_URL}/?project={p["id"]}">{esc(lbl_details)}</a>')

        tags_html = "".join(f'<span class="mini-tag">{esc(t)}</span>' for t in p.get("tags", []))
        proj_blocks.append(f"""
        <div class="entry proj-entry">
            <div class="entry-head">
                <div class="entry-title">{render_rich(p["title"])}</div>
                <span class="cat-pill">{esc(p["category"])}</span>
            </div>
            <p class="entry-desc">{render_rich(p["description"])}</p>
            <div class="proj-meta">
                <div class="mini-tags">{tags_html}</div>
                <div class="inline-links">{" · ".join(links_arr)}</div>
            </div>
        </div>""")

    # Build Education
    edu_blocks = []
    for ed in d.get("education", {}).get("items", []):
        det = f'<p class="entry-desc">{render_rich(ed.get("details", ""))}</p>' if ed.get("details") else ""
        edu_blocks.append(f"""
        <div class="entry">
            <div class="entry-head">
                <div><span class="entry-title">{render_rich(ed["degree"])}</span> <span class="entry-org">— {render_rich(ed["institution"])}</span></div>
                <span class="entry-date">{esc(ed["period"])}</span>
            </div>
            {det}
        </div>""")

    # Build Certifications
    cert_blocks = []
    for sec in d.get("certificates", {}).get("sections", []):
        items_li = []
        for c in sec.get("items", []):
            c_links = []
            for idx, lnk in enumerate(c.get("links", [])):
                lbl = (c.get("linkLabels") or [])[idx] if idx < len(c.get("linkLabels") or []) else "PDF"
                c_links.append(f'<a href="{esc(abs_url(lnk))}">{esc(strip_html(lbl))}</a>')
            if c.get("verifyUrl"):
                c_links.append(f'<a href="{esc(c["verifyUrl"])}">{"Vérifier" if is_fr else "Verify"}</a>')
            lstr = f' <span class="inline-links">[{" · ".join(c_links)}]</span>' if c_links else ""
            items_li.append(f'<li><strong>{render_rich(c["title"])}</strong> — {render_rich(c["issuer"])} <span class="muted">({esc(c["date"])})</span>{lstr}</li>')
        cert_blocks.append(f'<div class="cert-group"><div class="cert-sub">{esc(strip_html(sec["title"]))}</div><ul class="bullet-list">{"".join(items_li)}</ul></div>')

    # Build Bibliography
    bib_items = "".join(
        f'<li><a href="{esc(b["url"])}"><strong>{esc(b["title"])}</strong></a> — {esc(b["author"])} <span class="mini-tag">{esc(b["tag"])}</span></li>'
        for b in d.get("bibliography", [])
    )

    inst_rich = render_rich(ident.get("institution", ""))
    about_rich = render_rich(about.get("text", ""))
    pfe_rich = render_rich(about.get("pfeHighlight", ""))

    return f"""<!DOCTYPE html>
<html lang="{lang}">
<head>
<meta charset="UTF-8">
<title>{esc(ident["name"])} — {esc(doc_subtitle)}</title>
<style>
  @page {{
    size: A4;
    margin: 13mm 14mm 15mm 14mm;
  }}
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{
    font-family: 'Segoe UI', 'Inter', Arial, Helvetica, sans-serif;
    color: #0f172a;
    font-size: 9.2pt;
    line-height: 1.44;
    background: #ffffff;
  }}
  a {{
    color: #0369a1;
    text-decoration: none;
  }}
  a:hover {{ text-decoration: underline; }}

  /* Header */
  .cv-header {{
    display: flex;
    align-items: center;
    gap: 16px;
    padding-bottom: 12px;
    border-bottom: 2.2px solid #0284c7;
    margin-bottom: 12px;
  }}
  .portrait {{
    width: 72px;
    height: 72px;
    border-radius: 50%;
    object-fit: cover;
    border: 2.5px solid #0284c7;
    flex-shrink: 0;
  }}
  .head-info {{ flex: 1; }}
  .cv-name {{
    font-size: 18pt;
    font-weight: 800;
    color: #0b1120;
    letter-spacing: -0.02em;
    line-height: 1.15;
  }}
  .cv-role {{
    font-size: 10.6pt;
    font-weight: 700;
    color: #0284c7;
    margin-top: 2px;
  }}
  .cv-sub {{
    font-size: 8.6pt;
    color: #475569;
    margin-top: 2px;
  }}
  .avail-badge {{
    display: inline-block;
    margin-top: 5px;
    padding: 2px 9px;
    border-radius: 99px;
    background: #ecfdf5;
    border: 1px solid #6ee7b7;
    color: #047857;
    font-size: 8pt;
    font-weight: 700;
  }}
  .contact-bar {{
    margin-top: 6px;
    font-size: 8.4pt;
    color: #334155;
    display: flex;
    flex-wrap: wrap;
    gap: 6px 12px;
  }}
  .contact-bar a {{ font-weight: 600; }}

  /* Section Titles */
  h2 {{
    font-size: 11pt;
    font-weight: 800;
    color: #0284c7;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    border-bottom: 1.2px solid #cbd5e1;
    padding-bottom: 3px;
    margin: 13px 0 7px;
    page-break-after: avoid;
    break-after: avoid;
  }}

  /* Profile & Callout */
  .profile-text {{ text-align: justify; color: #1e293b; }}
  .pfe-box {{
    margin-top: 6px;
    padding: 6px 10px;
    background: #f0f9ff;
    border-left: 3px solid #0284c7;
    border-radius: 0 6px 6px 0;
    font-size: 8.8pt;
    color: #0f172a;
  }}
  .specs-row {{
    margin-top: 7px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    align-items: center;
  }}
  .specs-lbl {{ font-weight: 700; font-size: 8.5pt; color: #334155; margin-right: 3px; }}
  .spec-chip {{
    background: #e0f2fe;
    color: #0369a1;
    padding: 2px 8px;
    border-radius: 99px;
    font-size: 8pt;
    font-weight: 700;
  }}

  /* Skills */
  .skill-row {{
    display: flex;
    gap: 10px;
    margin-bottom: 5px;
    page-break-inside: avoid;
    break-inside: avoid;
  }}
  .skill-cat {{
    width: 175px;
    flex-shrink: 0;
    font-weight: 700;
    font-size: 8.5pt;
    color: #0f172a;
    padding-top: 2px;
  }}
  .skill-list {{
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }}
  .skill-chip {{
    display: inline-block;
    padding: 1.5px 7px;
    border-radius: 5px;
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
    font-size: 8pt;
    color: #0f172a;
    font-weight: 500;
  }}
  a.skill-chip {{ color: #0369a1; border-color: #bae6fd; background: #f0f9ff; }}

  /* Languages & Interests Grid */
  .two-col {{
    display: grid;
    grid-template-columns: 1fr 1.25fr;
    gap: 14px;
    page-break-inside: avoid;
    break-inside: avoid;
  }}
  .sub-card {{
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 8px 11px;
  }}
  .sub-card h3 {{
    font-size: 8.8pt;
    font-weight: 700;
    color: #0369a1;
    margin-bottom: 5px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }}
  .lang-list {{ list-style: none; font-size: 8.6pt; }}
  .lang-list li {{ margin-bottom: 2px; }}
  .soft-chip {{
    display: inline-block;
    margin: 2px 4px 2px 0;
    padding: 2px 7px;
    border-radius: 99px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    font-size: 8pt;
    color: #334155;
    font-weight: 500;
  }}

  /* Entries */
  .entry {{
    margin-bottom: 7.5px;
    page-break-inside: avoid;
    break-inside: avoid;
  }}
  .proj-entry {{
    padding-bottom: 6px;
    border-bottom: 1px dashed #e2e8f0;
  }}
  .entry-head {{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 10px;
  }}
  .entry-title {{ font-weight: 700; color: #0b1120; font-size: 9.3pt; }}
  .entry-org {{ color: #334155; font-weight: 600; font-size: 8.8pt; }}
  .entry-date {{ font-size: 8.2pt; font-weight: 700; color: #0284c7; white-space: nowrap; }}
  .cat-pill {{
    font-size: 7.5pt;
    font-weight: 700;
    color: #0369a1;
    background: #e0f2fe;
    padding: 1.5px 7px;
    border-radius: 99px;
    white-space: nowrap;
  }}
  .entry-desc {{ font-size: 8.6pt; color: #334155; margin-top: 2px; }}
  .bullet-list {{
    margin: 3px 0 3px 15px;
    font-size: 8.55pt;
    color: #1e293b;
  }}
  .bullet-list li {{ margin-bottom: 1.8px; }}
  .proj-meta {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px 10px;
    margin-top: 3px;
  }}
  .mini-tags {{ display: flex; flex-wrap: wrap; gap: 3px; }}
  .mini-tag {{
    font-size: 7.4pt;
    background: #f1f5f9;
    color: #475569;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    padding: 0.5px 5px;
    font-weight: 600;
  }}
  .inline-links {{ font-size: 8pt; font-weight: 600; color: #0369a1; }}
  .muted {{ color: #64748b; }}

  .cert-group {{ margin-bottom: 6px; page-break-inside: avoid; break-inside: avoid; }}
  .cert-sub {{ font-weight: 700; font-size: 8.7pt; color: #0f172a; margin-bottom: 2px; }}

  .bib-list {{ margin: 3px 0 0 15px; font-size: 8.3pt; color: #334155; }}
  .bib-list li {{ margin-bottom: 2.5px; }}

  .cv-footer {{
    margin-top: 14px;
    padding-top: 7px;
    border-top: 1px solid #cbd5e1;
    text-align: center;
    font-size: 7.6pt;
    color: #64748b;
  }}
</style>
</head>
<body>
  <header class="cv-header">
    {portrait_html}
    <div class="head-info">
      <div class="cv-name">{esc(ident["name"])}</div>
      <div class="cv-role">{esc(ident["title"])}</div>
      <div class="cv-sub">{esc(ident["location"])} · {inst_rich}</div>
      <div class="avail-badge">{esc(ident.get("availabilityBadge", ""))}</div>
      <div class="contact-bar">
        <a href="mailto:{esc(contacts.get('email', ''))}">{esc(contacts.get('email', ''))}</a>
        <span>{esc(contacts.get('phone', ''))}</span>
        <a href="{SITE_URL}/">Portfolio Web</a>
        <a href="{esc(contacts.get('linkedin', ''))}">LinkedIn</a>
        <a href="{esc(contacts.get('github', ''))}">GitHub</a>
        <a href="{esc(contacts.get('youtube', ''))}">YouTube</a>
      </div>
    </div>
  </header>

  <h2>{esc(sec_profile)}</h2>
  <p class="profile-text">{about_rich}</p>
  <div class="pfe-box"><strong>{esc(lbl_avail)} :</strong> {pfe_rich}</div>
  <div class="specs-row"><span class="specs-lbl">{esc(lbl_spec)} :</span> {specs_html}</div>

  <h2>{esc(sec_skills)}</h2>
  {"".join(skills_rows)}

  <h2>{esc(sec_lang_int)}</h2>
  <div class="two-col">
    <div class="sub-card">
      <h3>{esc(lbl_lang)}</h3>
      <ul class="lang-list">{langs_html}</ul>
    </div>
    <div class="sub-card">
      <h3>{esc(lbl_int)}</h3>
      <div>{ints_html}</div>
    </div>
  </div>

  <h2>{esc(sec_exp)}</h2>
  {"".join(exp_blocks)}

  <h2>{esc(sec_proj)}</h2>
  {"".join(proj_blocks)}

  <h2>{esc(sec_edu)}</h2>
  {"".join(edu_blocks)}

  <h2>{esc(sec_cert)}</h2>
  {"".join(cert_blocks)}

  <h2>{esc(sec_bib)}</h2>
  <ul class="bib-list">{bib_items}</ul>

  <div class="cv-footer">{esc(footer_note)}</div>
</body>
</html>
"""


def render_pdf(browser, html_str, out_pdf):
    PDF_DIR.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile("w", suffix=".html", encoding="utf-8", delete=False) as tf:
        tf.write(html_str)
        tmp_html = tf.name
    try:
        file_url = Path(tmp_html).resolve().as_uri()
        cmd = [
            browser,
            "--headless=new",
            "--disable-gpu",
            "--no-sandbox",
            "--disable-dev-shm-usage",
            "--no-pdf-header-footer",
            f"--print-to-pdf={str(out_pdf)}",
            file_url,
        ]
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=45)
        if res.returncode != 0 or not out_pdf.exists():
            # Fallback for older Chromium without =new
            cmd[1] = "--headless"
            subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True, timeout=45)
    finally:
        if os.path.exists(tmp_html):
            os.remove(tmp_html)


def main():
    browser = find_browser()
    data = load_data()
    for lang, suffix in (("fr", "FR"), ("en", "EN")):
        html_str = build_html(data, lang)
        out_main = PDF_DIR / f"CV_Detaille_ANDRIASAHY_{suffix}.pdf"
        render_pdf(browser, html_str, out_main)
        # Keep backward-compatible alias updated too so any previously shared link stays fresh!
        out_alias = PDF_DIR / f"Dossier_Portfolio_Complet_ANDRIASAHY_{suffix}.pdf"
        shutil.copy2(out_main, out_alias)
        print(f"[CV PDF OK] {out_main.name} ({round(out_main.stat().st_size / 1024, 1)} KB)")


if __name__ == "__main__":
    main()
