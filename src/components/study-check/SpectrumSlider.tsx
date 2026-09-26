"use client";

import { useEffect, useRef, useState } from "react";

const THUMB = 32;
const DOT = 10;
const PAD = 16;

const SpectrumSlider = ({
  stop,
  onChange,
}: {
  stop: number;
  onChange: (nextStop: number) => void;
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackW, setTrackW] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState<number | null>(null);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;
    const measure = () => setTrackW(node.getBoundingClientRect().width);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!dragging) setDragX(null);
  }, [dragging, stop]);

  const innerW = Math.max(trackW - PAD * 2, 1);
  const xForStop = (value: number) => PAD + (value / 6) * innerW;
  const displayX = dragX ?? xForStop(stop);

  const xFromClient = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return PAD;
    return Math.max(PAD, Math.min(PAD + innerW, clientX - rect.left));
  };

  const stopFromX = (x: number) => {
    const t = Math.max(0, Math.min(1, (x - PAD) / innerW));
    return Math.round(t * 6);
  };

  return (
    <div
      ref={trackRef}
      className="relative mt-10 touch-none select-none"
      style={{ height: 44 }}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        setDragging(true);
        setDragX(xFromClient(event.clientX));
      }}
      onPointerMove={(event) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        setDragX(xFromClient(event.clientX));
      }}
      onPointerUp={(event) => {
        const nextX = xFromClient(event.clientX);
        const nextStop = stopFromX(nextX);
        setDragging(false);
        setDragX(xForStop(nextStop));
        onChange(nextStop);
      }}
      onPointerCancel={() => {
        setDragging(false);
        setDragX(null);
      }}
    >
      <div
        className="absolute rounded-full bg-[#EDE9FE]"
        style={{ left: PAD, right: PAD, top: "50%", height: 4, marginTop: -2 }}
      />
      <div
        className="pointer-events-none absolute rounded-full bg-[#8B5CF6]"
        style={{
          left: PAD,
          top: "50%",
          height: 4,
          marginTop: -2,
          width: Math.max(0, displayX - PAD),
          transition: dragging ? "none" : "width 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      {trackW
        ? [0, 1, 2, 3].map((point) => {
            const pointStop = point * 2;
            const reached = stop >= pointStop;
            return (
              <span
                key={point}
                className="pointer-events-none absolute rounded-full transition-colors duration-300"
                style={{
                  left: xForStop(pointStop) - DOT / 2,
                  top: "50%",
                  width: DOT,
                  height: DOT,
                  marginTop: -DOT / 2,
                  backgroundColor: reached ? "#8B5CF6" : "#D4D4D8",
                }}
              />
            );
          })
        : null}
      <span
        className="pointer-events-none absolute left-0 rounded-full border-[6px] border-white bg-[#8B5CF6] shadow-[0_0_12px_rgba(139,92,246,0.45)]"
        style={{
          width: THUMB,
          height: THUMB,
          top: "50%",
          marginTop: -THUMB / 2,
          transform: `translateX(${displayX - THUMB / 2}px)`,
          transition: dragging
            ? "none"
            : "transform 0.45s cubic-bezier(0.34, 1.45, 0.64, 1)",
        }}
      />
    </div>
  );
};

export default SpectrumSlider;
