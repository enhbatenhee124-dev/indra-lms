import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { gradeService } from "@/services/gradeService";
import logger from "@/lib/logger";
import { createGradeSchema } from "@/schemas/grade.schema";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "TEACHER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validated = createGradeSchema.parse(body);
    const grade = await gradeService.createGrade(
      validated.score,
      validated.comment,
      validated.submissionId,
      session.user.id
    );
    return NextResponse.json(grade, { status: 201 });
  } catch (error) {
    logger.error("Error creating grade:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const grades = await gradeService.getGradesByStudent(session.user.id);
    return NextResponse.json(grades);
  } catch (error) {
    logger.error("Error fetching grades:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
