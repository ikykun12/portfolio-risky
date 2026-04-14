import { useState, useEffect } from "react";
import foto from "./assets/foto.jpg";

const NAV = ["About", "Skills", "Experience", "Education", "Contact"];

const SKILLS_TECH = [
  "Jaringan LAN", "Mikrotik", "IT Support", "Git",
  "MS Office", "Canva", "Hardware PC", "Troubleshooting" ,"Software PC",
  "Laravel", "Tailwind CSS", "React", "Frontend Dev",
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

const  EDUCATION = [
  { education: "Sarjana Teknik Informatika", universitas: "Indo Global Mandiri University — Palembang ", years: "2020 - 2024", coursework: "Mata Kuliah Relevan :  IT Support,Computer Networking, Operating Systems, atau Hardware Troubleshooting.", accent: "blue" },
  { education: "Teknik Komputer dan Jaringan", universitas: "SMK NEGERI 8 PALEMBANG ", years: "2017 - 2019", coursework: "Mata Kuliah Relevan :  Administrasi Infrastruktur Jaringan, Perakitan Komputer, atau Keamanan Jaringan.", accent: "purple" },
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

// ── Typing Effect Hook ────────────────────────────────────────────────────────
function useTyping(text, speed = 80, delay = 500) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text]);
  return { displayed, done };
}

// ── Animated Logo ─────────────────────────────────────────────────────────────
function AnimatedLogo({ size = 80, dark }) {
  const t = getTheme(dark);
  const c = size / 2;
  const r = c - 4;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
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
        stroke="url(#ring-grad)" strokeWidth={1.5} strokeDasharray="8 4"
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

// ── About (dengan foto + animasi) ─────────────────────────────────────────────
function About({ dark }) {
  const t = getTheme(dark);
  const [show, setShow] = useState(false);
  const { displayed, done } = useTyping("Risky Pranata", 100, 300);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="flex flex-col items-center text-center px-6 py-16 gap-4">

      {/* Foto Profil dengan animasi glow */}
      <div style={{
        opacity: show ? 1 : 0,
        transform: show ? "scale(1)" : "scale(0.8)",
        transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        position: "relative",
        marginBottom: "0.5rem",
      }}>
        {/* Ring animasi di belakang foto */}
        <div style={{
          position: "absolute", inset: -4,
          borderRadius: "50%",
          background: `conic-gradient(${t.accent1}, ${t.accent2}, ${t.accent1})`,
          animation: "spin 4s linear infinite",
          zIndex: 0,
        }} />
        <div style={{
          position: "absolute", inset: -2,
          borderRadius: "50%",
          background: t.bg,
          zIndex: 1,
        }} />
        <img
          src={foto}
          alt="Risky Pranata"
          style={{
            width: 120, height: 120,
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "top",
            position: "relative",
            zIndex: 2,
            border: `2px solid ${t.accent1}44`,
          }}
        />
      </div>

      {/* Nama dengan typing effect */}
      <h1 style={{
        fontSize: 32, fontWeight: 500, color: t.text, margin: 0,
        minHeight: 40,
        opacity: show ? 1 : 0,
        transition: "opacity 0.5s ease 0.2s",
      }}>
        {displayed}
        {!done && (
          <span style={{
            display: "inline-block", width: 2, height: "1em",
            background: t.accent1, marginLeft: 2,
            animation: "blink 0.8s step-end infinite",
            verticalAlign: "middle",
          }} />
        )}
      </h1>

      {/* Tagline */}
      <p style={{
        fontSize: 15, letterSpacing: 4, color: t.accent1, textTransform: "uppercase",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.5s ease 0.5s",
      }}>
      IT Support
      </p>

      {/* Bio */}
      <p style={{
        fontSize: 15, color: t.textSub, maxWidth: 540, lineHeight: 1.8,
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.5s ease 0.7s",
      }}>
        Lulusan Sarjana Teknik Informatika yang memiliki pengalaman kerja sebagai Production Operator
        & Admin di industri manufaktur. Memiliki kombinasi keahlian teknis dalam operasional mesin,
        ketelitian administratif, serta pemahaman mendalam pada perangkat keras dan lunak komputer.
        Terbiasa bekerja dengan target produksi, mahir menggunakan software pendukung (Canva/MS
        Office), dan memiliki kemampuan troubleshooting yang cepat untuk memastikan kelancaran
        proses produksi digital.
      </p>

      {/* Contact pills */}
      <div style={{
        display: "flex", gap: 15, justifyContent: "center", flexWrap: "wrap",
        opacity: show ? 2 : 0,
        transform: show ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.5s ease 0.9s",
      }}>
        {["085171682004", "riskypranata2020@gmail.com", "Palembang, Sumsel"].map((c) => (
          <span key={c} style={{
            fontSize: 15, padding: "5px 14px",
            border: `0.5px solid ${t.accent1}44`,
            borderRadius: 20, color: t.accent1, background: t.accent1 + "0d",
          }}>
            {c}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div style={{
        display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.5s ease 1.1s",
      }}>
        <a href="https://www.linkedin.com/in/risky-pranata-423805222/"
          target="_blank" rel="noreferrer"
          style={{
            padding: "8px 20px",
            border: `0.5px solid ${t.accent1}55`,
            borderRadius: 20, color: t.accent1, fontSize: 13,
            textDecoration: "none", background: t.accent1 + "0d",
            transition: "all 0.2s",
          }}>
          LinkedIn Profile →
        </a>
        <a href="/cv.pdf" download
          style={{
            padding: "8px 20px",
            border: `0.5px solid ${t.accent2}55`,
            borderRadius: 20, color: t.accent2, fontSize: 13,
            textDecoration: "none", background: t.accent2 + "0d",
            transition: "all 0.2s",
          }}>
          Download CV ↓
        </a>
      </div>
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
          <div key={s} className="text-center text-sm py-2.5 px-3 rounded-xl transition-all duration-200 hover:scale-105"
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
            <div key={i} className="rounded-xl p-5 transition-all duration-200 hover:scale-[1.01]"
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
      <div className="flex flex-col gap-2">
        {EDUCATION.map((e, i) => {
          const ac = e.accent === "color-#0077cc" ? t.accent1 : t.accent2;
          return (
            <div key={i} className="rounded-xl p-5 transition-all duration-200 hover:scale-[1.01]"
              style={{ background: t.card, border: `0.5px solid ${t.cardBorder}`, borderLeft: `2px solid ${ac}` }}>
              <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                <span className="text-sm font-medium" style={{ color: t.text }}>{e.education}</span>
                <span className="text-xs px-3 py-1 rounded-full" style={{ color: ac, background: ac + "18" }}>{e.years}</span>
              </div>
              <p className="text-xs mb-2" style={{ color: t.textMuted }}>{e.universitas}</p>
              <p className="text-sm leading-relaxed" style={{ color: t.textSub }}>{e.coursework}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}


// ── Contact ───────────────────────────────────────────────────────────────────
function Contact({ dark }) {
  const t = getTheme(dark);
  const items = [
    { label: "WhatsApp", value: "085171682004", href: "https://wa.me/6285171682004", badge: "Klik untuk chat", badgeColor: "#25D366" },
    { label: "Email", value: "riskypranata2020@gmail.com", href: "mailto:riskypranata2020@gmail.com", badge: "Kirim email", badgeColor: t.accent1 },
    { label: "Alamat", value: "Palembang, Sumatera Selatan", href: null, badge: null, badgeColor: null },
  ];
  return (
    <section className="px-6 pb-12 flex flex-col items-center">
      <p className="text-xs tracking-[3px] uppercase mb-6" style={{ color: t.accent1 }}>Hubungi Saya</p>
      <div className="flex flex-col gap-3 w-full max-w-md">
        {items.map((c) => {
          const card = (
            <div key={c.label} className="rounded-xl px-4 py-3 transition-all duration-200 hover:scale-[1.02]"
              style={{ background: t.card, border: `0.5px solid ${t.cardBorder}`, cursor: c.href ? "pointer" : "default" }}>
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
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
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
