import {Img, staticFile, useCurrentFrame} from 'remotion';
import {tokenPercent} from '../lib/storyboard';
import { resolveActorAtFrame } from './LayeredSpriteActor';
import type {DirectorScript} from './scripts/types';

export const DirectorHUD = ({
	script,
	showWorkbench = true,
	cameraState,
}: {
	script: DirectorScript;
	showWorkbench?: boolean;
	cameraState: { zoom: number; panX: number; panY: number; shake: number };
}) => {
	const frame = useCurrentFrame();
	const currentAct =
		[...script.acts].reverse().find((a) => frame >= a.fromFrame) ?? script.acts[0];

	const yierState = resolveActorAtFrame(script.actors.yier, frame);
	const bubuState = resolveActorAtFrame(script.actors.bubu, frame);
	const whaleState = resolveActorAtFrame(script.actors.whale_girl, frame);

	const dsHp = tokenPercent(frame);
	const bearEnergy = Math.min(100, Math.round(35 + (frame / script.durationInFrames) * 65));
	const comboCount =
		frame < 240 ? 0 : frame < 540 ? 12 : frame < 1050 ? 28 : frame < 1440 ? 45 : 65;

	return (
		<div className="pointer-events-none absolute inset-0 z-[185] font-sans">
			{/* Top Arcade Fighting Game VS Bar */}
			<div className="mx-auto mt-3 flex w-[1840px] items-center justify-between rounded-2xl border border-white/25 bg-slate-950/80 px-5 py-2.5 text-white shadow-2xl backdrop-blur-md">
				{/* Left: Yier & Bubu Team */}
				<div className="flex w-[720px] items-center gap-3.5">
					<div className="relative flex -space-x-2">
						<Img
							src={staticFile('stickers/yier_avatar.png')}
							className="h-12 w-12 rounded-xl border-2 border-pink-400 shadow-md"
						/>
						<Img
							src={staticFile('stickers/bubu_avatar.png')}
							className="h-12 w-12 rounded-xl border-2 border-amber-400 shadow-md"
						/>
					</div>
					<div className="flex-1">
						<div className="flex items-center justify-between text-xs font-bold">
							<span className="text-amber-300">🐻 一二 & 布布 · 炸鸡护卫队</span>
							<span className="text-pink-300">贴贴护食能量 {bearEnergy}%</span>
						</div>
						<div className="mt-1.5 h-3.5 w-full overflow-hidden rounded-full border border-white/20 bg-slate-800 p-0.5">
							<div
								className="h-full rounded-full bg-gradient-to-r from-pink-500 via-amber-400 to-emerald-400 transition-all"
								style={{width: '100%'}}
							/>
						</div>
						<div className="mt-1 flex gap-3 font-mono text-[10px] text-slate-300">
							<span>
								一二: [{yierState?.action ?? 'standby'} + {yierState?.expression ?? '-'}]
							</span>
							<span>
								布布: [{bubuState?.action ?? 'standby'} + {bubuState?.expression ?? '-'}]
							</span>
						</div>
					</div>
				</div>

				{/* Center: Act Banner & Combo Counter */}
				<div className="flex flex-col items-center px-4 text-center">
					<div className="rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-3.5 py-0.5 text-[11px] font-black uppercase tracking-widest text-white shadow">
						{currentAct.actNumber} · {currentAct.title}
					</div>
					<div className="mt-1 text-[11px] text-sky-200">{currentAct.subtitle}</div>
					{comboCount > 0 && (
						<div className="mt-0.5 text-xs font-black text-amber-400">
							🔥 {comboCount} HIT COMBO!
						</div>
					)}
				</div>

				{/* Right: DeepSeek Whale Girl Boss */}
				<div className="flex w-[720px] flex-row-reverse items-center gap-3.5">
					<div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-[#4176E6] bg-[#1e293b] text-2xl shadow-md">
						🐋
					</div>
					<div className="flex-1 text-right">
						<div className="flex items-center justify-between text-xs font-bold">
							<span className="text-sky-300">Token 算力护盾 {dsHp}%</span>
							<span className="text-[#60a5fa]">DeepSeek 鲸鱼娘 · 铁血减肥管家 ⚡</span>
						</div>
						<div className="mt-1.5 h-3.5 w-full overflow-hidden rounded-full border border-white/20 bg-slate-800 p-0.5">
							<div
								className={`ml-auto h-full rounded-full transition-all ${
									dsHp < 25
										? 'bg-rose-500'
										: 'bg-gradient-to-l from-[#4176E6] via-sky-400 to-cyan-300'
								}`}
								style={{width: `${dsHp}%`}}
							/>
						</div>
						<div className="mt-1 font-mono text-[10px] text-slate-300">
							鲸鱼娘: [{whaleState?.action ?? 'standby'} + {whaleState?.expression ?? '-'}]
						</div>
					</div>
				</div>
			</div>

			{/* Optional Director Workbench Multi-Track Timeline Inspector at Bottom */}
			{showWorkbench && (
				<div className=" absolute inset-x-6 bottom-[78px] rounded-2xl border border-sky-400/40 bg-slate-950/90 px-5 py-3 text-white shadow-2xl backdrop-blur-md">
					<div className="mb-2 flex items-center justify-between border-b border-slate-800 pb-1.5 text-xs">
						<div className="flex items-center gap-3">
							<span className="rounded bg-sky-500/20 px-2 py-0.5 font-mono font-bold text-sky-300">
								🎬 REMOTION 导演台编排监视器 (Director Workbench v2.0)
							</span>
							<span className="font-mono text-slate-300">
								Frame: <strong className="text-amber-300">{frame}</strong> / {script.durationInFrames} ({(frame / script.fps).toFixed(1)}s)
							</span>
						</div>
						<div className="flex gap-4 font-mono text-[11px] text-slate-300">
							<span>Camera Zoom: {cameraState.zoom.toFixed(2)}x</span>
							<span>Pan: ({Math.round(cameraState.panX)}, {Math.round(cameraState.panY)})</span>
							<span>Shake: {cameraState.shake.toFixed(1)}px</span>
						</div>
					</div>

					{/* Visual Multi-Track Scrubber */}
					<div className="relative space-y-1.5 font-mono text-[10px]">
						{/* Playhead line */}
						<div
							className="absolute bottom-0 top-0 z-20 w-[2px] bg-rose-500 shadow-[0_0_8px_#f43f5e]"
							style={{left: `${(frame / script.durationInFrames) * 100}%`}}
						/>

						{/* Act Track */}
						<div className="flex h-5 w-full overflow-hidden rounded bg-slate-900">
							{script.acts.map((act, i) => {
								const w = ((act.toFrame - act.fromFrame) / script.durationInFrames) * 100;
								return (
									<div
										key={act.actNumber}
										className={`flex items-center justify-center truncate border-r border-slate-700 px-1 ${
											i % 2 === 0 ? 'bg-slate-800' : 'bg-slate-800/60'
										}`}
										style={{width: `${w}%`}}
									>
										{act.actNumber} {act.title}
									</div>
								);
							})}
						</div>

						{/* Character Tracks */}
						<div className="grid grid-cols-3 gap-2 text-[10px]">
							<div className="rounded bg-pink-950/60 px-2.5 py-1 border border-pink-500/30">
								<span className="text-pink-300 font-bold">一二 (Yier):</span> 身体={yierState?.action ?? '未登场'} | 表情={yierState?.expression ?? '-'}
							</div>
							<div className="rounded bg-amber-950/60 px-2.5 py-1 border border-amber-500/30">
								<span className="text-amber-300 font-bold">布布 (Bubu):</span> 身体={bubuState?.action ?? '未登场'} | 表情={bubuState?.expression ?? '-'}
							</div>
							<div className="rounded bg-blue-950/60 px-2.5 py-1 border border-blue-500/30">
								<span className="text-sky-300 font-bold">鲸鱼娘 (Whale):</span> 身体={whaleState?.action ?? '未登场'} | 表情={whaleState?.expression ?? '-'}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
