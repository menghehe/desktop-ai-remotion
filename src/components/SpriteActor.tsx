import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  ActionState,
  ActorCue,
  ActorRole,
  EmoteType,
  PropType,
  STAGE_ANCHORS,
} from '../lib/stageAnchors';

const SPRITE_SIZE = 250;
const FOOT_ANCHOR = 455 / 512;

/**
 * Maps any high-level dramatic action state onto the 6 normalized base poses (`000`..`005`).
 * Zero extra full-body sprite sheets required!
 */
const resolvePoseIndex = (action: ActionState, localFrame: number, p: number): number => {
  switch (action) {
    case 'idle':
      return 0;
    case 'run':
      return [4, 0, 2, 0][Math.floor(localFrame / 3) % 4];
    case 'jump':
      if (p < 0.14) return 1; // crouch蓄力
      if (p < 0.28) return 2; // lift蹬地
      if (p < 0.82) return 3; // air腾空
      if (p < 0.94) return 4; // step触地
      return 5;               // stand恢复
    case 'stomp':
      return Math.floor(localFrame / 5) % 2 === 0 ? 3 : 1;
    case 'smash': {
      const cycle = localFrame % 12;
      if (cycle < 4) return 2; // 举高蓄力
      if (cycle < 7) return 3; // 跃起下劈
      return 1;                // 重锤砸地蹲伏
    }
    case 'push':
    case 'pull':
      return Math.floor(localFrame / 5) % 2 === 0 ? 1 : 4;
    case 'cheer':
      return Math.floor(localFrame / 6) % 2 === 0 ? 2 : 3;
    default:
      return 0;
  }
};

const PropAttachment = ({
  prop,
  action,
  localFrame,
}: {
  prop?: PropType;
  action: ActionState;
  localFrame: number;
}) => {
  if (!prop || prop === 'none') return null;

  if (prop === 'hammer') {
    const cycle = localFrame % 12;
    const swing =
      action === 'smash'
        ? interpolate(cycle, [0, 4, 7, 11], [-55, -75, 62, -25], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        : Math.sin(localFrame * 0.25) * 14 - 20;
    const hitFlash = action === 'smash' && cycle >= 6 && cycle <= 8;

    return (
      <div
        className="pointer-events-none absolute"
        style={{
          left: '62%',
          top: '48%',
          width: 96,
          height: 96,
          transformOrigin: '18% 82%',
          transform: `rotate(${swing}deg)`,
        }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-md">
          {/* Wooden handle */}
          <rect x="14" y="54" width="52" height="11" rx="5" transform="rotate(-38 20 60)" fill="#92400E" stroke="#451A03" strokeWidth="3" />
          {/* Squeaky toy hammer head */}
          <g transform="translate(52, 22) rotate(52)">
            <rect x="-26" y="-18" width="52" height="36" rx="10" fill="#EF4444" stroke="#7F1D1D" strokeWidth="3.5" />
            <ellipse cx="-26" cy="0" rx="7" ry="18" fill="#FBBF24" stroke="#7F1D1D" strokeWidth="3" />
            <ellipse cx="26" cy="0" rx="7" ry="18" fill="#FBBF24" stroke="#7F1D1D" strokeWidth="3" />
            <text x="0" y="6" textAnchor="middle" fill="#FEF08A" fontSize="14" fontWeight="900">100T</text>
          </g>
        </svg>
        {hitFlash && (
          <div className="absolute -right-4 top-6 h-10 w-10 rounded-full bg-amber-300/80 blur-[2px]" />
        )}
      </div>
    );
  }

  if (prop === 'shield') {
    const pulse = 1 + Math.sin(localFrame * 0.35) * 0.06;
    return (
      <div
        className="pointer-events-none absolute"
        style={{
          left: '56%',
          top: '46%',
          width: 78,
          height: 84,
          transform: `scale(${pulse})`,
        }}
      >
        <svg viewBox="0 0 80 88" className="h-full w-full drop-shadow-lg">
          <path
            d="M40 6 L72 18 V44 C72 64 58 77 40 84 C22 77 8 64 8 44 V18 Z"
            fill="#10B981"
            stroke="#064E3B"
            strokeWidth="4"
          />
          <path
            d="M40 13 L64 22 V43 C64 58 53 69 40 75 C27 69 16 58 16 43 V22 Z"
            fill="#34D399"
          />
          <text x="40" y="51" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="900">
            夜宵
          </text>
        </svg>
      </div>
    );
  }

  if (prop === 'chicken') {
    const bob = Math.sin(localFrame * 0.3) * 8;
    return (
      <div
        className="pointer-events-none absolute text-5xl drop-shadow-md"
        style={{
          left: '58%',
          top: '50%',
          transform: `rotate(${bob}deg)`,
        }}
      >
        🍗
      </div>
    );
  }

  return null;
};

const EmoteBadge = ({emote, localFrame}: {emote?: EmoteType; localFrame: number}) => {
  if (!emote || emote === 'none') return null;
  const pop = 0.9 + Math.sin(localFrame * 0.4) * 0.12;
  const map: Record<Exclude<EmoteType, 'none'>, {icon: string; bg: string}> = {
    shock: {icon: '❗', bg: 'bg-amber-400 text-slate-900 border-amber-700'},
    angry: {icon: '💢', bg: 'bg-rose-500 text-white border-rose-900'},
    sweat: {icon: '💦', bg: 'bg-sky-400 text-white border-sky-800'},
    sparkle: {icon: '✨', bg: 'bg-emerald-400 text-slate-900 border-emerald-800'},
    heart: {icon: '❤️', bg: 'bg-pink-400 text-white border-pink-800'},
  };
  const item = map[emote];

  return (
    <div
      className={`absolute -top-2 right-7 flex h-9 w-9 items-center justify-center rounded-full border-2 text-lg shadow-md ${item.bg}`}
      style={{transform: `scale(${pop})`}}
    >
      {item.icon}
    </div>
  );
};

export const SpriteActor = ({
  actor,
  cues,
  zIndex = 95,
}: {
  actor: ActorRole;
  cues: ActorCue[];
  zIndex?: number;
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const activeCue = cues.find((c) => frame >= c.fromFrame && frame <= c.toFrame);
  if (!activeCue) return null;

  const localFrame = frame - activeCue.fromFrame;
  const duration = Math.max(1, activeCue.toFrame - activeCue.fromFrame);
  const rawP = interpolate(frame, [activeCue.fromFrame, activeCue.toFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const travel = rawP * rawP * (3 - 2 * rawP);

  const startAnchor = STAGE_ANCHORS[activeCue.from];
  const endAnchor = STAGE_ANCHORS[activeCue.to];

  const x = interpolate(travel, [0, 1], [startAnchor.x, endAnchor.x]);
  const floor = interpolate(travel, [0, 1], [startAnchor.floor, endAnchor.floor]);

  // Procedural jump & action vertical arcs
  const jumpHeight =
    activeCue.action === 'jump'
      ? activeCue.jumpHeight ?? 180
      : activeCue.action === 'stomp' || activeCue.action === 'cheer'
        ? Math.abs(Math.sin(localFrame * 0.45)) * 38
        : activeCue.action === 'run'
          ? Math.abs(Math.sin(localFrame * 0.75)) * 14
          : activeCue.action === 'smash'
            ? Math.max(0, Math.sin((localFrame % 12) / 12 * Math.PI)) * 28
            : 0;

  const airborneOffset =
    activeCue.action === 'jump' ? Math.sin(rawP * Math.PI) * jumpHeight : jumpHeight;

  const poseIndex = resolvePoseIndex(activeCue.action, localFrame, rawP);

  // Squash & Stretch physics at takeoff, landing, and breathing
  const isJump = activeCue.action === 'jump';
  const crouch = isJump
    ? interpolate(rawP, [0, 0.12, 0.24], [0, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;
  const impact = isJump
    ? interpolate(rawP, [0.82, 0.92, 1], [0, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : activeCue.action === 'stomp' || activeCue.action === 'smash'
      ? Math.max(0, -Math.sin(localFrame * 0.5)) * 0.65
      : 0;

  const breath =
    activeCue.action === 'idle' ? Math.sin(localFrame * 0.2) * 0.035 : 0;

  const baseScale = activeCue.scale ?? 1;
  const scaleX = baseScale * (1 + crouch * 0.12 + impact * 0.18 - breath * 0.5);
  const scaleY = baseScale * (1 - crouch * 0.14 - impact * 0.22 + breath);

  const leanAngle =
    activeCue.action === 'push'
      ? 12
      : activeCue.action === 'pull'
        ? -14
        : activeCue.action === 'run'
          ? 6
          : isJump
            ? interpolate(rawP, [0.15, 0.45, 0.8, 1], [0, -8, 6, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            : 0;

  const flipSign = activeCue.flipX ? -1 : 1;
  const y = floor - FOOT_ANCHOR * SPRITE_SIZE - airborneOffset;

  // Contact shadow shrinks and fades when high in the air, sharpens on contact
  const shadowScale = interpolate(airborneOffset, [0, 220], [1, 0.35], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shadowOpacity = interpolate(airborneOffset, [0, 220], [0.22, 0.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bubbleEnter = spring({
    frame: localFrame,
    fps,
    config: {damping: 14, stiffness: 190, mass: 0.6},
  });

  const showDust =
    activeCue.action === 'push' ||
    activeCue.action === 'pull' ||
    activeCue.action === 'run';

  return (
    <>
      {/* Ground Contact Shadow */}
      <div
        className="pointer-events-none absolute rounded-[50%] bg-slate-950"
        style={{
          left: x - 44 * shadowScale,
          top: floor - 5,
          width: 88 * shadowScale,
          height: 14 * shadowScale,
          opacity: shadowOpacity,
          zIndex: zIndex - 1,
          filter: 'blur(3px)',
        }}
      />

      {/* Procedural Foot Dust Particles */}
      {showDust &&
        [0, 1].map((d) => {
          const dustP = ((localFrame + d * 4) % 9) / 9;
          return (
            <div
              key={d}
              className="pointer-events-none absolute rounded-full bg-white/85 shadow-sm"
              style={{
                left: x - flipSign * (24 + dustP * 32),
                top: floor - 10 - dustP * 14,
                width: 12 * (1 - dustP * 0.5),
                height: 12 * (1 - dustP * 0.5),
                opacity: 1 - dustP,
                zIndex: zIndex - 1,
              }}
            />
          );
        })}

      {/* Character Container Anchored at Foot Baseline */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: x - SPRITE_SIZE / 2,
          top: y,
          width: SPRITE_SIZE,
          height: SPRITE_SIZE,
          zIndex,
        }}
      >
        {/* Flipped / Squashed Body & Hand Prop Layer */}
        <div
          className="relative h-full w-full"
          style={{
            transformOrigin: `50% ${FOOT_ANCHOR * 100}%`,
            transform: `rotate(${leanAngle}deg) scale(${scaleX * flipSign}, ${scaleY})`,
            filter: 'drop-shadow(0 8px 10px rgba(15, 23, 42, 0.22))',
          }}
        >
          <Img
            src={staticFile(
              `sprites/${actor}/jump/${String(poseIndex).padStart(3, '0')}.png`,
            )}
            className="h-full w-full object-contain"
          />
          <PropAttachment
            prop={activeCue.prop}
            action={activeCue.action}
            localFrame={localFrame}
          />
        </div>

        {/* Unflipped Head Emote & Comic Speech Bubble */}
        <EmoteBadge emote={activeCue.emote} localFrame={localFrame} />

        {activeCue.speech && duration > 15 && (
          <div
            className={`absolute -top-9 left-1/2 flex w-max max-w-[230px] -translate-x-1/2 items-center gap-1.5 rounded-2xl border-2 px-3.5 py-1.5 text-[13px] font-bold shadow-lg ${
              actor === 'yier'
                ? 'border-slate-800 bg-white text-slate-900'
                : 'border-amber-900 bg-amber-50 text-amber-950'
            }`}
            style={{
              opacity: bubbleEnter,
              transform: `translate(-50%, ${(1 - bubbleEnter) * 10}px) scale(${0.85 + bubbleEnter * 0.15})`,
            }}
          >
            <span className="text-xs">{actor === 'yier' ? '🐻‍❄️' : '🐻'}</span>
            <span>{activeCue.speech}</span>
            <div
              className={`absolute -bottom-[7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b-2 border-r-2 ${
                actor === 'yier'
                  ? 'border-slate-800 bg-white'
                  : 'border-amber-900 bg-amber-50'
              }`}
            />
          </div>
        )}
      </div>
    </>
  );
};
