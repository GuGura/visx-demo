import React from "react";

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export type PieProps = {
  width: number;
  height: number;
  margin?: typeof defaultMargin;
  animate?: boolean;
};
const pieChartConfig = {};
export default function PieType({ height, width }: PieProps) {
  if (width < 10) return null;

  return (
    <svg width={width} height={height}>
      <rect rx={14} width={width} height={height} fill="white" />
    </svg>
  );
}

interface PieData {
  symbol: string;
  price: number;
}

const data: PieData[] = [
  {
    symbol: "TSLA",
    price: 6540000,
  },
  {
    symbol: "APPL",
    price: 1250000,
  },
  {
    symbol: "SPA",
    price: 12000000,
  },
  {
    symbol: "GENE",
    price: 3500000,
  },
  {
    symbol: "U",
    price: 2000000,
  },
  {
    symbol: "WWR",
    price: 2000000,
  },
  {
    symbol: "KKK",
    price: 69000,
  },
  {
    symbol: "QQQ",
    price: 4000000,
  },
  {
    symbol: "CO",
    price: 3000000,
  },
  {
    symbol: "C",
    price: 100000,
  },
];
