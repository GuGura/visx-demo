"use client";
import React, { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { GradientTealBlue } from "@visx/gradient";
import letterFrequency, {
  LetterFrequency,
} from "@visx/mock-data/lib/mocks/letterFrequency";
import { scaleBand, scaleLinear } from "@visx/scale";

const data = letterFrequency.slice(0);
const verticalMargin = 120;

// accessors
const getLetter = (d: LetterFrequency) => d.letter;
const getLetterFrequency = (d: LetterFrequency) => Number(d.frequency) * 100;

export type BarsProps = {
  width: number;
  height: number;
  events?: boolean;
};

export default function ExampleBars({
  width,
  height,
  events = false,
}: BarsProps) {
  // bounds
  const xMax = width;
  const yMax = height - verticalMargin;

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [100, xMax - 100],
        round: true,
        domain: data.map(getLetter),
        padding: 0.4,
      }),
    [xMax],
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getLetterFrequency))],
      }),
    [yMax],
  );

  return width < 10 ? null : (
    <svg width={width} height={height}>
      {/*  @visx/gradient : 배경컬러 */}
      <GradientTealBlue id="teal" />
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      {/* Group (top / left) : svg width * height 기준으로 position top left 조절  */}
      <Group top={verticalMargin / 2}>
        {data.map((d) => {
          const letter = getLetter(d);
          const barWidth = xScale.bandwidth();
          console.log("barWidth::", barWidth);
          const barHeight = yMax - (yScale(getLetterFrequency(d)) ?? 0);
          console.log("barHeight::", barHeight);
          const barX = xScale(letter);
          console.log("barX::", barX);
          const barY = yMax - barHeight;
          console.log("barY::", barY);
          return (
            <Bar
              key={`bar-${letter}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={"rgba(23, 233, 217, .5)"}
              onClick={() => {
                if (events)
                  alert(`clicked: ${JSON.stringify(Object.values(d))}`);
              }}
            />
          );
        })}
      </Group>
    </svg>
  );
}
