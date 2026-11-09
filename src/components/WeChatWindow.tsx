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

export const WeChatWindow = ({
	offsetX = 130,
	offsetY = 112,
	shakeX = 0,
	shakeY = 0,
	tiltDeg = 0,
}: {
	offsetX?: number;
	offsetY?: number;
	shakeX?: number;
	shakeY?: number;
	tiltDeg?: number;
} = {}) => {
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
			className="window-shadow absolute z-20 flex h-[818px] w-[960px] overflow-hidden rounded-xl border border-white/70 bg-[#F5F5F5] font-sans text-slate-800"
			style={{
				left: offsetX + shakeX,
				top: offsetY + shakeY,
				opacity: enter,
				transform: `translateY(${24 * (1 - enter)}px) scale(${0.97 + enter * 0.03}) rotate(${tiltDeg}deg)`,
			}}
		>
			<nav className="flex w-[60px] shrink-0 flex-col items-center bg-[#2E2E2E] pb-5 pt-5 text-[#8c8c8c]">
				<Avatar src="stickers/bubu_avatar.png" label="布" color="bg-amber-700" />
				<div className="mt-8 flex flex-col items-center gap-8">
					<MessageSquare size={25} fill="currentColor" className="text-[#07C160]" />
					<Users size={25} /><FolderOpen size={23} />
				</div>
				<div className="mt-auto flex flex-col items-center gap-6"><WeChatIcon size={23} /><span className="text-xs">⚙️</span></div>
			</nav>

			<aside className="w-[225px] shrink-0 border-r border-[#D6D6D6] bg-[#EAE8E7]">
				<div className="flex h-[60px] items-center gap-2 border-b border-[#E5E5E5] bg-[#F7F7F7] px-3">
					<div className="flex h-[27px] flex-1 items-center gap-2 rounded bg-[#E2E2E2] px-2 text-xs text-[#888]"><Search size={13} />搜索</div>
					<div className="flex h-[27px] w-[27px] items-center justify-center rounded bg-[#E2E2E2] text-lg text-[#555]">+</div>
				</div>
				<div className="flex h-[68px] items-center gap-3 bg-[#C6C5C5] px-3">
					<Avatar src="stickers/yier_avatar.png" label="一" color="bg-rose-400" />
					<div className="min-w-0 flex-1">
						<div className="flex items-center justify-between"><span className="text-[14px] font-medium">老婆大人❤️</span><span className="text-[10px] text-[#888]">21:30</span></div>
						<div className="mt-1 truncate text-[11px] text-[#666]">{sent ? FINAL_REPLY : '[动画表情]'}</div>
					</div>
				</div>
				<Contact name="周五绝不加班项目组(48)" preview="收到，下周一再看" label="班" color="bg-blue-400" time="18:02" />
				<Contact name="文件传输助手" preview="[文件] 铁血减肥立誓书.docx" label="文" color="bg-green-600" time="14:00" />
				<Contact name="相亲相爱一家熊" preview="妈妈: 记得添衣服" label="家" color="bg-orange-400" time="周二" />
			</aside>

			<main className="relative flex min-w-0 flex-1 flex-col bg-[#F5F5F5]">
				<div className="h-[74px] shrink-0 border-b border-[#E7E7E7]">
					<div className="flex h-6 justify-end text-xs text-[#666]"><span className="flex w-10 items-center justify-center">―</span><span className="flex w-10 items-center justify-center">口</span><span className="flex w-10 items-center justify-center hover:bg-red-500 hover:text-white">✕</span></div>
					<div className="flex items-center justify-between px-5 pb-2"><span className="text-[17px] font-medium">老婆大人❤️</span><div className="flex gap-4 text-[#666]"><Phone size={18} /><Video size={18} /><MoreHorizontal size={20} /></div></div>
				</div>

				<div className="chat-scroll flex-1 overflow-hidden px-5 py-3">
					<div className="mb-4 text-center"><span className="rounded bg-[#DADADA]/60 px-2 py-0.5 text-[10px] text-white">21:30</span></div>
					{frame >= 20 && (
						<div className="flex items-start gap-3">
							<Avatar src="stickers/yier_avatar.png" label="一" color="bg-rose-400" />
							<div className="relative max-w-[480px] rounded-[4px] bg-white px-3.5 py-2 text-[14px] leading-6 shadow-sm text-slate-800">
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
									<div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-red-400 bg-red-50/90 px-2 text-center text-xs font-bold text-red-600 shadow-inner">💥 [一二破窗参战!]</div>
								) : (
									<Gif src={staticFile('stickers/01_yier_beg.gif')} width={116} height={116} fit="contain" loopBehavior="loop" />
								)}
							</div>
						</div>
					)}

					{frame >= 180 && (
						<div className="mt-4 flex flex-row-reverse items-start gap-3">
							<Avatar src="stickers/bubu_avatar.png" label="布" color="bg-amber-700" />
							<div className="relative max-w-[480px] rounded-[4px] bg-[#95EC69] px-3.5 py-2 text-[14px] leading-6 text-slate-900 shadow-sm">
								<div className="absolute -right-[5px] top-[14px] h-[10px] w-[10px] rotate-45 bg-[#95EC69]" />
								<span className="relative z-10">{AI_REPLY}</span>
							</div>
						</div>
					)}

					{sent && (
						<div className="mt-4 flex flex-row-reverse items-start gap-3">
							<Avatar src="stickers/bubu_avatar.png" label="布" color="bg-amber-700" />
							<div className="relative max-w-[480px] rounded-[4px] bg-[#95EC69] px-3.5 py-2 text-[14px] leading-6 font-bold text-slate-900 shadow-md ring-2 ring-emerald-400">
								<div className="absolute -right-[5px] top-[14px] h-[10px] w-[10px] rotate-45 bg-[#95EC69]" />
								<span className="relative z-10">{FINAL_REPLY}</span>
							</div>
						</div>
					)}
				</div>

				{panelOpen && (
					<div className="absolute inset-x-0 bottom-[180px] z-30 flex h-[195px] items-center justify-around border-t border-red-200 bg-rose-50/95 px-6 backdrop-blur">
						<div className="text-center"><div className="text-3xl">🍗</div><div className="mt-1 text-xs font-semibold text-rose-800">黄金原味鸡</div></div>
						<div className="text-center"><div className="text-3xl">🍟</div><div className="mt-1 text-xs font-semibold text-rose-800">薯条加倍</div></div>
						<div className="text-center"><div className="text-3xl">🥤</div><div className="mt-1 text-xs font-semibold text-rose-800">冰可乐 x2</div></div>
					</div>
				)}

				<footer className="relative flex h-[180px] shrink-0 flex-col border-t border-[#E7E7E7] bg-[#F5F5F5]">
					<div className="flex h-10 items-center gap-5 px-5 text-[#666]"><Smile size={20} /><FolderOpen size={20} /><Scissors size={20} /><Video size={20} /></div>
					<div className="chat-scroll flex-1 px-5 text-[15px] font-medium leading-6 text-slate-800">
						<span>{composer}</span>
						{!sent && <span className="typing-caret" />}
					</div>
					<div className="flex h-12 items-center justify-end px-5">
						<button
							type="button"
							className={`flex h-8 items-center gap-1.5 rounded bg-[#E9E9E9] px-4 text-xs font-medium text-[#07C160] transition-all ${
								squash ? 'scale-y-50 border-2 border-emerald-500 bg-emerald-200' : ''
							}`}
						>
							发送(S) <Send size={12} />
						</button>
					</div>
				</footer>
			</main>
		</section>
	);
};

const Contact = ({name, preview, label, color, time}: {name: string; preview: string; label: string; color: string; time?: string}) => (
	<div className="flex h-[68px] items-center gap-3 px-3">
		<Avatar label={label} color={color} />
		<div className="min-w-0 flex-1"><div className="flex items-center justify-between"><span className="truncate text-xs font-medium text-slate-800">{name}</span><span className="text-[10px] text-slate-400">{time ?? '14:20'}</span></div><div className="truncate text-[11px] text-slate-400">{preview}</div></div>
	</div>
);
