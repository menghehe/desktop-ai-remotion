import type {BearAction, BearExpression, WhaleAction, WhaleExpression} from '../spriteManifest';

export type CharacterId = 'yier' | 'bubu' | 'whale_girl';

export interface ActorKeyframe {
	frame: number;
	x: number;
	y: number;
	action: BearAction | WhaleAction;
	expression: BearExpression | WhaleExpression;
	scale?: number;
	flipX?: boolean;
	rotate?: number;
	jumpArc?: number;
	afterimage?: boolean;
	auraColor?: string;
	speech?: string;
	thought?: string;
	playbackSpeed?: number;
}

export interface CameraKeyframe {
	frame: number;
	zoom: number;
	panX: number;
	panY: number;
	shakeIntensity?: number;
	cinematicBars?: boolean;
}

export interface WindowShockEvent {
	startFrame: number;
	endFrame: number;
	target: 'wechat' | 'deepseek' | 'both';
	intensity: number;
	tiltDeg?: number;
}

export interface BeamClashEvent {
	id: string;
	startFrame: number;
	endFrame: number;
	leftOrigin: { x: number; y: number };
	rightOrigin: { x: number; y: number };
	leftColor: string;
	rightColor: string;
	leftLabel: string;
	rightLabel: string;
	/** Clash ratio keyframes: 0 = left wins, 0.5 = center, 1 = left pushes all the way to right! */
	clashPushStart: number;
	clashPushEnd: number;
}

export interface ImpactVFXEvent {
	frame: number;
	duration: number;
	x: number;
	y: number;
	type: 'hit_spark' | 'shockwave' | 'slash_arc' | 'explosion' | 'window_crack';
	color?: string;
	scale?: number;
	damageText?: string;
	impactFlash?: boolean;
}

export interface ProjectileEvent {
	id: string;
	startFrame: number;
	endFrame: number;
	fromX: number;
	fromY: number;
	toX: number;
	toY: number;
	arcHeight?: number;
	emoji: string;
	label?: string;
	spin?: boolean;
	scale?: number;
}

export interface ActMarker {
	fromFrame: number;
	toFrame: number;
	actNumber: string;
	title: string;
	subtitle: string;
}

export interface DirectorScript {
	id: string;
	title: string;
	fps: number;
	durationInFrames: number;
	acts: ActMarker[];
	camera: CameraKeyframe[];
	windowShocks: WindowShockEvent[];
	actors: Record<CharacterId, ActorKeyframe[]>;
	beamClashes: BeamClashEvent[];
	impacts: ImpactVFXEvent[];
	projectiles: ProjectileEvent[];
}
