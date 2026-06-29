import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { assignmentService } from "@/services/assignmentService";
import logger from "@/lib/logger";
import { createAssignmentSchema } from "@/schemas/assignment.schema";
import { emailQueue } from "@/lib/queue";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "TEACHER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validated = createAssignmentSchema.parse(body);
    const assignment = await assignmentService.createAssignment(
      validated.title,
      validated.description,
      validated.dueDate ? new Date(validated.dueDate) : undefined,
      validated.courseId
    );
    return NextResponse.json(assignment, { status: 201 });
  } catch (error) {
    logger.error("Error creating assignment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
