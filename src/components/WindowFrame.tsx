import type {ReactNode} from 'react';
import {Minus, Square, X} from 'lucide-react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const WindowFrame = ({
  title,
  icon,
  children,
  className = '',
  bodyClassName = '',
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entrance = spring({frame, fps, config: {damping: 18, stiffness: 150, mass: 0.8}});

  return (
    <section
      className={`window-shadow absolute overflow-hidden rounded-xl border border-white/60 bg-white ${className}`}
      style={{
        opacity: entrance,
        transform: `translateY(${28 * (1 - entrance)}px) scale(${0.96 + entrance * 0.04})`,
      }}
    >
      <header className="flex h-12 items-center border-b border-black/5 bg-white pl-4 text-[13px] text-slate-700">
        <span className="mr-2 flex h-6 w-6 items-center justify-center">{icon}</span>
        <span>{title}</span>
        <div className="ml-auto flex h-full items-center">
          <span className="flex h-full w-12 items-center justify-center"><Minus size={15} /></span>
          <span className="flex h-full w-12 items-center justify-center"><Square size={11} /></span>
          <span className="flex h-full w-12 items-center justify-center rounded-tr-xl bg-[#e81123] text-white"><X size={16} /></span>
        </div>
      </header>
      <div className={`h-[calc(100%-3rem)] ${bodyClassName}`}>{children}</div>
    </section>
  );
};
