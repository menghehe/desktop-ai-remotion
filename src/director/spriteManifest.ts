export type BearAction =
	| 'idle'
	| 'run'
	| 'jump'
	| 'attack_punch'
	| 'attack_hammer'
	| 'skill_charge'
	| 'skill_beam'
	| 'guard'
	| 'hurt'
	| 'knockdown'
	| 'victory'
	| 'team_push';

export type BearExpression =
	| 'happy'
	| 'angry'
	| 'battle_serious'
	| 'shocked'
	| 'crying'
	| 'drool'
	| 'dizzy'
	| 'smug'
	| 'charging_roar'
	| 'wink_love';

export type WhaleAction =
	| 'idle_float'
	| 'patrol_walk'
	| 'keyboard_barrage'
	| 'r1_laser_cast'
	| 'tail_whip'
	| 'token_shield'
	| 'hurt_glitch'
	| 'overload_collapse';

export type WhaleExpression =
	| 'cool_ai'
	| 'smug_tsundere'
	| 'angry_intercept'
	| 'thinking_r1'
	| 'panicked_drop'
	| 'dizzy_overload';

export interface HeadAnchor {
	x: number;
	y: number;
	rotDeg: number;
	footY: number;
	scale?: number;
}

export interface SpriteFrameMeta {
	frame: number;
	src: string;
	officialSrc?: string;
	headAnchor: HeadAnchor;
}

export const SPRITE_MANIFEST = {
  "version": "3.1.0-official-wechat-stickers",
  "description": "100% Authentic 黄小B Official WeChat Stickers Separated Body + Expression Atlas (Whale Girl uses existing DeepSeek Harness assets)",
  "canvasSize": {
    "body": [
      512,
      512
    ],
    "expression": [
      256,
      256
    ]
  },
  "characters": {
    "yier": {
      "name": "一二 (官方微信表情原画)",
      "bodyActions": {
        "idle": [
          {
            "frame": 0,
            "src": "sprites/yier/body/idle/000.png",
            "officialSrc": "sprites/yier/official/idle/000.png",
            "headAnchor": {
              "x": 256.7,
              "y": 294.5,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 1,
            "src": "sprites/yier/body/idle/001.png",
            "officialSrc": "sprites/yier/official/idle/001.png",
            "headAnchor": {
              "x": 255.9,
              "y": 299.9,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 2,
            "src": "sprites/yier/body/idle/002.png",
            "officialSrc": "sprites/yier/official/idle/002.png",
            "headAnchor": {
              "x": 255.9,
              "y": 299.9,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 3,
            "src": "sprites/yier/body/idle/003.png",
            "officialSrc": "sprites/yier/official/idle/003.png",
            "headAnchor": {
              "x": 256.7,
              "y": 294.5,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 4,
            "src": "sprites/yier/body/idle/004.png",
            "officialSrc": "sprites/yier/official/idle/004.png",
            "headAnchor": {
              "x": 255.1,
              "y": 285.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 5,
            "src": "sprites/yier/body/idle/005.png",
            "officialSrc": "sprites/yier/official/idle/005.png",
            "headAnchor": {
              "x": 255.1,
              "y": 291.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 6,
            "src": "sprites/yier/body/idle/006.png",
            "officialSrc": "sprites/yier/official/idle/006.png",
            "headAnchor": {
              "x": 256.0,
              "y": 285.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 7,
            "src": "sprites/yier/body/idle/007.png",
            "officialSrc": "sprites/yier/official/idle/007.png",
            "headAnchor": {
              "x": 256.0,
              "y": 285.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          }
        ],
        "run": [
          {
            "frame": 0,
            "src": "sprites/yier/body/run/000.png",
            "officialSrc": "sprites/yier/official/run/000.png",
            "headAnchor": {
              "x": 254.2,
              "y": 249.4,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 1,
            "src": "sprites/yier/body/run/001.png",
            "officialSrc": "sprites/yier/official/run/001.png",
            "headAnchor": {
              "x": 241.7,
              "y": 251.5,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 2,
            "src": "sprites/yier/body/run/002.png",
            "officialSrc": "sprites/yier/official/run/002.png",
            "headAnchor": {
              "x": 241.7,
              "y": 251.5,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 3,
            "src": "sprites/yier/body/run/003.png",
            "officialSrc": "sprites/yier/official/run/003.png",
            "headAnchor": {
              "x": 226.9,
              "y": 266.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 4,
            "src": "sprites/yier/body/run/004.png",
            "officialSrc": "sprites/yier/official/run/004.png",
            "headAnchor": {
              "x": 252.6,
              "y": 277.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 5,
            "src": "sprites/yier/body/run/005.png",
            "officialSrc": "sprites/yier/official/run/005.png",
            "headAnchor": {
              "x": 273.0,
              "y": 264.0,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 6,
            "src": "sprites/yier/body/run/006.png",
            "officialSrc": "sprites/yier/official/run/006.png",
            "headAnchor": {
              "x": 273.0,
              "y": 264.0,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 7,
            "src": "sprites/yier/body/run/007.png",
            "officialSrc": "sprites/yier/official/run/007.png",
            "headAnchor": {
              "x": 261.3,
              "y": 253.8,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          }
        ],
        "jump": [
          {
            "frame": 0,
            "src": "sprites/yier/body/jump/000.png",
            "officialSrc": "sprites/yier/official/jump/000.png",
            "headAnchor": {
              "x": 287.6,
              "y": 287.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 1,
            "src": "sprites/yier/body/jump/001.png",
            "officialSrc": "sprites/yier/official/jump/001.png",
            "headAnchor": {
              "x": 262.3,
              "y": 287.4,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 2,
            "src": "sprites/yier/body/jump/002.png",
            "officialSrc": "sprites/yier/official/jump/002.png",
            "headAnchor": {
              "x": 222.3,
              "y": 289.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.204
            }
          },
          {
            "frame": 3,
            "src": "sprites/yier/body/jump/003.png",
            "officialSrc": "sprites/yier/official/jump/003.png",
            "headAnchor": {
              "x": 254.9,
              "y": 288.4,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          }
        ],
        "attack_punch": [
          {
            "frame": 0,
            "src": "sprites/yier/body/attack_punch/000.png",
            "officialSrc": "sprites/yier/official/attack_punch/000.png",
            "headAnchor": {
              "x": 300.4,
              "y": 269.4,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 1,
            "src": "sprites/yier/body/attack_punch/001.png",
            "officialSrc": "sprites/yier/official/attack_punch/001.png",
            "headAnchor": {
              "x": 284.3,
              "y": 264.2,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 2,
            "src": "sprites/yier/body/attack_punch/002.png",
            "officialSrc": "sprites/yier/official/attack_punch/002.png",
            "headAnchor": {
              "x": 300.4,
              "y": 267.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 3,
            "src": "sprites/yier/body/attack_punch/003.png",
            "officialSrc": "sprites/yier/official/attack_punch/003.png",
            "headAnchor": {
              "x": 300.4,
              "y": 267.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 4,
            "src": "sprites/yier/body/attack_punch/004.png",
            "officialSrc": "sprites/yier/official/attack_punch/004.png",
            "headAnchor": {
              "x": 284.3,
              "y": 264.2,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 5,
            "src": "sprites/yier/body/attack_punch/005.png",
            "officialSrc": "sprites/yier/official/attack_punch/005.png",
            "headAnchor": {
              "x": 284.3,
              "y": 264.2,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 6,
            "src": "sprites/yier/body/attack_punch/006.png",
            "officialSrc": "sprites/yier/official/attack_punch/006.png",
            "headAnchor": {
              "x": 300.4,
              "y": 267.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 7,
            "src": "sprites/yier/body/attack_punch/007.png",
            "officialSrc": "sprites/yier/official/attack_punch/007.png",
            "headAnchor": {
              "x": 300.4,
              "y": 267.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          }
        ],
        "attack_hammer": [
          {
            "frame": 0,
            "src": "sprites/yier/body/attack_hammer/000.png",
            "officialSrc": "sprites/yier/official/attack_hammer/000.png",
            "headAnchor": {
              "x": 357.7,
              "y": 341.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.547
            }
          },
          {
            "frame": 1,
            "src": "sprites/yier/body/attack_hammer/001.png",
            "officialSrc": "sprites/yier/official/attack_hammer/001.png",
            "headAnchor": {
              "x": 359.0,
              "y": 341.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.557
            }
          },
          {
            "frame": 2,
            "src": "sprites/yier/body/attack_hammer/002.png",
            "officialSrc": "sprites/yier/official/attack_hammer/002.png",
            "headAnchor": {
              "x": 361.7,
              "y": 340.2,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.546
            }
          },
          {
            "frame": 3,
            "src": "sprites/yier/body/attack_hammer/003.png",
            "officialSrc": "sprites/yier/official/attack_hammer/003.png",
            "headAnchor": {
              "x": 359.1,
              "y": 340.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.56
            }
          },
          {
            "frame": 4,
            "src": "sprites/yier/body/attack_hammer/004.png",
            "officialSrc": "sprites/yier/official/attack_hammer/004.png",
            "headAnchor": {
              "x": 359.4,
              "y": 341.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.547
            }
          },
          {
            "frame": 5,
            "src": "sprites/yier/body/attack_hammer/005.png",
            "officialSrc": "sprites/yier/official/attack_hammer/005.png",
            "headAnchor": {
              "x": 362.6,
              "y": 340.2,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.546
            }
          },
          {
            "frame": 6,
            "src": "sprites/yier/body/attack_hammer/006.png",
            "officialSrc": "sprites/yier/official/attack_hammer/006.png",
            "headAnchor": {
              "x": 358.7,
              "y": 341.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.547
            }
          },
          {
            "frame": 7,
            "src": "sprites/yier/body/attack_hammer/007.png",
            "officialSrc": "sprites/yier/official/attack_hammer/007.png",
            "headAnchor": {
              "x": 360.0,
              "y": 341.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.557
            }
          },
          {
            "frame": 8,
            "src": "sprites/yier/body/attack_hammer/008.png",
            "officialSrc": "sprites/yier/official/attack_hammer/008.png",
            "headAnchor": {
              "x": 361.7,
              "y": 340.2,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.546
            }
          }
        ],
        "skill_charge": [
          {
            "frame": 0,
            "src": "sprites/yier/body/skill_charge/000.png",
            "officialSrc": "sprites/yier/official/skill_charge/000.png",
            "headAnchor": {
              "x": 185.3,
              "y": 293.9,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.977
            }
          },
          {
            "frame": 1,
            "src": "sprites/yier/body/skill_charge/001.png",
            "officialSrc": "sprites/yier/official/skill_charge/001.png",
            "headAnchor": {
              "x": 192.8,
              "y": 297.2,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.989
            }
          },
          {
            "frame": 2,
            "src": "sprites/yier/body/skill_charge/002.png",
            "officialSrc": "sprites/yier/official/skill_charge/002.png",
            "headAnchor": {
              "x": 199.5,
              "y": 303.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.97
            }
          },
          {
            "frame": 3,
            "src": "sprites/yier/body/skill_charge/003.png",
            "officialSrc": "sprites/yier/official/skill_charge/003.png",
            "headAnchor": {
              "x": 191.9,
              "y": 295.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.977
            }
          },
          {
            "frame": 4,
            "src": "sprites/yier/body/skill_charge/004.png",
            "officialSrc": "sprites/yier/official/skill_charge/004.png",
            "headAnchor": {
              "x": 185.3,
              "y": 293.9,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.977
            }
          },
          {
            "frame": 5,
            "src": "sprites/yier/body/skill_charge/005.png",
            "officialSrc": "sprites/yier/official/skill_charge/005.png",
            "headAnchor": {
              "x": 192.8,
              "y": 295.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.961
            }
          },
          {
            "frame": 6,
            "src": "sprites/yier/body/skill_charge/006.png",
            "officialSrc": "sprites/yier/official/skill_charge/006.png",
            "headAnchor": {
              "x": 195.9,
              "y": 296.5,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.956
            }
          },
          {
            "frame": 7,
            "src": "sprites/yier/body/skill_charge/007.png",
            "officialSrc": "sprites/yier/official/skill_charge/007.png",
            "headAnchor": {
              "x": 191.9,
              "y": 295.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.977
            }
          }
        ],
        "skill_beam": [
          {
            "frame": 0,
            "src": "sprites/yier/body/skill_beam/000.png",
            "officialSrc": "sprites/yier/official/skill_beam/000.png",
            "headAnchor": {
              "x": 227.9,
              "y": 236.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.137
            }
          },
          {
            "frame": 1,
            "src": "sprites/yier/body/skill_beam/001.png",
            "officialSrc": "sprites/yier/official/skill_beam/001.png",
            "headAnchor": {
              "x": 227.7,
              "y": 236.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.121
            }
          },
          {
            "frame": 2,
            "src": "sprites/yier/body/skill_beam/002.png",
            "officialSrc": "sprites/yier/official/skill_beam/002.png",
            "headAnchor": {
              "x": 227.9,
              "y": 236.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.137
            }
          }
        ],
        "guard": [
          {
            "frame": 0,
            "src": "sprites/yier/body/guard/000.png",
            "officialSrc": "sprites/yier/official/guard/000.png",
            "headAnchor": {
              "x": 277.8,
              "y": 241.4,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.987
            }
          },
          {
            "frame": 1,
            "src": "sprites/yier/body/guard/001.png",
            "officialSrc": "sprites/yier/official/guard/001.png",
            "headAnchor": {
              "x": 277.8,
              "y": 241.8,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.987
            }
          },
          {
            "frame": 2,
            "src": "sprites/yier/body/guard/002.png",
            "officialSrc": "sprites/yier/official/guard/002.png",
            "headAnchor": {
              "x": 277.8,
              "y": 241.8,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.987
            }
          },
          {
            "frame": 3,
            "src": "sprites/yier/body/guard/003.png",
            "officialSrc": "sprites/yier/official/guard/003.png",
            "headAnchor": {
              "x": 277.8,
              "y": 241.4,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.987
            }
          },
          {
            "frame": 4,
            "src": "sprites/yier/body/guard/004.png",
            "officialSrc": "sprites/yier/official/guard/004.png",
            "headAnchor": {
              "x": 277.8,
              "y": 241.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.987
            }
          },
          {
            "frame": 5,
            "src": "sprites/yier/body/guard/005.png",
            "officialSrc": "sprites/yier/official/guard/005.png",
            "headAnchor": {
              "x": 277.8,
              "y": 241.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.987
            }
          }
        ],
        "hurt": [
          {
            "frame": 0,
            "src": "sprites/yier/body/hurt/000.png",
            "officialSrc": "sprites/yier/official/hurt/000.png",
            "headAnchor": {
              "x": 215.1,
              "y": 258.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.165
            }
          },
          {
            "frame": 1,
            "src": "sprites/yier/body/hurt/001.png",
            "officialSrc": "sprites/yier/official/hurt/001.png",
            "headAnchor": {
              "x": 215.1,
              "y": 258.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.165
            }
          },
          {
            "frame": 2,
            "src": "sprites/yier/body/hurt/002.png",
            "officialSrc": "sprites/yier/official/hurt/002.png",
            "headAnchor": {
              "x": 215.1,
              "y": 258.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.165
            }
          },
          {
            "frame": 3,
            "src": "sprites/yier/body/hurt/003.png",
            "officialSrc": "sprites/yier/official/hurt/003.png",
            "headAnchor": {
              "x": 215.1,
              "y": 258.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.165
            }
          },
          {
            "frame": 4,
            "src": "sprites/yier/body/hurt/004.png",
            "officialSrc": "sprites/yier/official/hurt/004.png",
            "headAnchor": {
              "x": 213.9,
              "y": 248.2,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.165
            }
          },
          {
            "frame": 5,
            "src": "sprites/yier/body/hurt/005.png",
            "officialSrc": "sprites/yier/official/hurt/005.png",
            "headAnchor": {
              "x": 213.9,
              "y": 248.2,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.165
            }
          },
          {
            "frame": 6,
            "src": "sprites/yier/body/hurt/006.png",
            "officialSrc": "sprites/yier/official/hurt/006.png",
            "headAnchor": {
              "x": 213.9,
              "y": 248.2,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.165
            }
          },
          {
            "frame": 7,
            "src": "sprites/yier/body/hurt/007.png",
            "officialSrc": "sprites/yier/official/hurt/007.png",
            "headAnchor": {
              "x": 215.5,
              "y": 252.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.19
            }
          }
        ],
        "knockdown": [
          {
            "frame": 0,
            "src": "sprites/yier/body/knockdown/000.png",
            "officialSrc": "sprites/yier/official/knockdown/000.png",
            "headAnchor": {
              "x": 234.8,
              "y": 228.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.112
            }
          },
          {
            "frame": 1,
            "src": "sprites/yier/body/knockdown/001.png",
            "officialSrc": "sprites/yier/official/knockdown/001.png",
            "headAnchor": {
              "x": 234.8,
              "y": 227.9,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.112
            }
          },
          {
            "frame": 2,
            "src": "sprites/yier/body/knockdown/002.png",
            "officialSrc": "sprites/yier/official/knockdown/002.png",
            "headAnchor": {
              "x": 234.8,
              "y": 227.9,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.112
            }
          },
          {
            "frame": 3,
            "src": "sprites/yier/body/knockdown/003.png",
            "officialSrc": "sprites/yier/official/knockdown/003.png",
            "headAnchor": {
              "x": 234.8,
              "y": 228.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.112
            }
          },
          {
            "frame": 4,
            "src": "sprites/yier/body/knockdown/004.png",
            "officialSrc": "sprites/yier/official/knockdown/004.png",
            "headAnchor": {
              "x": 234.8,
              "y": 228.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.112
            }
          },
          {
            "frame": 5,
            "src": "sprites/yier/body/knockdown/005.png",
            "officialSrc": "sprites/yier/official/knockdown/005.png",
            "headAnchor": {
              "x": 234.8,
              "y": 228.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.112
            }
          }
        ],
        "victory": [
          {
            "frame": 0,
            "src": "sprites/yier/body/victory/000.png",
            "officialSrc": "sprites/yier/official/victory/000.png",
            "headAnchor": {
              "x": 299.0,
              "y": 256.0,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.167
            }
          },
          {
            "frame": 1,
            "src": "sprites/yier/body/victory/001.png",
            "officialSrc": "sprites/yier/official/victory/001.png",
            "headAnchor": {
              "x": 248.9,
              "y": 267.0,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.183
            }
          },
          {
            "frame": 2,
            "src": "sprites/yier/body/victory/002.png",
            "officialSrc": "sprites/yier/official/victory/002.png",
            "headAnchor": {
              "x": 242.4,
              "y": 248.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.45
            }
          },
          {
            "frame": 3,
            "src": "sprites/yier/body/victory/003.png",
            "officialSrc": "sprites/yier/official/victory/003.png",
            "headAnchor": {
              "x": 242.4,
              "y": 248.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.45
            }
          },
          {
            "frame": 4,
            "src": "sprites/yier/body/victory/004.png",
            "officialSrc": "sprites/yier/official/victory/004.png",
            "headAnchor": {
              "x": 242.4,
              "y": 248.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.45
            }
          },
          {
            "frame": 5,
            "src": "sprites/yier/body/victory/005.png",
            "officialSrc": "sprites/yier/official/victory/005.png",
            "headAnchor": {
              "x": 301.2,
              "y": 251.8,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.218
            }
          },
          {
            "frame": 6,
            "src": "sprites/yier/body/victory/006.png",
            "officialSrc": "sprites/yier/official/victory/006.png",
            "headAnchor": {
              "x": 280.2,
              "y": 281.9,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 7,
            "src": "sprites/yier/body/victory/007.png",
            "officialSrc": "sprites/yier/official/victory/007.png",
            "headAnchor": {
              "x": 280.2,
              "y": 281.9,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          }
        ],
        "team_push": [
          {
            "frame": 0,
            "src": "sprites/yier/body/team_push/000.png",
            "officialSrc": "sprites/yier/official/team_push/000.png",
            "headAnchor": {
              "x": 244.9,
              "y": 215.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.085
            }
          },
          {
            "frame": 1,
            "src": "sprites/yier/body/team_push/001.png",
            "officialSrc": "sprites/yier/official/team_push/001.png",
            "headAnchor": {
              "x": 246.5,
              "y": 209.2,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.092
            }
          },
          {
            "frame": 2,
            "src": "sprites/yier/body/team_push/002.png",
            "officialSrc": "sprites/yier/official/team_push/002.png",
            "headAnchor": {
              "x": 249.8,
              "y": 214.6,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.09
            }
          },
          {
            "frame": 3,
            "src": "sprites/yier/body/team_push/003.png",
            "officialSrc": "sprites/yier/official/team_push/003.png",
            "headAnchor": {
              "x": 249.8,
              "y": 214.6,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.09
            }
          },
          {
            "frame": 4,
            "src": "sprites/yier/body/team_push/004.png",
            "officialSrc": "sprites/yier/official/team_push/004.png",
            "headAnchor": {
              "x": 248.3,
              "y": 203.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.092
            }
          },
          {
            "frame": 5,
            "src": "sprites/yier/body/team_push/005.png",
            "officialSrc": "sprites/yier/official/team_push/005.png",
            "headAnchor": {
              "x": 244.9,
              "y": 215.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.085
            }
          },
          {
            "frame": 6,
            "src": "sprites/yier/body/team_push/006.png",
            "officialSrc": "sprites/yier/official/team_push/006.png",
            "headAnchor": {
              "x": 249.8,
              "y": 214.6,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.09
            }
          },
          {
            "frame": 7,
            "src": "sprites/yier/body/team_push/007.png",
            "officialSrc": "sprites/yier/official/team_push/007.png",
            "headAnchor": {
              "x": 249.8,
              "y": 214.6,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.09
            }
          }
        ]
      }
    },
    "bubu": {
      "name": "布布 (官方微信表情原画)",
      "bodyActions": {
        "idle": [
          {
            "frame": 0,
            "src": "sprites/bubu/body/idle/000.png",
            "officialSrc": "sprites/bubu/official/idle/000.png",
            "headAnchor": {
              "x": 234.3,
              "y": 228.9,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.135
            }
          },
          {
            "frame": 1,
            "src": "sprites/bubu/body/idle/001.png",
            "officialSrc": "sprites/bubu/official/idle/001.png",
            "headAnchor": {
              "x": 239.2,
              "y": 225.2,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.097
            }
          },
          {
            "frame": 2,
            "src": "sprites/bubu/body/idle/002.png",
            "officialSrc": "sprites/bubu/official/idle/002.png",
            "headAnchor": {
              "x": 264.2,
              "y": 235.4,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.114
            }
          },
          {
            "frame": 3,
            "src": "sprites/bubu/body/idle/003.png",
            "officialSrc": "sprites/bubu/official/idle/003.png",
            "headAnchor": {
              "x": 248.2,
              "y": 171.8,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 4,
            "src": "sprites/bubu/body/idle/004.png",
            "officialSrc": "sprites/bubu/official/idle/004.png",
            "headAnchor": {
              "x": 211.3,
              "y": 176.8,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 5,
            "src": "sprites/bubu/body/idle/005.png",
            "officialSrc": "sprites/bubu/official/idle/005.png",
            "headAnchor": {
              "x": 248.0,
              "y": 225.5,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.064
            }
          },
          {
            "frame": 6,
            "src": "sprites/bubu/body/idle/006.png",
            "officialSrc": "sprites/bubu/official/idle/006.png",
            "headAnchor": {
              "x": 246.1,
              "y": 229.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.134
            }
          },
          {
            "frame": 7,
            "src": "sprites/bubu/body/idle/007.png",
            "officialSrc": "sprites/bubu/official/idle/007.png",
            "headAnchor": {
              "x": 273.1,
              "y": 174.5,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          }
        ],
        "run": [
          {
            "frame": 0,
            "src": "sprites/bubu/body/run/000.png",
            "officialSrc": "sprites/bubu/official/run/000.png",
            "headAnchor": {
              "x": 244.0,
              "y": 250.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.062
            }
          },
          {
            "frame": 1,
            "src": "sprites/bubu/body/run/001.png",
            "officialSrc": "sprites/bubu/official/run/001.png",
            "headAnchor": {
              "x": 211.0,
              "y": 245.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.042
            }
          },
          {
            "frame": 2,
            "src": "sprites/bubu/body/run/002.png",
            "officialSrc": "sprites/bubu/official/run/002.png",
            "headAnchor": {
              "x": 208.0,
              "y": 235.2,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.042
            }
          },
          {
            "frame": 3,
            "src": "sprites/bubu/body/run/003.png",
            "officialSrc": "sprites/bubu/official/run/003.png",
            "headAnchor": {
              "x": 246.0,
              "y": 242.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.062
            }
          },
          {
            "frame": 4,
            "src": "sprites/bubu/body/run/004.png",
            "officialSrc": "sprites/bubu/official/run/004.png",
            "headAnchor": {
              "x": 209.0,
              "y": 245.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.042
            }
          },
          {
            "frame": 5,
            "src": "sprites/bubu/body/run/005.png",
            "officialSrc": "sprites/bubu/official/run/005.png",
            "headAnchor": {
              "x": 240.0,
              "y": 250.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.062
            }
          },
          {
            "frame": 6,
            "src": "sprites/bubu/body/run/006.png",
            "officialSrc": "sprites/bubu/official/run/006.png",
            "headAnchor": {
              "x": 244.0,
              "y": 242.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.062
            }
          },
          {
            "frame": 7,
            "src": "sprites/bubu/body/run/007.png",
            "officialSrc": "sprites/bubu/official/run/007.png",
            "headAnchor": {
              "x": 207.0,
              "y": 235.2,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.042
            }
          }
        ],
        "jump": [
          {
            "frame": 0,
            "src": "sprites/bubu/body/jump/000.png",
            "officialSrc": "sprites/bubu/official/jump/000.png",
            "headAnchor": {
              "x": 274.2,
              "y": 299.0,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 1,
            "src": "sprites/bubu/body/jump/001.png",
            "officialSrc": "sprites/bubu/official/jump/001.png",
            "headAnchor": {
              "x": 275.5,
              "y": 283.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 2,
            "src": "sprites/bubu/body/jump/002.png",
            "officialSrc": "sprites/bubu/official/jump/002.png",
            "headAnchor": {
              "x": 273.8,
              "y": 289.8,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 3,
            "src": "sprites/bubu/body/jump/003.png",
            "officialSrc": "sprites/bubu/official/jump/003.png",
            "headAnchor": {
              "x": 274.9,
              "y": 297.9,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 4,
            "src": "sprites/bubu/body/jump/004.png",
            "officialSrc": "sprites/bubu/official/jump/004.png",
            "headAnchor": {
              "x": 275.5,
              "y": 283.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 5,
            "src": "sprites/bubu/body/jump/005.png",
            "officialSrc": "sprites/bubu/official/jump/005.png",
            "headAnchor": {
              "x": 274.2,
              "y": 299.0,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 6,
            "src": "sprites/bubu/body/jump/006.png",
            "officialSrc": "sprites/bubu/official/jump/006.png",
            "headAnchor": {
              "x": 273.8,
              "y": 289.8,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 7,
            "src": "sprites/bubu/body/jump/007.png",
            "officialSrc": "sprites/bubu/official/jump/007.png",
            "headAnchor": {
              "x": 273.8,
              "y": 289.8,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          }
        ],
        "attack_punch": [
          {
            "frame": 0,
            "src": "sprites/bubu/body/attack_punch/000.png",
            "officialSrc": "sprites/bubu/official/attack_punch/000.png",
            "headAnchor": {
              "x": 239.4,
              "y": 283.8,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 1,
            "src": "sprites/bubu/body/attack_punch/001.png",
            "officialSrc": "sprites/bubu/official/attack_punch/001.png",
            "headAnchor": {
              "x": 239.4,
              "y": 283.8,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 2,
            "src": "sprites/bubu/body/attack_punch/002.png",
            "officialSrc": "sprites/bubu/official/attack_punch/002.png",
            "headAnchor": {
              "x": 229.3,
              "y": 266.4,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 3,
            "src": "sprites/bubu/body/attack_punch/003.png",
            "officialSrc": "sprites/bubu/official/attack_punch/003.png",
            "headAnchor": {
              "x": 253.0,
              "y": 264.4,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 4,
            "src": "sprites/bubu/body/attack_punch/004.png",
            "officialSrc": "sprites/bubu/official/attack_punch/004.png",
            "headAnchor": {
              "x": 240.8,
              "y": 263.9,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 5,
            "src": "sprites/bubu/body/attack_punch/005.png",
            "officialSrc": "sprites/bubu/official/attack_punch/005.png",
            "headAnchor": {
              "x": 241.8,
              "y": 260.9,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 6,
            "src": "sprites/bubu/body/attack_punch/006.png",
            "officialSrc": "sprites/bubu/official/attack_punch/006.png",
            "headAnchor": {
              "x": 241.8,
              "y": 260.9,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 7,
            "src": "sprites/bubu/body/attack_punch/007.png",
            "officialSrc": "sprites/bubu/official/attack_punch/007.png",
            "headAnchor": {
              "x": 240.8,
              "y": 263.9,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          }
        ],
        "attack_hammer": [
          {
            "frame": 0,
            "src": "sprites/bubu/body/attack_hammer/000.png",
            "officialSrc": "sprites/bubu/official/attack_hammer/000.png",
            "headAnchor": {
              "x": 292.5,
              "y": 222.5,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.948
            }
          },
          {
            "frame": 1,
            "src": "sprites/bubu/body/attack_hammer/001.png",
            "officialSrc": "sprites/bubu/official/attack_hammer/001.png",
            "headAnchor": {
              "x": 252.0,
              "y": 169.0,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 2,
            "src": "sprites/bubu/body/attack_hammer/002.png",
            "officialSrc": "sprites/bubu/official/attack_hammer/002.png",
            "headAnchor": {
              "x": 293.9,
              "y": 218.9,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.935
            }
          },
          {
            "frame": 3,
            "src": "sprites/bubu/body/attack_hammer/003.png",
            "officialSrc": "sprites/bubu/official/attack_hammer/003.png",
            "headAnchor": {
              "x": 296.0,
              "y": 222.0,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.942
            }
          },
          {
            "frame": 4,
            "src": "sprites/bubu/body/attack_hammer/004.png",
            "officialSrc": "sprites/bubu/official/attack_hammer/004.png",
            "headAnchor": {
              "x": 296.3,
              "y": 223.0,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.95
            }
          },
          {
            "frame": 5,
            "src": "sprites/bubu/body/attack_hammer/005.png",
            "officialSrc": "sprites/bubu/official/attack_hammer/005.png",
            "headAnchor": {
              "x": 292.1,
              "y": 221.4,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.942
            }
          }
        ],
        "skill_charge": [
          {
            "frame": 0,
            "src": "sprites/bubu/body/skill_charge/000.png",
            "officialSrc": "sprites/bubu/official/skill_charge/000.png",
            "headAnchor": {
              "x": 254.6,
              "y": 233.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.174
            }
          },
          {
            "frame": 1,
            "src": "sprites/bubu/body/skill_charge/001.png",
            "officialSrc": "sprites/bubu/official/skill_charge/001.png",
            "headAnchor": {
              "x": 256.5,
              "y": 238.5,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.025
            }
          },
          {
            "frame": 2,
            "src": "sprites/bubu/body/skill_charge/002.png",
            "officialSrc": "sprites/bubu/official/skill_charge/002.png",
            "headAnchor": {
              "x": 255.5,
              "y": 234.2,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.158
            }
          },
          {
            "frame": 3,
            "src": "sprites/bubu/body/skill_charge/003.png",
            "officialSrc": "sprites/bubu/official/skill_charge/003.png",
            "headAnchor": {
              "x": 254.7,
              "y": 234.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.169
            }
          },
          {
            "frame": 4,
            "src": "sprites/bubu/body/skill_charge/004.png",
            "officialSrc": "sprites/bubu/official/skill_charge/004.png",
            "headAnchor": {
              "x": 254.6,
              "y": 233.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.174
            }
          },
          {
            "frame": 5,
            "src": "sprites/bubu/body/skill_charge/005.png",
            "officialSrc": "sprites/bubu/official/skill_charge/005.png",
            "headAnchor": {
              "x": 254.6,
              "y": 230.5,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.14
            }
          },
          {
            "frame": 6,
            "src": "sprites/bubu/body/skill_charge/006.png",
            "officialSrc": "sprites/bubu/official/skill_charge/006.png",
            "headAnchor": {
              "x": 254.6,
              "y": 233.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.174
            }
          },
          {
            "frame": 7,
            "src": "sprites/bubu/body/skill_charge/007.png",
            "officialSrc": "sprites/bubu/official/skill_charge/007.png",
            "headAnchor": {
              "x": 254.6,
              "y": 233.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.174
            }
          }
        ],
        "skill_beam": [
          {
            "frame": 0,
            "src": "sprites/bubu/body/skill_beam/000.png",
            "officialSrc": "sprites/bubu/official/skill_beam/000.png",
            "headAnchor": {
              "x": 234.1,
              "y": 226.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 1,
            "src": "sprites/bubu/body/skill_beam/001.png",
            "officialSrc": "sprites/bubu/official/skill_beam/001.png",
            "headAnchor": {
              "x": 235.1,
              "y": 226.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 2,
            "src": "sprites/bubu/body/skill_beam/002.png",
            "officialSrc": "sprites/bubu/official/skill_beam/002.png",
            "headAnchor": {
              "x": 235.1,
              "y": 226.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 3,
            "src": "sprites/bubu/body/skill_beam/003.png",
            "officialSrc": "sprites/bubu/official/skill_beam/003.png",
            "headAnchor": {
              "x": 232.7,
              "y": 220.5,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 4,
            "src": "sprites/bubu/body/skill_beam/004.png",
            "officialSrc": "sprites/bubu/official/skill_beam/004.png",
            "headAnchor": {
              "x": 230.7,
              "y": 209.8,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 5,
            "src": "sprites/bubu/body/skill_beam/005.png",
            "officialSrc": "sprites/bubu/official/skill_beam/005.png",
            "headAnchor": {
              "x": 230.7,
              "y": 209.8,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 6,
            "src": "sprites/bubu/body/skill_beam/006.png",
            "officialSrc": "sprites/bubu/official/skill_beam/006.png",
            "headAnchor": {
              "x": 230.7,
              "y": 209.8,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 7,
            "src": "sprites/bubu/body/skill_beam/007.png",
            "officialSrc": "sprites/bubu/official/skill_beam/007.png",
            "headAnchor": {
              "x": 232.7,
              "y": 220.5,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          }
        ],
        "guard": [
          {
            "frame": 0,
            "src": "sprites/bubu/body/guard/000.png",
            "officialSrc": "sprites/bubu/official/guard/000.png",
            "headAnchor": {
              "x": 224.2,
              "y": 269.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 1,
            "src": "sprites/bubu/body/guard/001.png",
            "officialSrc": "sprites/bubu/official/guard/001.png",
            "headAnchor": {
              "x": 225.7,
              "y": 251.5,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 2,
            "src": "sprites/bubu/body/guard/002.png",
            "officialSrc": "sprites/bubu/official/guard/002.png",
            "headAnchor": {
              "x": 227.4,
              "y": 246.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 3,
            "src": "sprites/bubu/body/guard/003.png",
            "officialSrc": "sprites/bubu/official/guard/003.png",
            "headAnchor": {
              "x": 227.4,
              "y": 246.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 4,
            "src": "sprites/bubu/body/guard/004.png",
            "officialSrc": "sprites/bubu/official/guard/004.png",
            "headAnchor": {
              "x": 227.4,
              "y": 246.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 5,
            "src": "sprites/bubu/body/guard/005.png",
            "officialSrc": "sprites/bubu/official/guard/005.png",
            "headAnchor": {
              "x": 227.4,
              "y": 246.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 6,
            "src": "sprites/bubu/body/guard/006.png",
            "officialSrc": "sprites/bubu/official/guard/006.png",
            "headAnchor": {
              "x": 225.7,
              "y": 250.6,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 7,
            "src": "sprites/bubu/body/guard/007.png",
            "officialSrc": "sprites/bubu/official/guard/007.png",
            "headAnchor": {
              "x": 224.2,
              "y": 269.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          }
        ],
        "hurt": [
          {
            "frame": 0,
            "src": "sprites/bubu/body/hurt/000.png",
            "officialSrc": "sprites/bubu/official/hurt/000.png",
            "headAnchor": {
              "x": 316.0,
              "y": 262.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 1,
            "src": "sprites/bubu/body/hurt/001.png",
            "officialSrc": "sprites/bubu/official/hurt/001.png",
            "headAnchor": {
              "x": 283.3,
              "y": 255.2,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 2,
            "src": "sprites/bubu/body/hurt/002.png",
            "officialSrc": "sprites/bubu/official/hurt/002.png",
            "headAnchor": {
              "x": 245.0,
              "y": 281.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 3,
            "src": "sprites/bubu/body/hurt/003.png",
            "officialSrc": "sprites/bubu/official/hurt/003.png",
            "headAnchor": {
              "x": 275.2,
              "y": 266.9,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 4,
            "src": "sprites/bubu/body/hurt/004.png",
            "officialSrc": "sprites/bubu/official/hurt/004.png",
            "headAnchor": {
              "x": 316.0,
              "y": 262.7,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 5,
            "src": "sprites/bubu/body/hurt/005.png",
            "officialSrc": "sprites/bubu/official/hurt/005.png",
            "headAnchor": {
              "x": 283.3,
              "y": 255.2,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 6,
            "src": "sprites/bubu/body/hurt/006.png",
            "officialSrc": "sprites/bubu/official/hurt/006.png",
            "headAnchor": {
              "x": 246.0,
              "y": 262.8,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 7,
            "src": "sprites/bubu/body/hurt/007.png",
            "officialSrc": "sprites/bubu/official/hurt/007.png",
            "headAnchor": {
              "x": 279.0,
              "y": 264.0,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          }
        ],
        "knockdown": [
          {
            "frame": 0,
            "src": "sprites/bubu/body/knockdown/000.png",
            "officialSrc": "sprites/bubu/official/knockdown/000.png",
            "headAnchor": {
              "x": 232.2,
              "y": 183.4,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 1,
            "src": "sprites/bubu/body/knockdown/001.png",
            "officialSrc": "sprites/bubu/official/knockdown/001.png",
            "headAnchor": {
              "x": 232.2,
              "y": 183.4,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 2,
            "src": "sprites/bubu/body/knockdown/002.png",
            "officialSrc": "sprites/bubu/official/knockdown/002.png",
            "headAnchor": {
              "x": 255.6,
              "y": 195.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 3,
            "src": "sprites/bubu/body/knockdown/003.png",
            "officialSrc": "sprites/bubu/official/knockdown/003.png",
            "headAnchor": {
              "x": 239.4,
              "y": 186.8,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 4,
            "src": "sprites/bubu/body/knockdown/004.png",
            "officialSrc": "sprites/bubu/official/knockdown/004.png",
            "headAnchor": {
              "x": 256.3,
              "y": 209.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.088
            }
          },
          {
            "frame": 5,
            "src": "sprites/bubu/body/knockdown/005.png",
            "officialSrc": "sprites/bubu/official/knockdown/005.png",
            "headAnchor": {
              "x": 235.3,
              "y": 188.1,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 6,
            "src": "sprites/bubu/body/knockdown/006.png",
            "officialSrc": "sprites/bubu/official/knockdown/006.png",
            "headAnchor": {
              "x": 232.2,
              "y": 183.4,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 7,
            "src": "sprites/bubu/body/knockdown/007.png",
            "officialSrc": "sprites/bubu/official/knockdown/007.png",
            "headAnchor": {
              "x": 232.2,
              "y": 183.4,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          }
        ],
        "victory": [
          {
            "frame": 0,
            "src": "sprites/bubu/body/victory/000.png",
            "officialSrc": "sprites/bubu/official/victory/000.png",
            "headAnchor": {
              "x": 256.6,
              "y": 187.6,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 1,
            "src": "sprites/bubu/body/victory/001.png",
            "officialSrc": "sprites/bubu/official/victory/001.png",
            "headAnchor": {
              "x": 306.3,
              "y": 192.5,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 2,
            "src": "sprites/bubu/body/victory/002.png",
            "officialSrc": "sprites/bubu/official/victory/002.png",
            "headAnchor": {
              "x": 225.7,
              "y": 267.0,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.789
            }
          },
          {
            "frame": 3,
            "src": "sprites/bubu/body/victory/003.png",
            "officialSrc": "sprites/bubu/official/victory/003.png",
            "headAnchor": {
              "x": 225.0,
              "y": 263.4,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.802
            }
          },
          {
            "frame": 4,
            "src": "sprites/bubu/body/victory/004.png",
            "officialSrc": "sprites/bubu/official/victory/004.png",
            "headAnchor": {
              "x": 225.7,
              "y": 267.9,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.789
            }
          },
          {
            "frame": 5,
            "src": "sprites/bubu/body/victory/005.png",
            "officialSrc": "sprites/bubu/official/victory/005.png",
            "headAnchor": {
              "x": 290.3,
              "y": 189.6,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 6,
            "src": "sprites/bubu/body/victory/006.png",
            "officialSrc": "sprites/bubu/official/victory/006.png",
            "headAnchor": {
              "x": 253.9,
              "y": 245.3,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 7,
            "src": "sprites/bubu/body/victory/007.png",
            "officialSrc": "sprites/bubu/official/victory/007.png",
            "headAnchor": {
              "x": 289.2,
              "y": 190.8,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          }
        ],
        "team_push": [
          {
            "frame": 0,
            "src": "sprites/bubu/body/team_push/000.png",
            "officialSrc": "sprites/bubu/official/team_push/000.png",
            "headAnchor": {
              "x": 292.5,
              "y": 222.5,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.948
            }
          },
          {
            "frame": 1,
            "src": "sprites/bubu/body/team_push/001.png",
            "officialSrc": "sprites/bubu/official/team_push/001.png",
            "headAnchor": {
              "x": 252.0,
              "y": 169.0,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 1.22
            }
          },
          {
            "frame": 2,
            "src": "sprites/bubu/body/team_push/002.png",
            "officialSrc": "sprites/bubu/official/team_push/002.png",
            "headAnchor": {
              "x": 293.9,
              "y": 218.9,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.935
            }
          },
          {
            "frame": 3,
            "src": "sprites/bubu/body/team_push/003.png",
            "officialSrc": "sprites/bubu/official/team_push/003.png",
            "headAnchor": {
              "x": 296.0,
              "y": 222.0,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.942
            }
          },
          {
            "frame": 4,
            "src": "sprites/bubu/body/team_push/004.png",
            "officialSrc": "sprites/bubu/official/team_push/004.png",
            "headAnchor": {
              "x": 296.3,
              "y": 223.0,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.95
            }
          },
          {
            "frame": 5,
            "src": "sprites/bubu/body/team_push/005.png",
            "officialSrc": "sprites/bubu/official/team_push/005.png",
            "headAnchor": {
              "x": 292.1,
              "y": 221.4,
              "rotDeg": 0.0,
              "footY": 468.0,
              "scale": 0.942
            }
          }
        ]
      }
    }
  },
  "bearExpressions": {
    "happy": [
      "sprites/expressions/happy/000.png",
      "sprites/expressions/happy/001.png",
      "sprites/expressions/happy/002.png",
      "sprites/expressions/happy/003.png",
      "sprites/expressions/happy/004.png",
      "sprites/expressions/happy/005.png"
    ],
    "angry": [
      "sprites/expressions/angry/000.png",
      "sprites/expressions/angry/001.png",
      "sprites/expressions/angry/002.png",
      "sprites/expressions/angry/003.png",
      "sprites/expressions/angry/004.png",
      "sprites/expressions/angry/005.png"
    ],
    "battle_serious": [
      "sprites/expressions/battle_serious/000.png",
      "sprites/expressions/battle_serious/001.png",
      "sprites/expressions/battle_serious/002.png",
      "sprites/expressions/battle_serious/003.png",
      "sprites/expressions/battle_serious/004.png",
      "sprites/expressions/battle_serious/005.png"
    ],
    "shocked": [
      "sprites/expressions/shocked/000.png",
      "sprites/expressions/shocked/001.png",
      "sprites/expressions/shocked/002.png",
      "sprites/expressions/shocked/003.png",
      "sprites/expressions/shocked/004.png",
      "sprites/expressions/shocked/005.png"
    ],
    "crying": [
      "sprites/expressions/crying/000.png",
      "sprites/expressions/crying/001.png",
      "sprites/expressions/crying/002.png",
      "sprites/expressions/crying/003.png",
      "sprites/expressions/crying/004.png",
      "sprites/expressions/crying/005.png"
    ],
    "drool": [
      "sprites/expressions/drool/000.png",
      "sprites/expressions/drool/001.png",
      "sprites/expressions/drool/002.png",
      "sprites/expressions/drool/003.png"
    ],
    "dizzy": [
      "sprites/expressions/dizzy/000.png",
      "sprites/expressions/dizzy/001.png",
      "sprites/expressions/dizzy/002.png",
      "sprites/expressions/dizzy/003.png",
      "sprites/expressions/dizzy/004.png",
      "sprites/expressions/dizzy/005.png"
    ],
    "smug": [
      "sprites/expressions/smug/000.png",
      "sprites/expressions/smug/001.png",
      "sprites/expressions/smug/002.png",
      "sprites/expressions/smug/003.png",
      "sprites/expressions/smug/004.png",
      "sprites/expressions/smug/005.png"
    ],
    "charging_roar": [
      "sprites/expressions/charging_roar/000.png",
      "sprites/expressions/charging_roar/001.png",
      "sprites/expressions/charging_roar/002.png",
      "sprites/expressions/charging_roar/003.png",
      "sprites/expressions/charging_roar/004.png",
      "sprites/expressions/charging_roar/005.png"
    ],
    "wink_love": [
      "sprites/expressions/wink_love/000.png",
      "sprites/expressions/wink_love/001.png",
      "sprites/expressions/wink_love/002.png",
      "sprites/expressions/wink_love/003.png",
      "sprites/expressions/wink_love/004.png",
      "sprites/expressions/wink_love/005.png"
    ]
  },
  "deepseekWhale": {
    "runningWhalePng": "deepseek-harness/running-whale.png",
    "appIconSvg": "deepseek-harness/app-icon.svg"
  }
} as const;

export const BEAR_ACTIONS: BearAction[] = [
	'idle',
	'run',
	'jump',
	'attack_punch',
	'attack_hammer',
	'skill_charge',
	'skill_beam',
	'guard',
	'hurt',
	'knockdown',
	'victory',
	'team_push',
];

export const BEAR_EXPRESSIONS: BearExpression[] = [
	'happy',
	'angry',
	'battle_serious',
	'shocked',
	'crying',
	'drool',
	'dizzy',
	'smug',
	'charging_roar',
	'wink_love',
];

export function getBearFrame(
	character: 'yier' | 'bubu',
	action: string,
	expression: string,
	tick: number,
): { body: SpriteFrameMeta; exprSrc: string } {
	const charData = SPRITE_MANIFEST.characters[character];
	const actList =
		(charData.bodyActions as Record<string, readonly SpriteFrameMeta[]>)[action] ??
		charData.bodyActions.idle;
	const exprList =
		(SPRITE_MANIFEST.bearExpressions as Record<string, readonly string[]>)[expression] ??
		SPRITE_MANIFEST.bearExpressions.happy;
	const body = actList[Math.abs(Math.floor(tick)) % actList.length];
	const exprSrc = exprList[Math.abs(Math.floor(tick * 0.75)) % exprList.length];
	return { body, exprSrc };
}
