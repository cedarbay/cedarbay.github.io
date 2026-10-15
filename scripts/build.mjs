import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const output = new URL('dist/', root);

// Publish only the website, never the repository, dev scripts, or QA screenshots.
const entries = ['index.html', 'styles.css', 'app.js', '.nojekyll', 'assets'];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const entry of entries) {
  await cp(new URL(entry, root), new URL(entry, output), { recursive: true });
}

process.stdout.write(`Static website built: ${fileURLToPath(output)}\n`);
