import {
  ArrowUp,
  ChevronDown,
  Globe,
  Lightbulb,
  Menu,
  MessageSquare,
  Paperclip,
  Plus,
} from 'lucide-react';
import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {isTyping, typedText} from '../lib/timeline';
import {DeepSeekIcon} from './BrandIcons';
import {WindowFrame} from './WindowFrame';

const QUESTION = '老婆又约我吃火锅，怎样委婉但坚定地拒绝？';
const ANSWER = '可以直接表达，不必找借口：\n“今晚不太想吃火锅，我在清淡饮食。你们去吃吧，不用管我，明天再陪你吃别的。”';

export const DeepSeekWindow = () => {
  const frame = useCurrentFrame();
  const sent = frame >= 58;
  const question = sent ? '' : typedText(QUESTION, frame, 8, 1.5);
  const questionTyping = !sent && isTyping(QUESTION, frame, 8, 1.5);
  const thoughtDone = frame >= 112;
  const answer = typedText(ANSWER, frame, 126, 0.65);
  const answerTyping = isTyping(ANSWER, frame, 126, 0.65);
  const sendScale = interpolate(frame, [48, 53, 58, 64], [1, 0.75, 1.12, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <WindowFrame
      title="DeepSeek Harness"
      icon={<DeepSeekIcon size={23} />}
      className="left-[250px] top-[62px] h-[890px] w-[1420px]"
      bodyClassName="bg-white"
    >
      <div className="flex h-full text-[#0f1115]">
        <aside className="flex w-[248px] shrink-0 flex-col border-r border-black/[0.06] bg-[#f5f6f7] p-4">
          <div className="flex items-center gap-2.5 px-2 py-2 text-[#0f1115]">
            <DeepSeekIcon size={32} />
            <span className="text-[20px] font-semibold tracking-[-0.5px]">DeepSeek</span>
            <span className="rounded bg-[#0f1115] px-1.5 py-0.5 text-[9px] font-medium text-white">Harness</span>
          </div>
          <div className="mt-6 flex h-11 items-center gap-3 rounded-xl border border-black/[0.08] bg-white px-3 text-sm font-medium shadow-sm">
            <Plus size={18} /> 新对话
          </div>
          <div className="mt-7 px-3 text-xs text-[#81858c]">今天</div>
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-black/[0.06] px-3 py-3 text-[13px] text-[#353638]">
            <MessageSquare size={16} /><span className="truncate">委婉拒绝火锅邀请</span>
          </div>
          <div className="mt-1 flex items-center gap-2 px-3 py-3 text-[13px] text-[#61666b]">
            <MessageSquare size={16} /><span className="truncate">Remotion 桌面视频</span>
          </div>
          <div className="mt-auto flex items-center gap-3 border-t border-black/[0.06] px-2 pt-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e4edfd] text-xs font-semibold text-[#4176e6]">YI</div>
            <span className="text-sm text-[#43454a]">一二</span>
            <Menu size={17} className="ml-auto text-[#81858c]" />
          </div>
        </aside>

        <main className="relative flex min-w-0 flex-1 flex-col bg-white">
          <header className="flex h-[62px] shrink-0 items-center border-b border-black/[0.04] px-7">
            <span className="text-[15px] font-medium">新对话</span>
            <span className="ml-3 rounded-md bg-[#f1f3f5] px-2 py-1 text-[11px] text-[#61666b]">DeepSeek R1</span>
            <ChevronDown size={15} className="ml-1 text-[#979da6]" />
          </header>

          <div className="chat-scroll flex-1 overflow-hidden px-12 py-7">
            <div className="mx-auto w-full max-w-[850px]">
              {sent && (
                <div className="ml-auto w-fit max-w-[590px] rounded-[20px] bg-[#edf3fe] px-4 py-2.5 text-[15px] leading-6 text-[#0f1115]">
                  {QUESTION}
                </div>
              )}

              {frame >= 70 && (
                <div className="mt-6">
                  <div className={`flex h-7 items-center gap-2 text-[13px] ${thoughtDone ? 'text-[#61666b]' : 'text-[#4176e6]'}`}>
                    {!thoughtDone && (
                      <Img
                        src={staticFile('deepseek-harness/running-whale.png')}
                        className="h-6 w-6 object-contain"
                        style={{opacity: 0.65 + 0.35 * (Math.sin(frame / 3) * 0.5 + 0.5)}}
                      />
                    )}
                    <span>{thoughtDone ? '已思考 12 秒' : '正在深度思考…'}</span>
                    <ChevronDown size={14} />
                    {!thoughtDone && (
                      <span className="min-w-0 flex-1 truncate text-[#81858c] [mask-image:linear-gradient(to_right,black_70%,transparent)]">
                        需要同时照顾语气和边界，避免给出容易被反驳的理由…
                      </span>
                    )}
                  </div>
                  {!thoughtDone && (
                    <div className="ml-[22px] mt-1 border-l border-black/[0.08] pl-4 text-[13px] leading-6 text-[#81858c]">
                      用户想拒绝邀请，但也希望维持亲密关系。应该避免复杂借口，直接说明饮食安排，并给出轻松的替代方案。
                    </div>
                  )}

                  {frame >= 126 && (
                    <div className={`mt-4 whitespace-pre-wrap text-[15px] leading-7 text-[#0f1115] ${answerTyping ? 'typing-caret' : ''}`}>
                      {answer}
                    </div>
                  )}
                </div>
              )}

              {!sent && (
                <div className="flex h-[430px] flex-col items-center justify-center pb-12 text-[#0f1115]">
                  <DeepSeekIcon size={74} />
                  <h1 className="mt-6 text-[28px] font-medium tracking-tight">今天想完成什么？</h1>
                </div>
              )}
            </div>
          </div>

          <div className="shrink-0 px-12 pb-5 pt-2">
            <div className="mx-auto w-full max-w-[884px] rounded-[28px] bg-white px-3 pb-3 pt-2 shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_8px_28px_rgba(38,49,72,0.08)]">
              <div className={`min-h-[44px] px-2 py-2 text-[15px] leading-6 text-[#0f1115] ${questionTyping ? 'typing-caret' : ''}`}>
                {question}
                {!question && <span className="text-[#adb2b8]">发消息，或输入 / 选择命令</span>}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex h-8 items-center gap-1.5 rounded-full bg-[#e4edfd] px-3 text-xs font-medium text-[#4176e6]">
                  <Lightbulb size={14} /> 深度思考 (R1)
                </div>
                <div className="flex h-8 items-center gap-1.5 rounded-full px-3 text-xs text-[#61666b]">
                  <Globe size={14} /> 联网搜索
                </div>
                <Paperclip size={18} className="ml-2 text-[#81858c]" />
                <div
                  className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#0f1115] text-white"
                  style={{transform: `scale(${sendScale})`}}
                >
                  <ArrowUp size={20} strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </WindowFrame>
  );
};
