import {OffthreadVideo, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {ACT, tokenPercent} from '../lib/storyboard';

export type DeepSeekPetState = 'idle' | 'think' | 'panic' | 'dizzy';

/** Source GIFs and extension point for normalized PNG frame sequences. */
export const PET_STATE_ASSETS: Record<DeepSeekPetState, {gif: string; frames: string[]}> = {
  idle: {gif: 'deepseek-pet/idle.gif', frames: []},
  think: {gif: 'deepseek-pet/think.gif', frames: []},
  panic: {gif: 'deepseek-pet/panic.gif', frames: []},
  dizzy: {gif: 'deepseek-pet/dizzy.gif', frames: []},
};

export const DeepSeekPet = ({
  state,
  tokenPercent: percent,
  isHit = false,
  x = 1550,
  y = 1032,
}: {
  state: DeepSeekPetState;
  tokenPercent: number;
  isHit?: boolean;
  x?: number;
  y?: number;
}) => {
  const frame = useCurrentFrame();
  const dizzy = state === 'dizzy';
  const thinking = state === 'think';
  const thoughtLines = thinking
    ? ['检测夜宵邀约，执行饮食管理协议', '正在分析一二与布布的反抗行为']
    : state === 'panic'
      ? ['警告：遭到物理攻击！', '表情包输入量超过上下文容量']
      : ['等待桌面任务，随时为您服务'];
  const shake = isHit ? Math.sin(frame * 2.8) * 12 : 0;

  return (
    <div className="pointer-events-none absolute z-[130]" style={{left: x, top: y}}>
      <div
        className={`absolute bottom-[245px] right-[35px] w-[410px] ${state === 'panic' ? 'text-white [text-shadow:0_1px_3px_#0f172a]' : 'text-[#24292f]'}`}
        style={{opacity: dizzy ? 0 : 1}}
      >
        <div className="mb-3 flex items-center gap-2 text-[16px] font-semibold">
          <span className="text-[#4D6BFE]">⚛️</span> DeepSeek 桌宠管家
        </div>
        <div className={`mb-1.5 flex justify-between text-[12px] ${state === 'panic' ? 'text-blue-50' : 'text-slate-600'}`}>
          <span>Token 余量</span><span className={percent < 20 ? 'font-bold text-red-500' : ''}>{Math.ceil(percent)}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-300/60">
          <div className="h-full rounded-full transition-none" style={{width: `${percent}%`, background: percent < 20 ? '#ef4444' : '#4D6BFE'}} />
        </div>
        <div className={`mt-4 border-l-2 border-[#4D6BFE] pl-3 text-[13px] leading-6 ${state === 'panic' ? 'text-blue-50' : 'text-slate-500'}`}>
          <div className={`mb-1 font-medium ${state === 'panic' ? 'text-white' : 'text-slate-700'}`}>已深度思考</div>
          {thoughtLines.map((line) => <div key={line}>{line}</div>)}
        </div>
      </div>

      <div
        className="absolute bottom-0 h-[330px] w-[440px] -translate-x-1/2"
        style={{transform: `translateX(calc(-50% + ${shake}px)) rotate(${dizzy ? -8 : 0}deg)`, transformOrigin: '50% 100%'}}
      >
        <OffthreadVideo
          src={staticFile(`deepseek-pet/${state}.webm`)}
          transparent
          muted
          className="h-full w-full object-contain object-bottom"
        />
      </div>
      {isHit && !dizzy && <div className="absolute -left-[175px] -top-[300px] text-4xl font-black text-amber-400">✦</div>}
      {dizzy && (
        <div className="absolute bottom-[185px] right-[-5px] w-[530px] text-[20px] font-bold leading-8 text-[#e5484d] [text-shadow:0_1px_0_white]">
          ⚠️ 服务器繁忙，请稍后再试<br />（Token 彻底耗尽）
        </div>
      )}
    </div>
  );
};

export const StoryDeepSeekPet = () => {
  const frame = useCurrentFrame();
  const chasing = frame >= 540 && frame < ACT.upload;
  const state: DeepSeekPetState = frame >= 1580 ? 'dizzy' : chasing || frame >= ACT.upload ? 'panic' : frame >= 50 && frame < 240 ? 'think' : 'idle';
  const flee = interpolate(frame, [540, 620, 850, 1040], [1550, 1710, 1450, 1550], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const isHit = chasing && frame % 48 < 12 || frame >= 1370 && frame < 1410;
  return <DeepSeekPet state={state} tokenPercent={tokenPercent(frame)} isHit={isHit} x={flee} />;
};
