export const FPS = 30;
export const DURATION = 1800;

export const ACT = {
  invitation: 0,
  breakout: 240,
  battle: 540,
  upload: 1050,
  flood: 1440,
  finale: 1620,
} as const;

export const AI_REPLY = '不吃！我在啃黄瓜！';
export const FINAL_REPLY = '吃！全家桶加双份薯条！';

export const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export const progress = (frame: number, start: number, end: number) =>
  clamp((frame - start) / (end - start));

export const typed = (text: string, frame: number, start: number, speed = 2) =>
  text.slice(0, Math.max(0, Math.floor((frame - start) / speed)));

export const tokenPercent = (frame: number) => {
  if (frame < ACT.flood) return 98;
  return Math.max(0, 98 - progress(frame, ACT.flood, 1608) * 98);
};
