import { useState, useEffect, useRef } from "react";
import foto from "./assets/foto.jpg";

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV = ["About", "Skills", "Experience", "Education", "Portfolio", "Contact"];

const SKILLS_TECH = [
  { name: "Jaringan LAN",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", category: "network" },
  { name: "Mikrotik",        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mikrotik-logo.svg/1200px-Mikrotik-logo.svg.png", category: "network" },
  { name: "IT Support",      icon: "https://cdn-icons-png.flaticon.com/512/2920/2920277.png", category: "network" },
  { name: "Git",             icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "dev" },
  { name: "MS Office",       icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg/1200px-Microsoft_Office_logo_%282019%E2%80%93present%29.svg.png", category: "tools" },
  { name: "Canva",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg", category: "tools" },
  { name: "Hardware PC",     icon: "https://cdn-icons-png.flaticon.com/512/2920/2920349.png", category: "network" },
  { name: "Troubleshooting", icon: "https://cdn-icons-png.flaticon.com/512/1336/1336494.png", category: "network" },
  { name: "Software PC",     icon: "https://cdn-icons-png.flaticon.com/512/709/709699.png", category: "tools" },
  { name: "Laravel",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", category: "dev" },
  { name: "Tailwind CSS",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", category: "dev" },
  { name: "React",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "dev" },
  { name: "Frontend Dev",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", category: "dev" },
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

const EDUCATION = [
  { education: "Sarjana Teknik Informatika", universitas: "Indo Global Mandiri University — Palembang", years: "2020 - 2024", coursework: "Mata Kuliah Relevan: IT Support, Computer Networking, Operating Systems, Hardware Troubleshooting.", accent: "blue" },
  { education: "Teknik Komputer dan Jaringan", universitas: "SMK NEGERI 8 PALEMBANG", years: "2017 - 2019", coursework: "Mata Kuliah Relevan: Administrasi Infrastruktur Jaringan, Perakitan Komputer, Keamanan Jaringan.", accent: "purple" },
];

// ── Ganti dengan project kamu sendiri ──
const PORTFOLIO_PROJECTS = [
  {
    title: "WeLove – Social Web App",
    desc: "Website proyek sosial daur ulang limbah skincare. Dibangun dengan React dan komponen UI responsif.",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&q=80",
    github: "https://github.com/riskypranata",
    live: null,
    tags: ["React", "Tailwind CSS", "Frontend"],
    accent: "blue",
  },
  {
    title: "Toko Online – Laravel",
    desc: "E-commerce dengan manajemen produk, keranjang belanja, checkout, dan autentikasi user.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
    github: "https://github.com/riskypranata",
    live: null,
    tags: ["Laravel 10", "Tailwind CSS", "Git"],
    accent: "purple",
  },
  {
    title: "Portfolio Website",
    desc: "Website portfolio pribadi dengan dark/light mode, animasi, dan desain responsif.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80",
    github: "https://github.com/riskypranata",
    live: null,
    tags: ["React", "Tailwind CSS"],
    accent: "blue",
  },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/risky-pranata-423805222/", icon: "in" },
  { label: "GitHub",   href: "https://github.com/riskypranata",                      icon: "gh" },
  { label: "WhatsApp", href: "https://wa.me/6285171682004",                           icon: "wa" },
  { label: "Email",    href: "mailto:riskypranata2020@gmail.com",                     icon: "em" },
];

// ── Theme ──────────────────────────────────────────────────────────────────────
function getTheme(dark) {
  return dark ? {
    bg: "#0a0a0f", nav: "#0d0d18", navBorder: "#ffffff12",
    card: "#ffffff06", cardBorder: "#ffffff12",
    text: "#fff", textSub: "#999", textMuted: "#555",
    skillBg: "#ffffff08", skillBorder: "#ffffff15", skillText: "#ccc",
    accent1: "#00d4ff", accent2: "#7b2fff",
    toggleBg: "#ffffff12", toggleColor: "#fff",
    footer: "#555", footerBorder: "#ffffff08", softBg: "#7b2fff0d",
    hamburger: "#fff", overlay: "#0a0a0fee",
  } : {
    bg: "#f4f6fa", nav: "#ffffff", navBorder: "#e0e4ef",
    card: "#ffffff", cardBorder: "#e0e4ef",
    text: "#111", textSub: "#555", textMuted: "#aaa",
    skillBg: "#f0f2f8", skillBorder: "#dde2f0", skillText: "#333",
    accent1: "#0077cc", accent2: "#6200ee",
    toggleBg: "#e0e4ef", toggleColor: "#333",
    footer: "#999", footerBorder: "#e0e4ef", softBg: "#6200ee0d",
    hamburger: "#111", overlay: "#f4f6faee",
  };
}

// ── Hooks ──────────────────────────────────────────────────────────────────────
function useTyping(text, speed = 80, delay = 500) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed(""); setDone(false);
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text]);
  return { displayed, done };
}

// ── Animated Logo ──────────────────────────────────────────────────────────────
function AnimatedLogo({ size = 36, dark }) {
  const t = getTheme(dark);
  const c = size / 2, r = c - 4;
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
        fill="url(#rp-grad)" fontFamily="system-ui, sans-serif">RP</text>
    </svg>
  );
}

// ── Hamburger Icon ─────────────────────────────────────────────────────────────
function HamburgerIcon({ open, color }) {
  return (
    <div style={{ width: 24, height: 20, position: "relative", cursor: "pointer" }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{
          display: "block",
          position: "absolute",
          height: 2,
          width: i === 1 ? (open ? "0%" : "75%") : "100%",
          background: color,
          borderRadius: 2,
          top: i === 0 ? 0 : i === 1 ? 9 : 18,
          left: 0,
          transformOrigin: i === 0 ? "0% 50%" : i === 2 ? "0% 50%" : "center",
          transform: open
            ? i === 0 ? "rotate(45deg) translate(1px, -1px)"
            : i === 1 ? "scaleX(0)"
            : "rotate(-45deg) translate(1px, 1px)"
            : "none",
          opacity: (open && i === 1) ? 0 : 1,
          transition: "all 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
        }} />
      ))}
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────
function Navbar({ active, setActive, dark, setDark }) {
  const t = getTheme(dark);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleNav = (n) => { setActive(n); setMenuOpen(false); };

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: t.nav, borderBottom: `1px solid ${t.navBorder}`,
        transition: "background 0.3s",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "8px 20px",
      }}>
        <AnimatedLogo size={36} dark={dark} />

        {/* Desktop Nav */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" }}>
            {NAV.map((n) => (
              <button key={n} onClick={() => handleNav(n)}
                style={{
                  padding: "6px 16px", borderRadius: 999, fontSize: 12,
                  cursor: "pointer", transition: "all 0.2s",
                  background: active === n ? t.accent1 + "22" : "transparent",
                  border: active === n ? `0.5px solid ${t.accent1}55` : "0.5px solid transparent",
                  color: active === n ? t.accent1 : t.textMuted,
                }}>
                {n}
              </button>
            ))}
            <button onClick={() => setDark(!dark)}
              style={{
                marginLeft: 8, padding: "6px 16px", borderRadius: 999,
                fontSize: 12, cursor: "pointer", transition: "all 0.2s",
                background: t.toggleBg, color: t.toggleColor, border: "none",
              }}>
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        )}

        {/* Mobile: dark toggle + hamburger */}
        {isMobile && (
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button onClick={() => setDark(!dark)}
              style={{
                padding: "5px 12px", borderRadius: 999,
                fontSize: 11, cursor: "pointer",
                background: t.toggleBg, color: t.toggleColor, border: "none",
              }}>
              {dark ? "☀️" : "🌙"}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", padding: 4, cursor: "pointer" }}>
              <HamburgerIcon open={menuOpen} color={t.hamburger} />
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: t.overlay,
          backdropFilter: "blur(12px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 16,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity 0.3s ease",
        }}>
          {NAV.map((n, i) => (
            <button key={n} onClick={() => handleNav(n)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 28, fontWeight: 500, letterSpacing: 2,
                color: active === n ? t.accent1 : t.text,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.4s ease ${i * 0.07}s`,
                fontFamily: "system-ui, sans-serif",
              }}>
              {n}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

// ── About ──────────────────────────────────────────────────────────────────────
function About({ dark }) {
  const t = getTheme(dark);
  const [show, setShow] = useState(false);
  const { displayed, done } = useTyping("Risky Pranata", 100, 300);
  useEffect(() => { const id = setTimeout(() => setShow(true), 100); return () => clearTimeout(id); }, []);

  return (
    <section id="About" className="flex flex-col items-center text-center px-6 py-16 gap-4">
      {/* Foto */}
      <div style={{
        opacity: show ? 1 : 0, transform: show ? "scale(1)" : "scale(0.8)",
        transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1)", position: "relative", marginBottom: "0.5rem",
      }}>
        <div style={{
          position: "absolute", inset: -4, borderRadius: "50%",
          background: `conic-gradient(${t.accent1}, ${t.accent2}, ${t.accent1})`,
          animation: "spin 4s linear infinite", zIndex: 0,
        }} />
        <div style={{ position: "absolute", inset: -2, borderRadius: "50%", background: t.bg, zIndex: 1 }} />
        <img src={foto} alt="Risky Pranata" style={{
          width: 120, height: 120, borderRadius: "50%", objectFit: "cover", objectPosition: "top",
          position: "relative", zIndex: 2, border: `2px solid ${t.accent1}44`,
        }} />
      </div>

      {/* Nama */}
      <h1 style={{ fontSize: 32, fontWeight: 500, color: t.text, margin: 0, minHeight: 40, opacity: show ? 1 : 0, transition: "opacity 0.5s ease 0.2s" }}>
        {displayed}
        {!done && <span style={{ display: "inline-block", width: 2, height: "1em", background: t.accent1, marginLeft: 2, animation: "blink 0.8s step-end infinite", verticalAlign: "middle" }} />}
      </h1>

      {/* Tagline */}
      <p style={{ fontSize: 15, letterSpacing: 4, color: t.accent1, textTransform: "uppercase", opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(10px)", transition: "all 0.5s ease 0.5s" }}>
        IT Support
      </p>

      {/* Bio */}
      <p style={{ fontSize: 15, color: t.textSub, maxWidth: 540, lineHeight: 1.8, opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(10px)", transition: "all 0.5s ease 0.7s" }}>
        Lulusan Sarjana Teknik Informatika yang memiliki pengalaman kerja sebagai Production Operator & Admin di industri manufaktur. Memiliki kombinasi keahlian teknis dalam operasional mesin, ketelitian administratif, serta pemahaman mendalam pada perangkat keras dan lunak komputer.
      </p>

      {/* Contact pills */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(10px)", transition: "all 0.5s ease 0.9s" }}>
        {["085171682004", "riskypranata2020@gmail.com", "Palembang, Sumsel"].map((c) => (
          <span key={c} style={{ fontSize: 13, padding: "5px 14px", border: `0.5px solid ${t.accent1}44`, borderRadius: 20, color: t.accent1, background: t.accent1 + "0d" }}>{c}</span>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(10px)", transition: "all 0.5s ease 1.1s" }}>
        <a href="https://www.linkedin.com/in/risky-pranata-423805222/" target="_blank" rel="noreferrer"
          style={{ padding: "8px 20px", border: `0.5px solid ${t.accent1}55`, borderRadius: 20, color: t.accent1, fontSize: 13, textDecoration: "none", background: t.accent1 + "0d" }}>
          LinkedIn Profile →
        </a>
        {/* 
          ✅ GANTI "/cv-risky-pranata.pdf" dengan path file PDF kamu
          Letakkan file PDF di folder /public/  
          Contoh: public/cv-risky-pranata.pdf → href="/cv-risky-pranata.pdf"
        */}
        <a href="/cv-risky-pranata.pdf" download="CV-Risky-Pranata.pdf"
          style={{ padding: "8px 20px", border: `0.5px solid ${t.accent2}55`, borderRadius: 20, color: t.accent2, fontSize: 13, textDecoration: "none", background: t.accent2 + "0d" }}>
          Download CV ↓
        </a>
      </div>
    </section>
  );
}

// ── Skills ─────────────────────────────────────────────────────────────────────
function Skills({ dark }) {
  const t = getTheme(dark);
  return (
    <section id="Skills" className="px-6 pb-12">
      <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16, color: t.accent1 }}>Keterampilan Teknis</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 12, marginBottom: 32 }}>
        {SKILLS_TECH.map((s) => (
          <div key={s.name}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              padding: "14px 10px", borderRadius: 12, textAlign: "center",
              background: t.skillBg, border: `0.5px solid ${t.skillBorder}`,
              cursor: "default", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.07)"; e.currentTarget.style.borderColor = t.accent1 + "55"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.borderColor = t.skillBorder; }}
          >
            <img src={s.icon} alt={s.name}
              style={{ width: 36, height: 36, objectFit: "contain" }}
              onError={e => { e.target.style.display = "none"; }}
            />
            <span style={{ fontSize: 11, color: t.skillText, lineHeight: 1.3 }}>{s.name}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16, color: t.accent2 }}>Keterampilan Pribadi</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8 }}>
        {SKILLS_SOFT.map((s) => (
          <div key={s} style={{ fontSize: 14, padding: "8px 16px", borderRadius: "0 12px 12px 0", borderLeft: `2px solid ${t.accent2}55`, background: t.softBg, color: t.textSub }}>{s}</div>
        ))}
      </div>
    </section>
  );
}

// ── Experience ─────────────────────────────────────────────────────────────────
function Experience({ dark }) {
  const t = getTheme(dark);
  return (
    <section id="Experience" className="px-6 pb-12">
      <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16, color: t.accent1 }}>Pengalaman Kerja</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {EXPERIENCES.map((e, i) => {
          const ac = e.accent === "blue" ? t.accent1 : t.accent2;
          return (
            <div key={i} style={{
              padding: "16px 20px", borderRadius: 12, background: t.card,
              border: `0.5px solid ${t.cardBorder}`, borderLeft: `2px solid ${ac}`,
              transition: "all 0.2s",
            }}
              onMouseEnter={ev => ev.currentTarget.style.transform = "scale(1.01)"}
              onMouseLeave={ev => ev.currentTarget.style.transform = "scale(1)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: t.text }}>{e.role}</span>
                <span style={{ fontSize: 12, padding: "2px 12px", borderRadius: 999, color: ac, background: ac + "18" }}>{e.period}</span>
              </div>
              <p style={{ fontSize: 12, color: t.textMuted, marginBottom: 4 }}>{e.company}</p>
              <p style={{ fontSize: 14, color: t.textSub, lineHeight: 1.6 }}>{e.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Education ──────────────────────────────────────────────────────────────────
function Education({ dark }) {
  const t = getTheme(dark);
  return (
    <section id="Education" className="px-6 pb-12">
      <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16, color: t.accent1 }}>Pendidikan</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {EDUCATION.map((e, i) => {
          const ac = i === 0 ? t.accent1 : t.accent2;
          return (
            <div key={i} style={{
              padding: "16px 20px", borderRadius: 12, background: t.card,
              border: `0.5px solid ${t.cardBorder}`, borderLeft: `2px solid ${ac}`,
              transition: "all 0.2s",
            }}
              onMouseEnter={ev => ev.currentTarget.style.transform = "scale(1.01)"}
              onMouseLeave={ev => ev.currentTarget.style.transform = "scale(1)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: t.text }}>{e.education}</span>
                <span style={{ fontSize: 12, padding: "2px 12px", borderRadius: 999, color: ac, background: ac + "18" }}>{e.years}</span>
              </div>
              <p style={{ fontSize: 12, color: t.textMuted, marginBottom: 4 }}>{e.universitas}</p>
              <p style={{ fontSize: 14, color: t.textSub, lineHeight: 1.6 }}>{e.coursework}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Portfolio ──────────────────────────────────────────────────────────────────
function PortfolioSection({ dark }) {
  const t = getTheme(dark);
  return (
    <section id="Portfolio" className="px-6 pb-12">
      <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16, color: t.accent1 }}>Portfolio & Proyek</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {PORTFOLIO_PROJECTS.map((p, i) => {
          const ac = p.accent === "blue" ? t.accent1 : t.accent2;
          return (
            <div key={i} style={{
              borderRadius: 14, overflow: "hidden",
              background: t.card, border: `0.5px solid ${t.cardBorder}`,
              transition: "all 0.25s",
            }}
              onMouseEnter={ev => { ev.currentTarget.style.transform = "translateY(-4px)"; ev.currentTarget.style.borderColor = ac + "55"; }}
              onMouseLeave={ev => { ev.currentTarget.style.transform = "translateY(0)"; ev.currentTarget.style.borderColor = t.cardBorder; }}
            >
              {/* Project Image */}
              <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
                <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"}
                />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 50%, ${t.card}dd)` }} />
              </div>

              {/* Content */}
              <div style={{ padding: "14px 16px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 6 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: t.textSub, lineHeight: 1.6, marginBottom: 10 }}>{p.desc}</p>

                {/* Tags */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                  {p.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: 11, padding: "2px 10px", borderRadius: 999, color: ac, background: ac + "18", border: `0.5px solid ${ac}33` }}>{tag}</span>
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: "flex", gap: 8 }}>
                  <a href={p.github} target="_blank" rel="noreferrer"
                    style={{ flex: 1, textAlign: "center", padding: "7px 12px", borderRadius: 8, fontSize: 12, textDecoration: "none", color: t.text, background: t.skillBg, border: `0.5px solid ${t.skillBorder}` }}>
                    ⌥ GitHub
                  </a>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer"
                      style={{ flex: 1, textAlign: "center", padding: "7px 12px", borderRadius: 8, fontSize: 12, textDecoration: "none", color: ac, background: ac + "18", border: `0.5px solid ${ac}44` }}>
                      🔗 Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Contact ────────────────────────────────────────────────────────────────────
function Contact({ dark }) {
  const t = getTheme(dark);
  const items = [
    { label: "WhatsApp", value: "085171682004", href: "https://wa.me/6285171682004", badge: "Klik untuk chat", badgeColor: "#25D366" },
    { label: "Email", value: "riskypranata2020@gmail.com", href: "mailto:riskypranata2020@gmail.com", badge: "Kirim email", badgeColor: t.accent1 },
    { label: "Alamat", value: "Palembang, Sumatera Selatan", href: null, badge: null, badgeColor: null },
  ];
  return (
    <section id="Contact" className="px-6 pb-12 flex flex-col items-center">
      <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 24, color: t.accent1 }}>Hubungi Saya</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 440 }}>
        {items.map((c) => {
          const card = (
            <div key={c.label} style={{
              padding: "10px 16px", borderRadius: 12, background: t.card,
              border: `0.5px solid ${t.cardBorder}`, cursor: c.href ? "pointer" : "default",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => c.href && (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: t.textMuted }}>{c.label}</span>
                {c.badge && <span style={{ fontSize: 11, padding: "2px 10px", borderRadius: 999, color: c.badgeColor, background: c.badgeColor + "20" }}>{c.badge}</span>}
              </div>
              <p style={{ fontSize: 14, marginTop: 2, color: t.textSub }}>{c.value}</p>
            </div>
          );
          return c.href
            ? <a key={c.label} href={c.href} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>{card}</a>
            : <div key={c.label}>{card}</div>;
        })}
        <a href="https://www.linkedin.com/in/risky-pranata-423805222/" target="_blank" rel="noreferrer"
          style={{ marginTop: 8, textAlign: "center", fontSize: 14, padding: "10px", borderRadius: 999, border: `0.5px solid ${t.accent1}55`, color: t.accent1, background: t.accent1 + "0d", textDecoration: "none", display: "block" }}>
          LinkedIn Profile →
        </a>
      </div>
    </section>
  );
}

// ── Social Icon SVGs ───────────────────────────────────────────────────────────
function SocialIcon({ icon, color }) {
  const style = { width: 18, height: 18, fill: color };
  if (icon === "in") return (
    <svg viewBox="0 0 24 24" style={style}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
  );
  if (icon === "gh") return (
    <svg viewBox="0 0 24 24" style={style}><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
  );
  if (icon === "wa") return (
    <svg viewBox="0 0 24 24" style={style}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  );
  return (
    <svg viewBox="0 0 24 24" style={style}><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.910 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer({ dark }) {
  const t = getTheme(dark);
  return (
    <footer style={{
      borderTop: `0.5px solid ${t.footerBorder}`,
      padding: "24px 20px",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
    }}>
      {/* Social icons */}
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {SOCIAL_LINKS.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
            title={s.label}
            style={{
              width: 38, height: 38, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: t.skillBg, border: `0.5px solid ${t.skillBorder}`,
              textDecoration: "none", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = t.accent1 + "22"; e.currentTarget.style.borderColor = t.accent1 + "55"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = t.skillBg; e.currentTarget.style.borderColor = t.skillBorder; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <SocialIcon icon={s.icon} color={t.textMuted} />
          </a>
        ))}
      </div>

      <p style={{ fontSize: 12, color: t.footer, textAlign: "center" }}>
        © 2025 Risky Pranata · Built with React + Tailwind CSS
      </p>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────
const SECTIONS = { About, Skills, Experience, Education, Portfolio: PortfolioSection, Contact };

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
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
      <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "system-ui, sans-serif", transition: "background 0.3s" }}>
        <Navbar active={active} setActive={setActive} dark={dark} setDark={setDark} />
        <main style={{ maxWidth: 860, margin: "0 auto", paddingTop: 16 }}>
          <Section dark={dark} />
        </main>
        <Footer dark={dark} />
      </div>
    </>
  );
}
