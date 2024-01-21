import React, { useState } from "react";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import Pie, { PieArcDatum, ProvidedProps } from "@visx/shape/lib/shapes/Pie";
import { LegendItem, LegendLabel, LegendOrdinal } from "@visx/legend";
import { scaleOrdinal } from "@visx/scale";
import { pieColor } from "@/app/_components/colors";
import { animated, to, useTransition } from "@react-spring/web";

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export type PieProps = {
  width: number;
  height: number;
  margin?: typeof defaultMargin;
  animate?: boolean;
};
const legendGlyphSize = 12;
const pieChartConfig = {};
export default function PieType({
  height,
  width,
  margin = defaultMargin,
  animate = true,
}: PieProps) {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  if (width < 10) return null;

  const innerWidth = width - margin.left - margin.right - 120;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = 80; // 반지름길이
  const donutThickness = 20; // 도넛 두께

  const centerX = innerWidth / 2;
  const centerY = innerHeight / 2;

  return (
    <>
      <div>
        <p>{`height: ${height}`}</p>
        <p>{`width: ${width}`}</p>
        <p>{`innerWidth: ${innerWidth}`}</p>
        <p>{`innerHeight: ${innerHeight}`}</p>
        <p>{`radius: ${radius}`}</p>
        <p>{`donutThickness: ${donutThickness}`}</p>
        <p>{`centerX: ${centerX}`}</p>
        <p>{`centerY: ${centerY}`}</p>
      </div>
      <div className={"flex"}>
        <svg width={width} height={height}>
          <rect rx={14} width={width} height={height} fill="white" />
          <Group top={centerY + margin?.top} left={centerX}>
            <Pie
              data={
                selectedSymbol
                  ? data.filter(({ symbol }) => symbol === selectedSymbol)
                  : data
              }
              pieValue={getPrice}
              outerRadius={radius}
              innerRadius={radius - donutThickness}
            >
              {(pie) => (
                <AnimatedPie
                  {...pie}
                  animate={animate}
                  getKey={(arc) => arc.data.symbol}
                  getColor={(arc) => ordinalColorScale(arc.data.symbol)}
                  onClickDatum={({ data: { symbol } }) =>
                    animate &&
                    setSelectedSymbol(
                      selectedSymbol && selectedSymbol === symbol
                        ? null
                        : symbol,
                    )
                  }
                />
              )}
            </Pie>
            <Text
              verticalAnchor="start"
              textAnchor="middle"
              className={"break-all text-[12px]"}
              width={200}
            >
              {selectedSymbol
                ? transformedData[selectedSymbol].toLocaleString()
                : totalPrice.toLocaleString()}
            </Text>
          </Group>
        </svg>

        <LegendOrdinal
          scale={ordinalColorScale}
          labelFormat={(label) => `${label.toUpperCase()}`}
        >
          {(labels) => (
            <div className={"flex w-[200px] flex-col justify-center pl-[10px]"}>
              {labels.map((label, i) => (
                <LegendItem
                  key={`legend-quantile-${i}`}
                  margin="1px 0px"
                  onClick={() => {
                    setSelectedSymbol(
                      selectedSymbol && selectedSymbol === label.text
                        ? null
                        : label.text,
                    );
                  }}
                >
                  <div
                    className={
                      "flex flex-1 rounded-full px-[5px] py-[2px] text-[14px] text-[#0D1421] hover:bg-gray-200"
                    }
                  >
                    <div className={"flex flex-1 items-center"}>
                      <svg width={legendGlyphSize} height={legendGlyphSize}>
                        <circle
                          fill={label.value}
                          r={legendGlyphSize / 2}
                          cx={legendGlyphSize / 2}
                          cy={legendGlyphSize / 2}
                        />
                      </svg>
                      <LegendLabel align="left" margin="0 0 0 4px">
                        {labels[i].text}
                      </LegendLabel>
                    </div>
                    <div>
                      <p>
                        {((transformedData[labels[i].text] / totalPrice) * 100)
                          .toFixed(2)
                          .toLocaleString() + "%"}
                      </p>
                    </div>
                  </div>
                </LegendItem>
              ))}
            </div>
          )}
        </LegendOrdinal>
      </div>
    </>
  );
}
type AnimatedPieProps<Datum> = ProvidedProps<Datum> & {
  animate?: boolean;
  getKey: (d: PieArcDatum<Datum>) => string;
  getColor: (d: PieArcDatum<Datum>) => string;
  onClickDatum: (d: PieArcDatum<Datum>) => void;
  delay?: number;
}; // react-spring transition definitions
type AnimatedStyles = { startAngle: number; endAngle: number; opacity: number };

const fromLeaveTransition = ({ endAngle }: PieArcDatum<any>) => ({
  // enter from 360° if end angle is > 180°
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0,
});
const enterUpdateTransition = ({ startAngle, endAngle }: PieArcDatum<any>) => ({
  startAngle,
  endAngle,
  opacity: 1,
});
function AnimatedPie<Datum>({
  animate,
  arcs,
  path,
  getKey,
  getColor,
  onClickDatum,
}: AnimatedPieProps<Datum>) {
  const transitions = useTransition<PieArcDatum<Datum>, AnimatedStyles>(arcs, {
    from: animate ? fromLeaveTransition : enterUpdateTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: animate ? fromLeaveTransition : enterUpdateTransition,
    keys: getKey,
  });
  return transitions((props, arc, { key }) => {
    const [centroidX, centroidY] = path.centroid(arc);
    const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;

    return (
      <g key={key}>
        <animated.path
          // compute interpolated path d attribute from intermediate angle values
          d={to([props.startAngle, props.endAngle], (startAngle, endAngle) =>
            path({
              ...arc,
              startAngle,
              endAngle,
            }),
          )}
          fill={getColor(arc)}
          onClick={() => onClickDatum(arc)}
        />
        {hasSpaceForLabel && (
          <animated.g style={{ opacity: props.opacity }}>
            <text
              fill="black"
              x={centroidX}
              y={centroidY}
              dy=".33em"
              fontSize={9}
              textAnchor="middle"
              pointerEvents="none"
            >
              {getKey(arc)}
            </text>
          </animated.g>
        )}
      </g>
    );
  });
}

interface PieData {
  [key: string]: any;

  symbol: string;
  price: number;
}

const getSymbol = (symbol: PieData) => symbol.symbol;
const getPrice = (price: PieData) => price.price;

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
    price: 120000,
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
const symbols = data.map((item) => item?.symbol);

const totalPrice = data.reduce(
  (previousValue, currentValue) => previousValue + currentValue.price,
  0,
);
const transformedData = data.reduce<{ [key: string]: number }>((acc, item) => {
  acc[item?.symbol] = item?.price;
  return acc;
}, {});

const ordinalColorScale = scaleOrdinal({
  domain: symbols,
  range: pieColor,
});
