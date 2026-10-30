from collections import deque
from pathlib import Path
from PIL import Image, ImageDraw
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'sprite-source.jpg'
OUT = ROOT / 'public' / 'sprites' / 'yier' / 'jump'
WORK = ROOT / 'sprite-work'
OUT.mkdir(parents=True, exist_ok=True)
WORK.mkdir(parents=True, exist_ok=True)

# The second supplied sheet: three columns, two rows.
CELLS = [
    ('step', 0, 0), ('tuck', 1, 0), ('stand', 2, 0),
    ('lift', 0, 1), ('air', 1, 1), ('crouch', 2, 1),
]
ORDER = ['stand', 'crouch', 'lift', 'air', 'step', 'stand']

im = np.array(Image.open(SOURCE).convert('RGB')).astype(np.int16)
h, w = im.shape[:2]
cell_w, cell_h = w / 3, h / 2
extracted = {}

for name, col, row in CELLS:
    x0, x1 = round(col * cell_w), round((col + 1) * cell_w)
    y0, y1 = round(row * cell_h), round((row + 1) * cell_h)
    rgb = im[y0:y1, x0:x1].copy()
    # Remove the long ground guide without touching the body above it.
    dark = np.max(rgb, axis=2) < 170
    counts = dark.sum(axis=1)
    candidates = np.where(counts > 170)[0]
    for yy in candidates:
        rgb[max(0, yy - 3):min(rgb.shape[0], yy + 4)] = 255

    # Background is the near-white area connected to the crop boundary.
    near_white = np.min(rgb, axis=2) > 220
    exterior = np.zeros(near_white.shape, dtype=bool)
    q = deque()
    hh, ww = near_white.shape
    for xx in range(ww):
        for yy in (0, hh - 1):
            if near_white[yy, xx] and not exterior[yy, xx]:
                exterior[yy, xx] = True; q.append((yy, xx))
    for yy in range(hh):
        for xx in (0, ww - 1):
            if near_white[yy, xx] and not exterior[yy, xx]:
                exterior[yy, xx] = True; q.append((yy, xx))
    while q:
        yy, xx = q.popleft()
        for ny, nx in ((yy-1,xx),(yy+1,xx),(yy,xx-1),(yy,xx+1)):
            if 0 <= ny < hh and 0 <= nx < ww and near_white[ny, nx] and not exterior[ny, nx]:
                exterior[ny, nx] = True; q.append((ny, nx))

    # Soft alpha fringe from luminance; enclosed white body remains opaque.
    lum = rgb.mean(axis=2)
    edge_alpha = np.clip((252 - lum) / 28 * 255, 0, 255).astype(np.uint8)
    alpha = np.where(exterior, edge_alpha, 255).astype(np.uint8)
    alpha[exterior & (np.min(rgb, axis=2) > 247)] = 0
    rgba = np.dstack([np.clip(rgb, 0, 255).astype(np.uint8), alpha])
    ys, xs = np.where(alpha > 20)
    pad = 5
    bx0, bx1 = max(0, xs.min()-pad), min(ww, xs.max()+pad+1)
    by0, by1 = max(0, ys.min()-pad), min(hh, ys.max()+pad+1)
    sprite = Image.fromarray(rgba, 'RGBA').crop((bx0, by0, bx1, by1))
    extracted[name] = sprite
    sprite.save(WORK / f'{name}.png')

# Normalize the body to the same height, align normal standing feet to (256,460).
TARGET_H = 320
CANVAS = 512
for i, name in enumerate(ORDER):
    sprite = extracted[name]
    scale = TARGET_H / sprite.height
    resized = sprite.resize((round(sprite.width*scale), TARGET_H), Image.Resampling.LANCZOS)
    canvas = Image.new('RGBA', (CANVAS, CANVAS), (255,255,255,0))
    x = 256 - resized.width // 2
    # Airborne poses share the same reference origin; code supplies the actual arc.
    y = 460 - resized.height
    canvas.alpha_composite(resized, (x,y))
    canvas.save(OUT / f'{i:03d}.png')

# Inspection sheet on a checkerboard, retained as a work artifact only.
thumb = 240
sheet = Image.new('RGB', (thumb*6, thumb+34), '#dce6ef')
d = ImageDraw.Draw(sheet)
for i, name in enumerate(ORDER):
    sprite = Image.open(OUT / f'{i:03d}.png')
    sprite.thumbnail((220,220), Image.Resampling.LANCZOS)
    x = i*thumb + (thumb-sprite.width)//2
    sheet.paste(sprite, (x, 10), sprite)
    d.text((i*thumb+10, thumb+8), f'{i:03d} {name}', fill='#14243b')
sheet.save(WORK / 'jump-contact-sheet.png')
print(f'Created {len(ORDER)} sprites in {OUT}')
