"use client";
import { RadialGradient } from "@visx/gradient";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { addMonths, format } from "date-fns";
import { useMemo } from "react";
import { scaleBand } from "@visx/scale";

interface Props {
  date: string;
  price: number;
}

const getDate = (d: Props) => d.date;
const getStockValue = (d: Props) => Number(d.price);

export default function BarType1({
  width = 1000,
  height = 500,
}: {
  width?: number;
  height?: number;
}) {
  const xMax = width;
  const yMax = height;

  const data = useMemo(() => getDatesFrom2021to2024(), []);

  /*
    https://d3js.org/d3-scale/band
    scaleBand(domain, range)
    const x = d3.scaleBand(["a", "b", "c"], [0, 960]);
    x("a"); // 0
    x("b"); // 320
    x("c"); // 640
    x("d"); // undefined
    x에서 도메인은 x축 키값들을 의미

    band.bandwidth()
    Returns the width of each band. // 각 밴드의 너비를 반환

  */
  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, xMax],
        reverse: true,
        domain: data.map(getDate),
        padding: 0.4,
      }),
    [xMax],
  );

  return (
    <svg width={width} height={height}>
      <RadialGradient id={"bg"} from="#a18cd1" to="#fbc2eb" />
      <rect width={width} height={height} fill={"url(#bg)"} />
      <Group top={0} left={-50}>
        {data.map((d: Props) => {
          const date = getDate(d);
          const barWidth = xScale.bandwidth();
          return <Bar key={d.date} />;
        })}
      </Group>
    </svg>
  );
}

// const data = [{ data: format() }];
function getDatesFrom2021to2024() {
  const startDate = new Date(2021, 0, 1); // January is 0 in JS Date
  const endDate = new Date(2024, 0, 1);
  let dates = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    const object: any = {};
    object["date"] = format(currentDate, "yyyy년 MM일");
    object["price"] = Math.ceil(Math.random() * 20000) - 5000;
    dates.push(object);
    currentDate = addMonths(currentDate, 1); // Add one month at a time
  }

  return dates;
}
