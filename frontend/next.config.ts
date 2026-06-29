import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_USER_SERVICE_URL: process.env.NEXT_PUBLIC_USER_SERVICE_URL || "http://localhost:3001",
    NEXT_PUBLIC_COURSE_SERVICE_URL: process.env.NEXT_PUBLIC_COURSE_SERVICE_URL || "http://localhost:3002",
    NEXT_PUBLIC_ASSIGNMENT_SERVICE_URL: process.env.NEXT_PUBLIC_ASSIGNMENT_SERVICE_URL || "http://localhost:3003",
    NEXT_PUBLIC_GRADE_SERVICE_URL: process.env.NEXT_PUBLIC_GRADE_SERVICE_URL || "http://localhost:3004",
  },
};

export default nextConfig;
