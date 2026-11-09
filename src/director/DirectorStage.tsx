import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {AICursor} from '../components/AICursor';
import {DeepSeekWindow} from '../components/DeepSeekWindow';
import {Desktop} from '../components/Desktop';
import {StickerFlood} from '../components/StickerFlood';
import {StoryOverlay} from '../components/StoryOverlay';
import {WeChatWindow} from '../components/WeChatWindow';
import {ACT} from '../lib/storyboard';
import {DirectorHUD} from './DirectorHUD';
import {LayeredSpriteActor} from './LayeredSpriteActor';
import {StickmanBattleVFX} from './StickmanBattleVFX';
import {friedChickenWarScript} from './scripts/friedChickenWarScript';
import type {DirectorScript} from './scripts/types';

export const DirectorStage = ({
	script = friedChickenWarScript,
	showWorkbench = false,
	showDebugAnchors = false,
}: {
	script?: DirectorScript;
	showWorkbench?: boolean;
	showDebugAnchors?: boolean;
}) => {
	const frame = useCurrentFrame();

	// 1. Resolve 2.5D Camera Keyframes (Zoom, Pan, Shake, Cinematic Bars)
	let camIdx = 0;
	for (let i = 0; i < script.camera.length - 1; i++) {
		if (frame >= script.camera[i].frame) camIdx = i;
	}
	const cStart = script.camera[camIdx];
	const cEnd = script.camera[Math.min(camIdx + 1, script.camera.length - 1)];
	const cp =
		cStart.frame === cEnd.frame
			? 1
			: interpolate(frame, [cStart.frame, cEnd.frame], [0, 1], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
			  });
	const cEase = cp * cp * (3 - 2 * cp);
	const zoom = interpolate(cEase, [0, 1], [cStart.zoom, cEnd.zoom]);
	const panX = interpolate(cEase, [0, 1], [cStart.panX, cEnd.panX]);
	const panY = interpolate(cEase, [0, 1], [cStart.panY, cEnd.panY]);

	// Camera shake decays after impact
	const rawShake = cStart.shakeIntensity ?? 0;
	const sinceCamKey = Math.max(0, frame - cStart.frame);
	const shakeEnv = sinceCamKey < 24 ? rawShake * (1 - sinceCamKey / 24) : 0;
	const camShakeX = Math.sin(frame * 2.7) * shakeEnv;
	const camShakeY = Math.cos(frame * 3.4) * shakeEnv;

	// 2. Resolve Desktop Window Physics (Stickman-style window shake & tilt on impact!)
	let wechatShakeX = 0;
	let wechatShakeY = 0;
	let wechatTilt = 0;
	let dsShakeX = 0;
	let dsShakeY = 0;
	let dsTilt = 0;

	for (const shock of script.windowShocks) {
		if (frame >= shock.startFrame && frame <= shock.endFrame) {
			const sp = (frame - shock.startFrame) / Math.max(1, shock.endFrame - shock.startFrame);
			const damp = 1 - sp;
			const sx = Math.sin(frame * 3.1) * shock.intensity * damp;
			const sy = Math.cos(frame * 2.6) * shock.intensity * 0.7 * damp;
			const stilt = (shock.tiltDeg ?? 0) * Math.sin(sp * Math.PI);
			if (shock.target === 'wechat' || shock.target === 'both') {
				wechatShakeX += sx;
				wechatShakeY += sy;
				wechatTilt += stilt;
			}
			if (shock.target === 'deepseek' || shock.target === 'both') {
				dsShakeX += sx;
				dsShakeY += sy;
				dsTilt += stilt;
			}
		}
	}

	return (
		<AbsoluteFill className="overflow-hidden bg-[#0b1524] font-sans">
			{/* 2.5D Virtual Camera Rig */}
			<div
				className="absolute inset-0 origin-center"
				style={{
					transform: `translate(${panX + camShakeX}px, ${panY + camShakeY}px) scale(${zoom})`,
				}}
			>
				<Desktop />

				<WeChatWindow
					offsetX={85}
					offsetY={108}
					shakeX={wechatShakeX}
					shakeY={wechatShakeY}
					tiltDeg={wechatTilt}
				/>

				<DeepSeekWindow
					offsetX={1055}
					offsetY={108}
					shakeX={dsShakeX}
					shakeY={dsShakeY}
					tiltDeg={dsTilt}
				/>

				{/* Layered Body + Expression Sprite Actors: Yier, Bubu & DeepSeek Whale Girl */}
				<LayeredSpriteActor
					character="bubu"
					size={235}
					zIndex={92}
					showDebugAnchors={showDebugAnchors}
					keyframes={script.actors.bubu}
				/>
				<LayeredSpriteActor
					character="yier"
					size={235}
					zIndex={96}
					showDebugAnchors={showDebugAnchors}
					keyframes={script.actors.yier}
				/>
				<LayeredSpriteActor
					character="whale_girl"
					size={255}
					zIndex={98}
					showDebugAnchors={showDebugAnchors}
					keyframes={script.actors.whale_girl}
				/>

				{/* Stickman-Battle Combat VFX (Beam Clashes, Slashes, Sparks, Projectiles) */}
				<StickmanBattleVFX
					beamClashes={script.beamClashes}
					impacts={script.impacts}
					projectiles={script.projectiles}
				/>

				{/* AI Mouse Cursor Companion */}
				<AICursor
					steps={[
						{frame: 60, x: 1530, y: 420, mood: 'cool', label: '鲸鱼娘 Agent 接管键鼠'},
						{frame: 135, x: 740, y: 780, mood: 'cool', label: '自动输入：不吃！我在啃黄瓜！'},
						{frame: 225, x: 930, y: 880, mood: 'cool', clicking: true, label: '准备点击发送拒绝'},
						{frame: 270, x: 845, y: 690, mood: 'angry', label: '警告：一二破窗越界！'},
						{frame: 540, x: 380, y: 340, mood: 'angry', label: '试图拖拽删除夜宵基金'},
						{frame: 740, x: 1180, y: 640, mood: 'angry', clicking: true, label: 'R1 算力全开对波中'},
						{frame: 1050, x: 1470, y: 680, mood: 'angry', label: '拦截 4000 张表情包失败'},
						{frame: 1440, x: 1600, y: 410, mood: 'dizzy', label: 'Token 护盾归零'},
						{frame: 1799, x: 1510, y: 520, mood: 'dizzy', label: '500 服务器繁忙'},
					]}
				/>

				{script.id === 'fried-chicken-war-ep01' && (
					<StickerFlood startFrame={ACT.flood} count={65} />
				)}
			</div>

			{/* Cinematic Widescreen Letterbox Bars during Beam Struggle */}
			{cStart.cinematicBars && (
				<>
					<div className="pointer-events-none absolute inset-x-0 top-0 z-[180] h-16 bg-black/85" />
					<div className="pointer-events-none absolute inset-x-0 bottom-0 z-[180] h-16 bg-black/85" />
				</>
			)}

			{/* Director Arcade HUD & Optional Multi-Track Timeline Workbench */}
			<DirectorHUD
				script={script}
				showWorkbench={showWorkbench}
				cameraState={{zoom, panX, panY, shake: shakeEnv}}
			/>

			{script.id === 'fried-chicken-war-ep01' && frame >= ACT.finale && <StoryOverlay />}

			<Audio src={staticFile('audio/desktop-story.wav')} />
		</AbsoluteFill>
	);
};
