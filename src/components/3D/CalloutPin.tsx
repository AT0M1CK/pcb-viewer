import React from "react";
import { Html } from "@react-three/drei";
import type { Component } from "../../types";
import { toScenePosition } from "../../utils/placement";

interface CalloutPinProps {
  component: Component;
  board: { width: number; depth: number };
  selected: boolean;
  onSelect: (id: string) => void;
}

/**
 * Numbered marker floating above a featured component, matching the pins in
 * the reference viewport. Rendered as DOM through drei's `Html` so the digit
 * stays crisp and clickable at any zoom.
 */
export function CalloutPin({
  component,
  board,
  selected,
  onSelect,
}: CalloutPinProps) {
  const [x, y, z] = toScenePosition(component, board);

  return (
    <Html position={[x, y + component.height / 2 + 6, z]} center zIndexRange={[20, 0]}>
      <button
        type="button"
        onClick={() => onSelect(component.id)}
        title={`${component.refDes} — ${component.name}`}
        className={`grid h-6 w-6 cursor-pointer place-items-center rounded-full border-2 text-[11px] font-semibold shadow transition-colors ${
          selected
            ? "border-white bg-brand text-white"
            : "border-brand bg-white text-brand hover:bg-brand hover:text-white"
        }`}
      >
        {component.calloutIndex}
      </button>
    </Html>
  );
}
