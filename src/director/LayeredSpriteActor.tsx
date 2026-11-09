import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {DeepSeekIcon} from '../components/BrandIcons';
import {getBearFrame} from './spriteManifest';
import type {ActorKeyframe, CharacterId} from './scripts/types';

export function resolveActorAtFrame(keyframes: ActorKeyframe[], frame: number) {
	if (!keyframes.length || frame < keyframes[0].frame) return null;
	let index = 0;
	for (let i = 0; i < keyframes.length - 1; i++) {
		if (frame >= keyframes[i].frame) index = i;
	}
	const start = keyframes[index];
	const end = keyframes[Math.min(index + 1, keyframes.length - 1)];
	const p =
		start.frame === end.frame
			? 1
			: interpolate(frame, [start.frame, end.frame], [0, 1], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
			  });
	const eased = p * p * (3 - 2 * p);
	const x = interpolate(eased, [0, 1], [start.x, end.x]);
	const baseY = interpolate(eased, [0, 1], [start.y, end.y]);
	const arc = end.jumpArc ? Math.sin(p * Math.PI) * end.jumpArc : 0;
	const y = baseY + arc;

	const sinceLanding = frame - end.frame;
	const landingSquash =
		sinceLanding >= 0 && sinceLanding < 12 && end.jumpArc
			? Math.sin((sinceLanding / 12) * Math.PI) * 0.22 * (1 - sinceLanding / 12)
			: 0;
	const takeoffCrouch =
		p > 0 && p < 0.16 && end.jumpArc ? Math.sin((p / 0.16) * Math.PI) * 0.14 : 0;

	const scale = interpolate(eased, [0, 1], [start.scale ?? 1, end.scale ?? 1]);
	const rotation = interpolate(eased, [0, 1], [start.rotate ?? 0, end.rotate ?? 0]);
	const currentKey = p < 0.85 ? start : end;

	return {
		x,
		y,
		baseY,
		p,
		scale,
		rotation,
		landingSquash,
		takeoffCrouch,
		action: currentKey.action,
		expression: currentKey.expression,
		flipX: currentKey.flipX ?? false,
		afterimage: currentKey.afterimage ?? false,
		auraColor: currentKey.auraColor,
		speech: currentKey.speech,
		thought: currentKey.thought,
		playbackSpeed: currentKey.playbackSpeed ?? 0.35,
	};
}

export const LayeredSpriteActor = ({
	character,
	keyframes,
	size = 220,
	zIndex = 95,
	showDebugAnchors = false,
}: {
	character: CharacterId;
	keyframes: ActorKeyframe[];
	size?: number;
	zIndex?: number;
	showDebugAnchors?: boolean;
}) => {
	const frame = useCurrentFrame();
	const resolved = resolveActorAtFrame(keyframes, frame);
	if (!resolved) return null;

	const {
		x,
		y,
		baseY,
		scale,
		rotation,
		landingSquash,
		takeoffCrouch,
		action,
		expression,
		flipX,
		afterimage,
		auraColor,
		speech,
		thought,
		playbackSpeed,
	} = resolved;

	// Directly reuse the user's existing DeepSeek Harness Whale assets (`deepseek-harness/running-whale.png` & `DeepSeekIcon`) for whale_girl!
	if (character === 'whale_girl') {
		const bob = Math.sin(frame * 0.22) * 8;
		const isHurt = action === 'hurt_glitch' || action === 'overload_collapse';
		const isShield = action === 'token_shield';
		const isLaser = action === 'r1_laser_cast';
		const badgeEmoji =
			expression === 'dizzy_overload'
				? '😵'
				: expression === 'angry_intercept' || expression === 'panicked_drop'
				? '💢'
				: expression === 'thinking_r1'
				? '💡'
				: '🐋';

		return (
			<div
				className="pointer-events-none absolute"
				style={{
					left: x - size / 2,
					top: y - size * 0.75 + bob,
					width: size,
					height: size,
					zIndex,
				}}
			>
				{auraColor && (
					<div
						className="absolute inset-4 rounded-full blur-xl"
						style={{
							background: `radial-gradient(circle, ${auraColor} 0%, transparent 72%)`,
							transform: `scale(${1.15 + Math.sin(frame * 0.45) * 0.15})`,
						}}
					/>
				)}

				{isShield && (
					<div
						className="absolute -left-6 top-6 h-44 w-16 rounded-full border-4 border-sky-400 bg-sky-400/25 shadow-[0_0_25px_#38bdf8]"
						style={{transform: `scaleY(${1 + Math.sin(frame * 0.4) * 0.08})`}}
					/>
				)}

				{isLaser && (
					<div
						className="absolute -left-8 top-16 h-16 w-16 rounded-full bg-cyan-300 shadow-[0_0_35px_12px_#38bdf8]"
						style={{transform: `scale(${1 + Math.sin(frame * 0.8) * 0.25})`}}
					/>
				)}

				<div
					className="relative flex h-full w-full flex-col items-center justify-center"
					style={{
						transform: `rotate(${rotation + (isHurt ? Math.sin(frame * 1.8) * 12 : 0)}deg) scale(${scale * (flipX ? -1 : 1)}, ${scale})`,
						filter: 'drop-shadow(0 12px 18px rgba(30, 58, 138, 0.38))',
					}}
				>
					<div className="relative flex h-40 w-40 items-center justify-center">
						<Img
							src={staticFile('deepseek-harness/running-whale.png')}
							className="h-36 w-36 object-contain"
						/>
						<span className="absolute -right-1 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-blue-200 bg-white text-xl shadow">
							{badgeEmoji}
						</span>
					</div>
					<div className="mt-1 flex items-center gap-1.5 rounded-full bg-[#1e293b]/90 px-3 py-1 text-[11px] font-bold text-sky-300 shadow">
						<DeepSeekIcon size={15} />
						<span>DeepSeek 桌宠 · {action}</span>
					</div>
				</div>

				{speech && (
					<div className="absolute left-1/2 -top-10 z-30 -translate-x-1/2 whitespace-nowrap rounded-2xl border-2 border-[#4176E6] bg-white px-3.5 py-1.5 text-[13px] font-bold text-slate-900 shadow-xl">
						<span>{speech}</span>
					</div>
				)}
				{thought && (
					<div className="absolute left-1/2 -top-18 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-blue-300 bg-slate-900/85 px-3 py-1 text-[11px] italic text-sky-200 shadow-lg">
						💭 ({thought})
					</div>
				)}
			</div>
		);
	}

	const tick = frame * playbackSpeed;
	const {body, exprSrc} = getBearFrame(character, action, expression, tick);
	const {headAnchor} = body;
	const exprScale = headAnchor.scale ?? 1;

	const squashX = 1 + landingSquash + takeoffCrouch;
	const squashY = 1 - landingSquash * 1.15 - takeoffCrouch * 1.1;
	const dirFlip = flipX ? -1 : 1;
	const ghosts = afterimage ? [3, 6] : [];

	return (
		<>
			{/* Ground contact shadow */}
			<div
				className="pointer-events-none absolute rounded-[50%] bg-slate-950/25 blur-[2px]"
				style={{
					left: x - size * 0.22,
					top: baseY - 8,
					width: size * 0.44,
					height: 14,
					zIndex: zIndex - 2,
					transform: `scale(${Math.max(0.35, 1 - Math.abs(y - baseY) / 380)})`,
				}}
			/>

			{/* Motion Blur Afterimages (残影) */}
			{ghosts.map((lag) => {
				const past = resolveActorAtFrame(keyframes, Math.max(0, frame - lag));
				if (!past) return null;
				const pastFrame = getBearFrame(character, past.action, past.expression, (frame - lag) * playbackSpeed);
				return (
					<div
						key={lag}
						className="pointer-events-none absolute"
						style={{
							left: past.x - size / 2,
							top: past.y - (pastFrame.body.headAnchor.footY / 512) * size,
							width: size,
							height: size,
							zIndex: zIndex - 1,
							opacity: lag === 3 ? 0.34 : 0.16,
							transform: `rotate(${past.rotation}deg) scale(${past.scale * (past.flipX ? -1 : 1)}, ${past.scale})`,
							transformOrigin: '50% 85%',
						}}
					>
						<Img src={staticFile(pastFrame.body.src)} className="h-full w-full object-contain" />
					</div>
				);
			})}

			{/* Main Layered Sprite Container (512x512 Official Body Layer + 256x256 Official Expression Layer) */}
			<div
				className="pointer-events-none absolute"
				style={{
					left: x - size / 2,
					top: y - (headAnchor.footY / 512) * size,
					width: size,
					height: size,
					zIndex,
				}}
			>
				{auraColor && (
					<div
						className="absolute inset-4 rounded-full blur-xl"
						style={{
							background: `radial-gradient(circle, ${auraColor} 0%, transparent 72%)`,
							transform: `scale(${1.15 + Math.sin(frame * 0.45) * 0.15})`,
							opacity: 0.75,
						}}
					/>
				)}

				<div
					className="relative h-full w-full"
					style={{
						transform: `rotate(${rotation}deg) scale(${scale * squashX * dirFlip}, ${scale * squashY})`,
						transformOrigin: `50% ${(headAnchor.footY / 512) * 100}%`,
						filter: 'drop-shadow(0 10px 14px rgba(15, 23, 42, 0.28))',
					}}
				>
					{/* 1. Official WeChat Sticker Faceless Body Action Layer (512x512) */}
					<Img src={staticFile(body.src)} className="absolute inset-0 h-full w-full object-contain" />

					{/* 2. Official WeChat Sticker Facial Expression Layer (256x256, centered & scaled at headAnchor!) */}
					<div
						className="absolute"
						style={{
							left: `${((headAnchor.x - 128) / 512) * 100}%`,
							top: `${((headAnchor.y - 128) / 512) * 100}%`,
							width: '50%',
							height: '50%',
							transform: `rotate(${headAnchor.rotDeg}deg) scale(${exprScale})`,
							transformOrigin: '50% 50%',
						}}
					>
						<Img src={staticFile(exprSrc)} className="h-full w-full object-contain" />
					</div>

					{showDebugAnchors && (
						<>
							<div
								className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-rose-500 shadow"
								style={{
									left: `${(headAnchor.x / 512) * 100}%`,
									top: `${(headAnchor.y / 512) * 100}%`,
								}}
							/>
							<div
								className="absolute inset-x-6 h-[2px] bg-emerald-400"
								style={{top: `${(headAnchor.footY / 512) * 100}%`}}
							/>
						</>
					)}
				</div>

				{showDebugAnchors && (
					<div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900/90 px-2 py-0.5 font-mono text-[10px] text-emerald-300 shadow">
						[{character}] {action} + {expression}
					</div>
				)}

				{speech && (
					<div
						className="absolute left-1/2 -top-11 z-30 -translate-x-1/2 whitespace-nowrap rounded-2xl border-2 border-slate-800 bg-white px-3.5 py-1.5 text-[13px] font-bold text-slate-900 shadow-xl"
						style={{transform: `translateX(-50%) scale(${Math.min(1, scale)})`}}
					>
						<span>{speech}</span>
						<div className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-slate-800 bg-white" />
					</div>
				)}

				{thought && (
					<div className="absolute left-1/2 -top-20 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-blue-300 bg-slate-900/85 px-3 py-1 text-[11px] italic text-sky-200 shadow-lg backdrop-blur-sm">
						💭 ({thought})
					</div>
				)}
			</div>
		</>
	);
};
