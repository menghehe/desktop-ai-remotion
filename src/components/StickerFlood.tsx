import {Gif} from '@remotion/gif';
import {random, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const CAPTIONS = [
  '炸鸡无罪！！🍗',
  '今晚卡路里清零✨',
  '贴贴能量 +999❤️',
  '不吃饱怎么有力气减肥！',
  '加双份薯条！🍟',
  '奶茶安排上🧋',
  '一二永远是布布的小朋友',
  '减肥明天再说！',
];

export const StickerFlood = ({startFrame, count = 65}: {startFrame: number; count?: number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < startFrame) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[120] overflow-hidden">
      {Array.from({length: count}).map((_, i) => {
        const appear = startFrame + i * 2;
        if (frame < appear) return null;
        const enter = spring({frame: frame - appear, fps, config: {damping: 13, stiffness: 210, mass: 0.65}});
        const x = random(`flood-x-${i}`) * 1660 + 20;
        const y = random(`flood-y-${i}`) * 790 + 25;
        const rotate = (random(`flood-r-${i}`) - 0.5) * 16;
        const src = `stickers/flood/${(i % 50) + 1}.gif`;
        return (
          <div
            key={i}
            className="absolute w-[218px] overflow-hidden rounded-lg border border-[#8fb0ff]/60 bg-white/95 shadow-2xl backdrop-blur-md"
            style={{left: x, top: y, opacity: enter, transform: `scale(${0.45 + enter * 0.55}) rotate(${rotate}deg)`}}
          >
            <div className="flex h-7 items-center justify-between bg-[#E0EAFF] px-2.5 text-[11px] font-semibold text-[#3555bd]">
              <span>🐻 投喂指令 #{String(i + 1).padStart(2, '0')}</span><span>×</span>
            </div>
            <div className="flex h-[142px] flex-col items-center justify-center px-2 pb-2">
              <Gif src={staticFile(src)} width={98} height={98} fit="contain" playbackRate={1.15} />
              <div className="mt-1 text-center text-[12px] font-semibold text-slate-700">{CAPTIONS[i % CAPTIONS.length]}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
