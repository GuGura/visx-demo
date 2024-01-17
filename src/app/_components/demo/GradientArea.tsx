"use client";
import { GradientPinkBlue } from "@visx/gradient";

export const GradientArea = () => {
  return (
    <svg width={100} height={100}>
      <GradientPinkBlue id="gradient" />
      <rect width={100} height={100} fill={"url('#gradient')"} />
    </svg>
  );
};
