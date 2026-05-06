export function AgilizouLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-9 w-9 rounded-xl bg-gradient-orange shadow-glow-orange flex items-center justify-center">
        <span className="text-primary-foreground font-display font-bold text-lg">A</span>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display font-bold text-[1.05rem] text-brand-navy tracking-tight">Agilizou</span>
        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-brand-orange font-semibold">Seguros</span>
      </div>
    </div>
  );
}

export function AirsupplyLogo({ className = "", variant = "dark" }: { className?: string; variant?: "dark" | "light" }) {
  const text = variant === "dark" ? "text-brand-navy" : "text-white";
  const sub = variant === "dark" ? "text-muted-foreground" : "text-white/70";
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-9 w-9 rounded-xl bg-[oklch(0.30_0.02_270)] flex items-center justify-center border border-white/10">
        <span className="text-white font-display font-black text-lg">A</span>
        <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[oklch(0.58_0.22_27)]" />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-display font-bold text-[1.05rem] tracking-tight ${text}`}>AIRSUPPLY</span>
        <span className={`text-[0.6rem] uppercase tracking-[0.18em] font-semibold ${sub}`}>Transporte & Logística</span>
      </div>
    </div>
  );
}
