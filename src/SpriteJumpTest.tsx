import {FolderOpen, MessageSquare, MoreHorizontal, Scissors, Search, Send, Smile, Users, Video} from 'lucide-react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {LayeredSpriteActor} from './director/LayeredSpriteActor';
import type {BearExpression} from './director/spriteManifest';

const MESSAGE = '吃！全家桶加双份薯条！';

const exprAt = (frame: number): BearExpression => {
	if (frame < 10) return 'battle_serious';
	if (frame < 18) return 'charging_roar';
	if (frame < 44) return 'happy';
	if (frame < 54) return 'angry';
	return 'wink_love';
};

export const SpriteJumpTest = () => {
	const frame = useCurrentFrame();
	const sent = frame >= 59;
	const impact = interpolate(frame, [48, 52, 59], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const expr = exprAt(frame);

	return (
		<AbsoluteFill className="items-center justify-center bg-[#cfe0ed] font-sans">
			<Img src={staticFile('win11/wallpaper/blue-bloom.jpg')} className="absolute inset-0 h-full w-full object-cover" />
			<div className="absolute inset-0 bg-[#d7e6f1]/45" />
			<div className="absolute left-8 top-7 z-50 rounded-full bg-[#14243b]/85 px-5 py-2 text-[13px] font-medium tracking-wide text-white shadow-lg backdrop-blur-md">
				帧 {frame} | 身体图层: jump | 独立表情图层: {expr} (动作与表情实时分离组合测试)
			</div>

			<section className="window-shadow relative h-[900px] w-[1580px] overflow-hidden rounded-xl border border-white/70 bg-[#f3f3f3]/95 text-slate-800">
				<header className="flex h-11 items-center border-b border-black/5 bg-white px-4 text-[13px] text-slate-600">
					<MessageSquare size={18} className="mr-2 text-[#07c160]" /><span>微信 · 一二布布分离式精灵图跳跃压测</span>
					<div className="ml-auto flex gap-8 text-[#666]"><span>-</span><span>□</span><span>×</span></div>
				</header>
				<div className="flex h-[calc(100%-2.75rem)]">
					<nav className="flex w-[68px] shrink-0 flex-col items-center bg-[#2e2e2e] py-6 text-[#8c8c8c]">
						<Img src={staticFile('stickers/bubu_avatar.png')} className="h-11 w-11 rounded-md" />
						<MessageSquare size={26} fill="currentColor" className="mt-10 text-[#07c160]" /><Users size={26} className="mt-7" /><FolderOpen size={26} className="mt-7" />
					</nav>
					<aside className="w-[255px] shrink-0 border-r border-[#d6d6d6] bg-[#eae8e7]">
						<div className="flex h-[62px] items-center gap-2 bg-[#f7f7f7] px-4"><div className="flex h-8 flex-1 items-center rounded bg-[#e2e2e2] px-3 text-xs text-slate-400"><Search size={14} className="mr-2" />搜索</div></div>
						<div className="flex h-[76px] items-center gap-3 bg-[#c6c5c5] px-4"><Img src={staticFile('stickers/yier_avatar.png')} className="h-12 w-12 rounded-md" /><div className="flex-1"><div className="flex justify-between text-sm font-medium"><span>一二</span><span className="text-xs text-slate-400">21:30</span></div><div className="text-xs text-slate-500">[表情]</div></div></div>
					</aside>
					<main className="relative min-w-0 flex-1 bg-[#f5f5f5]">
						<div className="flex h-[62px] items-center justify-between border-b border-[#e7e7e7] px-6"><span className="font-medium text-slate-800">一二 ❤️ 布布</span><MoreHorizontal size={20} className="text-slate-500" /></div>
						<div className="px-8 pt-7 text-center text-[11px] text-[#aaa]">21:30</div>
						<div className="ml-8 mt-5 flex items-start gap-3">
							<Img src={staticFile('stickers/yier_avatar.png')} className="h-11 w-11 rounded-md" />
							<div className="relative mt-1 max-w-[490px] rounded-md bg-white px-5 py-4 text-[18px] leading-8 shadow-sm">
								<div className="absolute -left-[6px] top-[16px] h-3 w-3 rotate-45 bg-white" />
								老公，今晚吃炸鸡吗？黄金脆皮鸡腿桶买一送一！🍗
							</div>
						</div>

						{sent && (
							<div className="absolute right-10 top-[230px] max-w-[480px] rounded-[8px] bg-[#95ec69] px-5 py-4 text-[18px] leading-8 text-slate-900 shadow-sm">
								<div className="absolute -right-[6px] top-[18px] h-3 w-3 rotate-45 bg-[#95ec69]" />{MESSAGE}
							</div>
						)}

						<footer className="absolute inset-x-0 bottom-0 h-[205px] border-t border-[#e0e0e0] bg-[#f5f5f5]">
							<div className="flex h-12 items-center gap-6 px-7 text-[#5c5c5c]"><Smile size={23} /><FolderOpen size={23} /><Scissors size={23} /><Video size={23} /></div>
							<div className="h-[75px] px-7 py-2 text-[19px] text-[#222]">{sent ? '' : MESSAGE}<span className="inline-block h-5 w-[2px] animate-pulse bg-emerald-600 align-middle" /></div>
							<div className="absolute bottom-[24px] right-[38px] flex h-[54px] w-[132px] items-center justify-center rounded-md bg-[#f2f2f2] text-[17px] text-[#07c160]">
								<div className={`flex h-full w-full items-center justify-center gap-2 rounded-md text-[17px] font-medium transition ${sent ? 'bg-[#e9e9e9] text-[#aaa]' : 'bg-[#e9e9e9] text-[#07c160]'}`}>
									发送(S)<Send size={15} />
								</div>
							</div>
						</footer>

						{impact > 0.05 && [0, 1, 2].map((i) => <div key={i} className="absolute h-[3px] w-7 rounded bg-[#07c160]" style={{left: 1010 + i * 40, top: 778 - 3 + i * 2, opacity: impact * 0.9, transform: `rotate(${(i - 1) * 18}deg)`}} />)}

						<LayeredSpriteActor
							character="yier"
							size={260}
							showDebugAnchors
							keyframes={[
								{frame: 0, x: 340, y: 260, action: 'idle', expression: 'battle_serious'},
								{frame: 16, x: 340, y: 268, action: 'jump', expression: 'charging_roar'},
								{frame: 48, x: 1045, y: 780, jumpArc: -290, action: 'jump', expression: expr, afterimage: true},
								{frame: 89, x: 1045, y: 780, action: 'victory', expression: 'wink_love'},
							]}
						/>
						<LayeredSpriteActor
							character="bubu"
							size={260}
							showDebugAnchors
							keyframes={[
								{frame: 0, x: 190, y: 265, action: 'idle', expression: 'smug'},
								{frame: 22, x: 190, y: 270, action: 'jump', expression: 'charging_roar'},
								{frame: 56, x: 860, y: 780, jumpArc: -250, action: 'attack_hammer', expression: 'angry', afterimage: true},
								{frame: 89, x: 860, y: 780, action: 'victory', expression: 'drool'},
							]}
						/>
					</main>
				</div>
			</section>
		</AbsoluteFill>
	);
};
