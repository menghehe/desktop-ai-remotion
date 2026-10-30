import {AbsoluteFill, Sequence} from 'remotion';
import {Desktop} from './components/Desktop';
import {WeChatWindow} from './components/WeChatWindow';
import {DeepSeekWindow} from './components/DeepSeekWindow';

export const DesktopAI = () => {
  return (
    <AbsoluteFill className="bg-[#dfeef8] font-sans">
      <Desktop />
      <Sequence from={20} durationInFrames={168} premountFor={30}>
        <WeChatWindow />
      </Sequence>
      <Sequence from={180} durationInFrames={180} premountFor={30}>
        <DeepSeekWindow />
      </Sequence>
    </AbsoluteFill>
  );
};
