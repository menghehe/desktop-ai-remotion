import {Gif} from '@remotion/gif';
import {
  BellOff,
  Box,
  FolderOpen,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Pin,
  Scissors,
  Search,
  Send,
  Smile,
  Users,
  Video,
} from 'lucide-react';
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {EP01_FRIED_CHICKEN} from '../episodes/ep01_fried_chicken';
import {EpisodeScript} from '../lib/stageAnchors';
import {typed} from '../lib/storyboard';
import {WeChatIcon} from './BrandIcons';

const Avatar = ({
  src,
  label,
  color,
  badge,
}: {
  src?: string;
  label: string;
  color: string;
  badge?: number | string;
}) => (
  <div className="relative shrink-0">
    <div
      className={`flex h-10 w-10 items-center justify-center overflow-hidden rounded-[4px] text-sm font-semibold text-white ${color}`}
    >
      {src ? (
        <Img src={staticFile(src)} className="h-full w-full object-cover" />
      ) : (
        label
      )}
    </div>
    {badge !== undefined && (
      <span className="absolute -right-1.5 -top-1.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#FA5151] px-1 text-[10px] font-bold leading-none text-white shadow-sm">
        {badge}
      </span>
    )}
  </div>
);

/**
 * Renders the AI's rejection text ("不吃！我在啃黄瓜！") being physically
 * shattered and blasted apart character-by-character as Yier hammers it.
 */
const ShatteredTextComposer = ({
  aiText,
  heroText,
  frame,
  aiTypeStart,
  smashStart,
  smashEnd,
  heroTypeStart,
  sent,
}: {
  aiText: string;
  heroText: string;
  frame: number;
  aiTypeStart: number;
  smashStart: number;
  smashEnd: number;
  heroTypeStart: number;
  sent: boolean;
}) => {
  if (sent) {
    return null;
  }

  // Phase 3: Hero typing the fried chicken order
  if (frame >= heroTypeStart) {
    const currentHero = typed(heroText, frame, heroTypeStart, 2);
    return (
      <span className="font-medium text-[#191919]">
        {currentHero}
        <span className="ml-0.5 inline-block h-4 w-[1.5px] bg-[#07C160] align-middle" />
      </span>
    );
  }

  // Phase 2: Yier hammering and shattering the AI reply into flying shards
  if (frame >= smashStart) {
    const smashP = interpolate(frame, [smashStart, smashEnd], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const chars = aiText.split('');

    return (
      <span className="relative inline-flex select-none items-center">
        {chars.map((ch, idx) => {
          // Stagger each character's shatter timing by hammer strikes
          const charTrigger = (idx / chars.length) * 0.68;
          const localP = interpolate(smashP, [charTrigger, charTrigger + 0.32], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const dirX = (idx % 2 === 0 ? -1 : 1) * (28 + (idx * 17) % 65);
          const dx = dirX * localP;
          const dy = -42 * Math.sin(localP * Math.PI) + localP * localP * 95;
          const rot = (idx % 2 === 0 ? -1 : 1) * localP * (95 + idx * 24);
          const opacity = 1 - localP * 0.95;

          return (
            <span
              key={idx}
              className={`inline-block font-semibold ${
                localP > 0.02 ? 'text-[#FA5151] line-through' : 'text-[#191919]'
              }`}
              style={{
                transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(${
                  1 - localP * 0.25
                })`,
                opacity,
              }}
            >
              {ch}
            </span>
          );
        })}
        {/* Impact Crack & Spark SVG inside composer */}
        {smashP > 0.05 && smashP < 0.92 && (
          <span className="ml-3 rounded bg-red-100 px-1.5 py-0.5 text-[11px] font-bold text-red-600">
            💥 拒绝文案粉碎中 {(smashP * 100).toFixed(0)}%
          </span>
        )}
      </span>
    );
  }

  // Phase 1: AI typing rejection text
  const currentAi = typed(aiText, frame, aiTypeStart, 2);
  const caretActive = frame >= aiTypeStart - 15;
  return (
    <span className="text-[#191919]">
      {currentAi}
      {caretActive && (
        <span className="ml-0.5 inline-block h-4 w-[1.5px] bg-[#191919] align-middle" />
      )}
    </span>
  );
};

export const WeChatWindow = ({
  script = EP01_FRIED_CHICKEN,
}: {
  script?: EpisodeScript;
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const wc = script.wechat;

  const enter = spring({
    frame,
    fps,
    config: {damping: 18, stiffness: 150, mass: 0.8},
  });

  const sent = frame >= wc.sentFrame;
  const panelOpen =
    frame >= wc.emojiPanelOpenRange[0] && frame < wc.emojiPanelOpenRange[1];
  const stickerBroken = frame >= wc.breakoutFrame;
  const wifeTyping =
    frame >= wc.wifeTypingRange[0] && frame <= wc.wifeTypingRange[1];

  // Physical trampoline compression when Yier jumps onto the first chat bubble (frames 275..300)
  const bubbleTrampolineImpact = interpolate(
    frame,
    [276, 286, 302],
    [0, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  // Physical emoji icon compression when Yier stomps on `<Smile />` (frames 346..415)
  const emojiIconStomp =
    frame >= 346 && frame <= 415
      ? Math.max(0, Math.sin((frame - 346) * 0.45))
      : 0;

  // Physical send button compression (`SpriteJumpTest` signature impact)
  const sendImpact = interpolate(
    frame,
    [wc.stompSendRange[0], wc.stompSendRange[0] + 8, wc.stompSendRange[1]],
    [0, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const windowShakeY =
    sendImpact * Math.sin((frame - wc.stompSendRange[0]) * 2.8) * 2.4;

  // Smooth spring animation for sent green bubble and wife's final reply
  const sentBubbleEnter = spring({
    frame: Math.max(0, frame - wc.sentFrame),
    fps,
    config: {damping: 14, stiffness: 185, mass: 0.7},
  });
  const wifeReplyEnter = spring({
    frame: Math.max(0, frame - wc.wifeReplyFrame),
    fps,
    config: {damping: 15, stiffness: 175, mass: 0.75},
  });

  // Dynamic session preview text in middle column
  const latestPreview =
    frame >= wc.wifeReplyFrame
      ? wc.wifeReplyText
      : sent
        ? wc.heroReplyText
        : frame >= wc.stickerFrame
          ? '[动画表情]'
          : frame >= wc.inviteFrame
            ? '老公，今晚吃炸鸡吗？'
            : '今晚吃什么？';

  const latestTime =
    frame >= wc.wifeReplyFrame ? '21:31' : frame >= wc.inviteFrame ? '21:30' : '20:15';

  const unreadCount =
    frame >= wc.inviteFrame && frame < wc.unreadClearFrame + 25 ? 1 : undefined;

  const hasComposerContent =
    !sent &&
    ((frame >= wc.aiTypeStartFrame && frame < wc.smashEndFrame) ||
      frame >= wc.heroTypeStartFrame);

  return (
    <section
      className="window-shadow absolute left-[30px] top-[112px] z-20 flex h-[818px] w-[1050px] overflow-hidden rounded-[8px] border border-black/15 bg-[#F5F5F5] text-[#191919]"
      style={{
        opacity: enter,
        transform: `translateY(${24 * (1 - enter) + windowShakeY}px) scale(${
          0.97 + enter * 0.03
        })`,
      }}
    >
      {/* Left Navigation Sidebar (#2E2E2E) */}
      <nav className="flex w-[60px] shrink-0 flex-col items-center bg-[#2E2E2E] pb-5 pt-5 text-[#8C8C8C]">
        <div className="relative">
          <Avatar src="stickers/bubu_avatar.png" label="布" color="bg-amber-700" />
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#2E2E2E] bg-[#07C160]" />
        </div>
        <div className="mt-7 flex flex-col items-center gap-7">
          <div className="relative">
            <MessageSquare size={24} fill="currentColor" className="text-[#07C160]" />
            {unreadCount && (
              <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#FA5151] text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </div>
          <Users size={23} />
          <Box size={22} />
          <FolderOpen size={22} />
        </div>
        <div className="mt-auto flex flex-col items-center gap-6">
          <WeChatIcon size={22} />
          <span className="text-lg leading-none">☰</span>
        </div>
      </nav>

      {/* Middle Contact / Session List (#EAE8E7) */}
      <aside className="w-[240px] shrink-0 border-r border-[#D6D6D6] bg-[#EAE8E7]">
        <div className="flex h-[62px] items-center gap-2 border-b border-[#E0DFDE] bg-[#F7F7F7] px-3">
          <div className="flex h-[26px] flex-1 items-center gap-1.5 rounded-[4px] bg-[#E2E2E2] px-2 text-xs text-[#888]">
            <Search size={13} />
            <span>搜索</span>
          </div>
          <div className="flex h-[26px] w-[26px] items-center justify-center rounded-[4px] bg-[#E2E2E2] text-base text-[#555]">
            +
          </div>
        </div>

        {/* Active Pinned Wife Session */}
        <div className="relative flex h-[68px] items-center gap-3 bg-[#C6C5C5] px-3">
          {/* Pinned corner triangle */}
          <div className="absolute left-0 top-0 h-0 w-0 border-r-[8px] border-t-[8px] border-r-transparent border-t-[#07C160]/60" />
          <Avatar
            src="stickers/yier_avatar.png"
            label="一"
            color="bg-rose-400"
            badge={unreadCount}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className=" flex items-center gap-1 truncate text-[14px] font-medium text-[#111]">
                {wc.contactName}
              </span>
              <span className="text-[11px] text-[#666]">{latestTime}</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span
                className={`truncate text-[12px] ${
                  stickerBroken && !sent ? 'font-medium text-[#FA5151]' : 'text-[#666]'
                }`}
              >
                {stickerBroken && !sent ? '[表情破壁出逃中!]' : latestPreview}
              </span>
              <Pin size={11} className="shrink-0 rotate-45 text-[#888]" />
            </div>
          </div>
        </div>

        <Contact
          name="周五绝不加班项目组(48)"
          preview="老板：@全体成员 周末对齐一下颗粒度"
          label="班"
          color="bg-blue-500"
          time="18:02"
          muted
          unreadDot
        />
        <Contact
          name="文件传输助手"
          preview="[文件] 铁血减肥立誓书_最终版.docx"
          label="文"
          color="bg-[#07C160]"
          time="14:00"
        />
        <Contact
          name="相亲相爱一家熊"
          preview="妈妈：[链接] 震惊！熬夜吃炸鸡竟会…"
          label="家"
          color="bg-orange-400"
          time="周二"
          muted
        />
        <Contact
          name="黄金脆皮炸鸡·福利官"
          preview="[小程序] 周五疯狂买一送一券已到账"
          label="鸡"
          color="bg-amber-500"
          time="昨天"
        />
      </aside>

      {/* Right Main Chat Stage (#F5F5F5) */}
      <main className="relative flex min-w-0 flex-1 flex-col bg-[#F5F5F5]">
        {/* Authentic 62px WeChat Right Header with Embedded Top-Right Window Controls */}
        <header className="h-[62px] shrink-0 border-b border-[#E5E5E5] bg-[#F5F5F5]">
          <div className="flex h-[24px] items-center justify-end text-[11px] text-[#666]">
            <span className="flex h-full w-8 items-center justify-center">📌</span>
            <span className="flex h-full w-9 items-center justify-center">—</span>
            <span className="flex h-full w-9 items-center justify-center">□</span>
            <span className="flex h-full w-9 items-center justify-center hover:bg-[#FA5151] hover:text-white">
              ×
            </span>
          </div>
          <div className="flex h-[38px] items-center justify-between px-6 pb-1">
            <div className="flex items-center gap-2.5">
              <span className="text-[17px] font-medium text-[#111]">
                { wifeTyping ? '对方正在输入...' : wc.contactName }
              </span>
              {wifeTyping && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#07C160]/15 px-2 py-0.5 text-[11px] font-medium text-[#07C160]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#07C160]" />
                  秒回中
                </span>
              )}
            </div>
            <MoreHorizontal size={20} className="text-[#666]" />
          </div>
        </header>

        {/* Chat Message Stream */}
        <div className="chat-scroll relative flex-1 overflow-hidden px-6 py-4">
          <div className="mb-4 text-center">
            <span className="rounded-[3px] bg-[#DADADA]/70 px-2 py-0.5 text-[11px] text-[#999]">
              21:30
            </span>
          </div>

          {/* Message 1: Wife's Fried Chicken Invitation (Acts as Physical Trampoline!) */}
          {frame >= wc.inviteFrame && (
            <div className="flex items-start gap-3">
              <Avatar src="stickers/yier_avatar.png" label="一" color="bg-rose-400" />
              <div
                className="relative max-w-[530px] rounded-[4px] bg-white px-3.5 py-2.5 text-[15px] leading-6 text-[#111] shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
                style={{
                  transformOrigin: '50% 100%',
                  transform: `translateY(${bubbleTrampolineImpact * 10}px) scaleX(${
                    1 + bubbleTrampolineImpact * 0.06
                  }) scaleY(${1 - bubbleTrampolineImpact * 0.16})`,
                }}
              >
                <div className="absolute -left-[5px] top-[14px] h-[10px] w-[10px] rotate-45 bg-white" />
                <span className="relative z-10">{wc.inviteText}</span>
                {bubbleTrampolineImpact > 0.05 && (
                  <span className="absolute -top-5 right-4 rounded-full bg-amber-400/90 px-2 py-0.5 text-[10px] font-bold text-slate-900 shadow">
                    BOING! 弹射跳板
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Message 2: Yier Sticker Slot (Breaks Out at Frame 240 with Shattered Frame VFX) */}
          {frame >= wc.stickerFrame && (
            <div className="mt-4 flex items-start gap-3">
              <Avatar src="stickers/yier_avatar.png" label="一" color="bg-rose-400" />
              <div className="relative flex h-[122px] w-[122px] items-center justify-center">
                {stickerBroken ? (
                  <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-rose-300 bg-white/60 p-2 text-center shadow-inner">
                    {/* Cracked Glass Lines SVG */}
                    <svg
                      viewBox="0 0 100 100"
                      className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
                    >
                      <path
                        d="M50 50 L12 18 M50 50 L88 22 M50 50 L82 85 M50 50 L18 78 M32 35 L65 28 M30 68 L70 64"
                        stroke="#F43F5E"
                        strokeWidth="1.8"
                        fill="none"
                      />
                    </svg>
                    <span className="relative z-10 text-lg">💥</span>
                    <span className="relative z-10 mt-1 text-[11px] font-semibold text-rose-500">
                      [一二已破窗出战]
                    </span>
                  </div>
                ) : (
                  <Gif
                    src={staticFile('stickers/01_yier_drool.gif')}
                    width={118}
                    height={118}
                    fit="contain"
                  />
                )}
              </div>
            </div>
          )}

          {/* Message 3: Sent Hero Reply ("吃！全家桶加双份薯条！") */}
          {sent && (
            <div
              className="mt-5 flex flex-row-reverse items-start gap-3"
              style={{
                opacity: sentBubbleEnter,
                transform: `translateY(${(1 - sentBubbleEnter) * 28}px) scale(${
                  0.84 + sentBubbleEnter * 0.16
                })`,
                transformOrigin: '90% 100%',
              }}
            >
              <Avatar src="stickers/bubu_avatar.png" label="布" color="bg-amber-700" />
              <div className="relative rounded-[4px] bg-[#95EC69] px-3.5 py-2.5 text-[15px] font-medium leading-6 text-[#111] shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
                <div className="absolute -right-[5px] top-[14px] h-[10px] w-[10px] rotate-45 bg-[#95EC69]" />
                <span className="relative z-10">{wc.heroReplyText}</span>
              </div>
            </div>
          )}

          {/* Message 4: Wife's Excited Reply at Frame 1000 */}
          {frame >= wc.wifeReplyFrame && (
            <div
              className="mt-5 flex items-start gap-3"
              style={{
                opacity: wifeReplyEnter,
                transform: `translateY(${(1 - wifeReplyEnter) * 18}px) scale(${
                  0.88 + wifeReplyEnter * 0.12
                })`,
                transformOrigin: '10% 100%',
              }}
            >
              <Avatar src="stickers/yier_avatar.png" label="一" color="bg-rose-400" />
              <div className="relative rounded-[4px] bg-white px-3.5 py-2.5 text-[15px] leading-6 text-[#111] shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
                <div className="absolute -left-[5px] top-[14px] h-[10px] w-[10px] rotate-45 bg-white" />
                <span className="relative z-10">{wc.wifeReplyText}</span>
              </div>
            </div>
          )}
        </div>

        {/* Pop-up Sticker / Emoji Favorites Panel */}
        {panelOpen && (
          <div className="absolute bottom-[162px] left-4 z-30 h-[232px] w-[336px] rounded-[6px] border border-[#D8D8D8] bg-white p-3.5 shadow-2xl">
            <div className="mb-2.5 flex items-center justify-between border-b border-[#EFEFEF] pb-2 text-[12px] text-[#777]">
              <span>添加的单个表情（一二布布特遣队）</span>
              <span className="text-[11px] text-[#07C160]">已激活召唤</span>
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              <div className="flex h-[64px] items-center justify-center rounded bg-[#F5F5F5] text-2xl">
                ❤️
              </div>
              <div className="flex h-[64px] flex-col items-center justify-center rounded border-2 border-dashed border-amber-400 bg-amber-50/60 text-[10px] font-bold text-amber-700">
                <span>🐻 布布</span>
                <span>已跃出支援!</span>
              </div>
              <div className="flex h-[64px] items-center justify-center rounded bg-[#FAFAFA]">
                <Img
                  src={staticFile('sprites/yier/jump/002.png')}
                  className="h-14 w-14 object-contain"
                />
              </div>
              <div className="flex h-[64px] items-center justify-center rounded bg-[#FAFAFA]">
                <Img
                  src={staticFile('sprites/bubu/jump/002.png')}
                  className="h-14 w-14 object-contain"
                />
              </div>
            </div>
            {/* Downward triangle pointer aligned to Smile icon */}
            <div className="absolute -bottom-[7px] left-[22px] h-3.5 w-3.5 rotate-45 border-b border-r border-[#D8D8D8] bg-white" />
          </div>
        )}

        {/* Bottom Input Composer & Toolbar (#F5F5F5) */}
        <footer className="relative h-[160px] shrink-0 border-t border-[#E0E0E0] bg-[#F5F5F5]">
          {/* Toolbar Row */}
          <div className="flex h-[40px] items-center justify-between px-5 text-[#5C5C5C]">
            <div className="flex items-center gap-5">
              <div
                className="relative flex items-center justify-center"
                style={{
                  transform: `scaleX(${1 + emojiIconStomp * 0.28}) scaleY(${
                    1 - emojiIconStomp * 0.32
                  })`,
                }}
              >
                <Smile
                  size={21}
                  className={
                    panelOpen || emojiIconStomp > 0.1
                      ? 'text-[#07C160]'
                      : 'text-[#5C5C5C]'
                  }
                />
              </div>
              <FolderOpen size={19} />
              <Scissors size={19} />
              <MessageSquare size={19} />
            </div>
            <div className="flex items-center gap-5">
              <Phone size={18} />
              <Video size={19} />
            </div>
          </div>

          {/* Text Input Area with Physical Text Shattering */}
          <div className="h-[72px] whitespace-pre-wrap px-5 py-1.5 text-[15px] leading-6">
            <ShatteredTextComposer
              aiText={wc.aiReplyText}
              heroText={wc.heroReplyText}
              frame={frame}
              aiTypeStart={wc.aiTypeStartFrame}
              smashStart={wc.smashStartFrame}
              smashEnd={wc.smashEndFrame}
              heroTypeStart={wc.heroTypeStartFrame}
              sent={sent}
            />
          </div>

          {/* Send Button with Top-Origin Compression & Impact Rays (`SpriteJumpTest` Physics) */}
          <div className="flex h-[44px] items-center justify-end px-5 pb-2">
            <div className="relative flex items-center">
              {/* Green Impact Rays on Foot Stomp */}
              {sendImpact > 0.08 &&
                [-1, 0, 1].map((i) => (
                  <div
                    key={i}
                    className="pointer-events-none absolute -top-3.5 h-[3px] w-6 rounded bg-[#07C160]"
                    style={{
                      left: 38 + i * 32,
                      opacity: sendImpact,
                      transform: `translateY(${-sendImpact * 6}px) rotate(${i * 25}deg)`,
                    }}
                  />
                ))}
              <div
                className={`flex h-[32px] w-[98px] items-center justify-center gap-1.5 rounded-[4px] text-[13px] font-medium transition-colors ${
                  hasComposerContent
                    ? 'bg-[#07C160] text-white shadow-sm'
                    : 'bg-[#E9E9E9] text-[#07C160]'
                }`}
                style={{
                  transformOrigin: '50% 0%',
                  transform: `scaleX(${1 + sendImpact * 0.18}) scaleY(${
                    1 - sendImpact * 0.44
                  })`,
                }}
              >
                <span>发送(S)</span>
                <Send size={12} />
              </div>
            </div>
          </div>
        </footer>
      </main>
    </section>
  );
};

const Contact = ({
  name,
  preview,
  label,
  color,
  time,
  muted,
  unreadDot,
}: {
  name: string;
  preview: string;
  label: string;
  color: string;
  time: string;
  muted?: boolean;
  unreadDot?: boolean;
}) => (
  <div className="flex h-[66px] items-center gap-3 border-b border-[#E2E0DF]/60 px-3">
    <div className="relative">
      <Avatar label={label} color={color} />
      {unreadDot && (
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#FA5151]" />
      )}
    </div>
    <div className="min-w-0 flex-1">
      <div className="flex items-center justify-between">
        <span className="truncate text-[13px] text-[#191919]">{name}</span>
        <span className="ml-1 shrink-0 text-[10px] text-[#999]">{time}</span>
      </div>
      <div className="mt-1 flex items-center justify-between">
        <span className="truncate text-[11px] text-[#999]">{preview}</span>
        {muted && <BellOff size={12} className="ml-1 shrink-0 text-[#B2B2B2]" />}
      </div>
    </div>
  </div>
);
