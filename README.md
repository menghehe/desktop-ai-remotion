# 一二布布桌面小剧场 · Remotion

根据 `videp.pdf` 最终方案制作的 **60 秒 Windows 11 桌面剧情短片**：老婆微信邀约炸鸡，一二和布布从表情包中破窗，对抗 DeepSeek 桌面管家，最后用 4000 张表情包耗尽 Token。

## 成片规格

- 1920 × 1080，30 fps，1800 帧，60 秒
- React + Tailwind CSS + Remotion
- `@remotion/gif` 逐帧驱动 GIF，避免普通 `<img>` 在渲染时失控
- 原创合成 BGM / 音效，无外部音频采样
- 59 个本地角色素材：7 个核心动作 GIF、2 张头像、50 张高潮 GIF

## 启动与输出

```bash
npm install
npm run studio       # Remotion Studio，选择 DesktopAI
npm run typecheck
npm run still        # 第 250 帧预览
npm run render       # out/desktop-ai.mp4
```

## 五幕时间轴

| 帧 / 时间 | 剧情 |
| --- | --- |
| 0–239 / 0–8s | 老婆发来炸鸡邀约，DeepSeek 接管鼠标准备拒绝 |
| 240–539 / 8–18s | 一二从聊天框破窗，打开表情面板拽出布布 |
| 540–1049 / 18–35s | 争夺夜宵基金 Excel，砸碎拒绝文案并改写发送 |
| 1050–1439 / 35–48s | 合力把 4000+ 表情包文件夹投喂给 DeepSeek |
| 1440–1799 / 48–60s | 65 个弹窗连续轰炸，Token 归零，一二布布干饭庆祝 |

## 工程结构

- `src/DesktopAI.tsx`：总合成、音频与图层顺序
- `src/lib/storyboard.ts`：关键帧、文案、打字和 Token 计算
- `src/components/WeChatWindow.tsx`：微信 PC 三栏界面及聊天状态
- `src/components/DeepSeekWindow.tsx`：Edge + DeepSeek 界面、思考链和 Token 仪表
- `src/components/StickerActor.tsx`：GIF 角色位移、抛物线跳跃、落地 Q 弹
- `src/components/AICursor.tsx`：蓝色 AI 鼠标及鲸鱼娘状态
- `src/components/StoryActors.tsx`：角色、文件与鼠标的完整分镜
- `src/components/StickerFlood.tsx`：确定性随机弹窗潮
- `public/stickers/manifest.json`：素材逻辑名到 D 盘原始资产的映射
- `tools/generate_audio.py`：原创配乐与音效的可复现生成脚本

所有剧情只由 Remotion 当前帧驱动，不依赖鼠标事件或 React 交互状态。修改 `storyboard.ts` 和各组件的关键帧即可调整节奏。

## 资源说明

- Windows 11 壁纸和图标来自 `blueedgetechno/win11React`，许可副本在 `public/win11/`。
- DeepSeek 鲸鱼资源来自 DeepSeek Harness，许可副本在 `public/deepseek-harness/`。
- 一二布布素材由用户从 `D:\一二布布图` 提供；未修改原资产。
- Windows、微信、DeepSeek、一二布布相关名称和图形归各自权利人所有。本工程为界面动画演示。
