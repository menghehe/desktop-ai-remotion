import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {ACT} from '../lib/storyboard';

const ACTS = [
  {from: 0, title: '01 · 老婆召唤 & AI 接管', subtitle: '周五 21:30 · 炸鸡邀约触发铁血减肥协议'},
  {from: ACT.breakout, title: '02 · 表情包破窗！', subtitle: '一二：谁敢替我拒绝炸鸡？'},
  {from: ACT.battle, title: '03 · Win11 桌面攻防战', subtitle: '抢回夜宵基金，改写自动回复'},
  {from: ACT.upload, title: '04 · 4000 张表情包投喂', subtitle: '请 DeepSeek 逐帧分析一二吃了多少顿饭'},
  {from: ACT.flood, title: '05 · Token 耗尽 & 服务器繁忙', subtitle: '百熊弹窗雨 · 防守彻底崩溃'},
];

export const StoryOverlay = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const act = [...ACTS].reverse().find((item) => frame >= item.from) ?? ACTS[0];
  const local = frame - act.from;
  const enter = spring({frame: local, fps, config: {damping: 18, stiffness: 160}});
  const finalEnter = spring({frame: Math.max(0, frame - 1640), fps, config: {damping: 15, stiffness: 130}});

  return (
    <>
      {frame < ACT.finale && (
        <div className="pointer-events-none absolute left-1/2 top-5 z-[170] -translate-x-1/2 rounded-full border border-white/60 bg-[#14243b]/85 px-6 py-2.5 text-center text-white shadow-xl backdrop-blur-xl" style={{opacity: enter, transform: `translateX(-50%) translateY(${(1 - enter) * -18}px)`}}>
          <div className="text-[14px] font-semibold tracking-wide">{act.title}</div>
          <div className="mt-0.5 text-[11px] text-blue-100">{act.subtitle}</div>
        </div>
      )}
      {frame >= ACT.finale && (
        <div className="pointer-events-none absolute left-1/2 top-[180px] z-[190] w-[720px] -translate-x-1/2 rounded-[28px] border border-white/70 bg-white/90 px-10 py-8 text-center shadow-2xl backdrop-blur-xl" style={{opacity: finalEnter, transform: `translateX(-50%) scale(${0.7 + finalEnter * 0.3})`}}>
          <div className="text-[18px] font-semibold text-[#4D6BFE]">DeepSeek 提示</div>
          <div className="mt-3 text-[38px] font-black tracking-tight text-slate-800">⚠️ Token 额度已耗光</div>
          <div className="mt-3 text-[20px] text-slate-500">服务器繁忙，请稍后再试。</div>
          <div className="mx-auto mt-5 w-fit rounded-full bg-[#95EC69] px-6 py-2 text-[18px] font-bold text-[#174523]">减肥明天再说，今晚先吃炸鸡！🍗</div>
        </div>
      )}
    </>
  );
};
