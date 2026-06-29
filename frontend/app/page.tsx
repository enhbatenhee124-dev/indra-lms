import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-white mb-6">
          Welcome to Indra LMS
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl">
          A full-stack Learning Management System built with Next.js, microservices,
          and modern tech stack!
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            href="/dashboard/admin"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Admin Dashboard
          </Link>
          <Link
            href="/dashboard/teacher"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Teacher Dashboard
          </Link>
          <Link
            href="/dashboard/student"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Student Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
