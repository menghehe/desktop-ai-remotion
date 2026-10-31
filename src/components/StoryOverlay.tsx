import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {EP01_FRIED_CHICKEN} from '../episodes/ep01_fried_chicken';
import {EpisodeScript} from '../lib/stageAnchors';
import {ACT} from '../lib/storyboard';

export const StoryOverlay = ({
  script = EP01_FRIED_CHICKEN,
}: {
  script?: EpisodeScript;
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const acts = script.acts;
  const act = [...acts].reverse().find((item) => frame >= item.from) ?? acts[0];
  const local = frame - act.from;
  const enter = spring({frame: local, fps, config: {damping: 18, stiffness: 160}});
  const finalEnter = spring({
    frame: Math.max(0, frame - 1640),
    fps,
    config: {damping: 15, stiffness: 130},
  });

  return (
    <>
      {frame < ACT.finale && (
        <div
          className="pointer-events-none absolute left-1/2 top-5 z-[170] -translate-x-1/2 rounded-full border border-white/60 bg-[#14243b]/85 px-6 py-2.5 text-center text-white shadow-xl backdrop-blur-xl"
          style={{
            opacity: enter,
            transform: `translateX(-50%) translateY(${(1 - enter) * -18}px)`,
          }}
        >
          <div className="text-[14px] font-semibold tracking-wide">
            {script.id} · {act.title}
          </div>
          <div className="mt-0.5 text-[11px] text-blue-100">{act.subtitle}</div>
        </div>
      )}
      {frame >= ACT.finale && (
        <div
          className="pointer-events-none absolute left-1/2 top-[155px] z-[190] w-[720px] -translate-x-1/2 rounded-[28px] border border-white/70 bg-white/92 px-10 py-8 text-center shadow-2xl backdrop-blur-xl"
          style={{
            opacity: finalEnter,
            transform: `translateX(-50%) scale(${0.7 + finalEnter * 0.3})`,
          }}
        >
          <div className="text-[18px] font-semibold text-[#4D6BFE]">
            DeepSeek 桌面管家提示 ({script.title})
          </div>
          <div className="mt-3 text-[38px] font-black tracking-tight text-slate-800">
            ⚠️ Token 额度已耗光
          </div>
          <div className="mt-3 text-[20px] text-slate-500">
            服务器繁忙，请稍后再试。
          </div>
          <div className="mx-auto mt-5 w-fit rounded-full bg-[#95EC69] px-6 py-2 text-[18px] font-bold text-[#174523]">
            减肥明天再说，今晚先吃炸鸡！🍗
          </div>
        </div>
      )}
    </>
  );
};
