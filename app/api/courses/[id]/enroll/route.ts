import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { courseService } from "@/services/courseService";
import logger from "@/lib/logger";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const enrollment = await courseService.enrollStudent(id, session.user.id);
    return NextResponse.json(enrollment, { status: 201 });
  } catch (error) {
    logger.error("Error enrolling in course:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
