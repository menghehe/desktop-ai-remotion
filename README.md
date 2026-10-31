# 一二布布桌面小剧场 · Remotion 连续剧引擎版

基于 **6 姿态归一化精灵图骨骼（`SpriteActor`）+ 可交互物理微信舞台（`WeChatWindow`）+ 虚拟摄像机推拉摇移（`DesktopCamera`）+ 分镜脚本 DSL（`EpisodeScript`）** 构建的 Windows 11 桌面连续剧工程。

## 核心升级亮点

1. **淘汰漂移 GIF，全面切换为脚底锚点精灵图引擎（`src/components/SpriteActor.tsx`）**
   - 统一使用 `512 × 512` 标准画布与 `FOOT_ANCHOR = 455 / 512` 脚底接触基准线。
   - **零膨胀复用状态机**：每个角色仅凭 6 张基础帧（`000: stand`, `001: crouch`, `002: lift`, `003: air`, `004: step`, `005: stand`）即可程序化组合出 `idle`（呼吸）、`run`（小碎步颠簸）、`jump`（抛物线起跳+挤压回弹）、`stomp`（原地猛踩）、`smash`（大锤劈砸）、`push`/`pull`（前倾推车/后仰拔河+脚底灰尘粒子）和 `cheer`（欢呼跳跃）8 种戏剧状态。
   - **手部道具挂点与头顶漫画气泡**：内置 `hammer`（100T 玩具锤挥击动效）、`shield`（夜宵基金护盾）、`chicken`（炸鸡腿）图层挂载，以及自动防镜像翻转的角色头顶台词气泡与情绪徽章（`❗/💢/💦/✨/❤️`）。
2. **高还原、可物理破坏的微信 PC 舞台（`src/components/WeChatWindow.tsx`）**
   - 原生三栏布局（`#2E2E2E` 导航栏 + `#EAE8E7` 会话列表 + `#F5F5F5` 聊天主舞台），补齐未读红点角标、群聊免打扰静音图标、置顶三角标、会话预览实时变更与 `对方正在输入...` 状态。
   - **四大物理交互特效**：
     - **气泡弹簧跳板**：一二破窗跃向第一条炸鸡消息气泡时，气泡受压下陷回弹并弹出 `BOING!` 反馈。
     - **破窗裂纹残影**：一二跳出表情槽位后留下红色玻璃裂纹与破壁提示。
     - **挥锤逐字击碎文案**：一二在输入框挥锤时，DeepSeek 写的 `不吃！我在啃黄瓜！` 被逐字砸红并沿抛物线向四周旋转飞散。
     - **踩踏发送按钮同步受压**：将 `SpriteJumpTest` 的顶部原点按钮压缩（`scaleY` 下陷 + 绿色冲击射线 + 窗口微震）完整合入主片。
3. **全局虚拟摄像机与多集连续剧架构（`src/components/DesktopCamera.tsx` & `src/episodes/`）**
   - 支持按关键帧平滑推拉聚焦（Zoom & Pan）与受击震屏（Camera Shake）。
   - 内置第 01 集《夜宵炸鸡保卫战》（`ep01_fried_chicken.ts`）与第 02 集《周五准点下班保卫战》（`ep02_cart_defense.ts`），100% 复用同一套一二布布精灵图。

4. **DeepSeek 透明桌宠（`src/components/DeepSeekPet.tsx`）**
   - 使用 [PC2005-cloud/dsh-pet](https://github.com/PC2005-cloud/dsh-pet) 的透明 WebM 动画，映射 `idle / think / panic / dizzy` 四状态。
   - 桌宠站在任务栏右侧，发射 AI 光标、受击抖动；文件夹砸中后 Token 从 96% 降至 0%，进入服务器繁忙休眠状态。
   - 原资源许可保存在 `public/deepseek-pet/LICENSE.txt`；GIF 预览及 PNG 序列数组映射保留在组件中，便于替换。

## 启动与输出

```bash
npm install
npm run studio       # 打开 Remotion Studio（含 DesktopAI / DesktopAI-Wide / DesktopAI-EP02 / SpriteJumpTest 四个合成）
npm run typecheck    # TypeScript 类型检查
npm run still        # 导出预览帧
npm run render       # 渲染输出 out/desktop-ai.mp4
```

## 切分新生成的 AI 精灵图

使用 AI 生成新的 `3列 × 2行` 角色精灵图后，直接运行升级后的多角色切图脚本：

```bash
# 切分一二基础动作图 -> public/sprites/yier/jump/000..005.png
python tools/prepare_jump_sprites.py --actor yier --pack jump --source path/to/yier_sheet.png

# 切分布布基础动作图 -> public/sprites/bubu/jump/000..005.png
python tools/prepare_jump_sprites.py --actor bubu --pack jump --source path/to/bubu_sheet.png
```
