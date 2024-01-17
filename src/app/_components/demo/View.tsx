"use client";
import ExampleBars from "@/app/_components/demo/ExampleBars";
import { useEffect, useRef, useState } from "react";
import { GradientArea } from "@/app/_components/demo/GradientArea";

export default function View() {
  const ref = useRef();
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    if (ref.current) {
      resizeObserver.observe(ref?.current);
    }

    // Make sure to disconnect the ResizeObserver when the component is unmounted
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      className={"w-full max-w-[1000px] border border-amber-100"}
      ref={ref as any}
    >
      <ExampleBars height={500} width={width} events={true} />
      <GradientArea />
    </div>
  );
}
