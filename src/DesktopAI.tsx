import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {Desktop} from './components/Desktop';
import {WeChatWindow} from './components/WeChatWindow';
import {DeepSeekWindow} from './components/DeepSeekWindow';
import {StoryActors} from './components/StoryActors';
import {StickerFlood} from './components/StickerFlood';
import {StoryOverlay} from './components/StoryOverlay';
import {ACT} from './lib/storyboard';

export const DesktopAI = () => {
  return (
    <AbsoluteFill className="bg-[#dfeef8] font-sans">
      <Desktop />
      <WeChatWindow />
      <DeepSeekWindow />
      <StoryActors />
      <StickerFlood startFrame={ACT.flood} count={65} />
      <StoryOverlay />
      <Audio src={staticFile('audio/desktop-story.wav')} />
    </AbsoluteFill>
  );
};
