import {Composition} from 'remotion';
import {DesktopAI} from './DesktopAI';
import {SpriteJumpTest} from './SpriteJumpTest';

export const RemotionRoot = () => {
  return (
    <>
    <Composition
      id="DesktopAI"
      component={DesktopAI}
      durationInFrames={1800}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="SpriteJumpTest"
      component={SpriteJumpTest}
      durationInFrames={90}
      fps={30}
      width={1920}
      height={1080}
    />
    </>
  );
};
