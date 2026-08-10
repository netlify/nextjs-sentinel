import { createClient, type Client } from "@libsql/client";

let client: Client | null = null;

function getClient(): Client {
  if (!client) {
    if (!process.env.TURSO_DATABASE_URL) {
      throw new Error("TURSO_DATABASE_URL is not set");
    }
    client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return client;
}

interface Release {
  version: string;
  summary: string;
  score: number;
  relevance: string;
  analyzed_at: string;
  releaseLink: string;
  relevantPRs: string[];
}

export async function getAnalyzedReleases(): Promise<Release[]> {
  try {
    const dbClient = getClient();
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Database query timeout")), 5000);
    });
    
    const result = await Promise.race([
      dbClient.execute("SELECT * FROM releases ORDER BY analyzed_at DESC"),
      timeoutPromise,
    ]);
    
    return result.rows.map((row) => ({
      ...row,
      relevantPRs: JSON.parse(row.relevantPRs as string),
    })) as unknown[] as Release[];
  } catch (error) {
    console.error("Error fetching releases:", error);
    return [];
  }
}

export async function insertAnalyzedRelease(
  version: string,
  summary: string,
  score: number,
  relevance: string,
  releaseLink: string,
  relevantPRs: string[],
): Promise<void> {
  const dbClient = getClient();
  await dbClient.execute({
    sql: "INSERT INTO releases (version, summary, score, relevance, releaseLink, relevantPRs, analyzed_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    args: [
      version,
      summary,
      score,
      relevance,
      releaseLink,
      JSON.stringify(relevantPRs),
      new Date().toISOString(),
    ],
  });
}
