import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";

export type RuntimeEnv = CloudflareEnv & {
  DB: D1Database;
  GEMINI_API_KEY?: string;
  GEMINI_MODEL?: string;
};

export async function getRuntimeEnv() {
  const { env } = await getCloudflareContext({ async: true });

  if (!env.DB) {
    throw new Error(
      "The Cloudflare D1 binding `DB` is unavailable. Run the app through the configured Cloudflare development or preview command.",
    );
  }

  return env as RuntimeEnv;
}
