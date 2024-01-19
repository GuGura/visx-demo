"use client";
import { RadialGradient } from "@visx/gradient";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { useMemo } from "react";
import { scaleBand, scaleLinear } from "@visx/scale";

interface Props {
  date: string;
  price: number;
}

const getDate = (d: Props) => d.date;
const getStockValue = (d: Props) => Number(d.price);
/*
Domain: 이것은 스케일의 입력 범위로, 원본 데이터 값의 범위입니다. 예를 들어,
데이터 세트가 0에서 100까지의 숫자를 포함한다면, domain은 [0, 100]이 될 수 있습니다.

Range: 이것은 스케일의 출력 범위로, 변환된 데이터 값의 범위입니다. 예를 들어,
SVG 요소 내에서 픽셀 위치를 결정하는 경우, range는 그림의 크기에 따라 설정될 수 있습니다.

스케일 함수는 domain에 있는 값들을 range에 지정된 값들로 매핑합니다.
예를 들어, 선형 스케일(linear scale)에서 domain이 [0, 100]이고 range가
[0, 500]이라면, 데이터 값 50은 출력 값 250으로 변환됩니다.

range를 [500, 0]으로 설정하면, d3 스케일은 domain의 값을 거꾸로 매핑합니다.
domain의 최솟값 0은 range의 최댓값 500에 매핑됩니다.
domain의 최댓값 100은 range의 최솟값 0에 매핑됩니다.
domain의 중간 값 50은 range의 중간 값 250에 매핑됩니다.
 */
export default function BarType1({
  width = 1000,
  height = 500,
  data,
}: {
  width?: number;
  height?: number;
  data: any;
}) {
  let xMax = width;
  const yMax = height;
  console.log(data);
  // const data = useMemo(() => getDatesFrom2021to2024(), []);

  /*
               https://d3js.org/d3-scale/band
               scaleBand(domain, range)
               const x = d3.scaleBand(["a", "b", "c"], [0, 960]);
               x("a"); // 0
               x("b"); // 320
               x("c"); // 640
               x("d"); // undefined
               scaleBand에서 도메인은 x축 키값들을 의미

               band.bandwidth()
               Returns the width of each band. // 각 밴드의 너비를 반환
              */
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [100, xMax - 100],
        reverse: true,
        domain: data.map(getDate),
        padding: 0.15,
      }),
    [xMax],
  );

  /*
               https://d3js.org/d3-scale/linear
               scaleLinear(domain, range)
               d3.scaleLinear([0, 100], ["red", "blue"])

               domain 지정 안하면 default [0, 1]
               d3.scaleLinear(["red", "blue"]) // default domain of [0, 1]

               domain은 원본데이터의 범위
               range는 출력에티어의 범위
              */

  const chartConfig = {
    verticalMargin: 100,
    leftMargin: 100,
    rightMargin: 100,
  };

  const yDomain = useMemo(() => {
    if (!!data === false) {
      return [0, 0];
    }

    const min = Math.min(...data.map(getStockValue));
    const max = Math.max(...data.map(getStockValue));
    const absMax = Math.max(Math.abs(min), Math.abs(max));

    return [0, absMax];
  }, [data]);

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [0, height * 0.5 - chartConfig.verticalMargin],
        domain: yDomain,
      }),
    [yMax],
  );

  if (!data) return;
  return (
    <svg width={width} height={height}>
      <RadialGradient id={"bg"} from="#a18cd1" to="#fbc2eb" />
      <rect width={width} height={height} fill={"url(#bg)"} />
      <Group>
        {data?.map((d: Props) => {
          if (d?.price > 0) {
            const barWidth = xScale.bandwidth();
            /* const xScale <= 여기서 이미 x위치값을 다 그려놨고 xScale(d.date) <= 매핑되는 x위치값을 가져와서 Bar에 넣어주면 된다.*/
            const barHeight = yScale(Number(d?.price) ?? 0);
            const barX = xScale(d?.date);
            const barY = yMax * 0.5 - barHeight;

            return (
              <Bar
                key={d?.date}
                width={barWidth}
                height={barHeight}
                x={barX}
                fill={"#338a3e"}
                y={barY}
                onClick={() => console.log(JSON.stringify(Object.values(d)))}
              />
            );
          } else {
            const barWidth = xScale.bandwidth();
            const price = Math.abs(Number(d?.price));

            /* const xScale <= 여기서 이미 x위치값을 다 그려놨고 xScale(d.date) <= 매핑되는 x위치값을 가져와서 Bar에 넣어주면 된다.*/
            const barHeight = yScale(price);
            const barX = xScale(d?.date);
            const barY = yMax * 0.5;

            return (
              <Bar
                key={d?.date}
                width={barWidth}
                height={barHeight}
                x={barX}
                fill={"#d00000"}
                y={barY}
                onClick={() => console.log(JSON.stringify(Object.values(d)))}
              />
            );
          }
        })}
      </Group>
    </svg>
  );
}
