"use client";

import BarType1 from "@/app/_components/implement/BarType1";
import { addMonths, format } from "date-fns";
import { ParentSize } from "@visx/responsive";

export default function View() {
  const data: any[] = [
    { date: "2023년 02월", price: 1937 },
    { date: "2023년 03월", price: -1367 },
    { date: "2023년 04월", price: -1500 },
    { date: "2023년 05월", price: 1926 },
    { date: "2023년 06월", price: -477 },
    { date: "2023년 07월", price: -696 },
    { date: "2023년 08월", price: -27 },
    { date: "2023년 09월", price: -838 },
    { date: "2023년 10월", price: -107 },
    { date: "2023년 11월", price: -21 },
    { date: "2023년 12월", price: 1566 },
    { date: "2024년 01월", price: -1782 },
  ];

  // const data: any[] = getDatesFrom2021to2024().slice(25);

  return (
    <div
      className={
        "h-full max-h-[400px] w-full max-w-[1000px] border border-amber-100"
      }
    >
      <ParentSize>
        {({ width }) => <BarType1 data={data} width={width} />}
      </ParentSize>
    </div>
  );
}
function getDatesFrom2021to2024() {
  const startDate = new Date(2021, 0, 1); // January is 0 in JS Date
  const endDate = new Date(2024, 0, 1);
  let dates = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    const object: any = {};
    object["date"] = format(currentDate, "yyyy년 MM월");
    object["price"] = Math.ceil(Math.random() * 5000) - 2500;
    dates.push(object);
    currentDate = addMonths(currentDate, 1); // Add one month at a time
  }

  return dates;
}
