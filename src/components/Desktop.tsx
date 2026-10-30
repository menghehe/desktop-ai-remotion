import {Img, staticFile, useCurrentFrame} from 'remotion';
import {DeepSeekIcon, WeChatIcon, WindowsLogo} from './BrandIcons';

const DesktopIcon = ({src, label}: {src: string; label: string}) => (
  <div className="flex w-[92px] flex-col items-center gap-2 rounded p-2 text-center text-xs text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
    <Img src={staticFile(src)} className="h-11 w-11 object-contain" />
    <span>{label}</span>
  </div>
);

export const Desktop = () => {
  const frame = useCurrentFrame();
  const weChatActive = frame >= 20;
  const deepSeekActive = frame >= 60;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#376f9e]">
      <Img
        src={staticFile('win11/wallpaper/blue-bloom.jpg')}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute left-4 top-4 flex flex-col gap-2">
        <DesktopIcon src="win11/icons/recycle-bin.png" label="回收站" />
        <DesktopIcon src="win11/icons/explorer.png" label="文件资源管理器" />
        <DesktopIcon src="win11/icons/edge.png" label="Microsoft Edge" />
        <div className="mt-1 flex h-12 w-[92px] items-center justify-center rounded bg-[#16854b] text-2xl font-bold text-white shadow-md">X</div>
        <div className="-mt-2 w-[116px] text-center text-[11px] leading-4 text-white [text-shadow:0_1px_3px_#000]">老婆专属夜宵基金.xlsx</div>
        <DesktopIcon src="win11/icons/explorer.png" label="一二布布表情包库存" />
      </div>

      <div className="taskbar-glass absolute inset-x-0 bottom-0 flex h-[72px] items-center px-5">
        <div className="absolute left-1/2 flex -translate-x-1/2 items-end gap-2">
          <TaskButton><WindowsLogo size={29} /></TaskButton>
          <TaskButton><Img src={staticFile('win11/icons/search.png')} className="h-8 w-8" /></TaskButton>
          <TaskButton><Img src={staticFile('win11/icons/explorer.png')} className="h-9 w-9" /></TaskButton>
          <TaskButton><Img src={staticFile('win11/icons/edge.png')} className="h-9 w-9" /></TaskButton>
          <TaskButton active={weChatActive}><span className="text-[#07c160]"><WeChatIcon size={35} /></span></TaskButton>
          <TaskButton active={deepSeekActive}><DeepSeekIcon size={37} /></TaskButton>
        </div>
        <div className="ml-auto flex items-center gap-4 text-[#172b3a]">
          <span className="text-xs">中</span>
          <div className="flex items-center gap-2">
            <Img src={staticFile('win11/system/wifi.png')} className="h-4 w-4 object-contain" />
            <Img src={staticFile('win11/system/audio2.png')} className="h-4 w-4 object-contain" />
            <Img src={staticFile('win11/system/battery.png')} className="h-5 w-5 object-contain" />
          </div>
          <div className="text-right text-xs leading-5">
            <div>21:30</div>
            <div>2026/10/30</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskButton = ({children, active = false}: {children: React.ReactNode; active?: boolean}) => (
  <div className={`relative flex h-[52px] w-[52px] items-center justify-center rounded-lg ${active ? 'bg-white/70' : ''}`}>
    {children}
    {active && <span className="absolute bottom-0 h-1 w-5 rounded-full bg-[#3579b9]" />}
  </div>
);
