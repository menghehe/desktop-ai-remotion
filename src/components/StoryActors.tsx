import {interpolate, useCurrentFrame} from 'remotion';
import {EP01_FRIED_CHICKEN} from '../episodes/ep01_fried_chicken';
import {EpisodeScript} from '../lib/stageAnchors';
import {ACT, progress} from '../lib/storyboard';
import {AICursor} from './AICursor';
import {SpriteActor} from './SpriteActor';

export const StoryActors = ({
  script = EP01_FRIED_CHICKEN,
}: {
  script?: EpisodeScript;
}) => {
  const frame = useCurrentFrame();
  const fileP = progress(frame, 555, 810);
  const fileX = interpolate(fileP, [0, 0.5, 1], [190, 92, 195]);
  const fileY = interpolate(fileP, [0, 0.5, 1], [255, 115, 250]);

  const uploadP = progress(frame, ACT.upload, ACT.flood);
  const folderX = interpolate(uploadP, [0, 0.72, 1], [355, 1180, 1550]);
  const folderY = interpolate(uploadP, [0, 0.72, 1], [520, 520, 705]);

  return (
    <>
      {/* Contested Midnight Snack Excel File */}
      {frame >= 520 && frame < ACT.upload && (
        <div
          className="absolute z-[65] flex w-[156px] flex-col items-center text-center"
          style={{
            left: fileX,
            top: fileY,
            transform: `rotate(${Math.sin(frame / 2.5) * 6}deg)`,
          }}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-emerald-200 bg-[#16854b] text-3xl font-bold text-white shadow-xl">
            X
          </div>
          <div className="mt-1.5 rounded bg-slate-900/75 px-2.5 py-1 text-[12px] font-medium text-white shadow">
            老婆专属夜宵基金.xlsx
          </div>
          <div className="mt-1 rounded-full bg-emerald-500/90 px-2.5 py-0.5 text-[11px] font-bold text-white shadow">
            🛡️ 布布死守中
          </div>
        </div>
      )}

      {/* 4000+ Sticker Folder Pushed into DeepSeek */}
      {frame >= ACT.upload && frame < ACT.flood && (
        <div
          className="absolute z-[75] flex w-[196px] flex-col items-center text-center"
          style={{
            left: folderX,
            top: folderY,
            transform: `translate(-50%,-50%) scale(${1 - uploadP * 0.12}) rotate(${
              Math.sin(frame * 0.4) * 3
            }deg)`,
          }}
        >
          <div className="flex h-24 w-28 items-center justify-center rounded-xl border-4 border-amber-200 bg-amber-400 text-5xl shadow-2xl">
            🐻
          </div>
          <div className="mt-2 rounded-md bg-white/95 px-2.5 py-1 text-[12px] font-bold text-slate-800 shadow-md">
            一二布布表情包库存（4000+张）
          </div>
        </div>
      )}

      {/* Taskbar pursuit: Yier catches and hammers the fleeing desktop pet. */}
      {frame >= 540 && frame < ACT.upload && (
        <>
          <SpriteActor actor="yier" zIndex={108} cues={[{fromFrame: 540, toFrame: 1039, action: 'run', from: 'deepseek_pet_chase', to: 'deepseek_pet_chase', prop: 'hammer', emote: 'angry', speech: '别跑！把控制权交出来！'}]} />
          {frame >= 560 && frame < 1040 && <AICursor steps={[{frame: 540, x: 1450, y: 780, mood: 'angry', label: '桌宠遭到追击！'}, {frame: 1040, x: 1540, y: 790, mood: 'angry', label: '物理防御失效'}]} />}
        </>
      )}

      {/* Universal 6-Pose Sprite Actors (Yier & Bubu) */}
      {(frame < 540 || frame >= ACT.upload) && <SpriteActor actor="yier" cues={script.yierCues} zIndex={96} />}
      <SpriteActor actor="bubu" cues={script.bubuCues} zIndex={94} />

      {/* Autonomous DeepSeek Agent Cursor */}
      <AICursor
        steps={frame >= 540 && frame < ACT.upload ? [] : [
          {frame: 50, x: 1550, y: 890, mood: 'cool', label: '桌宠发射控制光标'},
          {frame: 135, x: 760, y: 800, mood: 'cool', label: '正在自动输入拒绝文案'},
          {frame: 225, x: 995, y: 888, mood: 'cool', clicking: true, label: '准备点击发送'},
          {frame: 265, x: 610, y: 310, mood: 'angry', label: '警告：检测到一二破窗！'},
          {frame: 365, x: 470, y: 690, mood: 'angry', label: '拦截表情包面板召唤'},
          {frame: 540, x: 210, y: 270, mood: 'angry', label: '强制粉碎夜宵预算表'},
          {frame: 680, x: 120, y: 155, mood: 'angry', clicking: true, label: '拖入回收站！'},
          {frame: 790, x: 680, y: 835, mood: 'angry', label: '别砸我的黄瓜文案！'},
          {frame: 930, x: 1004, y: 885, mood: 'angry', label: '阻止发送失败！'},
          {frame: 1060, x: 1450, y: 680, mood: 'angry', label: '正在拦截 4000 张表情包'},
          {frame: 1260, x: 1365, y: 610, mood: 'dizzy', label: '上下文窗口被塞满了…'},
          {frame: 1440, x: 1580, y: 420, mood: 'dizzy', label: 'Token 余额雪崩中'},
          {frame: 1605, x: 1510, y: 520, mood: 'dizzy', label: '算力干烧了…'},
          {frame: 1799, x: 1510, y: 520, mood: 'dizzy', label: '服务器繁忙'},
        ]}
      />
    </>
  );
};
