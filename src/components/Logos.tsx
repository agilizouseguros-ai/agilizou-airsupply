import agilizouSrc from "@/assets/agilizou-logo.png";
import airsupplySrc from "@/assets/airsupply-logo.png";

export function AgilizouLogo({ className = "", height = 40 }: { className?: string; height?: number }) {
  return (
    <img
      src={agilizouSrc}
      alt="Agilizou Seguros"
      height={height}
      style={{ height, width: "auto" }}
      className={`object-contain select-none ${className}`}
      draggable={false}
    />
  );
}

export function AirsupplyLogo({
  className = "",
  variant = "dark",
  height = 36,
}: {
  className?: string;
  variant?: "dark" | "light";
  height?: number;
}) {
  return (
    <img
      src={airsupplySrc}
      alt="AIRSUPPLY Transporte e Logística"
      height={height}
      style={{
        height,
        width: "auto",
        filter: variant === "light" ? "brightness(0) invert(1)" : "none",
      }}
      className={`object-contain select-none ${className}`}
      draggable={false}
    />
  );
}
