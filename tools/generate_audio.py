#!/usr/bin/env python3
"""Generate the original 60-second desktop-story music and sound mix.

Only numpy and Python's standard library are used. No samples or external
copyrighted material are read. The output is 48 kHz, 16-bit PCM stereo.
"""

from __future__ import annotations

import math
import wave
from pathlib import Path

import numpy as np


SR = 48_000
DURATION = 60.0
N = int(SR * DURATION)
OUT = Path(__file__).resolve().parents[1] / "public" / "audio" / "desktop-story.wav"
RNG = np.random.default_rng(20261030)
MIX = np.zeros((N, 2), dtype=np.float64)


def midi(note: float) -> float:
    return 440.0 * 2.0 ** ((note - 69.0) / 12.0)


def pan_gains(pan: float) -> tuple[float, float]:
    angle = (max(-1.0, min(1.0, pan)) + 1.0) * math.pi / 4.0
    return math.cos(angle), math.sin(angle)


def place(signal: np.ndarray, start: float, gain: float = 1.0, pan: float = 0.0,
          bus: np.ndarray | None = None) -> None:
    target = MIX if bus is None else bus
    first = max(0, int(round(start * SR)))
    if first >= N:
        return
    signal = signal[: N - first]
    left, right = pan_gains(pan)
    target[first:first + len(signal), 0] += signal * gain * left
    target[first:first + len(signal), 1] += signal * gain * right


def timeline(duration: float) -> np.ndarray:
    return np.arange(int(round(duration * SR)), dtype=np.float64) / SR


def smooth_envelope(length: int, attack: float = 0.01, release: float = 0.08) -> np.ndarray:
    env = np.ones(length, dtype=np.float64)
    a = min(length, max(1, int(attack * SR)))
    r = min(length, max(1, int(release * SR)))
    env[:a] = np.sin(np.linspace(0, math.pi / 2, a)) ** 2
    env[-r:] *= np.cos(np.linspace(0, math.pi / 2, r)) ** 2
    return env


def pluck(note: float, duration: float = 0.32, bright: float = 1.0) -> np.ndarray:
    t = timeline(duration)
    f = midi(note)
    phase = 2 * np.pi * f * t
    tone = (np.sin(phase) + 0.30 * bright * np.sin(2 * phase)
            + 0.12 * bright * np.sin(3 * phase)) / 1.42
    env = (1 - np.exp(-t / 0.004)) * np.exp(-t / (duration * 0.30))
    return tone * env * smooth_envelope(len(t), 0.003, 0.035)


def bell(note: float, duration: float = 0.8) -> np.ndarray:
    t = timeline(duration)
    f = midi(note)
    tone = np.zeros_like(t)
    for ratio, amp, decay in ((1, 1.0, 0.30), (2.01, 0.24, 0.19),
                              (3.98, 0.08, 0.12), (6.02, 0.035, 0.08)):
        tone += amp * np.sin(2 * np.pi * f * ratio * t) * np.exp(-t / decay)
    return tone * smooth_envelope(len(t), 0.004, 0.10)


def soft_pad(notes: list[float], duration: float) -> np.ndarray:
    t = timeline(duration)
    out = np.zeros_like(t)
    for note in notes:
        f = midi(note)
        vibrato = 0.002 * np.sin(2 * np.pi * 4.5 * t)
        phase = 2 * np.pi * f * t + vibrato
        out += np.sin(phase) + 0.12 * np.sin(2 * phase)
    out /= max(1, len(notes)) * 1.12
    attack = min(0.25, duration * 0.2)
    release = min(0.5, duration * 0.3)
    return out * smooth_envelope(len(t), attack, release)


def bass(note: float, duration: float = 0.36) -> np.ndarray:
    t = timeline(duration)
    f = midi(note)
    tone = np.sin(2 * np.pi * f * t) + 0.18 * np.sin(4 * np.pi * f * t)
    env = (1 - np.exp(-t / 0.008)) * np.exp(-t / max(0.12, duration * 0.8))
    return tone * env * smooth_envelope(len(t), 0.005, 0.06) / 1.18


def kick(duration: float = 0.24) -> np.ndarray:
    t = timeline(duration)
    phase = 2 * np.pi * (48 * t + 75 * 0.018 * (1 - np.exp(-t / 0.018)))
    env = (1 - np.exp(-t / 0.002)) * np.exp(-t / 0.060)
    return np.sin(phase) * env * smooth_envelope(len(t), 0.002, 0.04)


def hat(duration: float = 0.07, seed: int | None = None) -> np.ndarray:
    t = timeline(duration)
    rng = RNG if seed is None else np.random.default_rng(seed)
    noise = rng.standard_normal(len(t))
    # A differentiated, shortened noise source makes a gentle synthetic hat.
    noise = np.concatenate(([0.0], np.diff(noise)))
    noise /= max(1e-9, np.max(np.abs(noise)))
    metallic = 0.16 * np.sin(2 * np.pi * 6200 * t)
    return (noise + metallic) * np.exp(-t / 0.018) * smooth_envelope(len(t), 0.001, 0.015)


def clap(duration: float = 0.16) -> np.ndarray:
    t = timeline(duration)
    noise = RNG.standard_normal(len(t))
    noise = np.convolve(noise, np.ones(5) / 5, mode="same")
    bursts = (np.exp(-t / 0.020) + 0.55 * np.exp(-np.maximum(0, t - 0.026) / 0.016)
              * (t >= 0.026))
    return noise * bursts * smooth_envelope(len(t), 0.001, 0.035)


def click(duration: float = 0.045, pitch: float = 900.0) -> np.ndarray:
    t = timeline(duration)
    noise = RNG.standard_normal(len(t)) * 0.12
    body = np.sin(2 * np.pi * pitch * t) + 0.25 * np.sin(2 * np.pi * pitch * 1.7 * t)
    return (body + noise) * np.exp(-t / 0.009) * smooth_envelope(len(t), 0.001, 0.012)


def boing(note: float = 67, duration: float = 0.34) -> np.ndarray:
    t = timeline(duration)
    f = midi(note)
    instantaneous_f = f * (1.35 - 0.35 * (1 - np.exp(-t / 0.07)))
    phase = 2 * np.pi * np.cumsum(instantaneous_f) / SR
    tone = np.sin(phase) + 0.18 * np.sin(2 * phase)
    return tone * np.exp(-t / 0.12) * smooth_envelope(len(t), 0.003, 0.04) / 1.18


def sweep(start_note: float, end_note: float, duration: float = 0.7) -> np.ndarray:
    t = timeline(duration)
    f0, f1 = midi(start_note), midi(end_note)
    freq = f0 * (f1 / f0) ** (t / duration)
    phase = 2 * np.pi * np.cumsum(freq) / SR
    tone = np.sin(phase) + 0.20 * np.sin(2 * phase)
    return tone * np.exp(-t / (duration * 0.75)) * smooth_envelope(len(t), 0.008, 0.10) / 1.2


def add_echoes(signal: np.ndarray, start: float, gain: float, pan: float,
               delays: tuple[float, ...] = (0.12, 0.24), decay: float = 0.22) -> None:
    place(signal, start, gain, pan)
    for index, delay in enumerate(delays, 1):
        place(signal, start + delay, gain * decay ** index, -pan * 0.65)


# --- 0-8 s: notification, curious prompt, and increasingly busy keyboard. ---
place(soft_pad([48, 55, 60, 64], 8.0), 0.0, 0.16)
add_echoes(bell(76, 1.0), 0.18, 0.23, -0.30)
add_echoes(bell(83, 0.9), 0.52, 0.15, 0.35)
for start, note in ((1.35, 72), (1.85, 74), (2.35, 76), (2.85, 79)):
    add_echoes(pluck(note, 0.40), start, 0.20, -0.15)
for i, start in enumerate(np.arange(2.75, 7.75, 0.19)):
    if i in {5, 12, 13, 21}:
        continue
    place(click(pitch=660 + (i % 5) * 75), float(start), 0.075,
          -0.55 + 1.1 * ((i * 7) % 11) / 10)
for start, note in ((3.5, 67), (4.5, 69), (5.5, 71), (6.5, 72), (7.25, 74)):
    place(pluck(note, 0.25), start, 0.16, 0.20)
place(click(0.06, 1250), 7.72, 0.15, 0.10)  # send
add_echoes(bell(88, 0.45), 7.77, 0.14, 0.30)

# --- 8-35 s: cute 120 BPM groove; a new melody answer every two bars. ---
CHORDS = ([48, 55, 60, 64], [45, 52, 57, 60], [41, 48, 53, 57], [43, 50, 55, 59])
ROOTS = (36, 33, 29, 31)
MELODY = (72, 76, 79, 76, 74, 72, 69, 72,
          69, 72, 76, 79, 77, 76, 74, 71)
for step in range(54):
    start = 8.0 + step * 0.5
    chord_index = (step // 8) % 4
    beat = step % 8
    if beat == 0:
        place(soft_pad(CHORDS[chord_index], 3.9), start, 0.10)
    place(bass(ROOTS[chord_index] + (12 if beat in {3, 6} else 0)), start,
          0.25 if beat in {0, 4} else 0.16, -0.04)
    if beat in {0, 4}:
        place(kick(), start, 0.34)
    if beat in {2, 6}:
        place(clap(), start, 0.14, 0.08)
    for offset, accent in ((0.0, 0.055), (0.25, 0.032)):
        place(hat(), start + offset, accent, 0.35 if step % 2 else -0.30)
    # Staccato chord hops on the off-beats.
    if beat % 2 == 1:
        chord = CHORDS[chord_index]
        for j, note in enumerate(chord[1:]):
            place(pluck(note + 12, 0.22), start + 0.25, 0.065, -0.35 + j * 0.32)
    note = MELODY[step % len(MELODY)]
    if step % 8 not in {3, 7}:
        add_echoes(pluck(note, 0.34), start + 0.03, 0.20,
                   0.22 * math.sin(step * 0.8), delays=(0.25,), decay=0.14)
for start, note, pan in ((12.3, 79, -0.6), (18.8, 81, 0.55),
                         (25.1, 84, -0.4), (31.7, 79, 0.5)):
    add_echoes(boing(note), start, 0.14, pan)
place(click(), 16.15, 0.12, -0.6)
place(click(pitch=1200), 16.23, 0.10, 0.6)
add_echoes(sweep(79, 67, 0.65), 27.8, 0.13, 0.0)  # playful error/token dip
add_echoes(bell(84, 0.7), 33.9, 0.14, 0.25)

# --- 35-48 s: beat spacing accelerates from 120 to about 170 BPM. ---
ramp_beats: list[float] = []
t = 35.0
interval = 0.50
while t < 48.0:
    ramp_beats.append(t)
    interval = max(0.352, interval * 0.978)
    t += interval
for step, start in enumerate(ramp_beats):
    local = start - 35.0
    chord_index = int(local // 3.25) % 4
    beat = step % 8
    if beat == 0:
        place(soft_pad(CHORDS[chord_index], 2.8), start, 0.085)
    place(bass(ROOTS[chord_index], 0.28), start, 0.20)
    if beat % 2 == 0:
        place(kick(), start, 0.28)
    if beat in {2, 6}:
        place(clap(), start, 0.12)
    place(hat(), start, 0.045, (-1) ** step * 0.4)
    place(hat(0.045), start + (0.16 if step < len(ramp_beats) - 10 else 0.11),
          0.026, (-1) ** (step + 1) * 0.35)
    run = (0, 4, 7, 12, 7, 4, 2, 7)
    note = CHORDS[chord_index][0] + 24 + run[step % 8]
    add_echoes(pluck(note, 0.25, 0.8), start, 0.17,
               0.28 * math.sin(step), delays=(0.18,), decay=0.12)
for start, note in ((38.0, 84), (41.3, 86), (44.4, 88), (47.1, 91)):
    add_echoes(bell(note, 0.45), start, 0.11, 0.45)

# --- 48-54 s: dense but rounded, midrange popup/notification bombardment. ---
place(soft_pad([48, 55, 60, 64], 6.0), 48.0, 0.12)
popup_notes = (72, 76, 79, 84, 81, 77, 74, 79)
popup_times = np.arange(48.05, 53.72, 0.235)
for i, start in enumerate(popup_times):
    note = popup_notes[i % len(popup_notes)] + (12 if i % 7 == 6 else 0)
    pan = -0.75 + 1.5 * ((i * 5) % 13) / 12
    # Bell/pluck blend is intentionally soft; no shrill square-wave alarms.
    add_echoes(pluck(note, 0.24, 0.55), float(start), 0.14, pan,
               delays=(0.105,), decay=0.10)
    if i % 2 == 0:
        place(click(0.035, 520 + (i % 4) * 95), float(start) + 0.055,
              0.048, -pan)
    if i % 4 == 0:
        place(kick(0.20), float(start), 0.20)
    place(hat(0.04), float(start) + 0.12, 0.022, pan * 0.5)
for start in (49.4, 51.15, 52.65):
    add_echoes(boing(72, 0.26), start, 0.12, -0.25)
add_echoes(sweep(86, 48, 0.85), 53.05, 0.19, 0.0)  # token exhausted fall
place(click(0.07, 330), 53.82, 0.12, 0.0)

# --- 54-60 s: warm cadence, celebration, and a clean final resolve. ---
celebration = ((54.0, [48, 55, 60, 64], 72),
               (55.5, [41, 48, 53, 57], 77),
               (57.0, [43, 50, 55, 59], 79),
               (58.0, [48, 55, 60, 64, 67], 84))
for start, chord, melody_note in celebration:
    duration = 2.0 if start < 58 else 2.0
    place(soft_pad(chord, duration), start, 0.22 if start == 58 else 0.18)
    place(bass(chord[0] - 12, 0.7), start, 0.22)
    place(kick(), start, 0.22)
    add_echoes(bell(melody_note, 1.4), start + 0.04, 0.20, -0.15)
for i, (start, note) in enumerate(((54.28, 76), (54.56, 79), (54.84, 84),
                                  (55.78, 81), (56.06, 79), (56.34, 77),
                                  (57.25, 83), (57.50, 86),
                                  (58.18, 79), (58.42, 83), (58.66, 88))):
    add_echoes(bell(note, 0.75), start, 0.10, -0.55 + (i % 5) * 0.27,
               delays=(0.20, 0.40), decay=0.13)
for start in (54.5, 55.0, 55.75, 56.25, 57.25, 57.75, 58.0):
    place(clap(), start, 0.095, 0.20)
# A tiny rising send/sparkle gesture leads into the final chord.
for i, note in enumerate((72, 76, 79, 84)):
    add_echoes(pluck(note, 0.30), 53.72 + i * 0.075, 0.11, -0.4 + i * 0.25)

# Gentle, synthetic room glue made only from delayed copies of the full mix.
dry = MIX.copy()
for delay, gain, swap in ((0.071, 0.075, True), (0.137, 0.050, False),
                          (0.223, 0.030, True)):
    d = int(delay * SR)
    if swap:
        MIX[d:, 0] += dry[:-d, 1] * gain
        MIX[d:, 1] += dry[:-d, 0] * gain
    else:
        MIX[d:] += dry[:-d] * gain

# Remove DC, apply global safety fades, and normalize with true sample headroom.
MIX -= np.mean(MIX, axis=0, keepdims=True)
fade_in = int(0.025 * SR)
fade_out = int(0.45 * SR)
MIX[:fade_in] *= np.linspace(0, 1, fade_in)[:, None]
MIX[-fade_out:] *= np.cos(np.linspace(0, math.pi / 2, fade_out))[:, None] ** 2
# A gentle saturator only rounds accidental transient sums; normalization below
# guarantees the delivered integer PCM never reaches full scale or clips.
MIX = np.tanh(MIX * 1.15) / np.tanh(1.15)
peak = float(np.max(np.abs(MIX)))
if peak > 0:
    MIX *= 0.88 / peak
pcm = np.round(MIX * 32767.0).astype("<i2")

OUT.parent.mkdir(parents=True, exist_ok=True)
with wave.open(str(OUT), "wb") as wav:
    wav.setnchannels(2)
    wav.setsampwidth(2)
    wav.setframerate(SR)
    wav.writeframes(pcm.tobytes())

print(f"Wrote: {OUT}")
print(f"Duration: {len(pcm) / SR:.3f} s | {SR} Hz | 16-bit PCM | stereo")
print(f"Peak: {20 * math.log10(np.max(np.abs(pcm.astype(np.float64))) / 32768):.2f} dBFS")
print(f"RMS: {20 * math.log10(np.sqrt(np.mean((pcm.astype(np.float64) / 32768) ** 2))):.2f} dBFS")
