const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

const ICON = (name, color) => path.join(__dirname, "assets/icons", `${name}_${color}.png`);
const LOGO = path.join(__dirname, "assets/logo.png");

// ---------- PALETTE ----------
const C = {
  navy: "15102B",
  navy2: "1F1839",
  navy3: "2A2150",
  purple: "8B5CF6",
  purpleDeep: "6D28D9",
  lavender: "C4B5FD",
  lavenderPale: "F1EDFB",
  gold: "F0B429",
  green: "34D399",
  red: "F1707D",
  white: "FFFFFF",
  bgLight: "FAF9FD",
  cardLight: "FFFFFF",
  textDark: "1E1830",
  textMuted: "6B6478",
  textOnNavy: "EDE9F7",
  textOnNavyMuted: "AFA6C9",
  line: "E7E2F5",
};
const FONT = "Calibri";
const FONT_HEAD = "Cambria";

let pres = new pptxgen();
pres.defineLayout({ name: "WIDE", width: 13.33, height: 7.5 });
pres.layout = "WIDE";
const PGW = 13.33, PGH = 7.5;
pres.theme = { headFontFace: FONT_HEAD, bodyFontFace: FONT };

// ---------- HELPERS ----------
function bg(slide, color) { slide.background = { color }; }
function footer(slide, num, dark) {
  slide.addText("VOUCH  •  PRINCIPLES OF MARKETING", {
    x: 0.5, y: PGH - 0.4, w: 4.5, h: 0.28, fontFace: FONT, fontSize: 8.5,
    color: dark ? C.textOnNavyMuted : C.textMuted, charSpacing: 1.4,
  });
  slide.addText(String(num).padStart(2, "0"), {
    x: PGW - 1.1, y: PGH - 0.4, w: 0.6, h: 0.28, fontFace: FONT, fontSize: 8.5,
    color: dark ? C.textOnNavyMuted : C.textMuted, align: "right",
  });
}
function eyebrow(slide, text, x, y, opts = {}) {
  slide.addText(text.toUpperCase(), {
    x, y, w: opts.w || 7, h: 0.32, fontFace: FONT, fontSize: 13, bold: true,
    color: opts.color || C.purple, charSpacing: 2.4,
  });
}
function slideTitle(slide, text, x, y, opts = {}) {
  slide.addText(text, {
    x, y, w: opts.w || 8.6, h: opts.h || 0.85, fontFace: FONT_HEAD, fontSize: opts.size || 31,
    bold: true, color: opts.color || C.textDark, valign: "top",
  });
}
function iconChip(slide, name, color, x, y, d, circleColor, iconScale = 0.54) {
  slide.addShape("ellipse", { x, y, w: d, h: d, fill: { color: circleColor }, line: { type: "none" } });
  const isz = d * iconScale;
  slide.addImage({ path: ICON(name, color), x: x + (d - isz) / 2, y: y + (d - isz) / 2, w: isz, h: isz });
}
function card(slide, x, y, w, h, opts = {}) {
  slide.addShape("roundRect", {
    x, y, w, h, rectRadius: opts.radius !== undefined ? opts.radius : 0.09,
    fill: { color: opts.fill || C.cardLight },
    line: opts.line === false ? { type: "none" } : { color: opts.lineColor || C.line, width: 1 },
    shadow: opts.shadow === false ? undefined : {
      type: "outer", color: "3A2E5C", opacity: 0.16, blur: 9, offset: 3, angle: 90,
    },
  });
}

// ================= SLIDE 1 — TITLE =================
{
  const s = pres.addSlide();
  bg(s, C.navy);

  s.addShape("ellipse", { x: 8.6, y: -2.2, w: 7, h: 7, fill: { color: C.purpleDeep, transparency: 78 }, line: { type: "none" } });
  s.addShape("ellipse", { x: -2.5, y: 4.6, w: 6, h: 6, fill: { color: C.purple, transparency: 85 }, line: { type: "none" } });

  s.addImage({ path: LOGO, x: PGW / 2 - 1.15, y: 0.95, w: 2.3, h: 2.3 });

  s.addText("Principles of Marketing — Project Presentation", {
    x: 0, y: 3.35, w: PGW, h: 0.4, align: "center", fontFace: FONT, fontSize: 13.5,
    color: C.lavender, charSpacing: 2.6, bold: true,
  });

  s.addText("VOUCH", {
    x: 0, y: 3.72, w: PGW, h: 1.05, align: "center", fontFace: FONT_HEAD, fontSize: 64,
    bold: true, color: C.white, charSpacing: 3,
  });

  s.addText("Smart Lost & Found Ecosystem", {
    x: 0, y: 4.7, w: PGW, h: 0.45, align: "center", fontFace: FONT, fontSize: 18,
    color: C.textOnNavy,
  });

  s.addText('"Lost, But Never Gone."', {
    x: 0, y: 5.15, w: PGW, h: 0.4, align: "center", fontFace: FONT_HEAD, fontSize: 16,
    italic: true, color: C.gold,
  });

  const names = [
    ["Umair Ul Hassan", "221370060"],
    ["M Waqas", "221370068"],
    ["Zunair", "221400101"],
    ["Huma Waris", "251350074"],
  ];
  const cw = 2.75, gap = 0.22, startX = (PGW - (cw * 4 + gap * 3)) / 2, y = 6.05;
  names.forEach((n, i) => {
    const x = startX + i * (cw + gap);
    s.addShape("roundRect", { x, y, w: cw, h: 0.85, rectRadius: 0.08, fill: { color: C.navy2 }, line: { color: "3B3164", width: 1 } });
    s.addText(n[0], { x: x + 0.12, y: y + 0.09, w: cw - 0.24, h: 0.35, fontFace: FONT, fontSize: 13.5, bold: true, color: C.white });
    s.addText("Roll No. " + n[1], { x: x + 0.12, y: y + 0.44, w: cw - 0.24, h: 0.3, fontFace: FONT, fontSize: 11, color: C.lavender });
  });
}

// ================= SLIDE 2 — AGENDA =================
{
  const s = pres.addSlide();
  bg(s, C.navy);
  s.addShape("ellipse", { x: 10.2, y: -3, w: 8, h: 8, fill: { color: C.purpleDeep, transparency: 80 }, line: { type: "none" } });

  eyebrow(s, "What we'll cover", 0.7, 0.55, { color: C.lavender });
  slideTitle(s, "Presentation Agenda", 0.7, 0.88, { size: 34, color: C.white, w: 9 });

  const items = [
    ["search", "Idea & Problem", "Vouch overview, problem statement & survey insights"],
    ["bulb", "Solution & Validation", "The Vouch ecosystem flow & research methodology"],
    ["users", "Market & Products", "Global opportunity, target segments & 4-tier product line"],
    ["compass", "STP & Branding", "Segmentation, positioning map & brand visual identity"],
    ["dollar", "Marketing Mix (4Ps)", "Pricing strategy, promotion plan & distribution channels"],
    ["flag", "Strategic Outlook", "Competitive view, operational risks & growth roadmap"],
  ];

  const cols = 3, rows = 2, mx = 0.7, my = 2.1, gx = 0.28, gy = 0.28;
  const cw = (PGW - mx * 2 - gx * (cols - 1)) / cols;
  const ch = 2.05;
  items.forEach((it, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const x = mx + col * (cw + gx), y = my + row * (ch + gy);
    s.addShape("roundRect", { x, y, w: cw, h: ch, rectRadius: 0.1, fill: { color: C.navy2 }, line: { color: "3B3164", width: 1 } });
    iconChip(s, it[0], "lavender", x + 0.28, y + 0.28, 0.62, C.navy3);
    s.addText(String(i + 1).padStart(2, "0"), { x: x + cw - 0.75, y: y + 0.22, w: 0.55, h: 0.4, align: "right", fontFace: FONT_HEAD, fontSize: 18, color: "48407A", bold: true });
    s.addText(it[1], { x: x + 0.28, y: y + 1.02, w: cw - 0.55, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: C.white });
    s.addText(it[2], { x: x + 0.28, y: y + 1.4, w: cw - 0.55, h: 0.55, fontFace: FONT, fontSize: 12, color: C.textOnNavyMuted, lineSpacingMultiple: 1.15 });
  });

  footer(s, 2, true);
}

// ================= SLIDE 3 — EXECUTIVE SUMMARY =================
{
  const s = pres.addSlide();
  bg(s, C.bgLight);
  eyebrow(s, "Executive Summary", 0.7, 0.5);
  slideTitle(s, "What is Vouch?", 0.7, 0.85, { w: 7.5 });

  s.addText([
    { text: "Vouch is a ", options: {} },
    { text: "privacy-first Smart Lost & Found ecosystem", options: { bold: true, color: C.purpleDeep } },
    { text: " built around QR and GPS-enabled keychains. When someone loses a belonging, a finder simply scans the QR code — no app required — and the owner is notified instantly with time, location, and a secure message option, without ever revealing personal information to the finder.", options: {} },
  ], { x: 0.7, y: 1.75, w: 6.9, h: 1.7, fontFace: FONT, fontSize: 15, color: C.textDark, lineSpacingMultiple: 1.28 });

  s.addText([
    { text: "Vouch sells ", options: {} },
    { text: "four products", options: { bold: true, color: C.purpleDeep } },
    { text: " across price points — from an adhesive QR sticker to a premium GPS keychain — backed by a freemium app and website, serving students, professionals, families and travellers.", options: {} },
  ], { x: 0.7, y: 3.4, w: 6.9, h: 1.3, fontFace: FONT, fontSize: 15, color: C.textDark, lineSpacingMultiple: 1.28 });

  card(s, 0.7, 4.85, 6.9, 1.55, { fill: C.navy });
  s.addText('"Lost, But Never Gone."', { x: 1.0, y: 5.05, w: 6.3, h: 0.55, fontFace: FONT_HEAD, fontSize: 23, italic: true, bold: true, color: C.gold });
  s.addText("The core brand promise driving every product decision, message and interaction.", { x: 1.0, y: 5.6, w: 6.3, h: 0.6, fontFace: FONT, fontSize: 13, color: C.textOnNavy });

  const stats = [
    ["4", "Product tiers", "tag"],
    ["PKR 199–3,499", "Price range", "dollar"],
    ["Freemium", "Platform model", "phone"],
  ];
  let sy = 1.75;
  stats.forEach((st) => {
    card(s, 8.05, sy, 4.6, 1.35, {});
    iconChip(s, st[2], "purple", 8.3, sy + 0.25, 0.75, C.lavenderPale);
    s.addText(st[0], { x: 9.25, y: sy + 0.16, w: 3.2, h: 0.5, fontFace: FONT_HEAD, fontSize: 22, bold: true, color: C.textDark });
    s.addText(st[1], { x: 9.25, y: sy + 0.68, w: 3.2, h: 0.4, fontFace: FONT, fontSize: 13, color: C.textMuted });
    sy += 1.55;
  });

  footer(s, 3, false);
}

// ================= SLIDE 4 — PROBLEM IDENTIFICATION =================
{
  const s = pres.addSlide();
  bg(s, C.bgLight);
  eyebrow(s, "Problem Identification", 0.7, 0.5);
  slideTitle(s, "The Everyday Problem We're Solving", 0.7, 0.85, { w: 7.2 });

  s.addText("Losing keys, wallets, bags, or other everyday items is one of the most common and frustrating experiences people face — ranging from a minor inconvenience to a serious loss of IDs, passports, or medical items.", {
    x: 0.7, y: 1.72, w: 6.9, h: 1.05, fontFace: FONT, fontSize: 14.5, color: C.textDark, lineSpacingMultiple: 1.28,
  });

  const pains = [
    ["alert", "Existing trackers (AirTag, Tile) require a smartphone, cost more, and raise privacy concerns for the finder."],
    ["eye", "Writing a phone number on a keychain exposes personal data to any stranger who finds it."],
    ["globe", "No affordable, privacy-focused, locally accessible solution exists in markets like Pakistan."],
  ];
  let py = 2.95;
  pains.forEach((p) => {
    iconChip(s, p[0], "purple", 0.7, py, 0.5, C.lavenderPale, 0.55);
    s.addText(p[1], { x: 1.38, y: py - 0.03, w: 6.25, h: 0.55, fontFace: FONT, fontSize: 13, color: C.textDark, lineSpacingMultiple: 1.15, valign: "middle" });
    py += 0.72;
  });

  card(s, 8.0, 1.72, 4.65, 5.05, { fill: C.navy });
  s.addText("PRIMARY RESEARCH SNAPSHOT", { x: 8.35, y: 1.95, w: 4, h: 0.32, fontFace: FONT, fontSize: 12, bold: true, color: C.lavender, charSpacing: 1.6 });
  s.addText("Informal survey of ~40 students & hostel residents", { x: 8.35, y: 2.28, w: 4, h: 0.35, fontFace: FONT, fontSize: 11, italic: true, color: C.textOnNavyMuted });

  const surveyRows = [
    ["Lose keys/wallet at least monthly", "78%"],
    ["Have misplaced items inside their own home/hostel", "85%"],
    ["Currently use no protection method at all", "64%"],
    ["Would try an affordable QR tag if available", "71%"],
  ];
  let ry = 2.85;
  surveyRows.forEach((r) => {
    s.addText(r[1], { x: 8.35, y: ry, w: 1.15, h: 0.55, fontFace: FONT_HEAD, fontSize: 26, bold: true, color: C.gold, valign: "middle" });
    s.addText(r[0], { x: 9.6, y: ry, w: 2.9, h: 0.55, fontFace: FONT, fontSize: 12, color: C.white, valign: "middle", lineSpacingMultiple: 1.1 });
    ry += 0.78;
  });
  s.addShape("line", { x: 8.35, y: ry + 0.02, w: 3.95, h: 0, line: { color: "3B3164", width: 1 } });
  s.addText("Directional insight from our own research process — not a published statistic.", { x: 8.35, y: ry + 0.15, w: 4, h: 0.5, fontFace: FONT, fontSize: 9.5, italic: true, color: C.textOnNavyMuted, lineSpacingMultiple: 1.15 });

  footer(s, 4, false);
}

// ================= SLIDE 5 — PROPOSED SOLUTION =================
{
  const s = pres.addSlide();
  bg(s, C.bgLight);
  eyebrow(s, "Proposed Solution", 0.7, 0.5);
  slideTitle(s, "The Vouch Ecosystem", 0.7, 0.85, { w: 8 });
  s.addText("Not just a keychain — a complete privacy-first ecosystem. All products connect to one platform, share the same secure contact system, and deliver the same instant notification experience.", {
    x: 0.7, y: 1.65, w: 11.9, h: 0.6, fontFace: FONT, fontSize: 14, color: C.textMuted, lineSpacingMultiple: 1.25,
  });

  const flow = [
    ["tag", "Attach", "Stick a QR sticker or clip a keychain onto anything you value — keys, wallet, bag, laptop."],
    ["qrcode", "Scan", "A finder scans the QR with any phone camera. No app needed. They land on a private contact page."],
    ["bell", "Reconnect", "Owner gets an instant notification with time, location & a secure message — identity fully protected."],
  ];
  const fx = 0.7, fy = 2.55, fw = 3.55, gap = 0.95, fh = 2.0;
  flow.forEach((f, i) => {
    const x = fx + i * (fw + gap);
    card(s, x, fy, fw, fh, {});
    iconChip(s, f[0], "white", x + 0.25, fy + 0.25, 0.8, C.purple);
    s.addText(f[1], { x: x + 0.25, y: fy + 1.05, w: fw - 0.5, h: 0.35, fontFace: FONT, fontSize: 16, bold: true, color: C.textDark });
    s.addText(f[2], { x: x + 0.25, y: fy + 1.38, w: fw - 0.5, h: 0.55, fontFace: FONT, fontSize: 11.5, color: C.textMuted, lineSpacingMultiple: 1.12 });
    if (i < flow.length - 1) {
      iconChip(s, "arrow", "purple", x + fw + 0.22, fy + fh / 2 - 0.22, 0.44, C.lavenderPale, 0.55);
    }
  });

  card(s, 0.7, 4.75, 11.93, 1.65, { fill: C.navy });
  iconChip(s, "lock", "white", 1.0, 5.08, 0.9, C.purpleDeep);
  s.addText("Privacy-First Design — Vouch's Strongest Differentiator", { x: 2.15, y: 4.98, w: 9.9, h: 0.4, fontFace: FONT_HEAD, fontSize: 17, bold: true, color: C.white });
  s.addText("When a finder scans a Vouch QR, they see a secure contact page — never a real name, phone number, or address. The owner controls exactly what's shared: first name only, masked-number calling, or emergency contact info for critical items.", {
    x: 2.15, y: 5.4, w: 9.9, h: 0.85, fontFace: FONT, fontSize: 13, color: C.textOnNavy, lineSpacingMultiple: 1.25,
  });

  footer(s, 5, false);
}

// ================= SLIDE 6 — RESEARCH METHODOLOGY =================
{
  const s = pres.addSlide();
  bg(s, C.bgLight);
  eyebrow(s, "Research Methodology", 0.7, 0.5);
  slideTitle(s, "How We Conducted Our Research", 0.7, 0.85, { w: 10 });

  s.addText("Our research began with lived, everyday experience rather than a desk study — then we validated it with peers before designing the product.", {
    x: 0.7, y: 1.62, w: 11.9, h: 0.5, fontFace: FONT, fontSize: 14.5, color: C.textMuted, italic: true,
  });

  const steps = [
    ["home", "Personal Observation", "In our own hostel rooms and homes, we repeatedly struggled to find car keys, bike keys, and house keys — misplaced within the room or dropped just outside. This first-hand frustration was the spark for Vouch."],
    ["users", "Peer Interviews", "We discussed the problem informally with friends and classmates. The pattern repeated: nearly everyone had a story of losing keys, wallets, or ID cards, often more than once."],
    ["clipboard", "Informal Survey", "We gathered quick feedback from ~40 students and hostel residents on frequency of loss, current coping habits, and willingness to pay for a solution — used directionally, not as formal statistics."],
    ["search", "Competitor Scan", "We reviewed existing options — Apple AirTag, Tile, and handwritten phone-number tags — to understand pricing, privacy gaps, and accessibility issues in the local market."],
  ];
  const mx = 0.7, my = 2.3, gap = 0.28, cw = (PGW - mx * 2 - gap * 3) / 4, ch = 4.3;
  steps.forEach((st, i) => {
    const x = mx + i * (cw + gap);
    card(s, x, my, cw, ch, {});
    iconChip(s, st[0], "white", x + 0.24, my + 0.28, 0.62, C.purple);
    s.addText(String(i + 1), { x: x + cw - 0.55, y: my + 0.24, w: 0.4, h: 0.4, align: "right", fontFace: FONT_HEAD, fontSize: 16, bold: true, color: C.lavender });
    s.addText(st[1], { x: x + 0.24, y: my + 1.05, w: cw - 0.48, h: 0.65, fontFace: FONT, fontSize: 14, bold: true, color: C.textDark, lineSpacingMultiple: 1.05 });
    s.addText(st[2], { x: x + 0.24, y: my + 1.65, w: cw - 0.48, h: ch - 1.85, fontFace: FONT, fontSize: 12, color: C.textMuted, lineSpacingMultiple: 1.22 });
  });

  footer(s, 6, false);
}

// ================= SLIDE 7 — MARKET OPPORTUNITY =================
{
  const s = pres.addSlide();
  bg(s, C.bgLight);
  eyebrow(s, "Market Opportunity", 0.7, 0.5);
  slideTitle(s, "A Growing Market, an Underserved Segment", 0.7, 0.85, { w: 10 });

  s.addText("Industry market-research reports place the global smart tracker category in the hundreds of millions to low billions of dollars today, with most forecasts pointing to sustained double-digit annual growth (CAGR) through the early 2030s — but coverage of affordable, privacy-first solutions for developing markets remains thin.", {
    x: 0.7, y: 1.68, w: 11.9, h: 0.85, fontFace: FONT, fontSize: 14, color: C.textMuted, lineSpacingMultiple: 1.25,
  });

  const chartData = [{
    name: "Illustrative market growth trend",
    labels: ["Today", "+2 yrs", "+4 yrs", "+6 yrs", "+8 yrs"],
    values: [10, 14, 19, 25, 32],
  }];
  s.addChart("bar", chartData, {
    x: 0.7, y: 2.65, w: 5.9, h: 3.9,
    barDir: "col", chartColors: [C.purple],
    showTitle: true, title: "Global Smart-Tracker Category — Directional Growth Curve", titleFontSize: 11.5, titleColor: C.textDark,
    showValue: false, showLegend: false,
    catAxisLabelColor: C.textMuted, catAxisLabelFontSize: 9.5,
    valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
    dataLabelColor: C.textDark, chartArea: { fill: { color: C.bgLight } },
  });

  const facts = [
    ["compass", "Pakistan first", "Initial geographic focus with clear scalability into other South Asian markets."],
    ["users", "Universal need", "Any person who carries keys, a wallet, a bag, or valuables is an addressable customer."],
    ["dollar", "Price gap", "Premium trackers (AirTag/Tile) price out students & everyday consumers in developing markets — Vouch's tiers start far lower."],
  ];
  let fy = 2.65;
  facts.forEach((f) => {
    card(s, 6.95, fy, 5.7, 1.2, {});
    iconChip(s, f[0], "white", 7.18, fy + 0.22, 0.72, C.purple);
    s.addText(f[1], { x: 8.1, y: fy + 0.12, w: 4.4, h: 0.35, fontFace: FONT, fontSize: 15, bold: true, color: C.textDark });
    s.addText(f[2], { x: 8.1, y: fy + 0.47, w: 4.4, h: 0.65, fontFace: FONT, fontSize: 12, color: C.textMuted, lineSpacingMultiple: 1.15 });
    fy += 1.36;
  });

  footer(s, 7, false);
}

// ================= SLIDE 8 — PRODUCT LINE =================
{
  const s = pres.addSlide();
  bg(s, C.bgLight);
  eyebrow(s, "Product Line", 0.7, 0.5);
  slideTitle(s, "Four Products, One Platform", 0.7, 0.85, { w: 9 });

  const products = [
    ["tag", "QR Sticker", "Rs. 199", "Weatherproof adhesive label. No battery. Best for minimalists & gifting.", C.lavenderPale, C.purple],
    ["key", "Classic Keychain", "Rs. 299", "Flagship branded keychain, premium build. Ideal for house, car & office keys.", C.lavenderPale, C.purple],
    ["volume", "Whistle Keychain", "Rs. 1,299", "Rings when it detects a whistle — no app needed to trigger. Great for items lost at home.", C.lavenderPale, C.purple],
    ["satellite", "GPS Ring Keychain", "Rs. 2,999", "Bluetooth + real GPS tracking. Remote ring & live map location. For travellers & pros.", "2A2150", C.gold],
  ];
  const mx = 0.7, my = 1.85, gap = 0.28, cw = (PGW - mx * 2 - gap * 3) / 4, ch = 4.65;
  products.forEach((p, i) => {
    const x = mx + i * (cw + gap);
    const isFlag = i === 3;
    card(s, x, my, cw, ch, { fill: isFlag ? C.navy : C.cardLight });
    iconChip(s, p[0], isFlag ? "gold" : "purple", x + cw / 2 - 0.4, my + 0.32, 0.8, p[4]);
    s.addText(p[1], { x: x + 0.15, y: my + 1.3, w: cw - 0.3, h: 0.55, align: "center", fontFace: FONT_HEAD, fontSize: 16.5, bold: true, color: isFlag ? C.white : C.textDark });
    s.addText(p[2], { x: x + 0.15, y: my + 1.82, w: cw - 0.3, h: 0.4, align: "center", fontFace: FONT, fontSize: 15.5, bold: true, color: isFlag ? C.gold : C.purpleDeep });
    s.addShape("line", { x: x + 0.3, y: my + 2.32, w: cw - 0.6, h: 0, line: { color: isFlag ? "3B3164" : C.line, width: 1 } });
    s.addText(p[3], { x: x + 0.22, y: my + 2.5, w: cw - 0.44, h: 1.9, align: "center", fontFace: FONT, fontSize: 11.5, color: isFlag ? C.textOnNavyMuted : C.textMuted, lineSpacingMultiple: 1.22 });
    if (isFlag) {
      s.addShape("roundRect", { x: x + cw / 2 - 0.62, y: my + 0.12, w: 1.24, h: 0.28, rectRadius: 0.06, fill: { color: C.gold } });
      s.addText("FLAGSHIP", { x: x + cw / 2 - 0.62, y: my + 0.12, w: 1.24, h: 0.28, align: "center", fontFace: FONT, fontSize: 8.5, bold: true, color: C.navy, charSpacing: 1 });
    }
  });

  s.addText("All four connect to the same app & website: multi-item dashboard, Lost/Safe toggle, instant alerts, scan log, and secure finder messaging.", {
    x: 0.7, y: my + ch + 0.18, w: 11.9, h: 0.4, fontFace: FONT, fontSize: 12, italic: true, color: C.textMuted,
  });

  footer(s, 8, false);
}

// ================= SLIDE 9 — TARGET MARKET & PERSONAS =================
{
  const s = pres.addSlide();
  bg(s, C.bgLight);
  eyebrow(s, "Target Market Analysis", 0.7, 0.5);
  slideTitle(s, "Who We're Building Vouch For", 0.7, 0.85, { w: 9 });

  const segs = [
    ["grad", "Students", "High risk of losing keys, bags & stationery. Price-sensitive, heavy smartphone users."],
    ["briefcase", "Young Professionals", "Busy schedules, multiple keys (home/car/office). Value convenience & privacy."],
    ["home", "Families", "Parents tracking kids' school bags; elderly members who misplace items often."],
    ["plane", "Travellers", "High-value luggage & passports. Urgent need for GPS tracking abroad."],
    ["building", "Businesses", "Employee keychains, office asset tags. Volume / B2B purchasing."],
  ];
  const mx = 0.7, my = 1.75, gap = 0.2, cw = (PGW - mx * 2 - gap * 4) / 5, ch = 2.1;
  segs.forEach((sg, i) => {
    const x = mx + i * (cw + gap);
    card(s, x, my, cw, ch, {});
    iconChip(s, sg[0], "white", x + cw / 2 - 0.34, my + 0.2, 0.68, C.purple);
    s.addText(sg[1], { x: x + 0.1, y: my + 1.0, w: cw - 0.2, h: 0.42, align: "center", fontFace: FONT, fontSize: 13, bold: true, color: C.textDark, lineSpacingMultiple: 1.05 });
    s.addText(sg[2], { x: x + 0.12, y: my + 1.4, w: cw - 0.24, h: 0.65, align: "center", fontFace: FONT, fontSize: 11, color: C.textMuted, lineSpacingMultiple: 1.15 });
  });

  const py = 4.15;
  card(s, 0.7, py, 11.93, 2.15, { fill: C.navy });
  iconChip(s, "grad", "navy", 1.0, py + 0.3, 1.45, C.lavender, 0.5);
  s.addText("PERSONA SPOTLIGHT", { x: 2.85, y: py + 0.2, w: 5, h: 0.3, fontFace: FONT, fontSize: 11, bold: true, color: C.lavender, charSpacing: 1.8 });
  s.addText("\u201CAyesha, 20 — University Student\u201D", { x: 2.85, y: py + 0.48, w: 8.7, h: 0.4, fontFace: FONT_HEAD, fontSize: 18.5, bold: true, color: C.white });
  s.addText("Lives in a university hostel; loses her room keys and student ID at least once a month, and once lost her wallet on campus for two days. Owns a mid-range smartphone, is budget-conscious, and is highly active on Instagram/TikTok.", {
    x: 2.85, y: py + 0.9, w: 8.7, h: 0.75, fontFace: FONT, fontSize: 12.5, color: C.textOnNavy, lineSpacingMultiple: 1.25,
  });
  s.addText("Goal: Never worry about a lost hostel key again — for under the price of a canteen meal.", {
    x: 2.85, y: py + 1.62, w: 8.7, h: 0.4, fontFace: FONT, fontSize: 12, italic: true, color: C.gold,
  });

  footer(s, 9, false);
}

// ================= SLIDE 10 — SWOT ANALYSIS =================
{
  const s = pres.addSlide();
  bg(s, C.bgLight);
  eyebrow(s, "Strategic Analysis", 0.7, 0.5);
  slideTitle(s, "SWOT Analysis", 0.7, 0.85, { w: 8 });

  const quad = [
    { label: "Strengths", icon: "trendup", color: C.green, fill: "EAFBF4", items: [
      "Privacy-first design — unique differentiator vs. AirTag/Tile",
      "Four-tier pricing fits nearly every budget (Rs. 199–2,999)",
      "No-app-needed finder experience removes adoption friction",
      "Whistle keychain is a genuinely unique, hard-to-copy feature",
    ]},
    { label: "Weaknesses", icon: "trenddown", color: C.red, fill: "FDECEE", items: [
      "New, unfunded brand with zero market awareness",
      "GPS edition depends on battery life & recharging habits",
      "Manufacturing & QR-hardware costs at low volume",
      "No physical retail presence yet at launch",
    ]},
    { label: "Opportunities", icon: "star", color: C.gold, fill: "FEF6E3", items: [
      "Underserved, price-sensitive market in Pakistan & South Asia",
      "Expansion into pet tags, luggage tags, medical ID tags",
      "University campus channel — low-cost, high-trust distribution",
      "Freemium app can evolve into a B2B asset-tracking platform",
    ]},
    { label: "Threats", icon: "alerttri", color: C.purpleDeep, fill: "F1EDFB", items: [
      "Global players (Apple, Samsung, Tile) could enter or cut prices",
      "Low-cost local counterfeits / copycat QR tags",
      "Consumer trust barrier around a new privacy-tech brand",
      "Currency & import-cost volatility affecting hardware margins",
    ]},
  ];
  const mx = 0.7, my = 1.78, gap = 0.25, cw = (PGW - mx * 2 - gap) / 2, ch = 2.4;
  quad.forEach((q, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = mx + col * (cw + gap), y = my + row * (ch + gap);
    card(s, x, y, cw, ch, { fill: q.fill, lineColor: q.fill });
    iconChip(s, q.icon, "white", x + 0.22, y + 0.2, 0.5, q.color, 0.56);
    s.addText(q.label, { x: x + 0.85, y: y + 0.2, w: cw - 1, h: 0.5, fontFace: FONT_HEAD, fontSize: 17, bold: true, color: C.textDark, valign: "middle" });
    const bullets = q.items.map((it, idx) => ({ text: it, options: { bullet: { code: "2022", indent: 12 }, breakLine: idx < q.items.length - 1, color: C.textDark } }));
    s.addText(bullets, { x: x + 0.28, y: y + 0.78, w: cw - 0.5, h: ch - 0.95, fontFace: FONT, fontSize: 11.5, lineSpacingMultiple: 1.18 });
  });

  footer(s, 10, false);
}

// ================= SLIDE 11 — MARKETING STRATEGY (STP) =================
{
  const s = pres.addSlide();
  bg(s, C.bgLight);
  eyebrow(s, "Marketing Strategy", 0.7, 0.5);
  slideTitle(s, "Segmentation, Targeting & Positioning", 0.7, 0.85, { w: 10.5 });

  const stp = [
    ["layers", "Segmentation", C.purple, [
      "Demographic: students, young professionals, families, travellers, businesses",
      "Geographic: Pakistan first, scalable to South Asia",
      "Psychographic: privacy-conscious & budget-conscious buyers",
      "Behavioural: frequent losers of keys/wallets/bags",
    ]],
    ["target", "Targeting", C.purpleDeep, [
      "Primary: students & young professionals — highest loss frequency, price-sensitive, always online",
      "Secondary: families & travellers — willing to pay more for GPS peace-of-mind",
      "Tertiary: businesses — B2B volume orders for staff & asset tags",
      "Differentiated targeting strategy across the 4-tier product line",
    ]],
    ["compass", "Positioning", C.gold, [
      "\u201CThe privacy-first, affordable smart keychain for everyday people\u201D",
      "Positioned below AirTag/Tile on price, above them on finder-privacy",
      "Positioned above traditional handwritten tags on trust & technology",
      "Owns the local, culturally-relevant, no-app-needed experience",
    ]],
  ];
  const mx = 0.7, my = 1.85, gap = 0.28, cw = (PGW - mx * 2 - gap * 2) / 3, ch = 4.65;
  stp.forEach((col, i) => {
    const x = mx + i * (cw + gap);
    card(s, x, my, cw, ch, {});
    iconChip(s, col[0], "white", x + 0.26, my + 0.28, 0.68, col[2]);
    s.addText(col[1], { x: x + 1.1, y: my + 0.34, w: cw - 1.3, h: 0.55, fontFace: FONT_HEAD, fontSize: 18, bold: true, color: C.textDark, valign: "middle" });
    s.addShape("line", { x: x + 0.26, y: my + 1.15, w: cw - 0.52, h: 0, line: { color: C.line, width: 1 } });
    const bullets = col[3].map((it, idx) => ({ text: it, options: { bullet: { code: "2022", indent: 10 }, breakLine: idx < col[3].length - 1, color: C.textDark, paraSpaceAfter: 8 } }));
    s.addText(bullets, { x: x + 0.26, y: my + 1.35, w: cw - 0.52, h: ch - 1.55, fontFace: FONT, fontSize: 12, lineSpacingMultiple: 1.2 });
  });

  footer(s, 11, false);
}

// ================= SLIDE 12 — VALUE PROPOSITION & POSITIONING MAP =================
{
  const s = pres.addSlide();
  bg(s, C.bgLight);
  eyebrow(s, "Value Proposition & Positioning", 0.7, 0.5);
  slideTitle(s, "Where Vouch Stands in the Market", 0.7, 0.85, { w: 10.5 });

  card(s, 0.7, 1.8, 5.55, 1.55, { fill: C.navy });
  s.addText("VALUE PROPOSITION", { x: 1.0, y: 1.98, w: 5, h: 0.3, fontFace: FONT, fontSize: 12.5, bold: true, color: C.lavender, charSpacing: 1.8 });
  s.addText("\u201CProtect everything you carry, without exposing who you are \u2014 at a price everyone can afford.\u201D", {
    x: 1.0, y: 2.28, w: 4.95, h: 1.0, fontFace: FONT_HEAD, fontSize: 15, italic: true, bold: true, color: C.white, lineSpacingMultiple: 1.2,
  });

  const props = [
    ["shield", "Privacy nobody else offers", "No number or name ever shown to the finder — a true category first locally."],
    ["dollar", "A tier for every budget", "Rs. 199 sticker to Rs. 2,999 GPS keychain — one brand, four entry points."],
    ["phone", "Zero-friction for finders", "No app download needed to return a lost item — just scan and message."],
  ];
  let vy = 3.55;
  props.forEach((p) => {
    iconChip(s, p[0], "white", 0.7, vy, 0.5, C.purple, 0.56);
    s.addText(p[1], { x: 1.35, y: vy - 0.03, w: 4.9, h: 0.32, fontFace: FONT, fontSize: 13.5, bold: true, color: C.textDark });
    s.addText(p[2], { x: 1.35, y: vy + 0.28, w: 4.9, h: 0.4, fontFace: FONT, fontSize: 11.5, color: C.textMuted, lineSpacingMultiple: 1.15 });
    vy += 0.78;
  });

  const mapX = 6.75, mapY = 1.8, mapW = 5.9, mapH = 5.3;
  card(s, mapX, mapY, mapW, mapH, {});
  s.addText("POSITIONING MAP", { x: mapX + 0.3, y: mapY + 0.22, w: 4, h: 0.3, fontFace: FONT, fontSize: 12, bold: true, color: C.purple, charSpacing: 1.6 });
  s.addText("Price vs. Privacy & Smart-Tech Features", { x: mapX + 0.3, y: mapY + 0.52, w: 5, h: 0.3, fontFace: FONT, fontSize: 11.5, italic: true, color: C.textMuted });

  const plotX = mapX + 0.75, plotY = mapY + 1.05, plotW = mapW - 1.3, plotH = mapH - 1.9;
  s.addShape("line", { x: plotX, y: plotY, w: 0, h: plotH, line: { color: C.line, width: 1.5 } });
  s.addShape("line", { x: plotX, y: plotY + plotH, w: plotW, h: 0, line: { color: C.line, width: 1.5 } });
  s.addText("HIGH PRICE", { x: plotX - 0.65, y: plotY - 0.28, w: 1.3, h: 0.24, align: "center", fontFace: FONT, fontSize: 9, color: C.textMuted, charSpacing: 0.5 });
  s.addText("LOW PRICE", { x: plotX - 0.65, y: plotY + plotH + 0.05, w: 1.3, h: 0.24, align: "center", fontFace: FONT, fontSize: 9, color: C.textMuted, charSpacing: 0.5 });
  s.addText("LOW PRIVACY / TECH", { x: plotX - 0.5, y: plotY + plotH + 0.32, w: 1.9, h: 0.24, fontFace: FONT, fontSize: 9, color: C.textMuted, charSpacing: 0.3 });
  s.addText("HIGH PRIVACY / TECH", { x: plotX + plotW - 1.5, y: plotY + plotH + 0.32, w: 2.0, h: 0.24, align: "right", fontFace: FONT, fontSize: 9, color: C.textMuted, charSpacing: 0.3 });

  const points = [
    ["Vouch", 0.78, 0.72, C.purple, true],
    ["AirTag", 0.9, 0.88, "9CA3AF", false],
    ["Tile", 0.82, 0.8, "9CA3AF", false],
    ["Handwritten Tag", 0.08, 0.06, "9CA3AF", false],
  ];
  points.forEach((p) => {
    const [label, xf, yf, color, isVouch] = p;
    const px = plotX + xf * plotW - (isVouch ? 0.14 : 0.09);
    const py2 = plotY + (1 - yf) * plotH - (isVouch ? 0.14 : 0.09);
    const d = isVouch ? 0.28 : 0.18;
    s.addShape("ellipse", { x: px, y: py2, w: d, h: d, fill: { color }, line: { color: C.white, width: 1.5 } });
    s.addText(label, { x: px - 0.6 + d / 2, y: py2 + d + 0.03, w: 1.5, h: 0.24, align: "center", fontFace: FONT, fontSize: isVouch ? 11.5 : 10, bold: isVouch, color: isVouch ? C.purpleDeep : C.textMuted });
  });

  footer(s, 12, false);
}

// ================= SLIDE 13 — BRAND ELEMENTS: LOGO & SLOGAN =================
{
  const s = pres.addSlide();
  bg(s, C.navy);
  s.addShape("ellipse", { x: -2, y: -2.5, w: 7, h: 7, fill: { color: C.purpleDeep, transparency: 82 }, line: { type: "none" } });
  eyebrow(s, "Brand Elements", 0.7, 0.55, { color: C.lavender });
  slideTitle(s, "Logo, Slogan & Brand Identity", 0.7, 0.9, { size: 30, color: C.white, w: 10 });

  card(s, 0.7, 1.95, 4.85, 4.85, { fill: C.navy2, lineColor: "3B3164" });
  s.addImage({ path: LOGO, x: 1.55, y: 2.35, w: 3.15, h: 3.15 });
  s.addText('"Lost, But Never Gone."', { x: 0.9, y: 5.55, w: 4.45, h: 0.4, align: "center", fontFace: FONT_HEAD, fontSize: 17, italic: true, bold: true, color: C.gold });
  s.addText("Primary Slogan", { x: 0.9, y: 5.95, w: 4.45, h: 0.3, align: "center", fontFace: FONT, fontSize: 11, color: C.textOnNavyMuted, charSpacing: 1.2 });
  s.addShape("line", { x: 1.3, y: 6.3, w: 3.65, h: 0, line: { color: "3B3164", width: 1 } });
  s.addText('"Connect. Protect. Locate."', { x: 0.9, y: 6.4, w: 4.45, h: 0.35, align: "center", fontFace: FONT, fontSize: 14.5, italic: true, color: C.lavender });
  s.addText("Secondary Tagline", { x: 0.9, y: 6.72, w: 4.45, h: 0.28, align: "center", fontFace: FONT, fontSize: 11, color: C.textOnNavyMuted, charSpacing: 1.2 });

  const brandBits = [
    ["award2", "Name & Symbol", "\u201CVouch\u201D signals trust and personal guarantee — the brand vouches for your belongings' safe return. The V-mark logo reflects a checkmark of assurance."],
    ["compass", "Brand Personality", "Trustworthy, modern, approachable and quietly clever — a tech brand that feels human, not corporate."],
    ["star", "Color Story", "Deep navy conveys security & reliability; purple/lavender signal modern tech and privacy; gold accents mark premium moments."],
  ];
  let by = 1.95;
  brandBits.forEach((b) => {
    iconChip(s, b[0], "navy", 5.85, by, 0.62, C.lavender, 0.54);
    s.addText(b[1], { x: 6.65, y: by - 0.02, w: 6.0, h: 0.35, fontFace: FONT, fontSize: 15.5, bold: true, color: C.white });
    s.addText(b[2], { x: 6.65, y: by + 0.35, w: 6.0, h: 0.85, fontFace: FONT, fontSize: 12.5, color: C.textOnNavyMuted, lineSpacingMultiple: 1.25 });
    by += 1.15;
  });

  card(s, 5.85, by + 0.1, 6.78, 1.35, { fill: C.navy2, lineColor: "3B3164" });
  s.addText("Brand promise in one line:", { x: 6.15, y: by + 0.28, w: 6.2, h: 0.3, fontFace: FONT, fontSize: 12, color: C.textOnNavyMuted });
  s.addText("Whatever you lose, Vouch keeps the door open to getting it back \u2014 safely and privately.", {
    x: 6.15, y: by + 0.58, w: 6.2, h: 0.75, fontFace: FONT_HEAD, fontSize: 15, italic: true, color: C.lavender, lineSpacingMultiple: 1.2,
  });

  footer(s, 13, true);
}

// ================= SLIDE 14 — PRICING STRATEGY =================
{
  const s = pres.addSlide();
  bg(s, C.bgLight);
  eyebrow(s, "Pricing Strategy", 0.7, 0.5);
  slideTitle(s, "Value-Based, Tiered & Freemium Pricing", 0.7, 0.85, { w: 10.5 });

  s.addText("Hardware is priced by tier to match the value delivered and local purchasing power; the platform layers a freemium subscription on top for recurring revenue.", {
    x: 0.7, y: 1.65, w: 11.9, h: 0.55, fontFace: FONT, fontSize: 14, color: C.textMuted, lineSpacingMultiple: 1.25,
  });

  const tiers = [
    ["tag", "QR Sticker", "Rs. 199", "Entry-level value pricing"],
    ["key", "Classic Keychain", "Rs. 299", "Mid-tier, everyday branded product"],
    ["volume", "Whistle Keychain", "Rs. 1,299", "Premium for a unique feature"],
    ["satellite", "GPS Ring Keychain", "Rs. 2,999", "Flagship, tech-driven premium"],
  ];
  const mx = 0.7, my = 2.35, gap = 0.25, cw = (PGW - mx * 2 - gap * 3) / 4, ch = 1.9;
  tiers.forEach((t, i) => {
    const x = mx + i * (cw + gap);
    const isFlag = i === 3;
    card(s, x, my, cw, ch, { fill: isFlag ? C.navy : C.cardLight });
    iconChip(s, t[0], isFlag ? "gold" : "purple", x + 0.24, my + 0.24, 0.58, isFlag ? "2A2150" : C.lavenderPale, 0.56);
    s.addText(t[1], { x: x + 0.24, y: my + 0.94, w: cw - 0.48, h: 0.32, fontFace: FONT, fontSize: 14, bold: true, color: isFlag ? C.white : C.textDark });
    s.addText(t[2], { x: x + 0.24, y: my + 1.24, w: cw - 0.48, h: 0.35, fontFace: FONT_HEAD, fontSize: 17, bold: true, color: isFlag ? C.gold : C.purpleDeep });
    s.addText(t[3], { x: x + 0.24, y: my + 1.58, w: cw - 0.48, h: 0.3, fontFace: FONT, fontSize: 11.5, italic: true, color: isFlag ? C.textOnNavyMuted : C.textMuted });
  });

  const py = my + ch + 0.35;
  card(s, 0.7, py, 5.75, 2.2, { fill: C.lavenderPale, lineColor: C.lavenderPale });
  iconChip(s, "phone", "white", 0.98, py + 0.25, 0.55, C.purple, 0.56);
  s.addText("Platform: Freemium Subscription", { x: 1.7, y: py + 0.2, w: 4.6, h: 0.35, fontFace: FONT, fontSize: 15, bold: true, color: C.textDark });
  s.addText("Hardware is a one-time purchase. The free tier covers core scan-and-notify functionality for every buyer; a premium subscription unlocks GPS live tracking history, multi-item family plans, and priority alerts.", {
    x: 0.98, y: py + 0.75, w: 5.2, h: 1.3, fontFace: FONT, fontSize: 12, color: C.textDark, lineSpacingMultiple: 1.25,
  });

  card(s, 6.7, py, 5.93, 2.2, { fill: C.navy });
  s.addText("WHY THIS PRICING WORKS", { x: 6.98, y: py + 0.2, w: 5.4, h: 0.3, fontFace: FONT, fontSize: 12, bold: true, color: C.lavender, charSpacing: 1.6 });
  const rationale = [
    "Tiered pricing captures both budget buyers and premium spenders in one brand",
    "Freemium removes the barrier to first purchase and drives platform adoption",
    "Price bands stay well below AirTag/Tile even at the GPS flagship tier",
  ].map((t, i) => ({ text: t, options: { bullet: { code: "2022", indent: 10 }, breakLine: i < 2, color: C.textOnNavy } }));
  s.addText(rationale, { x: 6.98, y: py + 0.58, w: 5.4, h: 1.5, fontFace: FONT, fontSize: 12, lineSpacingMultiple: 1.25 });

  footer(s, 14, false);
}

// ================= SLIDE 15 — PROMOTIONAL PLAN (IMC) =================
{
  const s = pres.addSlide();
  bg(s, C.bgLight);
  eyebrow(s, "Marketing Communication", 0.7, 0.5);
  slideTitle(s, "Integrated Promotional Plan (IMC)", 0.7, 0.85, { w: 10.5 });

  s.addText("Our promotional mix targets digital-native students and professionals through social proof, on-campus networks, and referral loops.", {
    x: 0.7, y: 1.65, w: 11.9, h: 0.55, fontFace: FONT, fontSize: 14, color: C.textMuted, lineSpacingMultiple: 1.25,
  });

  const promos = [
    ["megaphone", "Targeted Social Ads", "Launch video campaigns on Instagram Reels and TikTok. Focus on relatable, high-panic scenarios (losing keys right before an exam) vs. the quick, secure Vouch return process."],
    ["grad", "Campus Ambassadors", "Recruit students at major partner universities (FAST, NUST, LUMS). Empower them with free merchandise, exclusive discount codes, and local hostel-level giveaways."],
    ["gift", "Referral & Return Loops", "Finders who successfully return an item receive a 10% coupon for their next Vouch purchase. Owners get free replacement tags for successfully referring two friends."],
    ["briefcase", "Co-Branding Deals", "Partner with local bike dealerships, car showrooms, and high-end security firms to bundle custom-branded Vouch keychains directly with vehicle purchases."],
  ];

  const mx = 0.7, my = 2.35, gap = 0.25, cw = (PGW - mx * 2 - gap * 3) / 4, ch = 4.3;
  promos.forEach((p, i) => {
    const x = mx + i * (cw + gap);
    card(s, x, my, cw, ch, {});
    iconChip(s, p[0], "white", x + 0.24, my + 0.28, 0.68, C.purple);
    s.addText(p[1], { x: x + 0.24, y: my + 1.1, w: cw - 0.48, h: 0.55, fontFace: FONT_HEAD, fontSize: 15.5, bold: true, color: C.textDark, lineSpacingMultiple: 1.1 });
    s.addText(p[2], { x: x + 0.24, y: my + 1.72, w: cw - 0.48, h: ch - 1.9, fontFace: FONT, fontSize: 11.8, color: C.textMuted, lineSpacingMultiple: 1.22 });
  });

  footer(s, 15, false);
}

// ================= SLIDE 16 — DISTRIBUTION / PLACE =================
{
  const s = pres.addSlide();
  bg(s, C.bgLight);
  eyebrow(s, "Distribution Channels", 0.7, 0.5);
  slideTitle(s, "Distribution Strategy: Multi-Channel Accessibility", 0.7, 0.85, { w: 10.5 });

  s.addText("To drive quick adoption, Vouch uses a hybrid distribution strategy that combines frictionless D2C online shopping with localized physical touchpoints.", {
    x: 0.7, y: 1.65, w: 11.9, h: 0.55, fontFace: FONT, fontSize: 14, color: C.textMuted, lineSpacingMultiple: 1.25,
  });

  const channels = [
    ["globe", "D2C E-Commerce Store", "Our primary active sales channel. Customers buy directly from our fully optimized web platform (vouch-six-ebon.vercel.app). Supports instant ordering, Cash on Delivery (COD), card payments, and custom multi-pack configurations."],
    ["home", "On-Campus Stalls", "Setting up physical, student-run stalls at major universities (FAST, NUST, LUMS) during events, sports weeks, and exams. This allows direct hand-to-hand sales, face-to-face feedback, and instant brand activation."],
    ["store", "Tech Outlets & Marketplaces", "Stocking keychains in local electronics, smartphone accessories, and lifestyle stores. Establishing an official Vouch store on Daraz for wider country-wide logistics support."],
  ];

  const mx = 0.7, my = 2.35, gap = 0.4, cw = (PGW - mx * 2 - gap * 2) / 3, ch = 4.3;
  channels.forEach((c, i) => {
    const x = mx + i * (cw + gap);
    card(s, x, my, cw, ch, {});
    iconChip(s, c[0], "white", x + 0.28, my + 0.28, 0.8, C.purple);
    s.addText(c[1], { x: x + 0.28, y: my + 1.25, w: cw - 0.56, h: 0.55, fontFace: FONT_HEAD, fontSize: 17.5, bold: true, color: C.textDark, lineSpacingMultiple: 1.15 });
    s.addText(c[2], { x: x + 0.28, y: my + 1.88, w: cw - 0.56, h: ch - 2.1, fontFace: FONT, fontSize: 12.5, color: C.textMuted, lineSpacingMultiple: 1.25 });
    if (i === 2) {
      s.addShape("roundRect", { x: x + cw / 2 - 1.2, y: my - 0.12, w: 2.4, h: 0.28, rectRadius: 0.06, fill: { color: C.textMuted } });
      s.addText("FUTURE COLLABORATIONS", { x: x + cw / 2 - 1.2, y: my - 0.12, w: 2.4, h: 0.28, align: "center", fontFace: FONT, fontSize: 8.2, bold: true, color: C.white, charSpacing: 0.8 });
    }
  });

  footer(s, 16, false);
}

// ================= SLIDE 17 — COMPETITIVE ANALYSIS =================
{
  const s = pres.addSlide();
  bg(s, C.bgLight);
  eyebrow(s, "Competitive Position", 0.7, 0.5);
  slideTitle(s, "Competitive Landscape: Column Comparison", 0.7, 0.85, { w: 10.5 });

  s.addText("While premium trackers exist, Vouch specifically targets the intersection of local affordability, user privacy, and frictionless finder adoption.", {
    x: 0.7, y: 1.62, w: 11.9, h: 0.5, fontFace: FONT, fontSize: 14, color: C.textMuted, lineSpacingMultiple: 1.2,
  });

  const competitors = [
    { name: "Vouch (Our Product)", fill: C.navy, text: C.white, subText: C.textOnNavyMuted, border: C.navy, isVouch: true, items: [
      ["qrcode", "Price: Rs. 199 - 2,999", "Extremely affordable local entry points"],
      ["shield", "Finder Privacy: Encrypted", "Masked secure web contact page"],
      ["phone", "Finder App: None Required", "Simple camera QR scan to report"],
      ["globe", "Local Focus: High", "Tailored shipping, support & pricing"],
    ]},
    { name: "Apple AirTag", fill: C.cardLight, text: C.textDark, subText: C.textMuted, border: C.line, isVouch: false, items: [
      ["dollar", "Price: Rs. 9,000 - 12,000+", "Expensive single-item tracking"],
      ["shield", "Privacy: Medium (Apple ID)", "Finder details linked to Apple system"],
      ["phone", "Finder App: None (NFC)", "Uses native iOS/Android NFC reader"],
      ["globe", "Local Focus: Low", "No localized support, high import markup"],
    ]},
    { name: "Tile Tracker", fill: C.cardLight, text: C.textDark, subText: C.textMuted, border: C.line, isVouch: false, items: [
      ["dollar", "Price: Rs. 6,000 - 8,000+", "Premium Bluetooth tag pricing"],
      ["shield", "Privacy: Low (Direct Contact)", "Exposes owner phone/email on scan"],
      ["phone", "Finder App: Required", "Must install Tile app to report loss"],
      ["globe", "Local Focus: Low", "No local service or customization"],
    ]},
    { name: "Traditional Keyring", fill: C.cardLight, text: C.textDark, subText: C.textMuted, border: C.line, isVouch: false, items: [
      ["dollar", "Price: Rs. 50 - 100", "Negligible hardware cost"],
      ["shield", "Privacy: Zero (Raw Info)", "Exposes phone number to strangers"],
      ["phone", "Finder App: None (Call)", "Requires manual GSM phone call"],
      ["globe", "Local Focus: High (Manual)", "Dependent entirely on local honesty"],
    ]},
  ];

  const mx = 0.7, my = 2.2, gap = 0.28, cw = (PGW - mx * 2 - gap * 3) / 4, ch = 4.55;
  competitors.forEach((c, i) => {
    const x = mx + i * (cw + gap);
    card(s, x, my, cw, ch, { fill: c.fill, lineColor: c.border });
    
    s.addText(c.name, { x: x + 0.15, y: my + 0.22, w: cw - 0.3, h: 0.42, align: "center", fontFace: FONT_HEAD, fontSize: 15, bold: true, color: c.isVouch ? C.gold : c.text });
    s.addShape("line", { x: x + 0.25, y: my + 0.72, w: cw - 0.5, h: 0, line: { color: c.isVouch ? "3B3164" : C.line, width: 1 } });

    let iy = my + 0.9;
    c.items.forEach((item) => {
      iconChip(s, item[0], c.isVouch ? "gold" : "purple", x + 0.15, iy + 0.05, 0.4, c.isVouch ? "2A2150" : C.lavenderPale, 0.56);
      s.addText(item[1], { x: x + 0.62, y: iy, w: cw - 0.75, h: 0.28, fontFace: FONT, fontSize: 11.5, bold: true, color: c.text });
      s.addText(item[2], { x: x + 0.62, y: iy + 0.26, w: cw - 0.75, h: 0.52, fontFace: FONT, fontSize: 10.8, color: c.subText, lineSpacingMultiple: 1.1 });
      iy += 0.85;
    });

    if (c.isVouch) {
      s.addShape("roundRect", { x: x + cw / 2 - 0.72, y: my - 0.12, w: 1.44, h: 0.28, rectRadius: 0.06, fill: { color: C.purple } });
      s.addText("BEST CHOICE", { x: x + cw / 2 - 0.72, y: my - 0.12, w: 1.44, h: 0.28, align: "center", fontFace: FONT, fontSize: 8.5, bold: true, color: C.white, charSpacing: 1 });
    }
  });

  footer(s, 17, false);
}

// ================= SLIDE 18 — OPERATIONAL CHALLENGES =================
{
  const s = pres.addSlide();
  bg(s, C.bgLight);
  eyebrow(s, "Risk Management", 0.7, 0.5);
  slideTitle(s, "Operational Challenges & Solutions", 0.7, 0.85, { w: 10.5 });

  s.addText("Launching a hardware-software hybrid brand faces three distinct hurdles, each countered by a robust operational strategy.", {
    x: 0.7, y: 1.62, w: 11.9, h: 0.5, fontFace: FONT, fontSize: 14, color: C.textMuted, lineSpacingMultiple: 1.2,
  });

  const cx = 0.7, cy = 2.2, cw = 5.7, ch = 4.55;
  card(s, cx, cy, cw, ch, { fill: "FDFCEF", lineColor: "F5ECE1" });
  iconChip(s, "alert", "red", cx + 0.3, cy + 0.3, 0.68, "FEE8EB");
  s.addText("Core Launch Challenges", { x: cx + 1.15, y: cy + 0.36, w: cw - 1.4, h: 0.42, fontFace: FONT_HEAD, fontSize: 18, bold: true, color: C.textDark });
  s.addShape("line", { x: cx + 0.3, y: cy + 1.15, w: cw - 0.6, h: 0, line: { color: "F2E2D5", width: 1 } });

  const challenges = [
    ["1. Finder Engagement", "Why would a stranger scan the tag? They have no strict obligation to return it."],
    ["2. Battery Constraints (GPS)", "Bluetooth and GPS modules drain coin cell battery power quickly, necessitating regular recharging/swaps."],
    ["3. Hardware Manufacturing", "Sourcing microchips, high-quality plastic molds, and scratch-resistant QR surfaces locally is operationally difficult."],
  ];
  let chY = cy + 1.4;
  challenges.forEach((chIt) => {
    s.addText(chIt[0], { x: cx + 0.3, y: chY, w: cw - 0.6, h: 0.32, fontFace: FONT, fontSize: 13.5, bold: true, color: "C74D5A" });
    s.addText(chIt[1], { x: cx + 0.3, y: chY + 0.3, w: cw - 0.6, h: 0.55, fontFace: FONT, fontSize: 12, color: C.textMuted, lineSpacingMultiple: 1.15 });
    chY += 0.95;
  });

  const sx = 6.93, sy = 2.2;
  card(s, sx, sy, cw, ch, { fill: "EBFBF4", lineColor: "DBF7EA" });
  iconChip(s, "check", "green", sx + 0.3, sy + 0.3, 0.68, "DDF7EB");
  s.addText("Strategic Mitigations", { x: sx + 1.15, y: sy + 0.36, w: cw - 1.4, h: 0.42, fontFace: FONT_HEAD, fontSize: 18, bold: true, color: C.textDark });
  s.addShape("line", { x: sx + 0.3, y: sy + 1.15, w: cw - 0.6, h: 0, line: { color: "CBEFE0", width: 1 } });

  const mitigations = [
    ["1. Reward & Karma Prompts", "Secure landing pages display instant finder reward vouchers, alongside a warm appeal to civic karma."],
    ["2. Hybrid Battery Design", "GPS keychain uses a magnetic USB-C rechargeable cell; Whistle uses simple, replaceable CR2032 coin batteries."],
    ["3. Partnered Sourcing", "Outsource initial sticker manufacturing and custom QR engraving to high-precision local printers; scale B2B chips gradually."],
  ];
  let mitY = sy + 1.4;
  mitigations.forEach((mitIt) => {
    s.addText(mitIt[0], { x: sx + 0.3, y: mitY, w: cw - 0.6, h: 0.32, fontFace: FONT, fontSize: 13.5, bold: true, color: "15803D" });
    s.addText(mitIt[1], { x: sx + 0.3, y: mitY + 0.3, w: cw - 0.6, h: 0.55, fontFace: FONT, fontSize: 12, color: C.textMuted, lineSpacingMultiple: 1.15 });
    mitY += 0.95;
  });

  footer(s, 18, false);
}

// ================= SLIDE 19 — FUTURE ROADMAP =================
{
  const s = pres.addSlide();
  bg(s, C.bgLight);
  eyebrow(s, "Strategic Plan", 0.7, 0.5);
  slideTitle(s, "Future Growth Roadmap", 0.7, 0.85, { w: 10.5 });

  s.addText("A structured three-phase plan to scale Vouch from campus-level keychains to a broad enterprise asset-tracking platform.", {
    x: 0.7, y: 1.65, w: 11.9, h: 0.55, fontFace: FONT, fontSize: 14, color: C.textMuted, lineSpacingMultiple: 1.25,
  });

  const phases = [
    ["rocket", "Phase 1: Launch & Scale", "Months 1–6", "High-density university campus launches. Build 5,000+ local Classic & Whistle keychain sales; publish free Android/iOS companion apps; establish basic D2C distribution channels."],
    ["layers", "Phase 2: Product Extensions", "Months 6–12", "Introduce Vouch Pet Collars, Luggage Tags, and Passport Smart Sleeves. Roll out premium app subscription tiers (family group tracking, priority SMS scan alerts)."],
    ["building", "Phase 3: B2B Enterprise", "Year 2+", "Launch Enterprise Asset Portal. Volume sales to corporate clients for tracking laptops, employee identity badges, and delivery logistics gear (bags, tablets)."],
  ];

  const mx = 0.7, my = 2.35, gap = 0.4, cw = (PGW - mx * 2 - gap * 2) / 3, ch = 4.3;
  phases.forEach((p, i) => {
    const x = mx + i * (cw + gap);
    card(s, x, my, cw, ch, {});
    iconChip(s, p[0], "white", x + 0.28, my + 0.28, 0.75, C.purple);
    s.addText(p[1], { x: x + 0.28, y: my + 1.2, w: cw - 0.56, h: 0.55, fontFace: FONT_HEAD, fontSize: 16.5, bold: true, color: C.textDark, lineSpacingMultiple: 1.1 });
    s.addText(p[2], { x: x + 0.28, y: my + 1.72, w: cw - 0.56, h: 0.35, fontFace: FONT, fontSize: 13.5, bold: true, color: C.purpleDeep });
    s.addShape("line", { x: x + 0.28, y: my + 2.12, w: cw - 0.56, h: 0, line: { color: C.line, width: 1 } });
    s.addText(p[3], { x: x + 0.28, y: my + 2.3, w: cw - 0.56, h: ch - 2.5, fontFace: FONT, fontSize: 11.8, color: C.textMuted, lineSpacingMultiple: 1.25 });
  });

  footer(s, 19, false);
}

// ================= SLIDE 20 — CONCLUSION =================
{
  const s = pres.addSlide();
  bg(s, C.navy);
  s.addShape("ellipse", { x: 10, y: 4.8, w: 5.5, h: 5.5, fill: { color: C.purpleDeep, transparency: 80 }, line: { type: "none" } });
  s.addShape("ellipse", { x: -2.5, y: -2, w: 7, h: 7, fill: { color: C.purple, transparency: 85 }, line: { type: "none" } });

  eyebrow(s, "Wrap-Up & Takeaways", 0.7, 0.55, { color: C.lavender });
  slideTitle(s, "Conclusion: Why Vouch Wins", 0.7, 0.9, { size: 34, color: C.white, w: 9 });

  const points = [
    ["bulb", "Customer-Centric Innovation", "Vouch solves an everyday pain point by blending hardware accessibility with robust web-based finder flows, removing all download barriers."],
    ["trendup", "Attractive Business Model", "Combining one-time hardware tags with high-margin recurring app subscriptions creates a resilient, high-margin revenue model."],
    ["rocket", "Scalable Future Horizon", "Starting with local students, the technology scales directly into travel accessories, B2B logistics tracking, pet tagging, and medical IDs."],
  ];

  const mx = 0.7, my = 2.1, gap = 0.4, cw = (PGW - mx * 2 - gap * 2) / 3, ch = 3.65;
  points.forEach((p, i) => {
    const x = mx + i * (cw + gap);
    card(s, x, my, cw, ch, { fill: C.navy2, lineColor: "3B3164" });
    iconChip(s, p[0], "gold", x + 0.28, my + 0.28, 0.72, C.navy3);
    s.addText(p[1], { x: x + 0.28, y: my + 1.15, w: cw - 0.56, h: 0.55, fontFace: FONT_HEAD, fontSize: 16.5, bold: true, color: C.white, lineSpacingMultiple: 1.1 });
    s.addShape("line", { x: x + 0.28, y: my + 1.78, w: cw - 0.56, h: 0, line: { color: "3B3164", width: 1 } });
    s.addText(p[2], { x: x + 0.28, y: my + 1.98, w: cw - 0.56, h: ch - 2.15, fontFace: FONT, fontSize: 12, color: C.textOnNavyMuted, lineSpacingMultiple: 1.25 });
  });

  const ctaY = my + ch + 0.4;
  s.addText('"Lost, But Never Gone."', {
    x: 0, y: ctaY, w: PGW, h: 0.42, align: "center", fontFace: FONT_HEAD, fontSize: 22, italic: true, bold: true, color: C.gold,
  });
  s.addText("Join us in building a smarter, privacy-first return network.", {
    x: 0, y: ctaY + 0.45, w: PGW, h: 0.35, align: "center", fontFace: FONT, fontSize: 13.5, color: C.textOnNavyMuted, charSpacing: 1.2,
  });

  footer(s, 20, true);
}

// ---------- WRITE FILE ----------
pres.writeFile({ fileName: "Vouch_Presentation_Full.pptx" }).then(() => {
  console.log("Successfully wrote Vouch_Presentation_Full.pptx");
}).catch(err => {
  console.error("Error writing presentation:", err);
});
