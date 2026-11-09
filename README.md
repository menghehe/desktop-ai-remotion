# 一二布布 vs DeepSeek 鲸鱼娘 · 火柴人式桌面大战导演台 (`desktop-ai-remotion`)

基于 Remotion 构建的可复用桌面大战导演台，采用 **黄小B微信官方系列表情包原画解构方案** 实现一二（Yier）与布布（Bubu）的 **「无五官身体动作图层 + 独立五官表情图层」** 实时分离与跨动作自由组合，并直接复用仓库现有的 **DeepSeek 鲸鱼娘（`public/deepseek-harness/running-whale.png` & `OfficialFishLogo.tsx`）** 资产。

## 1. 核心架构亮点

### 1.1 100% 微信官方表情包原画解构（身体动作层 + 独立五官表情层分离）
- **原画来源**：直接取自参考云盘中的 **《微信一二官方系列表情》与黄小B原画动态 GIF**（透明底色官方表情包），完全保留黄小B原画笔触、头身比、圆耳/月牙耳、腮红与肢体动态。
- **自动去字与五官分离管线 (`tools/extract_official_sprites.py`)**：
  1. **连通域去字**：通过 Alpha 连通域分析自动剥离表情包四周的悬浮配字（如“哼森气”、“揍一二去”、“吃我一锤”、“滚!!”、“啦啦啦”等），保留完整角色本体与脚底柔和阴影。
  2. **水密面部区域五官提取与无痕填色**：在头部闭合区域（一二 `#FFFFFF` 纯白肤色 + 粉腮红、布布 `#D89E82` 暖棕肤色 + 橘腮红）内，自动分割独立的内部五官连通域（眼睛、眉毛、`ω` 猫嘴、张嘴粉舌等）：
     - 将五官像素通过针对肤色的色彩距离 Alpha 解混（Color-Unmixing）提取为 **`256×256` 透明独立表情序列帧 (`public/sprites/expressions/<expression>/<000..>.png`)**，跨角色叠加时零肤色白边/棕边。
     - 将原身体帧的五官区域用当前帧面部中位纯色无痕回填，输出 **`512×512` 纯净无五官身体动作序列帧 (`public/sprites/<char>/body/<action>/<000..>.png`)**，同时记录每一帧精确的五官中心锚点 `headAnchor: { x, y, rotDeg, footY, scale }`。
     - 同时保留去字后的 **完整官方原画序列帧 (`public/sprites/<char>/official/<action>/<000..>.png`)** 及原始官方 GIF（`public/stickers/official/`）。

### 1.2 绝不覆盖现有 DeepSeek 鲸鱼娘与系统素材
- 压缩包中**不包含任何覆盖 `public/deepseek-harness/*`、`public/win11/*` 或 `public/audio/*` 的占位文件**，解压覆盖到你本地 `git clone https://github.com/menghehe/desktop-ai-remotion.git` 的目录时，你本地原有的 **鲸鱼娘素材（`public/deepseek-harness/running-whale.png`、`app-icon.svg`）** 与系统壁纸/图标 **100% 原样保留**。
- 导演台中的 `whale_girl` 角色与 `DeepSeekWindow`、`AICursor` 直接调用现有的 `deepseek-harness/running-whale.png` 与 `DeepSeekIcon`。

## 2. 官方精灵图资产矩阵 (`src/director/spriteManifest.ts`)

| 类别 | 数量 | 包含项与对应官方表情包原画 |
| :--- | :--- | :--- |
| **一二 (`yier`) 身体动作层** | 12 套动作 | `idle` (站立害羞拍手)、`run` (奔跑欢呼)、`jump` (举爪欢呼跳)、`attack_punch` (暴怒挥拳连击)、`attack_hammer` (吃我一锤 100T 巨锤重击)、`skill_charge` (兔耳头套蓄力冲锋)、`skill_beam` (弹弓远程发射)、`guard` (制服站岗防御)、`hurt` (委屈受击对指)、`knockdown` (瀑布飙泪倒地)、`victory` (吨吨吨狂炫饮料庆祝)、`team_push` (傲娇躺姿晃脚) |
| **布布 (`bubu`) 身体动作层** | 12 套动作 | `idle` (乖巧原地踏步)、`run` (背小书包欢快奔跑)、`jump` (鼓掌欢呼跳跃)、`attack_punch` (握拳暴怒连击)、`attack_hammer` (大步流星“揍一二去”出击)、`skill_charge` (鼓腮帮子蓄力跺脚)、`skill_beam` (双拳高举咆哮放招)、`guard` (抱臂翻白眼格挡)、`hurt` (飙泪受击后仰)、`knockdown` (挥爪踉跄)、`victory` (左手草莓奶右手大鸡腿庆祝)、`team_push` (大步突进推挤) |
| **独立五官表情层 (`expressions`)** | 10 套动态表情 | `happy` (`• 👅 •` 开心吐舌)、`angry` (`> ▭ <` 鼓腮生气)、`battle_serious` (`• ʌ •` 认真迎战)、`shocked` (翻白眼震惊)、`crying` (`ˊ • ︵ • ˋ` 委屈哭哭)、`drool` (`• 💧 •` 馋嘴流口水)、`dizzy` (`> 👅 <` 眩晕哭喊)、`smug` (`• ω •` 乖巧傲娇猫嘴)、`charging_roar` (`> 0 <` 蓄力咆哮)、`wink_love` (`> 👅 <` 眯眼大笑) |

## 3. Remotion 预览与编排入口 (`src/Root.tsx`)

安装依赖并启动 Remotion Studio：

```bash
npm install
npm start
```

在左侧 Composition 列表中可切换查看：
1. **`DirectorStage-FriedChickenWar`**：60 秒完整《一二布布 vs DeepSeek 鲸鱼娘：夜宵炸鸡保卫战》纯享版成片。
2. **`DirectorWorkbench-Preview`**：带底部多轨时间轴工作台（Camera / Action / Expression / VFX 轨道）与五官锚点调试的导演预览模式。
3. **`SpriteMatrix-Showcase`**：一二 & 布布 **12 套官方无五官身体动作 × 10 套官方独立五官表情** 实时跨动作自由组合检视台。
4. **`SpriteJumpTest`**：微信窗口内一二与布布分离式精灵图跳跃与动态换脸压测。
5. **`DesktopAI-Original`**：保留原仓库基于 `StickerActor` 的经典时间线版本。
