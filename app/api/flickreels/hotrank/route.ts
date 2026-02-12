import { encryptedResponse, safeJson } from "@/lib/api-utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://151.240.0.69:3000/api"}/flickreels/hotrank`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }

    const data = await safeJson(res);
    return encryptedResponse(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
