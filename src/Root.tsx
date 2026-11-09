import {Composition} from 'remotion';
import {DesktopAI} from './DesktopAI';
import {SpriteJumpTest} from './SpriteJumpTest';
import {DirectorStage} from './director/DirectorStage';
import {SpriteMatrixShowcase} from './director/SpriteMatrixShowcase';
import {customTemplateScript} from './director/scripts/customTemplateScript';
import {friedChickenWarScript} from './director/scripts/friedChickenWarScript';

export const RemotionRoot = () => {
	return (
		<>
			{/* 1. 主成片：一二布布 vs DeepSeek 鲸鱼娘 火柴人风格桌面大战 (纯净成片模式) */}
			<Composition
				id="DirectorBattleStage"
				component={() => <DirectorStage script={friedChickenWarScript} showWorkbench={false} showDebugAnchors={false} />}
				durationInFrames={friedChickenWarScript.durationInFrames}
				fps={friedChickenWarScript.fps}
				width={1920}
				height={1080}
			/>

			{/* 2. 导演台编排工作台模式：带底部多轨时间轴监视器 + 头部/脚底锚点调试层 */}
			<Composition
				id="DirectorWorkbench"
				component={() => <DirectorStage script={friedChickenWarScript} showWorkbench={true} showDebugAnchors={true} />}
				durationInFrames={friedChickenWarScript.durationInFrames}
				fps={friedChickenWarScript.fps}
				width={1920}
				height={1080}
			/>

			{/* 3. 动作 × 独立表情图层 N×M 矩阵检视台 */}
			<Composition
				id="SpriteMatrixShowcase"
				component={SpriteMatrixShowcase}
				durationInFrames={360}
				fps={30}
				width={1920}
				height={1080}
			/>

			{/* 4. 可复用第二集新剧情编排模板 (300帧示例) */}
			<Composition
				id="CustomEpisodeTemplate"
				component={() => <DirectorStage script={customTemplateScript} showWorkbench={true} showDebugAnchors={false} />}
				durationInFrames={customTemplateScript.durationInFrames}
				fps={customTemplateScript.fps}
				width={1920}
				height={1080}
			/>

			{/* 5. 升级版一二&布布双熊分离式精灵图跳跃测试 */}
			<Composition
				id="SpriteJumpTest"
				component={SpriteJumpTest}
				durationInFrames={90}
				fps={30}
				width={1920}
				height={1080}
			/>

			{/* 6. 原始 GIF 版桌面小剧场 (完整保留兼容) */}
			<Composition
				id="DesktopAI"
				component={DesktopAI}
				durationInFrames={1800}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
