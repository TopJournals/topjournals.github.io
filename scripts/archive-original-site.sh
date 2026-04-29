#!/usr/bin/env bash
set -euo pipefail

SITE_URL="${1:-https://www.metastructure.tech/}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ARCHIVE_DIR="$ROOT_DIR/archive/original-site"
HTML_PATH="$ARCHIVE_DIR/index.html"
ASSET_DIR="$ARCHIVE_DIR/Dawei Li - Homepage_files"
URL_LIST="$ARCHIVE_DIR/asset-urls.txt"

mkdir -p "$ASSET_DIR"

echo "Fetching $SITE_URL"
curl -L "$SITE_URL" -o "$HTML_PATH"

python3 - "$SITE_URL" "$HTML_PATH" "$URL_LIST" <<'PY'
import re
import sys
from html import unescape
from urllib.parse import quote, urljoin, urlsplit, urlunsplit

base_url, html_path, out_path = sys.argv[1:4]
html = open(html_path, encoding="utf-8", errors="ignore").read()

pattern = re.compile(r'''(?:src|href)=["']([^"']+)["']''', re.I)
urls = []

for match in pattern.finditer(html):
    raw = unescape(match.group(1).strip())
    if "Dawei Li - Homepage_files" not in raw:
        continue
    full = urljoin(base_url, raw)
    parts = urlsplit(full)
    normalized = urlunsplit(
        (
            parts.scheme,
            parts.netloc,
            quote(parts.path, safe="/:%"),
            quote(parts.query, safe="=&?/%:+"),
            quote(parts.fragment, safe=""),
        )
    )
    if normalized not in urls:
        urls.append(normalized)

with open(out_path, "w", encoding="utf-8") as f:
    f.write("\n".join(urls))

print(f"Found {len(urls)} asset urls")
PY

while IFS= read -r url || [ -n "$url" ]; do
  [ -z "$url" ] && continue
  filename="$(basename "${url%%\?*}")"
  destination="$ASSET_DIR/$filename"
  echo "Downloading $url -> $destination"
  curl -L "$url" -o "$destination"
done < "$URL_LIST"

cat > "$ARCHIVE_DIR/README.md" <<EOF
Original site archive

Source: $SITE_URL
Fetched: $(date -u +"%Y-%m-%dT%H:%M:%SZ")

Files:
- index.html
- Dawei Li - Homepage_files/
- asset-urls.txt
EOF

echo "Archive saved to $ARCHIVE_DIR"
