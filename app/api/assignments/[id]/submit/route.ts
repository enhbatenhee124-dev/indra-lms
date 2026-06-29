import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { assignmentService } from "@/services/assignmentService";
import logger from "@/lib/logger";
import { submitAssignmentSchema } from "@/schemas/assignment.schema";
import { emailQueue } from "@/lib/queue";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validated = submitAssignmentSchema.parse(body);
    const submission = await assignmentService.submitAssignment(
      params.id,
      session.user.id,
      validated.fileUrl
    );

    await emailQueue.add("send-notification", {
      to: session.user.email,
      subject: "Assignment Submitted",
      body: "Your assignment has been submitted successfully!",
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    logger.error("Error submitting assignment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
