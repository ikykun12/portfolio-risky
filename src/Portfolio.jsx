import { useState } from "react";

const NAV = ["About", "Skills", "Experience", "Education", "Contact"];

const SKILLS_TECH = [
  "Laravel 10", "Tailwind CSS", "React", "Frontend Dev",
  "Jaringan LAN", "Mikrotik", "IT Support", "Git",
  "MS Office", "Canva", "Hardware PC", "Troubleshooting",
];

const SKILLS_SOFT = [
  "Cepat belajar & adaptif",
  "Disiplin & bertanggung jawab",
  "Kerja tim & mandiri",
  "Komunikatif",
  "Teliti & administratif",
];

const EXPERIENCES = [
  { role: "Production Operator & Admin", company: "PT Lesso Technology Indonesia", period: "Mar – Jun 2025", desc: "Mengelola administrasi produksi, akurasi data output, dan operasional komputer di area produksi serta quality control.", accent: "blue" },
  { role: "Teknisi & Admin Warnet", company: "Emporium Internet Cafe", period: "Jan – Feb 2025", desc: "Perawatan hardware & jaringan LAN, mengelola sistem billing, dan IT Support kepada pelanggan.", accent: "blue" },
  { role: "Front End Developer", company: "WeLove – Kampus Startup", period: "Agu 2023 – Apr 2024", desc: "Membangun antarmuka website proyek sosial (limbah skincare) dengan teknologi frontend modern dan komponen UI responsif.", accent: "purple" },
  { role: "Magang Fullstack Web Developer", company: "PT Arkatama Solusindo · BNSP", period: "Jan – Jun 2023", desc: "Website toko online: Laravel 10 + Tailwind CSS. Fitur manajemen produk, keranjang belanja, checkout, autentikasi, Git.", accent: "purple" },
  { role: "Staff IT – PKL", company: "Universitas Bina Darma", period: "Apr – Agu 2018", desc: "Operasional IT kampus, pengawasan jaringan LAN, pendataan aset IT, dan dokumentasi.", accent: "blue" },
];

function getTheme(dark) {
  return dark ? {
    bg: "#0a0a0f", nav: "#0d0d18", navBorder: "#ffffff12",
    card: "#ffffff06", cardBorder: "#ffffff12",
    text: "#fff", textSub: "#999", textMuted: "#555",
    skillBg: "#ffffff08", skillBorder: "#ffffff15", skillText: "#ccc",
    accent1: "#00d4ff", accent2: "#7b2fff",
    toggleBg: "#ffffff12", toggleColor: "#fff",
    footer: "#333", footerBorder: "#ffffff08", softBg: "#7b2fff0d",
  } : {
    bg: "#f4f6fa", nav: "#ffffff", navBorder: "#e0e4ef",
    card: "#ffffff", cardBorder: "#e0e4ef",
    text: "#111", textSub: "#555", textMuted: "#aaa",
    skillBg: "#f0f2f8", skillBorder: "#dde2f0", skillText: "#333",
    accent1: "#0077cc", accent2: "#6200ee",
    toggleBg: "#e0e4ef", toggleColor: "#333",
    footer: "#bbb", footerBorder: "#e0e4ef", softBg: "#6200ee0d",
  };
}

// ── Animated Logo ─────────────────────────────────────────────────────────────
function AnimatedLogo({ size = 80, dark }) {
  const t = getTheme(dark);
  const c = size / 2;
  const r = c - 4;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      style={{ animation: "none" }}>
      <defs>
        <linearGradient id="rp-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={t.accent1} />
          <stop offset="100%" stopColor={t.accent2} />
        </linearGradient>
        <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={t.accent1} stopOpacity={1} />
          <stop offset="100%" stopColor={t.accent2} stopOpacity={0.1} />
        </linearGradient>
      </defs>
      <circle cx={c} cy={c} r={r} fill={dark ? "#ffffff0d" : "#0077cc11"}
        stroke="url(#ring-grad)" strokeWidth={1.5}
        strokeDasharray="8 4"
        style={{ animation: "spin 6s linear infinite", transformOrigin: "center" }} />
      <circle cx={c} cy={c} r={r - 8} fill="url(#rp-grad)" opacity={0.15} />
      <circle cx={c} cy={c} r={r - 8} fill="none" stroke="url(#rp-grad)" strokeWidth={1} />
      <text x={c} y={c + size * 0.08} textAnchor="middle"
        fontSize={size * 0.28} fontWeight={600}
        fill="url(#rp-grad)" fontFamily="system-ui, sans-serif">
        RP
      </text>
    </svg>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({ active, setActive, dark, setDark }) {
  const t = getTheme(dark);
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between flex-wrap gap-2 px-5 py-2"
      style={{ background: t.nav, borderBottom: `1px solid ${t.navBorder}`, transition: "background 0.3s" }}>
      <span className="py-2"><AnimatedLogo size={36} dark={dark} /></span>
      <div className="flex flex-wrap gap-1 items-center">
        {NAV.map((n) => (
          <button key={n} onClick={() => setActive(n)}
            className="px-4 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer"
            style={{
              background: active === n ? t.accent1 + "22" : "transparent",
              border: active === n ? `0.5px solid ${t.accent1}55` : "0.5px solid transparent",
              color: active === n ? t.accent1 : t.textMuted,
            }}>
            {n}
          </button>
        ))}
        <button onClick={() => setDark(!dark)}
          className="ml-2 px-4 py-1.5 rounded-full text-xs cursor-pointer transition-all duration-200"
          style={{ background: t.toggleBg, color: t.toggleColor, border: "none" }}>
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About({ dark }) {
  const t = getTheme(dark);
  return (
    <section className="flex flex-col items-center text-center px-6 py-16 gap-4">
      <AnimatedLogo size={90} dark={dark} />
      <h1 className="text-4xl font-medium tracking-wide" style={{ color: t.text }}>Risky Pranata</h1>
      <p className="text-xs tracking-[4px] uppercase" style={{ color: t.accent1 }}>IT Professional · Web Developer</p>
      <p className="text-sm leading-relaxed max-w-xl" style={{ color: t.textSub }}>
        Lulusan Sarjana Teknik Informatika dengan pengalaman di IT Support, Web Development fullstack,
        dan Production Admin. Kombinasi keahlian teknis dan administratif yang solid dengan IPK 3.47.
      </p>
      <div className="flex flex-wrap gap-2 justify-center mt-2">
        {["085171682004", "riskypranata2020@gmail.com", "Palembang, Sumsel"].map((c) => (
          <span key={c} className="text-xs px-4 py-1.5 rounded-full"
            style={{ border: `0.5px solid ${t.accent1}44`, color: t.accent1, background: t.accent1 + "0d" }}>
            {c}
          </span>
        ))}
      </div>
      <a href="https://www.linkedin.com/in/risky-pranata-423805222/" target="_blank" rel="noreferrer"
        className="mt-4 text-xs px-6 py-2 rounded-full transition-all duration-200 hover:opacity-80"
        style={{ border: `0.5px solid ${t.accent1}55`, color: t.accent1, background: t.accent1 + "0d" }}>
        LinkedIn Profile →
      </a>
    </section>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────────
function Skills({ dark }) {
  const t = getTheme(dark);
  return (
    <section className="px-6 pb-12">
      <p className="text-xs tracking-[3px] uppercase mb-4" style={{ color: t.accent1 }}>Keterampilan Teknis</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
        {SKILLS_TECH.map((s) => (
          <div key={s} className="text-center text-sm py-2.5 px-3 rounded-xl"
            style={{ background: t.skillBg, border: `0.5px solid ${t.skillBorder}`, color: t.skillText }}>
            {s}
          </div>
        ))}
      </div>
      <p className="text-xs tracking-[3px] uppercase mb-4" style={{ color: t.accent2 }}>Keterampilan Pribadi</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {SKILLS_SOFT.map((s) => (
          <div key={s} className="text-sm py-2 px-4 rounded-r-xl"
            style={{ borderLeft: `2px solid ${t.accent2}55`, background: t.softBg, color: t.textSub }}>
            {s}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Experience ────────────────────────────────────────────────────────────────
function Experience({ dark }) {
  const t = getTheme(dark);
  return (
    <section className="px-6 pb-12">
      <p className="text-xs tracking-[3px] uppercase mb-4" style={{ color: t.accent1 }}>Pengalaman Kerja</p>
      <div className="flex flex-col gap-4">
        {EXPERIENCES.map((e, i) => {
          const ac = e.accent === "blue" ? t.accent1 : t.accent2;
          return (
            <div key={i} className="rounded-xl p-5"
              style={{ background: t.card, border: `0.5px solid ${t.cardBorder}`, borderLeft: `2px solid ${ac}` }}>
              <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                <span className="text-sm font-medium" style={{ color: t.text }}>{e.role}</span>
                <span className="text-xs px-3 py-1 rounded-full" style={{ color: ac, background: ac + "18" }}>{e.period}</span>
              </div>
              <p className="text-xs mb-2" style={{ color: t.textMuted }}>{e.company}</p>
              <p className="text-sm leading-relaxed" style={{ color: t.textSub }}>{e.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Education ─────────────────────────────────────────────────────────────────
function Education({ dark }) {
  const t = getTheme(dark);
  return (
    <section className="px-6 pb-12">
      <p className="text-xs tracking-[3px] uppercase mb-4" style={{ color: t.accent1 }}>Pendidikan</p>
      <div className="rounded-xl p-6"
        style={{ background: t.card, border: `0.5px solid ${t.cardBorder}`, borderLeft: `2px solid ${t.accent2}` }}>
        <h3 className="text-base font-medium" style={{ color: t.text }}>Sarjana Teknik Informatika</h3>
        <p className="text-xs mt-1" style={{ color: t.textMuted }}>Indo Global Mandiri University — Palembang · 2020–2024</p>
        <p className="text-xs mt-1 mb-3" style={{ color: t.textMuted }}>
          Grafika Komputer · Jaringan Komputer · Arsitektur Komputer · Interaksi Manusia & Komputer
        </p>
        <span className="text-xs px-3 py-1 rounded-full" style={{ color: t.accent2, background: t.accent2 + "18" }}>
          IPK 3.47 / 4.00
        </span>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact({ dark }) {
  const t = getTheme(dark);
  const items = [
    {
      label: "WhatsApp", value: "085171682004",
      href: "https://wa.me/6285171682004",
      badge: "Klik untuk chat",
      badgeColor: "#25D366",
      iconColor: "#25D366",
    },
    {
      label: "Email", value: "riskypranata2020@gmail.com",
      href: "mailto:riskypranata2020@gmail.com",
      badge: "Kirim email",
      badgeColor: t.accent1,
      iconColor: t.accent1,
    },
    {
      label: "Alamat", value: "Palembang, Sumatera Selatan",
      href: null, badge: null, badgeColor: null, iconColor: t.textMuted,
    },
  ];

  return (
    <section className="px-6 pb-12 flex flex-col items-center">
      <p className="text-xs tracking-[3px] uppercase mb-6" style={{ color: t.accent1 }}>Hubungi Saya</p>
      <div className="flex flex-col gap-3 w-full max-w-md">
        {items.map((c) => {
          const card = (
            <div key={c.label}
              className="rounded-xl px-4 py-3 transition-all duration-200"
              style={{
                background: t.card, border: `0.5px solid ${t.cardBorder}`,
                cursor: c.href ? "pointer" : "default",
              }}>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: t.textMuted }}>{c.label}</span>
                {c.badge && (
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ color: c.badgeColor, background: c.badgeColor + "20" }}>
                    {c.badge}
                  </span>
                )}
              </div>
              <p className="text-sm mt-1" style={{ color: t.textSub }}>{c.value}</p>
            </div>
          );
          return c.href
            ? <a key={c.label} href={c.href} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>{card}</a>
            : <div key={c.label}>{card}</div>;
        })}
        <a href="https://www.linkedin.com/in/risky-pranata-423805222/" target="_blank" rel="noreferrer"
          className="mt-2 text-center text-sm py-2.5 rounded-full transition-all duration-200 hover:opacity-80"
          style={{ border: `0.5px solid ${t.accent1}55`, color: t.accent1, background: t.accent1 + "0d", textDecoration: "none", display: "block" }}>
          LinkedIn Profile →
        </a>
      </div>
    </section>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
const SECTIONS = { About, Skills, Experience, Education, Contact };

export default function Portfolio() {
  const [active, setActive] = useState("About");
  const [dark, setDark] = useState(true);
  const t = getTheme(dark);
  const Section = SECTIONS[active];

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <div className="min-h-screen"
        style={{ background: t.bg, fontFamily: "system-ui, sans-serif", transition: "background 0.3s" }}>
        <Navbar active={active} setActive={setActive} dark={dark} setDark={setDark} />
        <main className="max-w-3xl mx-auto pt-4">
          <Section dark={dark} />
        </main>
        <footer className="text-center text-xs py-4"
          style={{ color: t.footer, borderTop: `0.5px solid ${t.footerBorder}` }}>
          © 2025 Risky Pranata · Built with React + Tailwind CSS
        </footer>
      </div>
    </>
  );
}
