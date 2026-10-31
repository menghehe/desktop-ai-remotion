#!/usr/bin/env python3
"""Universal 3x2 AI Sprite Sheet Slicer & Foot-Anchor Normalizer.

Usage:
  1. Slice an AI-generated 3x2 sprite sheet for any character (yier, bubu, whale):
     python tools/prepare_jump_sprites.py --actor bubu --source bubu-sheet.jpg --pack jump

  2. Default behavior (no flags): slices `sprite-source.jpg` into `public/sprites/yier/jump/000..005.png`
     with normalized 512x512 canvas and foot baseline aligned to (256, 460) (`FOOT_ANCHOR = 455/512`).
"""

from __future__ import annotations

import argparse
from collections import deque
from pathlib import Path
from PIL import Image, ImageDraw
import numpy as np

ROOT = Path(__file__).resolve().parents[1]

# Standard 3 columns x 2 rows grid layout produced by the AI prompt templates:
# Row 1: step (0,0), tuck (1,0), stand (2,0)
# Row 2: lift (0,1), air (1,1), crouch (2,1)
CELLS = [
    ('step', 0, 0), ('tuck', 1, 0), ('stand', 2, 0),
    ('lift', 0, 1), ('air', 1, 1), ('crouch', 2, 1),
]
ORDER = ['stand', 'crouch', 'lift', 'air', 'step', 'stand']


def slice_and_normalize_sheet(
    source_path: Path,
    actor: str = 'yier',
    pack: str = 'jump',
    target_h: int = 320,
    canvas_size: int = 512,
    foot_y: int = 460,
) -> None:
    out_dir = ROOT / 'public' / 'sprites' / actor / pack
    work_dir = ROOT / 'sprite-work' / f'{actor}_{pack}'
    out_dir.mkdir(parents=True, exist_ok=True)
    work_dir.mkdir(parents=True, exist_ok=True)

    im = np.array(Image.open(source_path).convert('RGB')).astype(np.int16)
    h, w = im.shape[:2]
    cell_w, cell_h = w / 3, h / 2
    extracted: dict[str, Image.Image] = {}

    for name, col, row in CELLS:
        x0, x1 = round(col * cell_w), round((col + 1) * cell_w)
        y0, y1 = round(row * cell_h), round((row + 1) * cell_h)
        rgb = im[y0:y1, x0:x1].copy()

        # Remove horizontal ground guide lines if present
        dark = np.max(rgb, axis=2) < 170
        counts = dark.sum(axis=1)
        candidates = np.where(counts > int(rgb.shape[1] * 0.45))[0]
        for yy in candidates:
            rgb[max(0, yy - 3):min(rgb.shape[0], yy + 4)] = 255

        # Flood-fill exterior near-white background connected to cell borders
        near_white = np.min(rgb, axis=2) > 220
        exterior = np.zeros(near_white.shape, dtype=bool)
        q: deque[tuple[int, int]] = deque()
        hh, ww = near_white.shape
        for xx in range(ww):
            for yy in (0, hh - 1):
                if near_white[yy, xx] and not exterior[yy, xx]:
                    exterior[yy, xx] = True
                    q.append((yy, xx))
        for yy in range(hh):
            for xx in (0, ww - 1):
                if near_white[yy, xx] and not exterior[yy, xx]:
                    exterior[yy, xx] = True
                    q.append((yy, xx))
        while q:
            yy, xx = q.popleft()
            for ny, nx in ((yy - 1, xx), (yy + 1, xx), (yy, xx - 1), (yy, xx + 1)):
                if 0 <= ny < hh and 0 <= nx < ww and near_white[ny, nx] and not exterior[ny, nx]:
                    exterior[ny, nx] = True
                    q.append((ny, nx))

        # Soft anti-aliased alpha fringe; enclosed white belly/fur stays 100% opaque
        lum = rgb.mean(axis=2)
        edge_alpha = np.clip((252 - lum) / 28 * 255, 0, 255).astype(np.uint8)
        alpha = np.where(exterior, edge_alpha, 255).astype(np.uint8)
        alpha[exterior & (np.min(rgb, axis=2) > 247)] = 0
        rgba = np.dstack([np.clip(rgb, 0, 255).astype(np.uint8), alpha])

        ys, xs = np.where(alpha > 20)
        pad = 5
        bx0, bx1 = max(0, int(xs.min()) - pad), min(ww, int(xs.max()) + pad + 1)
        by0, by1 = max(0, int(ys.min()) - pad), min(hh, int(ys.max()) + pad + 1)
        sprite = Image.fromarray(rgba, 'RGBA').crop((bx0, by0, bx1, by1))
        extracted[name] = sprite
        sprite.save(work_dir / f'{name}.png')

    for i, name in enumerate(ORDER):
        sprite = extracted[name]
        scale = target_h / sprite.height
        resized = sprite.resize(
            (round(sprite.width * scale), target_h),
            Image.Resampling.LANCZOS,
        )
        canvas = Image.new('RGBA', (canvas_size, canvas_size), (255, 255, 255, 0))
        x = (canvas_size // 2) - resized.width // 2
        y = foot_y - resized.height
        canvas.alpha_composite(resized, (x, y))
        canvas.save(out_dir / f'{i:03d}.png')

    thumb = 240
    sheet = Image.new('RGB', (thumb * len(ORDER), thumb + 34), '#dce6ef')
    d = ImageDraw.Draw(sheet)
    for i, name in enumerate(ORDER):
        sprite = Image.open(out_dir / f'{i:03d}.png')
        sprite.thumbnail((220, 220), Image.Resampling.LANCZOS)
        x = i * thumb + (thumb - sprite.width) // 2
        sheet.paste(sprite, (x, 10), sprite)
        d.text((i * thumb + 10, thumb + 8), f'{i:03d} {name}', fill='#14243b')
    sheet.save(work_dir / 'contact-sheet.png')
    print(f'Created {len(ORDER)} normalized sprites in {out_dir}')


def main() -> None:
    parser = argparse.ArgumentParser(description='Slice 3x2 AI sprite sheet into normalized 512x512 frames.')
    parser.add_argument('--actor', default='yier', help='Character folder name (e.g., yier, bubu, whale)')
    parser.add_argument('--pack', default='jump', help='Action pack folder name (default: jump)')
    parser.add_argument('--source', default=str(ROOT / 'sprite-source.jpg'), help='Path to 3x2 sprite sheet image')
    args = parser.parse_args()

    source_path = Path(args.source)
    if not source_path.exists():
        raise FileNotFoundError(
            f'Sprite sheet not found: {source_path}\n'
            'Pass --source path/to/your_ai_sheet.png after generating with the provided prompts.'
        )
    slice_and_normalize_sheet(source_path, actor=args.actor, pack=args.pack)


if __name__ == '__main__':
    main()
