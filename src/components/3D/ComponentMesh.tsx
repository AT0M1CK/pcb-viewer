import React, { useMemo } from "react";
import { DoubleSide } from "three";
import type { Component } from "../../types";
import {
  statusColor,
  toScenePosition,
  toSceneRotation,
} from "../../utils/placement";

interface ComponentMeshProps {
  component: Component;
  board: { width: number; depth: number };
  selected: boolean;
  hovered: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

/**
 * One placement, rendered as primitive geometry.
 *
 * Five package kinds map onto four visual treatments — Mechanical borrows the
 * ribbed box that Connectors use, since a heatsink reads the same way. Detail
 * geometry (the pin-1 marker, the ribs) is deliberately minimal: it exists to
 * make orientation legible when the board is rotated, not to model the part.
 */
export function ComponentMesh({
  component,
  board,
  selected,
  hovered,
  onSelect,
  onHover,
}: ComponentMeshProps) {
  const position = useMemo(
    () => toScenePosition(component, board),
    [component, board],
  );
  const rotation = useMemo(() => toSceneRotation(component), [component]);

  const color = statusColor(component.status);
  const { width, depth } = component.footprint;
  const h = component.height;

  // Highlight is carried by emissive rather than colour so the status reading
  // survives selection.
  const emissive = selected ? color : hovered ? "#ffffff" : "#000000";
  const emissiveIntensity = selected ? 0.55 : hovered ? 0.25 : 0;

  const isCylinder = component.kind === "Electrolytic";
  const isRibbed =
    component.kind === "Connector" || component.kind === "Mechanical";
  const isIC = component.kind === "IC";

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(component.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(component.id);
      }}
      onPointerOut={() => onHover(null)}
    >
      <mesh castShadow>
        {isCylinder ? (
          <cylinderGeometry args={[width / 2, width / 2, h, 20]} />
        ) : (
          <boxGeometry args={[width, h, depth]} />
        )}
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
          roughness={isCylinder ? 0.35 : 0.6}
          metalness={isCylinder ? 0.6 : 0.15}
        />
      </mesh>

      {/* Pin-1 marker: a pale dot at one corner of the package top. */}
      {isIC && (
        <mesh position={[-width / 2 + width * 0.16, h / 2 + 0.01, -depth / 2 + depth * 0.16]}>
          <cylinderGeometry args={[Math.min(width, depth) * 0.08, Math.min(width, depth) * 0.08, 0.02, 10]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
      )}

      {/* Ribs, so connectors and heatsinks read as directional when rotated.
          Kept low and narrow — at board scale they're a texture cue, and any
          heavier reads as a black slab that swamps the part's status colour. */}
      {isRibbed && (
        <group position={[0, h / 2 + 0.01, 0]}>
          {[-0.3, -0.15, 0, 0.15, 0.3].map((offset) => (
            <mesh key={offset} position={[width * offset, 0, 0]}>
              <boxGeometry args={[width * 0.05, h * 0.1, depth * 0.78]} />
              <meshStandardMaterial color="#334155" roughness={0.85} />
            </mesh>
          ))}
        </group>
      )}

      {/* Selection ring on the board plane beneath the part. */}
      {selected && (
        <mesh
          position={[0, -h / 2 + 0.02, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry
            args={[Math.max(width, depth) * 0.72, Math.max(width, depth) * 0.86, 32]}
          />
          <meshBasicMaterial color="#2563eb" side={DoubleSide} transparent opacity={0.9} />
        </mesh>
      )}
    </group>
  );
}
