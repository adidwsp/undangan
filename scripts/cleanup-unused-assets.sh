#!/usr/bin/env bash
# Move suspected-unused image files to src/assets/_unused_backup
# Inspect the list below before running. This script only moves files (safe undo).

set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IMAGES_DIR="$ROOT/src/assets/images"
BACKUP_DIR="$IMAGES_DIR/_unused_backup_$(date +%Y%m%d%H%M%S)"

mkdir -p "$BACKUP_DIR"

# Candidate files detected as unused (review before running)
candidates=(
  "rosegold.png"
  "left-border-white.png"
  "bouquet-top.png"
  "bouquet-bottom.png"
  "flower-leaf-old.png"
  "floral-corner-source.png"
  "falling-botanicals-source.png"
  "falling-botanicals.png"
  "trees.png"
  "three-flowers.png"
  "small-flowers.png"
  "calligraphy-placeholder.webp"
  "couple/female_frame.png"
  "couple/male_frame.png"
  "couple/femalex.png"
  "couple/femaley.png"
  "account/backsplash.png"
)

echo "Backup directory: $BACKUP_DIR"

for rel in "${candidates[@]}"; do
  src="$IMAGES_DIR/$rel"
  if [ -f "$src" ]; then
    dst="$BACKUP_DIR/$(basename "$rel")"
    echo "Moving $src -> $dst"
    mv "$src" "$dst"
  else
    echo "Not found (skipped): $src"
  fi
done

echo "Done. If everything looks good, you can delete the backup folder to permanently remove them."