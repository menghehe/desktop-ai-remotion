import type {DirectorScript} from './types';

/**
 * 导演台复用编排模板（Episode 02 示例模板）：
 * 只需修改 actors 中的动作 (BearAction / WhaleAction) 与独立表情 (BearExpression / WhaleExpression)，
 * 即可快速编排全新的桌面大战剧情！
 */
export const customTemplateScript: DirectorScript = {
	id: 'custom-episode-template',
	title: '第二集模板：奶茶续命保卫战 (可自由修改编排)',
	fps: 30,
	durationInFrames: 300,
	acts: [
		{
			fromFrame: 0,
			toFrame: 150,
			actNumber: 'SCENE 01',
			title: '下午茶奶茶警报',
			subtitle: '演示动作与表情自由组合编排',
		},
		{
			fromFrame: 150,
			toFrame: 300,
			actNumber: 'SCENE 02',
			title: '三角色同屏互动合演',
			subtitle: '支持任意新增关键帧、对波与弹幕',
		},
	],
	camera: [
		{frame: 0, zoom: 1.0, panX: 0, panY: 0},
		{frame: 150, zoom: 1.08, panX: 0, panY: -20, shakeIntensity: 8},
		{frame: 299, zoom: 1.0, panX: 0, panY: 0},
	],
	windowShocks: [],
	actors: {
		yier: [
			{frame: 0, x: 560, y: 760, action: 'idle', expression: 'drool', speech: '想喝三分糖杨枝甘露🧋'},
			{frame: 90, x: 760, y: 740, jumpArc: -180, action: 'jump', expression: 'battle_serious', afterimage: true},
			{frame: 180, x: 820, y: 740, action: 'attack_hammer', expression: 'charging_roar', speech: '谁拦我喝奶茶就锤谁！'},
			{frame: 299, x: 820, y: 740, action: 'victory', expression: 'wink_love'},
		],
		bubu: [
			{frame: 0, x: 410, y: 770, action: 'idle', expression: 'happy', speech: '我请客！大杯加波霸！'},
			{frame: 100, x: 640, y: 750, jumpArc: -150, action: 'guard', expression: 'smug'},
			{frame: 299, x: 660, y: 750, action: 'victory', expression: 'happy'},
		],
		whale_girl: [
			{frame: 0, x: 1360, y: 650, action: 'patrol_walk', expression: 'cool_ai', speech: '今日糖分摄入已超标！'},
			{frame: 150, x: 1280, y: 650, action: 'token_shield', expression: 'angry_intercept', speech: '启动无糖美式替换协议！'},
			{frame: 299, x: 1340, y: 680, action: 'overload_collapse', expression: 'dizzy_overload', speech: '又被双熊联手突破了…'},
		],
	},
	beamClashes: [],
	impacts: [
		{frame: 180, duration: 20, x: 1050, y: 650, type: 'hit_spark', color: '#f59e0b', scale: 1.4, damageText: '🧋 奶茶暴击!!'},
	],
	projectiles: [],
};
