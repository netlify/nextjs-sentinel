# Next.js Sentinel

Monitor Next.js releases, analyze them with an LLM for relevance to Netlify,

## Development

This is an Astro site.

It stores Next.js release data in a Turso database.

It is deployed to Netlify.

It uses the PNPM package manager.

### 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command              | Action                                                     |
| :------------------- | :--------------------------------------------------------- |
| `pnpm install`       | Install dependencies                                       |
| `pnpm run dev`       | Start local dev server at `localhost:4321`                 |
| `pnpm run build`     | Build your production site to `./dist/`                    |
| `pnpm run format`    | Format files with prettier                                 |
| `pnpm run lint`      | Run ESLint                                                 |
| `pnpm run typecheck` | Typecheck TypeScript files                                 |
| `pnpm run test`      | Run all checks, including typechecking & eslint            |
| `pnpm run preview`   | Preview your build locally, before deploying               |
| `pnpm run migrate`   | Fetch recent releases, analyze them, and seed the database |

### Contributing

The release data is in a plain JSON file in `src/data/releases.json`. Feel free
to send PRs with updates.
