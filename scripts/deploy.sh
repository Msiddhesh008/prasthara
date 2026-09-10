#!/usr/bin/env bash
# Build the frontend and publish it to GitHub Pages (gh-pages branch).
# Usage (from repo root): ./scripts/deploy.sh
# Or: cd frontend && npm run deploy

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"

cd "$FRONTEND_DIR"

if [[ ! -d node_modules ]]; then
  echo "Installing dependencies..."
  npm install
fi

echo "Building site..."
npm run build

# SPA fallback for GitHub Pages deep links (BrowserRouter)
cp dist/index.html dist/404.html

echo "Publishing to gh-pages..."
npx --yes gh-pages -d dist -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"

echo ""
echo "Deployed. Live site:"
echo "  https://msiddhesh008.github.io/prasthara/"
echo ""
echo "Note: GitHub Pages can take 1–2 minutes to update."
