# LeetStats — Frontend learning project (Static UI)

Frontend learning project: a small static UI that fetches LeetCode user stats via LeetCode GraphQL and a fallback stats API.

## What it is
- Simple single-page UI (HTML + Tailwind classes + JS) that shows solved counts and progress rings for Easy/Medium/Hard problems.
- Fetches data from LeetCode GraphQL and displays submission totals as cards.

## Files
- `index.html` — main page
- `script.js` — client logic (fetch + UI updates)
- `sytle.css` / Tailwind classes for styling

## Quick start
1. Open `JS1/index.html` in a browser (double-click or use Live Server extension).
2. Enter a LeetCode username and click `Search`.

## Notes on CORS
- The LeetCode GraphQL endpoint blocks direct browser requests due to CORS. The script currently uses the public proxy `https://cors-anywhere.herokuapp.com/`.
- Options:
  - Enable/host a proxy (cors-anywhere requires enabling from their site).
  - Replace the proxy with your own small server-side proxy.
  - Use the fallback third-party API (`https://leetcode-stats-api.herokuapp.com/<username>`) if GraphQL fails.

## Troubleshooting
- No response / CORS error: enable or replace the proxy as described above.
- "That user does not exist" alert: the GraphQL endpoint returned an error or no `matchedUser`. Try the same username on the LeetCode site to confirm.
- Rings not updating: check DevTools Console for logs. The script sets a CSS variable `--progress-deg` on the `.progressitem` element; ensure the `bg-[conic-gradient(...var(--progress-deg...)]` Tailwind class exists on the ring container in the HTML.

## Development notes
- UI update flow: `fetchuser(username)` -> parse JSON -> `displaydata(parseddata)` -> update rings and cards.
- To customize text inside rings, edit `index.html` and adjust the `.easy-level`, `.easy-count`, etc. spans.

## Example
- Try username: `rajharsh-666` (used in testing). Check the browser console for the GraphQL payload and API responses.

If you want, I can add a small local Node proxy script and a `package.json` script to run it. Would you like that?