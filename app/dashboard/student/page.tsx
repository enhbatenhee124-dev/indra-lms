export default function StudentDashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">My Courses</h2>
          <p className="text-gray-600">View enrolled courses</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Assignments</h2>
          <p className="text-gray-600">Submit assignments</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Grades</h2>
          <p className="text-gray-600">View your grades</p>
        </div>
      </div>
    </div>
  );
}
