import {interpolate, useCurrentFrame} from 'remotion';
import {ACT, progress} from '../lib/storyboard';
import {AICursor} from './AICursor';
import {StickerActor} from './StickerActor';

export const StoryActors = () => {
  const frame = useCurrentFrame();
  const fileP = progress(frame, 570, 790);
  const fileX = interpolate(fileP, [0, 0.55, 1], [200, 82, 205]);
  const fileY = interpolate(fileP, [0, 0.55, 1], [265, 95, 250]);
  const uploadP = progress(frame, ACT.upload, ACT.flood);
  const folderX = interpolate(uploadP, [0, 1], [280, 1390]);
  const folderY = interpolate(uploadP, [0, 1], [330, 635]);

  return (
    <>
      {frame >= 540 && frame < ACT.upload && (
        <div className="absolute z-[65] flex w-[150px] flex-col items-center text-center" style={{left: fileX, top: fileY, transform: `rotate(${Math.sin(frame / 3) * 5}deg)`}}>
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#16854b] text-3xl font-bold text-white shadow-xl">X</div>
          <div className="mt-2 rounded bg-black/45 px-2 py-1 text-[12px] text-white">老婆专属夜宵基金.xlsx</div>
          <div className="mt-1 text-xl">🛡️ 绝不删除</div>
        </div>
      )}

      {frame >= ACT.upload && frame < ACT.flood && (
        <div className="absolute z-[75] flex w-[190px] flex-col items-center text-center" style={{left: folderX, top: folderY, transform: `translate(-50%,-50%) scale(${1 - uploadP * 0.35})`}}>
          <div className="flex h-24 w-28 items-center justify-center rounded-lg border-4 border-amber-300 bg-amber-400 text-5xl shadow-2xl">🐻</div>
          <div className="mt-2 rounded bg-white/90 px-2 py-1 text-[12px] font-semibold text-slate-700 shadow">一二布布表情包库存（4000+张）</div>
        </div>
      )}

      <StickerActor
        src={`stickers/${frame < ACT.battle ? '02_yier_shock' : '05_yier_hammer'}.gif`}
        size={frame >= ACT.battle ? 158 : 146}
        playbackRate={1.2}
        keyframes={[
          {frame: 240, x: 620, y: 455, scale: 0.55},
          {frame: 300, x: 680, y: 760, jumpArc: -170, scale: 1.05},
          {frame: 360, x: 475, y: 842, jumpArc: -110, flipX: true},
          {frame: 480, x: 710, y: 730, jumpArc: -145},
          {frame: 600, x: 755, y: 760, jumpArc: -80},
          {frame: 780, x: 695, y: 770, jumpArc: -95, flipX: true},
          {frame: 960, x: 770, y: 800, jumpArc: -75, rotate: -8},
          {frame: 1049, x: 770, y: 800},
        ]}
      />
      <StickerActor
        src={`stickers/${frame < ACT.battle ? '03_bubu_charge' : '04_bubu_pull'}.gif`}
        size={158}
        keyframes={[
          {frame: 360, x: 490, y: 815, scale: 0.4},
          {frame: 430, x: 655, y: 775, jumpArc: -150, scale: 1},
          {frame: 540, x: 520, y: 640, jumpArc: -100},
          {frame: 650, x: 295, y: 330, jumpArc: -180, flipX: true},
          {frame: 800, x: 245, y: 285, rotate: -10},
          {frame: 930, x: 580, y: 755, jumpArc: -170},
          {frame: 1049, x: 580, y: 755},
        ]}
      />
      <StickerActor
        src="stickers/06_both_push.gif"
        size={220}
        keyframes={[
          {frame: ACT.upload, x: 350, y: 530, scale: 0.75},
          {frame: 1210, x: 760, y: 600, scale: 1},
          {frame: ACT.flood - 1, x: 1320, y: 700, jumpArc: -45, scale: 0.9},
        ]}
      />
      {frame >= ACT.finale && (
        <StickerActor
          src="stickers/07_both_eat.gif"
          size={230}
          zIndex={180}
          keyframes={[
            {frame: ACT.finale, x: 960, y: 940, scale: 0.2},
            {frame: 1670, x: 960, y: 905, jumpArc: -170, scale: 1.05},
            {frame: 1799, x: 960, y: 905, scale: 1.05},
          ]}
        />
      )}

      <AICursor steps={[
        {frame: 60, x: 1530, y: 420, mood: 'cool', label: '铁血减肥拦截中'},
        {frame: 135, x: 790, y: 780, mood: 'cool', label: '正在自动回复'},
        {frame: 225, x: 980, y: 884, mood: 'cool', clicking: true, label: '准备发送拒绝'},
        {frame: 270, x: 845, y: 700, mood: 'angry', label: '检测到表情破窗！'},
        {frame: 540, x: 420, y: 360, mood: 'angry', label: '强制清理夜宵预算'},
        {frame: 680, x: 155, y: 180, mood: 'angry', clicking: true, label: '拖入回收站'},
        {frame: 850, x: 830, y: 820, mood: 'angry', label: '撤回！撤回！'},
        {frame: 1050, x: 1470, y: 680, mood: 'angry', label: '结束异常进程'},
        {frame: 1260, x: 1370, y: 600, mood: 'dizzy', label: '未知小熊阻力…'},
        {frame: 1440, x: 1600, y: 410, mood: 'dizzy', label: 'Token 正在暴跌'},
        {frame: 1605, x: 1510, y: 520, mood: 'dizzy', label: '算力干烧了…'},
        {frame: 1799, x: 1510, y: 520, mood: 'dizzy', label: '服务器繁忙'},
      ]} />
    </>
  );
};
