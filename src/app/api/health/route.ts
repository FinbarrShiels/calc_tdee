// Add dynamic export for static builds
export const dynamic = "force-static";

export async function GET() {
  return new Response(
    JSON.stringify({
      status: "ok",
      timestamp: new Date().toISOString(),
      domain: "www.tdeecalculator.health",
      environment: process.env.NODE_ENV || "development"
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate"
      }
    }
  );
} 