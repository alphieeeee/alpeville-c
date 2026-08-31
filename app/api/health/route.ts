import { NextResponse } from "next/server";
import { checkStrapiHealth } from "@/lib/api/strapi/service";

export const revalidate = 60;

export async function GET() {
  const health = await checkStrapiHealth();
  const status = health.ok ? 200 : 503;

  return NextResponse.json(health, { status });
}
