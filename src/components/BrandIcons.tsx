import {FishLogo} from './OfficialFishLogo';

export const WindowsLogo = ({size = 28}: {size?: number}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" aria-label="Windows">
		<path fill="#20a4ea" d="M1 3.2 10.6 1.8v9.1H1V3.2Zm11.4-1.6L23 0v10.9H12.4V1.6ZM1 12.7h9.6v9.1L1 20.5v-7.8Zm11.4 0H23V24l-10.6-1.5V12.7Z" />
	</svg>
);

export const WeChatIcon = ({size = 30}: {size?: number}) => (
	<svg width={size} height={size} viewBox="0 0 48 48" aria-label="微信">
		<path fill="currentColor" d="M19.5 5C10.4 5 3 11.1 3 18.6c0 4.2 2.4 8 6.2 10.5l-1.5 4.8 5.5-2.8c2 .5 4.1.8 6.3.8 1.1 0 2.2-.1 3.3-.2-.5-1.2-.8-2.5-.8-3.9 0-7.7 7.6-14 17-14 1.2 0 2.4.1 3.5.3C36.3 9.7 28.5 5 19.5 5z" />
		<path fill="currentColor" d="M45 28.4c0-6.3-6.2-11.4-13.8-11.4s-13.8 5.1-13.8 11.4S23.6 40 31.2 40c1.7 0 3.4-.3 5-1 2.8 1.4 5.3 1.9 5.3 1.9s-.8-2.6-1.5-4.5c3-2.1 5-4.8 5-8z" />
		<g fill="#fff">
			<circle cx="13.5" cy="15" r="2" /><circle cx="25" cy="15" r="2" />
			<circle cx="26" cy="25.5" r="1.8" /><circle cx="36" cy="25.5" r="1.8" />
		</g>
	</svg>
);

export const DeepSeekIcon = ({size = 24}: {size?: number}) => (
	<span className="inline-flex items-center justify-center text-[#4176E6]">
		<FishLogo size={size} />
	</span>
);
