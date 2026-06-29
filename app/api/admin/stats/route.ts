import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { userService } from "@/services/userService";
import logger from "@/lib/logger";

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const stats = await userService.getStats();
    return NextResponse.json(stats);
  } catch (error) {
    logger.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
