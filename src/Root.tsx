import {Composition} from 'remotion';
import {DesktopAI} from './DesktopAI';
import {EP01_FRIED_CHICKEN} from './episodes/ep01_fried_chicken';
import {EP02_OVERTIME_DEFENSE} from './episodes/ep02_cart_defense';
import {SpriteJumpTest} from './SpriteJumpTest';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="DesktopAI"
        component={() => <DesktopAI script={EP01_FRIED_CHICKEN} enableCamera={true} />}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="DesktopAI-Wide"
        component={() => <DesktopAI script={EP01_FRIED_CHICKEN} enableCamera={false} />}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="DesktopAI-EP02"
        component={() => <DesktopAI script={EP02_OVERTIME_DEFENSE} enableCamera={true} />}
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
