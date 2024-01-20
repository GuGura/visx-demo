"use client";
import ExampleBars from "@/app/_components/demo/ExampleBars";
import { useEffect, useRef, useState } from "react";
import { GradientArea } from "@/app/_components/demo/GradientArea";
import { ParentSize } from "@visx/responsive";
import ExamplePie from "@/app/_components/demo/ExamplePie";
import PieType from "@/app/_components/implement/PieType";

export default function View() {
  return (
    <div
      className={
        "flex h-auto min-h-[400px] w-full max-w-[1000px] flex-col gap-[30px] rounded-[10px] p-[20px] shadow-card"
      }
    >
      <ParentSize>
        {({ width }) => <PieType height={366} width={width} />}
      </ParentSize>
      <div className={"flex justify-between"}>
        <h1>Test</h1>
        <div>
          <button>버튼1</button>
          <button>버튼2</button>
          <button>버튼3</button>
        </div>
      </div>

      <ParentSize>
        {({ width }) => <ExamplePie height={366} width={width} />}
      </ParentSize>
    </div>
  );
}
