import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  watermark: string;
  title: string;
  align?: "left" | "center";
  aside?: ReactNode;
  className?: string;
};

/** "/TITLE" heading over a huge faded watermark word, as used on every section. */
export const SectionTitle = ({ watermark, title, align = "left", aside, className }: Props) => (
  <div
    className={cn(
      "relative flex flex-wrap items-end gap-x-6 gap-y-3 pt-[clamp(96px,10vw,140px)]",
      align === "center" ? "justify-center text-center" : "justify-between",
      className
    )}
  >
    <span
      aria-hidden
      className={cn(
        "watermark bottom-0 translate-y-[24%]",
        align === "center" ? "left-1/2 -translate-x-1/2" : "-left-[0.04em]"
      )}
    >
      <span className="inline-block">{watermark}</span>
    </span>
    <h2 className="section-title">
      <span className="opacity-90">/</span>
      {title}
    </h2>
    {aside && (
      <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="relative text-sm md:text-base">
        {aside}
      </div>
    )}
  </div>
);
