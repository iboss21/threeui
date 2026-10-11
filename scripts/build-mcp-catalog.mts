// AnimatedWebs MCP data for tools.animatedwebs.com:
//   public/catalog.json        — public metadata for every visible component (search, details, previews)
//   public/source/<id>.json    — one component's source bundle (Pro-gated in nginx like source-code.json)
// Run: npx tsx scripts/build-mcp-catalog.mts
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const SITE = "https://tools.animatedwebs.com";
const { VISIBLE_READY_SHADERS } = await import(pathToFileURL(join(root, "src/data/shaders.tsx")).href);
const { shaderRoutePath } = await import(pathToFileURL(join(root, "src/routes.js")).href);
const registry = JSON.parse(await readFile(join(root, "public/source-code.json"), "utf8"));

const abs = (p?: string) => (p ? (p.startsWith("http") ? p : `${SITE}${p}`) : null);
const withSource = new Set<string>(registry.readyIds);

type Shader = {
  id: string; label: string; category: string; tags?: string[]; description: string; runtime?: string;
  interaction?: string; thumbnail?: string; importName?: string;
  variants?: { id: string; label: string; description: string; thumbnail?: string }[];
};

const components = (VISIBLE_READY_SHADERS as Shader[]).map((s) => ({
  id: s.id,
  title: s.label,
  category: s.category,
  tags: s.tags ?? [],
  description: s.description,
  runtime: s.runtime ?? null,
  interaction: s.interaction ?? null,
  url: `${SITE}${shaderRoutePath(s)}`,
  thumbnail: abs(s.thumbnail),
  importName: s.importName ?? null,
  install: s.importName ? `import { ${s.importName} } from "@animatedwebs/ui";\nimport "@animatedwebs/ui/style.css";` : null,
  source: withSource.has(s.id) ? "pro" : "none",
  variants: (s.variants ?? []).map((v) => ({
    id: v.id,
    title: v.label,
    description: v.description,
    url: `${SITE}${shaderRoutePath(s, v.id)}`,
    thumbnail: abs(v.thumbnail),
  })),
}));

await writeFile(
  join(root, "public/catalog.json"),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), site: SITE, count: components.length, variantCount: components.reduce((n, c) => n + Math.max(1, c.variants.length), 0), components })}\n`,
);

const sourceDir = join(root, "public/source");
await rm(sourceDir, { recursive: true, force: true });
await mkdir(sourceDir, { recursive: true });
const shared = new Map<string, unknown>((Array.isArray(registry.sharedFiles) ? registry.sharedFiles : Object.values(registry.sharedFiles)).map((f: { path: string }) => [f.path, f]));
for (const c of Object.values(registry.components) as { id: string; sharedFilePaths?: string[] }[]) {
  const bundle = { ...c, sharedFiles: (c.sharedFilePaths ?? []).map((p) => shared.get(p)).filter(Boolean) };
  await writeFile(join(sourceDir, `${c.id}.json`), JSON.stringify(bundle));
}
console.log(`catalog.json: ${components.length} components; source/: ${Object.keys(registry.components).length} bundles`);
