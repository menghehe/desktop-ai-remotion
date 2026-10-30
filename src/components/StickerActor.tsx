import {Gif} from '@remotion/gif';
import {interpolate, staticFile, useCurrentFrame} from 'remotion';

export interface KeyframePoint {
  frame: number;
  x: number;
  y: number;
  scale?: number;
  jumpArc?: number;
  flipX?: boolean;
  rotate?: number;
}

export const StickerActor = ({
  src,
  size = 150,
  keyframes,
  zIndex = 80,
  playbackRate = 1,
}: {
  src: string;
  size?: number;
  keyframes: KeyframePoint[];
  zIndex?: number;
  playbackRate?: number;
}) => {
  const frame = useCurrentFrame();
  if (keyframes.length === 0 || frame < keyframes[0].frame) return null;

  let index = 0;
  for (let i = 0; i < keyframes.length - 1; i++) {
    if (frame >= keyframes[i].frame) index = i;
  }
  const start = keyframes[index];
  const end = keyframes[Math.min(index + 1, keyframes.length - 1)];
  const p = start.frame === end.frame
    ? 1
    : interpolate(frame, [start.frame, end.frame], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
  const eased = p * p * (3 - 2 * p);
  const x = interpolate(eased, [0, 1], [start.x, end.x]);
  const baseY = interpolate(eased, [0, 1], [start.y, end.y]);
  const arc = end.jumpArc ? Math.sin(p * Math.PI) * end.jumpArc : 0;
  const y = baseY + arc;
  const sinceLanding = frame - end.frame;
  const landing = sinceLanding >= 0 && sinceLanding < 14 && end.jumpArc
    ? Math.sin((sinceLanding / 14) * Math.PI * 2) * 0.16 * (1 - sinceLanding / 14)
    : 0;
  const scale = interpolate(eased, [0, 1], [start.scale ?? 1, end.scale ?? 1]);
  const rotation = interpolate(eased, [0, 1], [start.rotate ?? 0, end.rotate ?? 0]);
  const flip = end.flipX ? -1 : 1;

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        zIndex,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale * (1 + landing) * flip}, ${scale * (1 - landing)})`,
        filter: 'drop-shadow(0 12px 12px rgba(20,38,63,.30))',
      }}
    >
      <Gif
        src={staticFile(src)}
        width={size}
        height={size}
        fit="contain"
        playbackRate={playbackRate}
        loopBehavior="loop"
      />
    </div>
  );
};
