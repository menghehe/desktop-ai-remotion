import {
  BellOff,
  FolderOpen,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Smile,
  Users,
  Video,
} from 'lucide-react';
import {interpolate, useCurrentFrame} from 'remotion';
import {isTyping, typedText} from '../lib/timeline';
import {WeChatIcon} from './BrandIcons';
import {WindowFrame} from './WindowFrame';

const REPLY = '不吃！我在啃黄瓜！';

const Avatar = ({children, color}: {children: React.ReactNode; color: string}) => (
  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-lg font-semibold text-white ${color}`}>
    {children}
  </div>
);

export const WeChatWindow = () => {
  const frame = useCurrentFrame();
  const sent = frame >= 102;
  const composerText = sent ? '' : typedText(REPLY, frame, 42, 2);
  const typing = !sent && isTyping(REPLY, frame, 42, 2);
  const buttonScale = interpolate(frame, [86, 94, 103, 112], [1, 0.58, 1.15, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <WindowFrame
      title="微信"
      icon={<span className="text-[#07c160]"><WeChatIcon size={23} /></span>}
      className="left-[270px] top-[92px] h-[830px] w-[1380px]"
      bodyClassName="bg-[#f5f5f5]"
    >
      <div className="flex h-full">
        <nav className="flex w-[72px] shrink-0 flex-col items-center bg-[#2e2e2e] pb-5 pt-6 text-[#8d8d8d]">
          <Avatar color="bg-[#e1a84f]">一</Avatar>
          <div className="mt-8 flex flex-col items-center gap-8">
            <span className="text-[#07c160]"><MessageSquare size={25} fill="currentColor" /></span>
            <Users size={25} />
            <FolderOpen size={24} />
          </div>
          <div className="mt-auto text-xl">☀</div>
        </nav>

        <aside className="w-[282px] shrink-0 bg-[#e6e5e5]">
          <div className="flex h-[66px] items-center gap-2 px-4">
            <div className="flex h-8 flex-1 items-center gap-2 rounded bg-[#dcdcdc] px-3 text-[#888]">
              <Search size={15} /><span className="text-xs">搜索</span>
            </div>
            <Plus size={20} className="text-[#666]" />
          </div>
          <div className="flex h-[76px] items-center gap-3 bg-[#c6c6c6] px-4">
            <Avatar color="bg-[#e79185]">老</Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[15px] text-[#202020]">老婆</span>
                <span className="text-[11px] text-[#777]">10:16</span>
              </div>
              <div className="mt-1 truncate text-xs text-[#666]">{sent ? REPLY : '晚上想吃火锅吗？'}</div>
            </div>
          </div>
          <Contact name="文件传输助手" preview="[图片]" avatar="文" color="bg-[#5fa66c]" />
          <Contact name="产品体验群" preview="小陈：收到" avatar="产" color="bg-[#6f91bc]" muted />
          <Contact name="妈妈" preview="记得添衣服" avatar="妈" color="bg-[#b485b7]" />
        </aside>

        <main className="flex min-w-0 flex-1 flex-col bg-[#f5f5f5]">
          <header className="flex h-[66px] shrink-0 items-center border-b border-[#dfdfdf] px-6">
            <div>
              <h2 className="text-[17px] font-medium text-[#202020]">老婆</h2>
              <p className="mt-0.5 text-[11px] text-[#999]">对方正在输入…</p>
            </div>
            <MoreHorizontal className="ml-auto text-[#666]" size={23} />
          </header>

          <div className="chat-scroll flex-1 overflow-hidden px-7 py-4">
            <div className="mb-5 text-center text-[11px] text-[#aaa]">10:15</div>
            <div className="flex items-start gap-3" style={{opacity: frame >= 10 ? 1 : 0}}>
              <Avatar color="bg-[#e79185]">老</Avatar>
              <div className="relative mt-1 rounded-md bg-white px-4 py-3 text-[15px] leading-6 text-[#252525] shadow-sm">
                晚上想吃火锅吗？
              </div>
            </div>

            {sent && (
              <div className="mt-6 flex flex-row-reverse items-start gap-3">
                <Avatar color="bg-[#e1a84f]">一</Avatar>
                <div className="relative mt-1 rounded-md bg-[#95ec69] px-4 py-3 text-[15px] leading-6 text-[#202020] shadow-sm">
                  {REPLY}
                </div>
              </div>
            )}

            {frame >= 130 && (
              <div className="mt-6 flex items-start gap-3">
                <Avatar color="bg-[#e79185]">老</Avatar>
                <div className="relative mt-1 rounded-md bg-white px-4 py-3 text-[15px] leading-6 text-[#252525] shadow-sm">
                  行，那你等着。<span className="ml-1">🙂</span>
                </div>
              </div>
            )}
          </div>

          <footer className="h-[178px] shrink-0 border-t border-[#dedede] bg-[#f7f7f7] px-5 py-3">
            <div className="flex items-center gap-5 text-[#555]">
              <Smile size={22} /><FolderOpen size={21} /><Video size={21} />
              <span className="ml-auto flex items-center gap-1 text-[11px] text-[#07c160]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#07c160]" /> AI 自动回复已开启
              </span>
            </div>
            <div className={`mt-4 min-h-[45px] whitespace-pre-wrap text-[15px] text-[#333] ${typing ? 'typing-caret' : ''}`}>
              {composerText}
            </div>
            <div className="mt-2 flex justify-end">
              <div
                className={`flex h-8 w-[84px] items-center justify-center gap-1 rounded text-sm ${composerText ? 'bg-[#07c160] text-white' : 'bg-[#e9e9e9] text-[#999]'}`}
                style={{transform: `scale(${buttonScale})`}}
              >
                发送 <Send size={13} />
              </div>
            </div>
          </footer>
        </main>
      </div>
    </WindowFrame>
  );
};

const Contact = ({name, preview, avatar, color, muted = false}: {name: string; preview: string; avatar: string; color: string; muted?: boolean}) => (
  <div className="flex h-[76px] items-center gap-3 px-4">
    <Avatar color={color}>{avatar}</Avatar>
    <div className="min-w-0 flex-1">
      <div className="text-[14px] text-[#333]">{name}</div>
      <div className="mt-1 truncate text-xs text-[#888]">{preview}</div>
    </div>
    {muted && <BellOff size={13} className="text-[#999]" />}
  </div>
);
