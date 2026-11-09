import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {BeamClashEvent, ImpactVFXEvent, ProjectileEvent} from './scripts/types';

export const StickmanBattleVFX = ({
	beamClashes,
	impacts,
	projectiles,
}: {
	beamClashes: BeamClashEvent[];
	impacts: ImpactVFXEvent[];
	projectiles: ProjectileEvent[];
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Check if any impact frame triggers a 2-frame anime high-contrast flash
	const activeFlash = impacts.some(
		(imp) => imp.impactFlash && frame >= imp.frame && frame < imp.frame + 2,
	);

	return (
		<div className="pointer-events-none absolute inset-0 z-[135] overflow-hidden">
			{/* 2-Frame Anime Impact Flash */}
			{activeFlash && (
				<div className="absolute inset-0 z-[200] bg-white/80 mix-blend-overlay" />
			)}

			{/* 1. Kamehameha / Stickman Energy Beam Clashes (对波特效) */}
			{beamClashes.map((clash) => {
				if (frame < clash.startFrame || frame > clash.endFrame) return null;
				const p = interpolate(
					frame,
					[clash.startFrame, clash.endFrame],
					[0, 1],
					{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
				);
				// Dynamic tug-of-war oscillation around interpolated push ratio
				const wobble = Math.sin(frame * 0.85) * 0.035;
				const ratio = Math.min(
					0.92,
					Math.max(0.12, interpolate(p, [0, 1], [clash.clashPushStart, clash.clashPushEnd]) + wobble),
				);

				const dx = clash.rightOrigin.x - clash.leftOrigin.x;
				const dy = clash.rightOrigin.y - clash.leftOrigin.y;
				const totalDist = Math.hypot(dx, dy);
				const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
				const clashX = clash.leftOrigin.x + dx * ratio;
				const clashY = clash.leftOrigin.y + dy * ratio;
				const pulse = 1 + Math.sin(frame * 1.4) * 0.16;

				return (
					<div key={clash.id} className="absolute inset-0">
						{/* Ambient screen glow during beam struggle */}
						<div
							className="absolute inset-0 opacity-25"
							style={{
								background: `radial-gradient(circle at ${clashX}px ${clashY}px, #fff 0%, ${clash.leftColor} 35%, ${clash.rightColor} 70%, transparent 100%)`,
							}}
						/>

						{/* Beam Container rotated along axis */}
						<div
							className="absolute origin-left"
							style={{
								left: clash.leftOrigin.x,
								top: clash.leftOrigin.y,
								width: totalDist,
								height: 90,
								transform: `translateY(-45px) rotate(${angleDeg}deg)`,
							}}
						>
							{/* Left Team Beam (Yier & Bubu 贴贴护食波) */}
							<div
								className="absolute left-0 top-1/2 -translate-y-1/2 rounded-l-full"
								style={{
									width: `${ratio * 100}%`,
									height: 54 * pulse,
									background: `linear-gradient(90deg, ${clash.leftColor}, #fff 60%, ${clash.leftColor})`,
									boxShadow: `0 0 36px 12px ${clash.leftColor}`,
								}}
							>
								<div className="mx-auto mt-[14px] h-[24px] w-full bg-white/90 blur-[2px]" />
							</div>

							{/* Right Team Beam (DeepSeek Whale Girl R1 算力激光炮) */}
							<div
								className="absolute right-0 top-1/2 -translate-y-1/2 rounded-r-full"
								style={{
									width: `${(1 - ratio) * 100}%`,
									height: 50 * (2 - pulse),
									background: `linear-gradient(270deg, ${clash.rightColor}, #e0f2fe 60%, ${clash.rightColor})`,
									boxShadow: `0 0 36px 12px ${clash.rightColor}`,
								}}
							>
								<div className="mx-auto mt-[13px] h-[22px] w-full bg-white/90 blur-[2px]" />
							</div>
						</div>

						{/* Center Clash Plasma Sphere & Lightning Sparks */}
						<div
							className="absolute -translate-x-1/2 -translate-y-1/2"
						style={{left: clashX, top: clashY}}
						>
							<div
								className="rounded-full bg-white shadow-2xl"
								style={{
									width: 118 * pulse,
									height: 118 * pulse,
									boxShadow: `0 0 45px 18px #fff, 0 0 80px 32px ${clash.leftColor}, 0 0 95px 40px ${clash.rightColor}`,
								}}
							/>
							{[0, 45, 90, 135, 180, 225, 270, 315].map((deg, idx) => (
								<div
									key={deg}
									className="absolute left-1/2 top-1/2 h-2 w-28 -translate-y-1/2 origin-left rounded-full bg-white"
									style={{
										transform: `rotate(${deg + frame * 11 * (idx % 2 === 0 ? 1 : -1)}deg) scaleX(${0.7 + ((frame + idx * 3) % 5) * 0.2})`,
										boxShadow: `0 0 12px ${idx % 2 === 0 ? clash.leftColor : clash.rightColor}`,
									}}
								/>
							))}
							<div className="absolute -top-20 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/80 bg-slate-950/85 px-4 py-1 text-xs font-extrabold tracking-wider text-amber-300 shadow-xl">
								⚡ {clash.leftLabel} VS {clash.rightLabel} ({Math.round(ratio * 100)}%)
							</div>
						</div>
					</div>
				);
			})}

			{/* 2. Melee Slashes, Shockwaves & Critical Hit Sparks */}
			{impacts.map((imp, idx) => {
				if (frame < imp.frame || frame > imp.frame + imp.duration) return null;
				const local = frame - imp.frame;
				const p = local / imp.duration;
				const s = imp.scale ?? 1;
				const col = imp.color ?? '#f59e0b';
						const pop = spring({frame: local, fps, config: {damping: 12, stiffness: 220}});

				return (
					<div
						key={`${imp.frame}-${idx}`}
						className="absolute -translate-x-1/2 -translate-y-1/2"
						style={{left: imp.x, top: imp.y}}
					>
						{/* Expanding shockwave ring */}
						{(imp.type === 'shockwave' || imp.type === 'explosion' || imp.type === 'window_crack') && (
							<div
								className="rounded-full border-4"
								style={{
									width: 220 * p * s,
									height: 220 * p * s,
									borderColor: col,
									opacity: 1 - p,
									boxShadow: `0 0 24px ${col}`,
								}}
							/>
						)}

						{/* Radial anime hit rays */}
						{(imp.type === 'hit_spark' || imp.type === 'explosion') && (
							<div className="relative">
								{[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((ang) => (
									<div
										key={ang}
										className="absolute left-0 top-0 h-1.5 origin-left rounded-full bg-white"
									style={{
											width: (48 + (ang % 60)) * s * (1 - p * 0.3),
											transform: `rotate(${ang}deg) translateX(${p * 36 * s}px)`,
											opacity: 1 - p,
											boxShadow: `0 0 10px 3px ${col}`,
									}}
									/>
								))}
							</div>
						)}

						{/* Melee Slash Crescent Arc */}
						{imp.type === 'slash_arc' && (
							<div
								className="h-36 w-36 rounded-full border-r-[14px] border-t-[10px]"
								style={{
									borderColor: col,
									transform: `scale(${0.6 + p * 0.9 * s}) rotate(${local * 18}deg)`,
									opacity: 1 - p,
									filter: `drop-shadow(0 0 12px ${col})`,
								}}
							/>
						)}

						{/* Window Glass Crack Overlay */}
						{imp.type === 'window_crack' && (
							<svg width={180 * s} height={180 * s} viewBox="0 0 100 100" style={{opacity: 1 - p * 0.6}}>
								<path
									d="M50 50 L15 20 M50 50 L85 15 M50 50 L92 58 M50 50 L70 90 M50 50 L22 85 M32 35 L48 22 M68 32 L82 42"
									stroke="white"
									strokeWidth="2.5"
									fill="none"
								/>
							</svg>
						)}

						{/* Floating Critical Damage / Action Text */}
						{imp.damageText && (
							<div
								className="absolute left-1/2 -top-12 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-white bg-gradient-to-r from-rose-600 to-amber-500 px-3.5 py-1 text-[16px] font-black tracking-wide text-white shadow-2xl"
								style={{
									transform: `translate(-50%, ${-local * 2.2}px) scale(${0.6 + pop * 0.45})`,
									opacity: 1 - p * 0.5,
								}}
							>
								{imp.damageText}
							</div>
						)}
					</div>
				);
			})}

			{/* 3. Flying Projectiles (炸鸡腿/薯条/Excel盾牌/表情包 vs 键盘按键/黄瓜) */}
			{projectiles.map((proj) => {
				if (frame < proj.startFrame || frame > proj.endFrame) return null;
				const p = interpolate(
					frame,
					[proj.startFrame, proj.endFrame],
					[0, 1],
					{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
				);
				const x = interpolate(p, [0, 1], [proj.fromX, proj.toX]);
				const baseY = interpolate(p, [0, 1], [proj.fromY, proj.toY]);
				const arc = proj.arcHeight ? Math.sin(p * Math.PI) * proj.arcHeight : 0;
				const y = baseY + arc;
				const rot = proj.spin ? (frame - proj.startFrame) * 22 : 0;
				const sc = proj.scale ?? 1;

				return (
					<div
						key={proj.id}
						className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
						style={{
							left: x,
							top: y,
							transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${sc})`,
						}}
					>
						<div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-white/80 bg-slate-900/75 text-4xl shadow-2xl backdrop-blur-sm">
							{proj.emoji}
						</div>
						{proj.label && (
							<span className="mt-1 whitespace-nowrap rounded bg-slate-950/85 px-2 py-0.5 text-[11px] font-bold text-white shadow">
								{proj.label}
							</span>
						)}
					</div>
				);
			})}
		</div>
	);
};
