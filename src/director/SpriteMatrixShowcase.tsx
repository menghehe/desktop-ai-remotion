import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {
	BEAR_ACTIONS,
	BEAR_EXPRESSIONS,
	getBearFrame,
} from './spriteManifest';

/**
 * 一二 & 布布 (微信官方系列表情原画) · 12套无五官身体动作图层 × 10套独立五官表情图层分离组合检视台
 */
export const SpriteMatrixShowcase = () => {
	const frame = useCurrentFrame();
	const activeExprIndex = Math.floor(frame / 24) % BEAR_EXPRESSIONS.length;
	const currentBearExpr = BEAR_EXPRESSIONS[activeExprIndex];
	const tick = frame * 0.25;

	return (
		<AbsoluteFill className="bg-slate-950 p-7 font-sans text-white">
			<header className="mb-5 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/90 px-6 py-3.5 shadow-xl">
				<div>
					<h1 className="text-xl font-black tracking-wide text-amber-300">
						🐻 一二 & 布布 (微信官方表情包原画解构) · 12套无五官身体动作 × 10套独立五官表情组合检视台
					</h1>
					<p className="mt-0.5 text-xs text-slate-400">
						直接从黄小B微信官方透明动态表情包解构提取：100%保留原画笔触、团子比例、腮红与肢体动态，实现无五官身体层与五官表情层任意跨动作自由组合
					</p>
				</div>
				<div className="flex items-center gap-4 font-mono text-xs">
					<span className="rounded-lg border border-pink-500/40 bg-pink-950/60 px-3 py-1.5 text-pink-300">
						当前主表情图层: <strong>{currentBearExpr}</strong> ({activeExprIndex + 1}/{BEAR_EXPRESSIONS.length})
					</span>
				</div>
			</header>

			<div className="grid grid-cols-4 gap-4">
				{BEAR_ACTIONS.map((action, idx) => {
					const exprForCard = BEAR_EXPRESSIONS[(activeExprIndex + idx) % BEAR_EXPRESSIONS.length];
					const yierData = getBearFrame('yier', action, exprForCard, tick);
					const bubuData = getBearFrame('bubu', action, exprForCard, tick);

					return (
						<div
							key={action}
							className="flex flex-col items-center rounded-2xl border border-slate-800 bg-slate-900/80 p-3 shadow-lg"
						>
							<div className="mb-1.5 flex w-full items-center justify-between font-mono text-xs">
								<span className="font-bold text-amber-300">动作: {action}</span>
								<span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-pink-300">
									表情: +{exprForCard}
								</span>
							</div>
							<div className="flex items-center justify-center gap-3">
								{[
									{id: 'yier', data: yierData},
									{id: 'bubu', data: bubuData},
								].map(({id, data}) => {
									const exprScale = data.body.headAnchor.scale ?? 1;
									return (
										<div key={id} className="relative h-[185px] w-[185px] rounded-xl bg-slate-800/40">
											<Img src={staticFile(data.body.src)} className="h-full w-full object-contain" />
											<div
												className="absolute"
												style={{
													left: `${((data.body.headAnchor.x - 128) / 512) * 100}%`,
													top: `${((data.body.headAnchor.y - 128) / 512) * 100}%`,
													width: '50%',
													height: '50%',
													transform: `rotate(${data.body.headAnchor.rotDeg}deg) scale(${exprScale})`,
													transformOrigin: '50% 50%',
												}}
											>
												<Img src={staticFile(data.exprSrc)} className="h-full w-full object-contain" />
											</div>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};
