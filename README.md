# Desktop AI · Remotion

一个 1920×1080、30fps、12 秒的桌面界面演示。Windows 11 静态资源来自 win11React；DeepSeek 使用 DeepSeek Harness 官方鲸鱼 SVG、运行资产和主题令牌；微信和 DeepSeek 界面用 React + Tailwind CSS 实现，所有状态只由 Remotion 帧数驱动。

## 启动

```bash
npm install
npm run studio
```

在 Remotion Studio 中选择 `DesktopAI`。

## 输出

```bash
npm run typecheck
npm run still   # 第 250 帧预览图
npm run render  # out/desktop-ai.mp4
```

## 时间轴

| 帧 | 画面 |
| --- | --- |
| 0–19 | Windows 11 桌面 |
| 20–187 | 微信窗口；自动输入、发送键形变、消息上屏 |
| 180–359 | DeepSeek 窗口；提问、R1 思考、流式回答 |

微信和 DeepSeek 各有局部帧时间轴，组件位于 `src/components/`。修改文案和时间点即可重新编排，不需要补任何点击事件。

## 资源来源

- `blueedgetechno/win11React`：默认壁纸与系统图标；许可副本位于 `public/win11/LICENSE-win11React.txt`。
- `deepseek-ai/deepseek-harness`：官方鲸鱼 SVG、运行资产、推理行布局与主题令牌；许可副本位于 `public/deepseek-harness/LICENSE.txt`。
- Windows、微信、DeepSeek 的名称和图形标识归各自权利人所有；本工程仅作界面动画演示。
