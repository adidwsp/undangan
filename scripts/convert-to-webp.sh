#!/usr/bin/env bash
# Convert PNG images in src/assets/images to WebP using cwebp
# Requires: apt-get install -y webp  (provides cwebp)
# Usage: ./scripts/convert-to-webp.sh

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IMAGES_DIR="$ROOT/src/assets/images"

if ! command -v cwebp >/dev/null 2>&1; then
  echo "cwebp not found. Install with: sudo apt-get update && sudo apt-get install -y webp"
  exit 2
fi

find "$IMAGES_DIR" -type f -iname "*.png" | while read -r file; do
  out="${file%.*}.webp"
  if [ -f "$out" ]; then
    echo "Skipping existing: $out"
    continue
  fi
  echo "Converting: $file -> $out"
  # quality 80 is a good default for photographic images; tune as needed
  cwebp -q 80 "$file" -o "$out"
done

echo "Conversion complete. Review output and update image imports to use .webp where appropriate."