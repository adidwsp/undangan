#!/usr/bin/env bash
# Re-encode backsound.mp3 to smaller variants using ffmpeg
# Requires: sudo apt-get install -y ffmpeg
# Produces: backsound-128.mp3 and backsound-64-opus.webm in the same folder

set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
AUDIO_DIR="$ROOT/src/assets/audio"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. Install with: sudo apt-get update && sudo apt-get install -y ffmpeg"
  exit 2
fi

if [ ! -d "$AUDIO_DIR" ]; then
  echo "Audio folder not found: $AUDIO_DIR"
  exit 1
fi

orig="$AUDIO_DIR/backsound.mp3"
if [ ! -f "$orig" ]; then
  echo "Original backsound.mp3 not found. Found files:" && ls -la "$AUDIO_DIR"
  exit 1
fi

out128="$AUDIO_DIR/backsound-128.mp3"
out64op="$AUDIO_DIR/backsound-64-opus.webm"

# Create 128kbps MP3 (good balance)
ffmpeg -y -i "$orig" -b:a 128k -vn "$out128"

# Create 64kbps Opus in WebM (modern and smaller)
ffmpeg -y -i "$orig" -c:a libopus -b:a 64k -vn "$out64op"

# Print resulting sizes
ls -lh "$orig" "$out128" "$out64op" || true

echo "Compression complete. Update references where appropriate to use the smaller file."