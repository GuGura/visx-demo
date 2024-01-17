"use client";
import Example from "@/app/_components/GradientAreaBase";
import { useEffect, useRef, useState } from "react";

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
      <Example height={500} width={width} />
    </div>
  );
}
