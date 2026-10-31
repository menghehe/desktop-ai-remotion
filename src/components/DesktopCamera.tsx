import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {CameraKeyframe} from '../lib/stageAnchors';

export const DesktopCamera = ({
  keyframes,
  enabled = true,
  children,
}: {
  keyframes: CameraKeyframe[];
  enabled?: boolean;
  children: React.ReactNode;
}) => {
  const frame = useCurrentFrame();
  if (!enabled || keyframes.length === 0) {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }

  let idx = 0;
  for (let i = 0; i < keyframes.length - 1; i++) {
    if (frame >= keyframes[i].frame) idx = i;
  }
  const start = keyframes[idx];
  const end = keyframes[Math.min(idx + 1, keyframes.length - 1)];

  const rawP =
    start.frame === end.frame
      ? 1
      : interpolate(frame, [start.frame, end.frame], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
  const eased = rawP * rawP * (3 - 2 * rawP);

  const focusX = interpolate(eased, [0, 1], [start.focusX, end.focusX]);
  const focusY = interpolate(eased, [0, 1], [start.focusY, end.focusY]);
  const zoom = interpolate(eased, [0, 1], [start.zoom, end.zoom]);

  // Short decaying impact shake around keyframes that specify `shake`
  const sinceStart = frame - start.frame;
  const activeShake =
    start.shake && sinceStart >= 0 && sinceStart < 18
      ? start.shake * (1 - sinceStart / 18)
      : 0;
  const shakeX = activeShake * Math.sin(frame * 2.9);
  const shakeY = activeShake * Math.cos(frame * 3.4);

  // Translate so `(focusX, focusY)` moves smoothly toward viewport center `(960, 540)`
  const translateX = (960 - focusX) * (zoom - 1) + shakeX;
  const translateY = (540 - focusY) * (zoom - 1) + shakeY;

  return (
    <AbsoluteFill
      style={{
        transformOrigin: '960px 540px',
        transform: `translate(${translateX}px, ${translateY}px) scale(${zoom})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
