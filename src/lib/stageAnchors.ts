export type StageAnchorId =
  | 'wechat_msg_trampoline'
  | 'wechat_sticker_slot'
  | 'wechat_emoji_btn'
  | 'wechat_emoji_bubu_slot'
  | 'wechat_composer_left'
  | 'wechat_composer_center'
  | 'wechat_send_btn'
  | 'desktop_excel_icon'
  | 'desktop_recycle_guard'
  | 'desktop_sticker_folder'
  | 'deepseek_dropzone'
  | 'stage_center_finale'
  | 'stage_right_finale'
  | 'deepseek_pet_chase';

export interface StagePoint {
  x: number;
  floor: number;
  description: string;
}

/**
 * Semantic UI coordinate map across the 1920x1080 Windows 11 desktop.
 * `x` is the horizontal center; `floor` is the exact contact surface Y where
 * the character's feet (`FOOT_ANCHOR = 455 / 512`) touch the UI element.
 */
export const STAGE_ANCHORS: Record<StageAnchorId, StagePoint> = {
  wechat_msg_trampoline: {
    x: 610,
    floor: 245,
    description: '老婆第一条炸鸡邀约消息气泡上沿（可踩踏回弹跳板）',
  },
  wechat_sticker_slot: {
    x: 455,
    floor: 398,
    description: '微信聊天流内一二初始表情包槽位',
  },
  wechat_emoji_btn: {
    x: 350,
    floor: 794,
    description: '微信底部工具栏笑脸表情图标正上方',
  },
  wechat_emoji_bubu_slot: {
    x: 468,
    floor: 690,
    description: '微信弹出表情面板内“布布出击”槽位',
  },
  wechat_composer_left: {
    x: 520,
    floor: 868,
    description: '微信输入框左侧站位点',
  },
  wechat_composer_center: {
    x: 675,
    floor: 868,
    description: '微信输入框中央（挥锤砸碎 AI 拒绝文案位置）',
  },
  wechat_send_btn: {
    x: 1004,
    floor: 892,
    description: '微信右下角“发送(S)”按钮顶面（踩踏发送触发点）',
  },
  desktop_excel_icon: {
    x: 205,
    floor: 315,
    description: '桌面《老婆专属夜宵基金.xlsx》图标位置',
  },
  desktop_recycle_guard: {
    x: 148,
    floor: 225,
    description: '桌面回收站与夜宵基金之间的拔河防守位',
  },
  desktop_sticker_folder: {
    x: 355,
    floor: 560,
    description: '桌面《一二布布表情包库存（4000+张）》文件夹起始位',
  },
  deepseek_dropzone: {
    x: 1365,
    floor: 745,
    description: '右侧 Edge 浏览器 DeepSeek 输入框投喂落点',
  },
  stage_center_finale: {
    x: 865,
    floor: 945,
    description: '剧终庆祝舞台中央左位（一二）',
  },
  stage_right_finale: {
    x: 1055,
    floor: 945,
    description: '剧终庆祝舞台中央右位（布布）',
  },
  deepseek_pet_chase: {
    x: 1370,
    floor: 1008,
    description: '任务栏右侧追击 DeepSeek 桌宠的锤击位置',
  },
};

export type ActorRole = 'yier' | 'bubu';
export type ActionState =
  | 'idle'
  | 'run'
  | 'jump'
  | 'stomp'
  | 'smash'
  | 'push'
  | 'pull'
  | 'cheer';

export type PropType = 'none' | 'hammer' | 'shield' | 'chicken' | 'rope';
export type EmoteType = 'none' | 'shock' | 'angry' | 'sweat' | 'sparkle' | 'heart';

export interface ActorCue {
  fromFrame: number;
  toFrame: number;
  action: ActionState;
  from: StageAnchorId;
  to: StageAnchorId;
  jumpHeight?: number;
  scale?: number;
  flipX?: boolean;
  prop?: PropType;
  emote?: EmoteType;
  speech?: string;
}

export interface CameraKeyframe {
  frame: number;
  focusX: number;
  focusY: number;
  zoom: number;
  shake?: number;
}

export interface EpisodeScript {
  id: string;
  title: string;
  acts: Array<{
    from: number;
    title: string;
    subtitle: string;
  }>;
  wechat: {
    contactName: string;
    unreadClearFrame: number;
    inviteFrame: number;
    inviteText: string;
    stickerFrame: number;
    breakoutFrame: number;
    emojiPanelOpenRange: [number, number];
    aiTypeStartFrame: number;
    aiReplyText: string;
    smashStartFrame: number;
    smashEndFrame: number;
    heroTypeStartFrame: number;
    heroReplyText: string;
    stompSendRange: [number, number];
    sentFrame: number;
    wifeTypingRange: [number, number];
    wifeReplyFrame: number;
    wifeReplyText: string;
  };
  yierCues: ActorCue[];
  bubuCues: ActorCue[];
  cameraKeyframes: CameraKeyframe[];
}
