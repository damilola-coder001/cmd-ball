#!/bin/bash
# Regenerate 4 chapter images to keep the ball as consistent protagonist
set -e
OUT=/home/z/my-project/download/img
STYLE="cinematic chiaroscuro lighting, single warm amber light source from upper left, deep matte black background, fine grain texture, subtle film noise, warm gold bronze tones only, no other colors, minimalist composition, vast negative space, mythic atmosphere, fine art photography, 8k, no text, no watermark, no logo"

echo "[2/9] II — The Omen: ball sitting in the worn groove it created..."
z-ai image \
  -p "A single bronze-gold sphere resting at the bottom of a perfectly circular worn groove pressed into dark stone, the sphere fits exactly within the channel it has worn over time, faint gold dust settled around it, the groove is its trace, evidence of countless revolutions, top-down view, archaeological atmosphere, ${STYLE}" \
  -o "$OUT/c2-omen.jpg" \
  -s 1344x768

echo "[5/9] V — The Circle: single ball leaving a circular trace (long exposure)..."
z-ai image \
  -p "A single bronze-gold sphere captured in motion tracing a perfect circle on a dark matte surface, long-exposure ghosting effect shows the ball repeated faintly around the ring path like a light painting, a single sharp ball at the leading edge, faint glowing circle trail behind it, top-down view, ${STYLE}" \
  -o "$OUT/c5-circle.jpg" \
  -s 1024x1024

echo "[6/9] VI — The Law: ball half-embedded in carved stone relief..."
z-ai image \
  -p "A single bronze-gold sphere half-embedded in a massive dark stone block, the stone is carved around the sphere like a relief mold, the sphere is locked in place eternal and codified, weathered ancient stone surface, warm amber light from upper left, the moment of becoming law, fine art photography, ${STYLE}" \
  -o "$OUT/c6-law.jpg" \
  -s 1344x768

echo "[8/9] VIII — The Ritual: single ball being received in cupped hands..."
z-ai image \
  -p "A single bronze-gold sphere being received into a pair of cupped hands emerging from darkness, the hands are minimal and abstract barely visible in shadow, the ball glows softly with warm amber light, the moment of transfer, ritual of receiving, dark void background, intimate scale, ${STYLE}" \
  -o "$OUT/c8-ritual.jpg" \
  -s 1344x768

echo "=== Regenerated 4 chapter images ==="
ls -la "$OUT"/c{2,5,6,8}-*.jpg
