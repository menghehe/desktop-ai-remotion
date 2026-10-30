import {Gif} from '@remotion/gif';
import {FolderOpen, MessageSquare, MoreHorizontal, Phone, Scissors, Search, Send, Smile, Users, Video} from 'lucide-react';
import {Img, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {AI_REPLY, FINAL_REPLY, typed} from '../lib/storyboard';
import {WeChatIcon} from './BrandIcons';

const Avatar = ({src, label, color}: {src?: string; label: string; color: string}) => (
  <div className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[5px] text-sm font-semibold text-white ${color}`}>
    {src ? <Img src={staticFile(src)} className="h-full w-full object-cover" /> : label}
  </div>
);

export const WeChatWindow = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 18, stiffness: 150, mass: 0.8}});
  const sent = frame >= 960;
  const finalTyping = frame >= 850;
  const composer = sent ? '' : finalTyping ? typed(FINAL_REPLY, frame, 850, 2) : typed(AI_REPLY, frame, 150, 2);
  const panelOpen = frame >= 360 && frame < 540;
  const stickerBroken = frame >= 240;
  const squash = frame >= 900 && frame < 960;

  return (
    <section
      className="window-shadow absolute left-[30px] top-[112px] z-20 flex h-[818px] w-[1050px] overflow-hidden rounded-lg border border-black/15 bg-[#F5F5F5] text-[#191919]"
      style={{opacity: enter, transform: `translateY(${24 * (1 - enter)}px) scale(${0.97 + enter * 0.03})`}}
    >
      <nav className="flex w-[60px] shrink-0 flex-col items-center bg-[#2E2E2E] pb-5 pt-5 text-[#8c8c8c]">
        <Avatar src="stickers/bubu_avatar.png" label="布" color="bg-amber-700" />
        <div className="mt-8 flex flex-col items-center gap-8">
          <MessageSquare size={25} fill="currentColor" className="text-[#07C160]" />
          <Users size={25} /><FolderOpen size={23} />
        </div>
        <div className="mt-auto flex flex-col items-center gap-6"><WeChatIcon size={23} /><span className="text-xl">☰</span></div>
      </nav>

      <aside className="w-[238px] shrink-0 border-r border-[#D6D6D6] bg-[#EAE8E7]">
        <div className="flex h-[60px] items-center gap-2 border-b border-[#E5E5E5] bg-[#F7F7F7] px-3">
          <div className="flex h-[27px] flex-1 items-center gap-2 rounded bg-[#E2E2E2] px-2 text-xs text-[#888]"><Search size={14} />搜索</div>
          <div className="flex h-[27px] w-[27px] items-center justify-center rounded bg-[#E2E2E2] text-lg text-[#555]">+</div>
        </div>
        <div className="flex h-[68px] items-center gap-3 bg-[#C6C5C5] px-3">
          <Avatar src="stickers/yier_avatar.png" label="一" color="bg-rose-400" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between"><span className="text-[14px] font-medium">老婆大人❤️</span><span className="text-[10px] text-[#777]">21:30</span></div>
            <div className="mt-1 truncate text-[11px] text-[#666]">{sent ? FINAL_REPLY : '[动画表情]'}</div>
          </div>
        </div>
        <Contact name="周五绝不加班项目组(48)" preview="收到，下周一再看" label="班" color="bg-blue-400" time="18:02" />
        <Contact name="文件传输助手" preview="[文件] 铁血减肥立誓书.docx" label="文" color="bg-green-600" time="14:00" />
        <Contact name="相亲相爱一家熊" preview="妈妈：记得添衣服" label="家" color="bg-orange-400" time="周二" />
      </aside>

      <main className="relative flex min-w-0 flex-1 flex-col bg-[#F5F5F5]">
        <div className="h-[74px] shrink-0 border-b border-[#E7E7E7]">
          <div className="flex h-6 justify-end text-xs text-[#666]"><span className="flex w-10 items-center justify-center">—</span><span className="flex w-10 items-center justify-center">□</span><span className="flex w-10 items-center justify-center">×</span></div>
          <div className="flex items-center justify-between px-5 pb-2"><span className="text-[17px] font-medium">老婆大人❤️</span><MoreHorizontal size={21} className="text-[#666]" /></div>
        </div>

        <div className="chat-scroll flex-1 overflow-hidden px-5 py-3">
          <div className="mb-4 text-center"><span className="rounded bg-[#DADADA]/60 px-2 py-0.5 text-[10px] text-[#B2B2B2]">21:30</span></div>
          {frame >= 20 && (
            <div className="flex items-start gap-3">
              <Avatar src="stickers/yier_avatar.png" label="一" color="bg-rose-400" />
              <div className="relative max-w-[520px] rounded-[4px] bg-white px-3.5 py-2 text-[14px] leading-6 shadow-sm">
                <div className="absolute -left-[5px] top-[14px] h-[10px] w-[10px] rotate-45 bg-white" />
                <span className="relative z-10">老公，今晚吃炸鸡吗？黄金脆皮鸡腿桶买一送一！！🍗✨</span>
              </div>
            </div>
          )}
          {frame >= 60 && (
            <div className="mt-4 flex items-start gap-3">
              <Avatar src="stickers/yier_avatar.png" label="一" color="bg-rose-400" />
              <div className="flex h-[116px] w-[116px] items-center justify-center">
                {stickerBroken ? (
                  <div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-[#ccc] text-[11px] text-[#aaa]">[表情已出逃]</div>
                ) : (
                  <Gif src={staticFile('stickers/01_yier_drool.gif')} width={116} height={116} fit="contain" />
                )}
              </div>
            </div>
          )}
          {sent && (
            <div className="mt-5 flex flex-row-reverse items-start gap-3">
              <Avatar src="stickers/bubu_avatar.png" label="布" color="bg-amber-700" />
              <div className="relative rounded-[4px] bg-[#95EC69] px-3.5 py-2 text-[14px] leading-6 shadow-sm">
                <div className="absolute -right-[5px] top-[14px] h-[10px] w-[10px] rotate-45 bg-[#95EC69]" />
                <span className="relative z-10">{FINAL_REPLY}</span>
              </div>
            </div>
          )}
          {frame >= 1000 && (
            <div className="mt-5 flex items-start gap-3">
              <Avatar src="stickers/yier_avatar.png" label="一" color="bg-rose-400" />
              <div className="relative rounded-[4px] bg-white px-3.5 py-2 text-[14px] shadow-sm">好耶！我下单啦！🥰</div>
            </div>
          )}
        </div>

        {panelOpen && (
          <div className="absolute bottom-[154px] left-4 z-30 h-[224px] w-[326px] rounded-md border border-[#ddd] bg-white p-3 shadow-xl">
            <div className="mb-2 border-b pb-2 text-[12px] text-[#888]">添加的单个表情</div>
            <div className="grid grid-cols-4 gap-2">
              <div className="flex h-[62px] items-center justify-center rounded bg-[#F5F5F5] text-xl">❤️</div>
              <div className="flex h-[62px] items-center justify-center rounded border-2 border-dashed border-amber-400 bg-amber-50/40 text-[10px] text-amber-600">布布出击！</div>
              <Gif src={staticFile('stickers/07_both_eat.gif')} width={66} height={62} fit="contain" />
              <Gif src={staticFile('stickers/03_bubu_charge.gif')} width={66} height={62} fit="contain" />
            </div>
          </div>
        )}

        <footer className="h-[156px] shrink-0 border-t border-[#E0E0E0] bg-[#F5F5F5]">
          <div className="flex h-[38px] items-center justify-between px-5 text-[#5C5C5C]">
            <div className="flex items-center gap-5"><Smile size={20} className={panelOpen ? 'scale-125 text-[#07C160]' : ''} /><FolderOpen size={19} /><Scissors size={19} /><MessageSquare size={19} /></div>
            <div className="flex items-center gap-5"><Phone size={18} /><Video size={19} /></div>
          </div>
          <div className="h-[70px] whitespace-pre-wrap px-5 py-1 text-[14px] leading-6 text-[#191919]">{composer}<span className="ml-0.5 inline-block h-4 w-[1.5px] animate-pulse bg-[#191919] align-middle" /></div>
          <div className="flex h-[40px] items-center justify-end px-5 pb-2">
            <div className={`rounded px-5 py-1.5 text-[13px] font-medium ${composer ? 'bg-[#07C160] text-white' : 'bg-[#E9E9E9] text-[#07C160]'}`} style={{transform: squash ? 'scaleX(1.28) scaleY(.52) translateY(6px)' : 'scale(1)'}}>
              <span className="flex items-center gap-1">发送(S)<Send size={12} /></span>
            </div>
          </div>
        </footer>
      </main>
    </section>
  );
};

const Contact = ({name, preview, label, color, time}: {name: string; preview: string; label: string; color: string; time: string}) => (
  <div className="flex h-[68px] items-center gap-3 px-3">
    <Avatar label={label} color={color} />
    <div className="min-w-0 flex-1"><div className="flex items-center justify-between"><span className="truncate text-[13px]">{name}</span><span className="ml-1 text-[10px] text-[#999]">{time}</span></div><div className="mt-1 truncate text-[11px] text-[#999]">{preview}</div></div>
  </div>
);
