#!/bin/bash
# ============================================================
# $CDM — "The Long Roll" visual system
# One ball. Nine moments. Same lighting, same palette, same grain.
# Each image documents a different chapter of the ball's passage.
# ============================================================

set -e
OUT=/home/z/my-project/download/img
mkdir -p "$OUT"

# Shared style suffix — enforces visual coherence across all 9 images
STYLE="cinematic chiaroscuro lighting, single warm amber light source from upper left, deep matte black background, fine grain texture, subtle film noise, warm gold bronze tones only, no other colors, minimalist composition, vast negative space, mythic atmosphere, fine art photography, 8k, no text, no watermark, no logo"

echo "[1/9] I — Awakening: ball alone in darkness, stillness before motion..."
z-ai image \
  -p "A single perfect bronze-gold sphere resting on invisible ground in absolute darkness, faint warm amber glow emanating softly from its surface, sphere is still and silent, vast empty black void surrounding it, the moment before motion begins, ${STYLE}" \
  -o "$OUT/c1-awakening.jpg" \
  -s 1344x768

echo "[2/9] II — The Omen: worn groove, evidence of past passages..."
z-ai image \
  -p "Extreme close-up of a single perfectly circular groove worn into ancient dark stone, the groove is filled with faint gold dust residue, the surface around it is matte black volcanic rock, single warm light grazing across revealing texture and depth, evidence of countless revolutions, archaeological atmosphere, top-down view, ${STYLE}" \
  -o "$OUT/c2-omen.jpg" \
  -s 1344x768

echo "[3/9] III — The Coin: the ball, pressed flat into a token..."
z-ai image \
  -p "A single bronze-gold sphere seen perfectly from above at close range, its surface bears faint concentric circles like growth rings or minted relief, warm amber glow from above, the sphere fills most of the frame, dark void at edges, the moment of becoming a coin, ${STYLE}" \
  -o "$OUT/c3-coin.jpg" \
  -s 1024x1024

echo "[4/9] IV — The Path: ball mid-roll, motion-blurred streak..."
z-ai image \
  -p "A single bronze-gold sphere captured mid-motion rolling rightward across an infinite dark plain, long horizontal motion blur trailing behind it like a golden streak, the ball is sharp at the leading edge, vast empty black landscape under starless sky, sense of eternal forward motion, wide cinematic aspect, ${STYLE}" \
  -o "$OUT/c4-path.jpg" \
  -s 1344x768

echo "[5/9] V — The Circle: nine balls forming a ring, viewed from above..."
z-ai image \
  -p "Top-down view of nine identical bronze-gold spheres arranged in a perfect circle on a dark matte surface, faint gold light radiating from the center of the ring, each sphere glowing softly, the configuration suggests a ritual or natural pattern, vast black void around the circle, symmetry and stillness, ${STYLE}" \
  -o "$OUT/c5-circle.jpg" \
  -s 1024x1024

echo "[6/9] VI — The Law: ball carved in bas-relief into dark stone..."
z-ai image \
  -p "A single perfect circle carved in deep bas-relief into a massive dark stone tablet, the carved circle is filled with faint gold patina like ancient bronze, weathered stone surface around it, single warm light from upper left revealing depth, the impression of something eternal and codified, archaeological fine art photography, ${STYLE}" \
  -o "$OUT/c6-law.jpg" \
  -s 1344x768

echo "[7/9] VII — The Number: ball dissolving into gold particles..."
z-ai image \
  -p "A single bronze-gold sphere dissolving at its edges into a swirling cloud of fine gold dust particles, the sphere half-solid half-disintegrated, gold motes drifting outward into the black void, abstraction of matter becoming data, the moment of becoming countable, ${STYLE}" \
  -o "$OUT/c7-number.jpg" \
  -s 1344x768

echo "[8/9] VIII — The Ritual: three vessels each holding a ball..."
z-ai image \
  -p "Three simple dark stone vessels in a row on a black surface, each vessel cradling a single bronze-gold sphere, soft amber glow rising from each sphere, the vessels are minimalist and ancient, the composition is centered and symmetrical, dark void background, suggestion of offering or ritual, ${STYLE}" \
  -o "$OUT/c8-ritual.jpg" \
  -s 1344x768

echo "[9/9] IX — Yours: ball receding into infinite distance..."
z-ai image \
  -p "A single bronze-gold sphere small and far away on an infinite flat dark plain, receding toward a vanishing point, faint warm amber glow around the distant sphere, vast empty black landscape under starless black sky, atmospheric perspective fading to darkness, the moment of becoming yours to follow, wide cinematic, ${STYLE}" \
  -o "$OUT/c9-yours.jpg" \
  -s 1344x768

echo ""
echo "=== All 9 chapter images generated ==="
ls -la "$OUT"/c*.jpg
