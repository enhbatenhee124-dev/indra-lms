import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { courseService } from "@/services/courseService";
import logger from "@/lib/logger";
import redis from "@/lib/redis";
import { createCourseSchema, updateCourseSchema } from "@/schemas/course.schema";

export async function GET() {
  try {
    const cacheKey = "courses:all";
    const cached = await redis.get(cacheKey);
    if (cached) {
      return NextResponse.json(JSON.parse(cached));
    }

    const courses = await courseService.getAllCourses();
    await redis.setex(cacheKey, 60, JSON.stringify(courses));
    return NextResponse.json(courses);
  } catch (error) {
    logger.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "TEACHER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validated = createCourseSchema.parse(body);
    const course = await courseService.createCourse(
      validated.title,
      validated.description,
      session.user.id
    );
    await redis.del("courses:all");
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    logger.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
