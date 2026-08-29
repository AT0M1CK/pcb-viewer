import React from "react";
import { Grid, Html } from "@react-three/drei";
import { BOARD_THICKNESS } from "../../utils/placement";

interface BoardProps {
  width: number;
  depth: number;
}

/** Millimetre ticks along the two visible board edges. */
const TICKS = [0, 25, 50, 75, 100];

/**
 * The substrate everything sits on: an FR-4 slab at true 1.6 mm thickness,
 * a faint ground grid for depth, and an XYZ triad plus mm ticks so the scene
 * reads as a measurement view rather than a toy render.
 */
export function Board({ width, depth }: BoardProps) {
  return (
    <group>
      <mesh receiveShadow>
        <boxGeometry args={[width, BOARD_THICKNESS, depth]} />
        <meshStandardMaterial color="#1c7a4a" roughness={0.75} metalness={0.05} />
      </mesh>

      {/* Slightly inset lighter plane reads as solder mask over copper pour. */}
      <mesh position={[0, BOARD_THICKNESS / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width - 3, depth - 3]} />
        <meshStandardMaterial color="#22935a" roughness={0.85} />
      </mesh>

      <Grid
        position={[0, -BOARD_THICKNESS / 2 - 0.2, 0]}
        args={[width * 2, depth * 2]}
        cellSize={5}
        cellThickness={0.5}
        cellColor="#cbd5e1"
        sectionSize={25}
        sectionThickness={0.8}
        sectionColor="#94a3b8"
        fadeDistance={320}
        fadeStrength={1}
        infiniteGrid={false}
      />

      {/* mm ticks along the front and right edges */}
      {TICKS.map((tick) => {
        const x = (tick / 100) * width - width / 2;
        return (
          <Html
            key={`x-${tick}`}
            position={[x, -BOARD_THICKNESS / 2, depth / 2 + 6]}
            center
            style={{ pointerEvents: "none" }}
          >
            <span className="select-none text-[10px] text-slate-400">{tick}</span>
          </Html>
        );
      })}
      <Html
        position={[width / 2 + 10, -BOARD_THICKNESS / 2, depth / 2 + 6]}
        center
        style={{ pointerEvents: "none" }}
      >
        <span className="select-none text-[10px] text-slate-400">(mm)</span>
      </Html>

      <AxisTriad origin={[-width / 2 - 8, 0, depth / 2 + 8]} />
    </group>
  );
}

const AXES: { dir: [number, number, number]; color: string; label: string }[] = [
  { dir: [1, 0, 0], color: "#ef4444", label: "X" },
  { dir: [0, 0, -1], color: "#22c55e", label: "Y" },
  { dir: [0, 1, 0], color: "#3b82f6", label: "Z" },
];

/** Small orientation gnomon pinned to a board corner. */
function AxisTriad({ origin }: { origin: [number, number, number] }) {
  const length = 12;

  return (
    <group position={origin}>
      {AXES.map(({ dir, color, label }) => {
        const mid: [number, number, number] = [
          (dir[0] * length) / 2,
          (dir[1] * length) / 2,
          (dir[2] * length) / 2,
        ];
        // Cylinders are Y-up by default; rotate onto each axis.
        const rotation: [number, number, number] =
          dir[0] === 1 ? [0, 0, -Math.PI / 2] : dir[2] === -1 ? [-Math.PI / 2, 0, 0] : [0, 0, 0];

        return (
          <group key={label}>
            <mesh position={mid} rotation={rotation}>
              <cylinderGeometry args={[0.35, 0.35, length, 8]} />
              <meshBasicMaterial color={color} />
            </mesh>
            <Html
              position={[dir[0] * (length + 2), dir[1] * (length + 2), dir[2] * (length + 2)]}
              center
              style={{ pointerEvents: "none" }}
            >
              <span className="select-none text-[10px] font-semibold" style={{ color }}>
                {label}
              </span>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
