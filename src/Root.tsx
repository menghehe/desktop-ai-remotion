import {Composition} from 'remotion';
import {DesktopAI} from './DesktopAI';

export const RemotionRoot = () => {
  return (
    <Composition
      id="DesktopAI"
      component={DesktopAI}
      durationInFrames={360}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
