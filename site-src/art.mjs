// Hand-built SVG art and charts for the demo site. Every chart uses example figures and says so.
export const INK = "#12343B";
export const MUTED = "#55707A";
export const TEAL = "#008F7E";
export const CORAL = "#E8590C";
export const SKY = "#2B6CB0";
export const PLUM = "#8E3B8A";

const palettes = {
  dusk: ["#12343B", "#2D6E7E", "#F4A261", "#E76F51"],
  dawn: ["#FDE3C8", "#F4A261", "#2A9D8F", "#1F6F68"],
  noon: ["#BDE7F2", "#7CC6DE", "#2A9D8F", "#176B62"],
  plum: ["#3B2A5E", "#8E3B8A", "#F2A65A", "#6B2D6E"],
  sand: ["#FBE9CF", "#F2C078", "#D9722B", "#8A3B12"],
  sea: ["#CFEFEA", "#6CC5B9", "#1B8A7D", "#0E5C53"],
};

function hills(w, h, c1, c2) {
  const back = `M0 ${h * 0.68} C${w * 0.18} ${h * 0.5},${w * 0.32} ${h * 0.74},${w * 0.5} ${h * 0.6} S${w * 0.82} ${h * 0.46},${w} ${h * 0.64} V${h} H0Z`;
  const front = `M0 ${h * 0.84} C${w * 0.22} ${h * 0.68},${w * 0.42} ${h * 0.92},${w * 0.62} ${h * 0.78} S${w * 0.88} ${h * 0.7},${w} ${h * 0.82} V${h} H0Z`;
  return `<path d="${back}" fill="${c1}"/><path d="${front}" fill="${c2}"/>`;
}

const icons = {
  bag: `<g fill="#fff"><rect x="-34" y="-30" width="68" height="74" rx="10"/><rect x="-14" y="-46" width="28" height="18" rx="6" fill="none" stroke="#fff" stroke-width="6"/></g><g fill="#12343B" opacity=".55"><rect x="-22" y="-14" width="44" height="6" rx="3"/><rect x="-22" y="4" width="44" height="6" rx="3"/></g>`,
  plane: `<path fill="#fff" d="M-52 6 L46 -22 C56 -25 62 -16 54 -10 L8 18 L-4 48 L-16 50 L-12 24 L-34 28 L-46 42 L-54 42 L-50 22 Z"/>`,
  bed: `<g fill="#fff"><rect x="-46" y="-6" width="92" height="30" rx="8"/><rect x="-46" y="-34" width="10" height="72" rx="4"/><rect x="36" y="-6" width="10" height="44" rx="4"/><rect x="-32" y="-20" width="30" height="18" rx="8"/></g>`,
  bowl: `<g fill="#fff"><path d="M-46 -6 H46 C46 28 22 42 0 42 S-46 28 -46 -6Z"/><path d="M-14 -16 C-20 -26 -8 -30 -14 -42 M12 -16 C6 -26 18 -30 12 -42" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/></g>`,
  passport: `<g><rect x="-32" y="-44" width="64" height="88" rx="8" fill="#fff"/><circle cx="0" cy="-8" r="18" fill="none" stroke="#12343B" stroke-width="4" opacity=".55"/><rect x="-16" y="24" width="32" height="5" rx="2.5" fill="#12343B" opacity=".55"/></g>`,
  list: `<g><rect x="-34" y="-44" width="68" height="88" rx="8" fill="#fff"/><g fill="#12343B" opacity=".55"><rect x="-20" y="-26" width="40" height="6" rx="3"/><rect x="-20" y="-8" width="40" height="6" rx="3"/><rect x="-20" y="10" width="26" height="6" rx="3"/></g></g>`,
  atlas: `<g><circle r="44" fill="#fff"/><path d="M0 -30 L10 -6 L30 0 L10 6 L0 30 L-10 6 L-30 0 L-10 -6Z" fill="#E8590C"/></g>`,
};

export function thumb(name, icon) {
  const [a, b, c, d] = palettes[name];
  const id = `g-${name}-${icon}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" width="640" height="360">
<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
<rect width="640" height="360" fill="url(#${id})"/>
<circle cx="500" cy="96" r="44" fill="#fff" opacity=".28"/>
${hills(640, 360, c, d)}
<g transform="translate(320 176)"><circle r="82" fill="${d}" opacity=".5"/>${icons[icon]}</g>
</svg>`;
}

export function hero() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 620" preserveAspectRatio="xMidYMid slice" width="1600" height="620">
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E2A3A"/><stop offset=".5" stop-color="#2D6E7E"/><stop offset=".82" stop-color="#F4A261"/><stop offset="1" stop-color="#E76F51"/></linearGradient>
<radialGradient id="sun"><stop offset="0" stop-color="#FFE6B8"/><stop offset=".55" stop-color="#FFC27A"/><stop offset="1" stop-color="#FFC27A" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1600" height="620" fill="url(#sky)"/>
<circle cx="1180" cy="400" r="240" fill="url(#sun)"/>
<g fill="#fff">${Array.from({ length: 46 }, (_, i) => `<circle cx="${(i * 197) % 1600}" cy="${(i * 83) % 250}" r="${i % 3 ? 1.4 : 2.2}" opacity=".7"/>`).join("")}</g>
<path d="M0 470 L180 360 L300 430 L470 300 L640 440 L820 340 L1010 450 L1230 330 L1430 440 L1600 370 V620 H0Z" fill="#1F4E5A"/>
<path d="M0 520 C220 440 380 560 640 490 S1120 430 1600 520 V620 H0Z" fill="#12343B"/>
<path id="route" d="M60 420 C340 150 760 110 1020 230 S1420 280 1560 110" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="4 14" stroke-linecap="round" opacity=".4"/>
<g fill="#fff"><path d="M-22 2 L18 -9 C22 -10 25 -6 22 -4 L3 7 L-2 19 L-7 20 L-5 10 L-14 11 L-19 17 L-22 17 L-20 9 Z"><animateMotion dur="26s" repeatCount="indefinite" rotate="auto"><mpath href="#route"/></animateMotion></path></g>
</svg>`;
}

// 14 days covered by 5 days of clothes and two wash days.
export function washCalendar() {
  const cell = 66, gap = 8, x0 = 24, y0 = 74;
  const cells = Array.from({ length: 14 }, (_, i) => {
    const wash = i === 4 || i === 9;
    const x = x0 + (i % 7) * (cell + gap), y = y0 + Math.floor(i / 7) * (cell + gap);
    return `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="10" fill="${wash ? CORAL : TEAL}" opacity="${wash ? 1 : 0.85}"/>
<text x="${x + cell / 2}" y="${y + 30}" text-anchor="middle" font-size="19" font-weight="700" fill="#fff">${i + 1}</text>
<text x="${x + cell / 2}" y="${y + 50}" text-anchor="middle" font-size="12" fill="#fff">${wash ? "wash" : "wear"}</text>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 260" width="560" height="260" font-family="Arial,sans-serif">
<text x="24" y="32" font-size="19" font-weight="700" fill="${INK}">Five days of clothes covers fourteen days</text>
<text x="24" y="54" font-size="13" fill="${MUTED}">Example plan: wash on days 5 and 10</text>${cells}</svg>`;
}

function hbars(title, sub, rows, max, unit) {
  const left = 190, full = 330, h = 34, gap = 16, top = 76;
  const bars = rows.map((r, i) => {
    const y = top + i * (h + gap), w = Math.max(6, (r.value / max) * full);
    return `<text x="${left - 12}" y="${y + 22}" text-anchor="end" font-size="14" fill="${INK}">${r.label}</text>
<rect x="${left}" y="${y}" width="${w}" height="${h}" rx="4" fill="${r.color}"/>
<text x="${left + w + 8}" y="${y + 22}" font-size="14" font-weight="700" fill="${INK}">${unit}${r.value}</text>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 ${top + rows.length * (h + gap) + 8}" width="580" height="${top + rows.length * (h + gap) + 8}" font-family="Arial,sans-serif">
<text x="24" y="32" font-size="19" font-weight="700" fill="${INK}">${title}</text>
<text x="24" y="54" font-size="13" fill="${MUTED}">${sub}</text>${bars}</svg>`;
}

export const hostelChart = () => hbars("Cost per night for two travellers", "Example prices, not survey data", [
  { label: "Two dorm beds", value: 40, color: TEAL },
  { label: "Private guesthouse room", value: 44, color: CORAL },
  { label: "Budget hotel room", value: 70, color: SKY },
], 80, "$");

export const eatChart = () => hbars("Same meal, three places", "Example prices, not survey data", [
  { label: "Market picnic", value: 4, color: TEAL },
  { label: "Fixed lunch menu", value: 9, color: CORAL },
  { label: "Tourist-street dinner", value: 18, color: SKY },
], 20, "$");

// One month of example fares: a single-hue heat calendar, darker means dearer.
export function fareCalendar() {
  const fares = [212, 188, 171, 168, 240, 262, 251, 205, 176, 164, 159, 233, 271, 246, 214, 181, 169, 172, 228, 255, 249, 198, 166, 158, 170, 222, 268, 243];
  const ramp = (v) => ["#DDF3EF", "#A9E0D6", "#6CC5B9", "#2A9D8F", "#176B62"][Math.min(4, Math.floor(((v - 150) / 130) * 5))];
  const cell = 66, gap = 6, x0 = 24, y0 = 96;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const head = days.map((d, i) => `<text x="${x0 + i * (cell + gap) + cell / 2}" y="86" text-anchor="middle" font-size="12" fill="${MUTED}">${d}</text>`).join("");
  const cells = fares.map((v, i) => {
    const x = x0 + (i % 7) * (cell + gap), y = y0 + Math.floor(i / 7) * (40 + gap);
    return `<rect x="${x}" y="${y}" width="${cell}" height="40" rx="6" fill="${ramp(v)}"/><text x="${x + cell / 2}" y="${y + 25}" text-anchor="middle" font-size="13" font-weight="700" fill="${v > 214 ? "#fff" : INK}">$${v}</text>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 300" width="560" height="300" font-family="Arial,sans-serif">
<text x="24" y="32" font-size="19" font-weight="700" fill="${INK}">Midweek departures can cost less</text>
<text x="24" y="54" font-size="13" fill="${MUTED}">Example fares for one month, not real prices. Darker means dearer.</text>${head}${cells}</svg>`;
}

// Transparent layer for the home hero: a plane flying a dashed route.
export function planeOverlay() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 640" preserveAspectRatio="xMidYMid slice" width="1600" height="640">
<path id="route" d="M-40 540 C340 300 760 90 1040 150 S1420 240 1660 40" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="4 14" stroke-linecap="round" opacity=".55"/>
<path fill="#fff" d="M-22 2 L18 -9 C22 -10 25 -6 22 -4 L3 7 L-2 19 L-7 20 L-5 10 L-14 11 L-19 17 L-22 17 L-20 9 Z"><animateMotion dur="24s" repeatCount="indefinite" rotate="auto"><mpath href="#route"/></animateMotion></path>
</svg>`;
}
