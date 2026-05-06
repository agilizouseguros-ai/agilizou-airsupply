import { useEffect, useState } from "react";
import { AgilizouLogo, AirsupplyLogo } from "./Logos";

const links = [
  { label: "Benefícios", href: "#beneficios" },
  { label: "Produtos", href: "#produtos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? "glass shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between h-20">
        <div className="flex items-center gap-[14px]">
          <AgilizouLogo width={115} />
          <span
            className="hidden sm:inline-block uppercase"
            style={{ fontSize: "11px", letterSpacing: "2px", fontWeight: 600, color: "#6b7280" }}
          >
            PARCEIRA
          </span>
          <span className="hidden sm:block">
            <AirsupplyLogo width={125} />
          </span>
        </div>
        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/80 hover:text-brand-orange transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#formulario"
          className="hidden md:inline-flex items-center rounded-full bg-gradient-orange px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow-orange hover:scale-105 transition-transform"
        >
          Quero meu benefício
        </a>
      </div>
    </header>
  );
}
