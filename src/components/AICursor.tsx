import {interpolate, useCurrentFrame} from 'remotion';
import {DeepSeekIcon} from './BrandIcons';

export interface CursorStep {
  frame: number;
  x: number;
  y: number;
  clicking?: boolean;
  mood?: 'cool' | 'angry' | 'dizzy';
  label?: string;
}

export const AICursor = ({steps}: {steps: CursorStep[]}) => {
  const frame = useCurrentFrame();
  if (!steps.length || frame < steps[0].frame) return null;
  let index = 0;
  for (let i = 0; i < steps.length - 1; i++) {
    if (frame >= steps[i].frame) index = i;
  }
  const start = steps[index];
  const end = steps[Math.min(index + 1, steps.length - 1)];
  const p = start.frame === end.frame
    ? 1
    : interpolate(frame, [start.frame, end.frame], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
  const eased = p * p * (3 - 2 * p);
  const x = interpolate(eased, [0, 1], [start.x, end.x]);
  const y = interpolate(eased, [0, 1], [start.y, end.y]);
  const mood = end.mood ?? 'cool';
  const clicking = end.clicking && Math.floor(frame / 5) % 2 === 0;

  return (
    <div
      className="pointer-events-none absolute z-[160]"
      style={{left: x, top: y, transform: `scale(${clicking ? 0.82 : 1})`}}
    >
      <div
        className="absolute -left-4 -top-4 h-12 w-12 rounded-full border-2 border-[#4D6BFE]/60 bg-[#4D6BFE]/15"
        style={{transform: `scale(${1 + Math.sin(frame / 3) * 0.12})`}}
      />
      <svg width="31" height="36" viewBox="0 0 31 36" className="relative drop-shadow-lg">
        <path d="M3 2L27 22L17 23L22 33L17 35L12 25L3 32Z" fill="#4D6BFE" stroke="white" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      <div className={`ml-5 mt-[-8px] flex w-max items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-medium text-white shadow-lg backdrop-blur-md ${mood === 'angry' ? 'border-red-300/60 bg-[#a93652]/90' : mood === 'dizzy' ? 'border-slate-400 bg-slate-700/90' : 'border-[#9eb5ff]/60 bg-[#243b78]/90'}`}>
        <DeepSeekIcon size={19} />
        <span>{mood === 'angry' ? '💢' : mood === 'dizzy' ? '😵' : '⚡'}</span>
        <span>{end.label ?? 'DeepSeek Agent 接管中'}</span>
      </div>
    </div>
  );
};
