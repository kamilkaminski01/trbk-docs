#!/usr/bin/env bash
# Buduje ZASZYFROWANĄ wersję strony (StatiCrypt) do folderu docs/.
# Wymaga: Node.js (npx). Hasło podajesz w zmiennej STATICRYPT_PASSWORD.
#
#   STATICRYPT_PASSWORD="twoje-dlugie-haslo" ./tools/build-secure.sh
#
# Potem: git add -A && git commit -m "Aktualizacja" && git push
# (GitHub Pages musi serwować z gałęzi main, katalog /docs.)
set -euo pipefail
cd "$(dirname "$0")/.."

if [ -z "${STATICRYPT_PASSWORD:-}" ]; then
  echo "Ustaw haslo: STATICRYPT_PASSWORD=\"...\" ./tools/build-secure.sh" >&2
  exit 1
fi

# 1) Złóż wszystko w jeden plik
node tools/build.mjs secure-src.html

# 2) Zaszyfruj (AES-256, prompt hasla, "zapamietaj mnie" 30 dni)
npx --yes staticrypt secure-src.html -p "$STATICRYPT_PASSWORD" --short --remember 30 -d enc

# 3) Opublikuj tylko zaszyfrowany plik w docs/
mkdir -p docs
cp enc/secure-src.html docs/index.html
[ -f CNAME ] && cp CNAME docs/CNAME || true
: > docs/.nojekyll

# 4) Sprzatanie artefaktow
rm -rf secure-src.html enc

echo "OK: docs/index.html zaszyfrowane. Zrob commit + push. Pages = main /docs."
