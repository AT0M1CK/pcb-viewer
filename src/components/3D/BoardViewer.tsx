import React, { useCallback, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MathUtils, Vector3 } from "three";
import { useComponentFilter } from "../../hooks/useComponentFilter";
import { getComponents } from "../../services/boardService";
import type { CameraView } from "../../store/ViewerContext";
import { useCameraView, useSelection } from "../../store/useViewer";
import type { BoardMeta } from "../../types";
import { Board } from "./Board";
import { CalloutPin } from "./CalloutPin";
import { ComponentMesh } from "./ComponentMesh";

/** Camera placements for the toolbar's view presets, in board millimetres. */
const VIEW_POSITION: Record<CameraView, [number, number, number]> = {
  iso: [95, 78, 95],
  // A hair off dead-centre, so the orbit controls keep a stable up vector.
  top: [0, 155, 0.01],
  side: [0, 20, 150],
};

const MIN_DISTANCE = 45;
const MAX_DISTANCE = 320;
const ORIGIN = new Vector3(0, 0, 0);

interface ControlsLike {
  target: Vector3;
  update: () => void;
}

/**
 * Translates the toolbar's camera state into actual camera moves.
 *
 * View presets and Fit set a goal position that's eased toward each frame;
 * the zoom buttons dolly along the current view direction. Everything runs
 * through OrbitControls (`makeDefault`) so dragging still works mid-animation.
 */
function CameraRig() {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as ControlsLike | null;
  const { view, zoomInSignal, zoomOutSignal, fitSignal } = useCameraView();

  const goal = useRef(new Vector3(...VIEW_POSITION.iso));
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    goal.current.set(...VIEW_POSITION[view]);
  }, [view, fitSignal]);

  const dolly = useCallback(
    (factor: number) => {
      const target = controls?.target ?? ORIGIN;
      const offset = camera.position.clone().sub(target);
      const distance = MathUtils.clamp(
        offset.length() * factor,
        MIN_DISTANCE,
        MAX_DISTANCE,
      );
      goal.current
        .copy(target)
        .add(offset.normalize().multiplyScalar(distance));
    },
    [camera, controls],
  );

  // Signals start at 0 and only ever increment, so a zero means "not fired yet".
  useEffect(() => {
    if (zoomInSignal > 0) dolly(0.78);
  }, [zoomInSignal, dolly]);

  useEffect(() => {
    if (zoomOutSignal > 0) dolly(1.28);
  }, [zoomOutSignal, dolly]);

  useFrame((_, delta) => {
    if (camera.position.distanceTo(goal.current) < 0.05) return;
    // Frame-rate independent easing; snap outright if the user prefers less motion.
    const t = reduceMotion.current ? 1 : 1 - Math.pow(0.002, delta);
    camera.position.lerp(goal.current, t);
    controls?.update();
  });

  return null;
}

export function BoardViewer({ board }: { board: BoardMeta }) {
  const { selectedId, hoveredId, select, hover } = useSelection();
  const { autoRotate } = useCameraView();
  const visible = useComponentFilter(getComponents());
  const dimensions = board.dimensions;

  return (
    <div
      className={`h-full w-full ${hoveredId ? "canvas-hovering" : "canvas-idle"}`}
    >
      <Canvas
        camera={{ position: VIEW_POSITION.iso, fov: 45, near: 0.1, far: 2000 }}
        dpr={[1, 2]}
        shadows
        onPointerMissed={() => select(null)}
      >
        <color attach="background" args={["#eef2f7"]} />

        <ambientLight intensity={0.85} />
        <directionalLight position={[60, 120, 60]} intensity={1.5} castShadow />
        <directionalLight position={[-80, 60, -40]} intensity={0.5} />

        <Board width={dimensions.width} depth={dimensions.depth} />

        {visible.map((component) => (
          <ComponentMesh
            key={component.id}
            component={component}
            board={dimensions}
            selected={component.id === selectedId}
            hovered={component.id === hoveredId}
            onSelect={select}
            onHover={hover}
          />
        ))}

        {visible
          .filter((c) => c.calloutIndex !== undefined)
          .map((component) => (
            <CalloutPin
              key={`pin-${component.id}`}
              component={component}
              board={dimensions}
              selected={component.id === selectedId}
              onSelect={select}
            />
          ))}

        <OrbitControls
          makeDefault
          enablePan
          enableZoom
          enableRotate
          autoRotate={autoRotate}
          autoRotateSpeed={0.8}
          minDistance={MIN_DISTANCE}
          maxDistance={MAX_DISTANCE}
          // Stop the camera dropping below the board, which reads as broken.
          maxPolarAngle={Math.PI / 2.1}
        />
        <CameraRig />
      </Canvas>
    </div>
  );
}
