import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {StoryDeepSeekPet} from './components/DeepSeekPet';
import {Desktop} from './components/Desktop';
import {DesktopCamera} from './components/DesktopCamera';
import {StickerFlood} from './components/StickerFlood';
import {StoryActors} from './components/StoryActors';
import {StoryOverlay} from './components/StoryOverlay';
import {WeChatWindow} from './components/WeChatWindow';
import {EP01_FRIED_CHICKEN} from './episodes/ep01_fried_chicken';
import {EpisodeScript} from './lib/stageAnchors';
import {ACT} from './lib/storyboard';

export const DesktopAI = ({
  script = EP01_FRIED_CHICKEN,
  enableCamera = true,
}: {
  script?: EpisodeScript;
  enableCamera?: boolean;
}) => {
  return (
    <AbsoluteFill
      className="overflow-hidden bg-[#dfeef8] font-sans"
      style={{
        translate: '0px -34.9px'
      }}
    >
      <DesktopCamera keyframes={script.cameraKeyframes} enabled={enableCamera}>
        <Desktop />
        <WeChatWindow script={script} />
        <StoryActors script={script} />
        <StoryDeepSeekPet />
        <StickerFlood startFrame={ACT.flood} count={65} />
      </DesktopCamera>
      <StoryOverlay script={script} />
      <Audio src={staticFile('audio/desktop-story.wav')} />
    </AbsoluteFill>
  );
};
