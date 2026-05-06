import agilizouSrc from "@/assets/agilizou-logo.png";
import airsupplySrc from "@/assets/airsupply-logo.png";

export function AgilizouLogo({
  className = "",
  width = 140,
}: {
  className?: string;
  width?: number;
}) {
  return (
    <img
      src={agilizouSrc}
      alt="Agilizou Seguros"
      style={{ width, height: "auto" }}
      className={`object-contain select-none ${className}`}
      draggable={false}
    />
  );
}

export function AirsupplyLogo({
  className = "",
  variant = "dark",
  width = 160,
}: {
  className?: string;
  variant?: "dark" | "light";
  width?: number;
}) {
  return (
    <img
      src={airsupplySrc}
      alt="AIRSUPPLY Transporte e Logística"
      style={{
        width,
        height: "auto",
        filter: variant === "light" ? "brightness(0) invert(1)" : "none",
      }}
      className={`object-contain select-none ${className}`}
      draggable={false}
    />
  );
}
