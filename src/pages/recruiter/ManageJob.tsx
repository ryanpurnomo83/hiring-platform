export default function ManageJob() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-10xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Front End Developer</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            + Add New
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-medium">
              <tr className="divide-x divide-gray-200">
                <th className="p-3 border-b border-gray-200 w-12 text-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-500 cursor-pointer"
                  />
                </th>
                <th className="p-3 border-b border-gray-200">Nama Lengkap</th>
                <th className="p-3 border-b border-gray-200">Email Address</th>
                <th className="p-3 border-b border-gray-200">Phone Number</th>
                <th className="p-3 border-b border-gray-200">Date of Birth</th>
                <th className="p-3 border-b border-gray-200">Domicile</th>
                <th className="p-3 border-b border-gray-200">Gender</th>
                <th className="p-3 border-b border-gray-200">LinkedIn</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {/* Contoh row */}
              <tr className="divide-x divide-gray-200 hover:bg-gray-50 transition">
                <td className="p-3 border-b border-gray-100">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-500 cursor-pointer"
                  />
                </td>
                <td className="p-3 border-b border-gray-100">Nadia Putri</td>
                <td className="p-3 border-b border-gray-100">
                  nadia.putri@example.com
                </td>
                <td className="p-3 border-b border-gray-100">+62 812-1234-5678</td>
                <td className="p-3 border-b border-gray-100">12/03/1998</td>
                <td className="p-3 border-b border-gray-100">Jakarta</td>
                <td className="p-3 border-b border-gray-100">Female</td>
                <td className="p-3 border-b border-gray-100">
                  <a
                    href="https://linkedin.com/in/nadiaputri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Profile
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
