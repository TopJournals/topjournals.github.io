#!/usr/bin/env bash
set -euo pipefail

SITE_URL="${1:-https://www.metastructure.tech/}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="$ROOT_DIR/public/assets/original/research"
TMP_HTML="${TMPDIR:-/tmp}/metastructure-site.html"
TMP_URLS="${TMPDIR:-/tmp}/metastructure-image-urls.txt"

mkdir -p "$OUT_DIR"

echo "Fetching $SITE_URL"
curl -L "$SITE_URL" -o "$TMP_HTML"

python3 - "$SITE_URL" "$TMP_HTML" "$TMP_URLS" <<'PY'
import re
import sys
from html import unescape
from urllib.parse import quote, urljoin, urlsplit, urlunsplit

base_url, html_path, out_path = sys.argv[1:4]
html = open(html_path, encoding="utf-8", errors="ignore").read()

research_start = html.lower().find("researchs")
research_end = html.lower().find("resources", research_start if research_start != -1 else 0)
if research_start != -1 and research_end != -1:
    html = html[research_start:research_end]

urls = []
for match in re.finditer(r"<img\b[^>]*\bsrc=[\"']([^\"']+)[\"'][^>]*>", html, re.I):
    src = unescape(match.group(1).strip())
    if not src or src.startswith("data:"):
        continue
    url = urljoin(base_url, src)
    parts = urlsplit(url)
    url = urlunsplit(
        (
            parts.scheme,
            parts.netloc,
            quote(parts.path, safe="/:%"),
            quote(parts.query, safe="=&?/%:+"),
            quote(parts.fragment, safe=""),
        )
    )
    if url not in urls:
        urls.append(url)

open(out_path, "w", encoding="utf-8").write("\n".join(urls))
print(f"Found {len(urls)} image urls")
PY

names=(
  "01-rigid-flexible-interlocked.png"
  "02-tunable-electromagnetic-absorber.png"
  "03-tpms-absorption-mechanism.png"
  "04-mechanics-cloaking-metastructure.png"
  "05-coding-metamaterials.png"
  "06-reconfigurable-metamaterial.png"
  "07-controllable-anisotropy.png"
  "08-lattice-electromagnetic-metastructures.png"
  "09-bionic-electromagnetic-metastructures.png"
  "10-ai-aided-design-metastructures.png"
  "11-bionic-metastructure-design.png"
  "12-lattice-structure-multiscale-design.png"
)

index=0
while [ "$index" -lt "${#names[@]}" ] && { IFS= read -r url || [ -n "$url" ]; }; do
  file="$OUT_DIR/${names[$index]}"
  echo "Downloading $url -> $file"
  curl -L "$url" -o "$file"
  index=$((index + 1))
done < "$TMP_URLS"

cat > "$OUT_DIR/manifest.txt" <<EOF
Source: $SITE_URL
Fetched: $(date -u +"%Y-%m-%dT%H:%M:%SZ")

Downloaded URLs:
$(cat "$TMP_URLS")
EOF

echo "Done. Saved $index images to $OUT_DIR"
