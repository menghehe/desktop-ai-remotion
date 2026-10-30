import {ArrowUp, ChevronDown, FolderUp, Globe, Lightbulb, Paperclip, Plus} from 'lucide-react';
import {Img, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {ACT, tokenPercent} from '../lib/storyboard';
import {DeepSeekIcon} from './BrandIcons';

export const DeepSeekWindow = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = Math.max(0, frame - 60);
  const enter = spring({frame: local, fps, config: {damping: 18, stiffness: 150, mass: 0.8}});
  const token = tokenPercent(frame);
  const busy = frame >= ACT.finale;
  const attacking = frame >= ACT.battle && frame < ACT.flood;
  const thinkSeconds = frame < ACT.flood ? 8 : Math.min(9999, Math.floor(8 + (frame - ACT.flood) * 58));
  const thought = frame >= ACT.upload
    ? '正在逐帧读取《一二布布表情包库存（4000+张）》，分析每张图片里的鸡腿、奶茶与贴贴动作……'
    : attacking
      ? '检测到异常熊类生物阻挠，尝试强制撤回消息并清理夜宵预算。未知阻力持续上升……'
      : '检测到高热量词汇“炸鸡桶（买一送一）”。根据主人14:00设定的《铁血减肥监督协议》，应立即接管微信并冷酷拒绝。';
  const reply = frame >= ACT.upload
    ? `已接收 ${Math.min(4000, Math.max(0, Math.floor((frame - ACT.upload) * 12)))} 张表情包，正在努力分析……`
    : attacking
      ? '警告：桌面控制权争夺中。正在结束异常表情包进程。'
      : '正在执行桌面键鼠接管：自动回复【不吃！我在啃黄瓜！】';

  return (
    <section
      className={`window-shadow absolute left-[1030px] top-[88px] z-30 h-[842px] w-[860px] overflow-hidden rounded-xl border border-black/15 bg-white ${busy ? 'grayscale-[.35]' : ''}`}
      style={{opacity: frame < 60 ? 0 : enter, transform: `translateY(${22 * (1 - enter)}px) scale(${0.97 + enter * 0.03}) rotate(${busy ? Math.sin(frame * 2.4) * 0.3 : 0}deg)`}}
    >
      <div className="flex h-9 items-center bg-[#edf3f9] pl-3 text-[11px] text-slate-600">
        <Img src={staticFile('win11/icons/edge.png')} className="mr-2 h-5 w-5" />
        <div className="flex h-8 w-[245px] items-center gap-2 rounded-t-lg bg-white px-3"><DeepSeekIcon size={15} /><span>DeepSeek - 深度思考</span><span className="ml-auto">×</span></div>
        <div className="ml-auto flex h-full items-center"><span className="flex w-10 items-center justify-center">—</span><span className="flex w-10 items-center justify-center">□</span><span className="flex w-10 items-center justify-center">×</span></div>
      </div>
      <div className="flex h-11 items-center gap-3 border-b border-[#e8edf2] bg-white px-4 text-[11px] text-slate-500"><span>‹</span><span>›</span><span>↻</span><div className="flex h-7 flex-1 items-center rounded-full bg-[#f1f4f8] px-4">🔒 chat.deepseek.com</div><span>⋯</span></div>

      <div className="flex h-[calc(100%-5rem)] text-[#1F2937]">
        <aside className="flex w-[205px] shrink-0 flex-col border-r border-[#EEF2F8] bg-[#F9FBFF] p-3">
          <div className="flex items-center gap-2 px-2 py-2"><DeepSeekIcon size={29} /><span className="text-[18px] font-bold tracking-tight text-[#1F2937]">deepseek</span></div>
          <div className="mt-3 flex h-9 items-center gap-2 rounded-[10px] bg-[#E6F0FF] px-3 text-[12px] font-medium text-[#4D6BFE]"><Plus size={15} />开启新对话</div>
          <div className="mb-1.5 mt-5 px-2 text-[10px] text-[#8B8B8B]">今天</div>
          <div className="rounded-lg bg-[#EAEFF8] px-2.5 py-2 text-[12px] font-medium">铁血减肥监督Agent模式</div>
          <div className="mt-1 truncate px-2.5 py-2 text-[11px] text-[#555]">怎么背着老婆藏私房钱</div>
          <div className="truncate px-2.5 py-2 text-[11px] text-[#555]">圆润小熊视觉显瘦10斤穿搭</div>

          <div className={`mt-3 rounded-xl border p-3 text-center ${busy ? 'border-slate-300 bg-slate-100' : attacking ? 'border-red-200 bg-red-50' : 'border-[#dbe7ff] bg-white'}`}>
            <div className="flex items-center justify-center gap-2"><DeepSeekIcon size={43} /><span className="text-2xl">{busy ? '😵' : attacking ? '💢' : '🕶️'}</span></div>
            <div className="mt-1 text-[11px] font-semibold">{busy ? '鲸鱼娘：算力干烧了…' : attacking ? '鲸鱼娘：别抢我鼠标！' : '鲸鱼娘：冷酷监督中'}</div>
          </div>

          <div className="mt-auto rounded-[10px] border border-[#E5E7EB] bg-white p-2.5 shadow-sm">
            <div className="mb-1.5 flex items-center justify-between text-[10px] font-medium"><span className="text-[#555]">⚡ 算力/Token 余额</span><span className={token < 20 ? 'font-bold text-red-600' : 'text-[#4D6BFE]'}>{token.toFixed(token < 10 ? 1 : 0)}%</span></div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200"><div className={`h-full rounded-full ${token < 20 ? 'bg-red-500' : 'bg-[#4D6BFE]'}`} style={{width: `${token}%`}} /></div>
          </div>
        </aside>

        <main className="relative flex min-w-0 flex-1 flex-col bg-white">
          <header className="flex h-11 shrink-0 items-center border-b border-[#F0F0F0] px-5 text-[13px] font-medium">铁血减肥监督Agent模式<span className="ml-auto rounded bg-[#E0EAFF] px-2 py-1 text-[10px] text-[#4D6BFE]">桌面接管已开启</span></header>
          <div className="chat-scroll flex-1 overflow-hidden px-6 py-4">
            <div className="ml-auto w-fit max-w-[440px] rounded-[18px] bg-[#EFF6FF] px-4 py-2.5 text-[13px] leading-6">今晚不管谁在微信诱惑我吃夜宵，立刻接管鼠标替我冷酷回绝！</div>
            <div className="mt-5 flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB]"><DeepSeekIcon size={22} /></div>
              <div className="min-w-0 flex-1">
                <div className="mb-2 inline-flex items-center gap-1.5 text-[12px] text-[#8B8B8B]"><Lightbulb size={13} /><span>已深度思考（用时 {thinkSeconds} 秒）</span><ChevronDown size={12} /></div>
                <div className="mb-3 border-l-2 border-[#E5E5E5] py-0.5 pl-3 text-[12px] leading-6 text-[#8B8B8B]">{thought}</div>
                {busy ? (
                  <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-medium leading-6 text-red-600">⚠️ 服务器繁忙，请稍后再试。<br /><span className="text-[11px]">错误码：4000张一二布布表情包导致 Token 彻底耗尽</span></div>
                ) : (
                  <div className="text-[13px] font-medium leading-6">{reply}</div>
                )}
              </div>
            </div>
          </div>
          <div className="shrink-0 px-5 pb-4">
            <div className="rounded-[22px] border border-[#E5E7EB] bg-[#F3F4F6] p-3 shadow-sm">
              <div className="min-h-[36px] px-1 pb-2 text-[12px] text-[#9CA3AF]">{frame >= ACT.upload ? '请逐帧分析这4000张表情包里一二到底吃了多少顿饭！' : '给 DeepSeek 发送消息'}</div>
              {frame >= ACT.upload && <div className="mb-2 flex w-fit items-center gap-2 rounded-lg border border-[#d7e2fa] bg-white px-2.5 py-1.5 text-[10px] text-[#4D6BFE]"><FolderUp size={14} />一二布布表情包库存（4000+张）</div>}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><div className="flex items-center gap-1.5 rounded-full border border-[#B8D0FF] bg-[#E0EAFF] px-3 py-1 text-[11px] font-medium text-[#4D6BFE]"><Lightbulb size={13} />深度思考</div><div className="flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-[11px] text-[#4B5563]"><Globe size={13} />联网搜索</div></div>
                <div className="flex items-center gap-3 text-[#6B7280]"><Paperclip size={16} /><div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4D6BFE] text-white">{busy ? <span className="h-2.5 w-2.5 bg-white" /> : <ArrowUp size={17} />}</div></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};
