#!/bin/bash
# Generate atmospheric imagery for $CDM site
# cate.meme aesthetic: dark, gold, restrained, mythical

set -e
OUT=/home/z/my-project/download/img
mkdir -p "$OUT"

echo "[1/4] Hero orb — glowing sphere in darkness..."
z-ai image \
  -p "A single perfect sphere floating in absolute darkness, smooth golden bronze surface, soft warm amber glow emanating from within, fine grain texture, dramatic chiaroscuro lighting, deep black background fading to nothing, minimalist, mysterious, cinematic, ultra detailed, 8k, fine art photography, no text" \
  -o "$OUT/hero-orb.png" \
  -s 1024x1024

echo "[2/4] The path — worn groove in stone..."
z-ai image \
  -p "Ancient worn circular groove pressed into dark stone floor, single ring of erosion from countless revolutions, faint gold dust settled in the channel, low warm side lighting, deep shadow, archaeological atmosphere, minimalist composition, top-down view, mysterious, timeless, fine art photography, no text" \
  -o "$OUT/path-groove.png" \
  -s 1344x768

echo "[3/4] Gold dust — abstract atmospheric..."
z-ai image \
  -p "Abstract swirl of fine gold dust particles suspended in deep black void, warm amber motes catching faint light, ethereal dispersion, minimalist, cinematic, long exposure aesthetic, dark background, subtle bokeh, mysterious atmosphere, no subject, no text" \
  -o "$OUT/gold-dust.png" \
  -s 1344x768

echo "[4/4] The horizon — ball fading into distance..."
z-ai image \
  -p "A single dark sphere on an infinite flat plain under a starless black sky, sphere small and far away, faint warm amber glow around it, deep shadow, atmospheric perspective, minimalist vast emptiness, cinematic wide shot, mysterious, mythic, fine art photography, no text" \
  -o "$OUT/horizon.png" \
  -s 1440x720

echo "Done."
ls -la "$OUT"
