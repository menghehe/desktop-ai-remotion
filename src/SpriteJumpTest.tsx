import {FolderOpen, MessageSquare, MoreHorizontal, Scissors, Search, Send, Smile, Users, Video} from 'lucide-react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const SPRITE_SIZE = 320;
const FOOT_ANCHOR = 455 / 512;
const MESSAGE = '吃！全家桶加双份薯条！';

const spriteAt = (frame: number) => {
  if (frame < 10) return 0;
  if (frame < 18) return 1;
  if (frame < 24) return 2;
  if (frame < 44) return 3;
  if (frame < 51) return 4;
  return 5;
};

export const SpriteJumpTest = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sprite = spriteAt(frame);
  const jump = interpolate(frame, [18, 48], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const travel = jump * jump * (3 - 2 * jump);
  // Coordinates are local to the chat pane; floor follows the compressed button top.
  const x = interpolate(travel, [0, 1], [365, 1045]);
  const floor = interpolate(travel, [0, 1], [248, 778]);
  // `floor` is the baseline (button top); `y` is the 512px canvas origin.
  const y = floor - FOOT_ANCHOR * SPRITE_SIZE - Math.sin(jump * Math.PI) * 285;
  const impact = interpolate(frame, [48, 52, 59], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const crouch = interpolate(frame, [10, 17, 20], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const scaleX = 1 + crouch * 0.1 + impact * 0.18;
  const scaleY = 1 - crouch * 0.12 - impact * 0.23;
  const rotation = interpolate(frame, [18, 31, 44, 50], [0, -7, 5, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const sent = frame >= 59;
  const messageEnter = spring({frame: Math.max(0, frame - 59), fps, config: {damping: 15, stiffness: 180}});
  const shake = impact * Math.sin((frame - 48) * 2.8) * 2.2;
  const shadowOpacity = interpolate(jump, [0, 0.35, 0.75, 1], [0.14, 0, 0, 0.18], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill className="items-center justify-center bg-[#cfe0ed] font-sans">
      <Img src={staticFile('win11/wallpaper/blue-bloom.jpg')} className="absolute inset-0 h-full w-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-[#d7e6f1]/45" />
      <div className="absolute left-8 top-7 rounded-full bg-[#14243b]/85 px-5 py-2 text-[13px] font-medium tracking-wide text-white shadow-lg">SPRITE CONTACT TEST · 3s / 90f</div>

      <section className="window-shadow relative h-[900px] w-[1580px] overflow-hidden rounded-xl border border-white/70 bg-[#f5f5f5]" style={{transform: `translateY(${shake}px)`}}>
        <header className="flex h-11 items-center border-b border-black/5 bg-white px-4 text-[13px] text-slate-600">
          <MessageSquare size={18} className="mr-2 text-[#07c160]" /><span>微信 · 动作接触测试</span>
          <div className="ml-auto flex gap-8 text-[#666]"><span>—</span><span>□</span><span>×</span></div>
        </header>
        <div className="flex h-[calc(100%-2.75rem)]">
          <nav className="flex w-[68px] shrink-0 flex-col items-center bg-[#2e2e2e] py-6 text-[#8c8c8c]">
            <Img src={staticFile('stickers/bubu_avatar.png')} className="h-11 w-11 rounded-md" />
            <MessageSquare size={26} fill="currentColor" className="mt-10 text-[#07c160]" /><Users size={26} className="mt-9" /><FolderOpen size={25} className="mt-9" />
          </nav>
          <aside className="w-[255px] shrink-0 border-r border-[#d6d6d6] bg-[#eae8e7]">
            <div className="flex h-[62px] items-center gap-2 bg-[#f7f7f7] px-4"><div className="flex h-8 flex-1 items-center gap-2 rounded bg-[#e2e2e2] px-3 text-xs text-[#888]"><Search size={14} />搜索</div><span className="text-xl">+</span></div>
            <div className="flex h-[76px] items-center gap-3 bg-[#c6c5c5] px-4"><Img src={staticFile('stickers/yier_avatar.png')} className="h-11 w-11 rounded-md" /><div><div className="text-[15px]">老婆大人❤️</div><div className="mt-1 text-xs text-[#666]">今晚吃炸鸡吗？</div></div></div>
          </aside>

          <main className="relative min-w-0 flex-1 bg-[#f5f5f5]">
            <div className="flex h-[62px] items-center justify-between border-b border-[#e7e7e7] px-6"><span className="text-[18px] font-medium">老婆大人❤️</span><MoreHorizontal size={22} className="text-[#666]" /></div>
            <div className="px-8 pt-7 text-center text-[11px] text-[#aaa]">21:30</div>
            <div className="ml-8 mt-5 flex items-start gap-3">
              <Img src={staticFile('stickers/yier_avatar.png')} className="h-11 w-11 rounded-md" />
              <div className="relative mt-1 max-w-[490px] rounded-md bg-white px-5 py-4 text-[18px] leading-8 shadow-sm">
                <div className="absolute -left-[6px] top-[16px] h-3 w-3 rotate-45 bg-white" />
                老公，今晚吃炸鸡吗？黄金脆皮鸡腿桶买一送一！🍗
              </div>
            </div>

            {/* The wife's bubble doubles as the launch platform. */}
            <div className="absolute left-[170px] top-[248px] h-[186px] w-[390px] rounded-[22px] border border-[#e5e5e5] bg-white shadow-sm">
              <div className="pt-6 text-center text-[14px] text-[#aaa]">一二 · 准备起跳</div>
              <div className="mt-3 text-center text-[13px] text-[#c2c2c2]">脚底锚点 / launch platform</div>
            </div>

            {sent && (
              <div className="absolute right-10 top-[230px] max-w-[480px] rounded-[8px] bg-[#95ec69] px-5 py-4 text-[19px] shadow-sm" style={{opacity: messageEnter, transform: `translateY(${(1-messageEnter)*18}px) scale(${0.85+messageEnter*0.15})`}}>
                <div className="absolute -right-[6px] top-[18px] h-3 w-3 rotate-45 bg-[#95ec69]" />{MESSAGE}
              </div>
            )}

            <footer className="absolute inset-x-0 bottom-0 h-[205px] border-t border-[#e0e0e0] bg-[#f5f5f5]">
              <div className="flex h-12 items-center gap-6 px-7 text-[#5c5c5c]"><Smile size={23} /><FolderOpen size={22} /><Scissors size={22} /><MessageSquare size={22} /><Video size={22} /></div>
              <div className="h-[75px] px-7 py-2 text-[19px] text-[#222]">{sent ? '' : MESSAGE}<span className="ml-1 inline-block h-5 w-[2px] bg-[#222] align-middle" /></div>
              <div className="absolute bottom-[24px] right-[38px] flex h-[54px] w-[132px] items-center justify-center">
                <div className={`flex h-full w-full items-center justify-center gap-2 rounded-md text-[17px] font-medium ${sent ? 'bg-[#dce6df] text-[#74917e]' : 'bg-[#07c160] text-white'}`} style={{transform: `scaleX(${1+impact*0.08}) scaleY(${1-impact*0.42})`, transformOrigin: '50% 0%', boxShadow: impact > 0.1 ? 'none' : '0 3px 8px rgba(7,193,96,.18)'}}>
                  发送(S)<Send size={15} />
                </div>
              </div>
            </footer>

            {/* Contact shadow exists only at takeoff and landing, not a permanent drop shadow. */}
            <div className="pointer-events-none absolute rounded-[50%] bg-black" style={{left: x-34, top: floor-1, width: 68, height: 12, opacity: shadowOpacity, filter: 'blur(4px)'}} />

            {/* Impact marks are anchored to the button's top edge. */}
            {impact > 0.05 && [0,1,2].map((i) => <div key={i} className="absolute h-[3px] w-7 rounded bg-[#07c160]" style={{left: 980+i*39, top: 765-(i%2)*10, opacity: impact, transform: `rotate(${(i-1)*22}deg)`}} />)}

            <div className="pointer-events-none absolute z-20" style={{left: x - SPRITE_SIZE/2, top: y, width: SPRITE_SIZE, height: SPRITE_SIZE, transform: `rotate(${rotation}deg) scale(${scaleX},${scaleY})`, transformOrigin: `50% ${FOOT_ANCHOR*100}%`}}>
              <Img src={staticFile(`sprites/yier/jump/${String(sprite).padStart(3,'0')}.png`)} className="h-full w-full object-contain" />
            </div>
          </main>
        </div>
      </section>
      <div className="absolute bottom-5 rounded-full bg-white/75 px-5 py-2 text-[13px] text-slate-600 backdrop-blur">蓄力 → 腾空 → 脚底接触按钮 → 同步压缩 → 消息上屏</div>
    </AbsoluteFill>
  );
};
