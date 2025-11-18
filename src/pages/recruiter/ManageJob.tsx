import { useEffect, useState } from "react";

type Row = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  domicile: string;
  gender: string;
  linkedin: string;
};

export default function ManageJob() {
 
  const [rows, setRows] = useState<Row[]>([
    {
      id: "1",
      name: "Nadia Putri",
      email: "nadia.putri@example.com",
      phone: "+62 812-1234-5678",
      dob: "12/03/1998",
      domicile: "Jakarta",
      gender: "Female",
      linkedin: "https://linkedin.com/in/nadiaputri",
    },
    {
      id: "2",
      name: "Budi Santoso",
      email: "budi.s@example.com",
      phone: "+62 812-2345-6789",
      dob: "05/06/1995",
      domicile: "Bandung",
      gender: "Male",
      linkedin: "https://linkedin.com/in/budisantoso",
    },
    // ... lebih banyak row
  ]);

  const [selectAll, setSelectAll] = useState(false);
  const [rowSelections, setRowSelections] = useState<boolean[]>([]);

  // Inisialisasi rowSelections saat rows berubah
  useEffect(() => {
    setRowSelections(rows.map(() => false));
    setSelectAll(false);
  }, [rows]);

  // Toggle select all
  const handleSelectAll = () => {
    const newValue = !selectAll;
    setSelectAll(newValue);
    setRowSelections(rows.map(() => newValue));
  };

  // Toggle individual row (ubah hanya index tsb)
  const handleRowSelect = (index: number) => {
    setRowSelections((prev) => {
      const updated = [...prev]; // jangan mutate langsung
      updated[index] = !updated[index];
      setSelectAll(updated.every(Boolean));
      return updated;
    });
  };

  // Contoh: tambah row baru (immutable)
  const handleAddRow = () => {
    const newRow: Row = {
      id: (rows.length + 1).toString(),
      name: "New User",
      email: "newuser@example.com",
      phone: "+62 811-0000-0000",
      dob: "01/01/2000",
      domicile: "Jakarta",
      gender: "Male",
      linkedin: "https://linkedin.com/in/newuser",
    };
    setRows(prev => [...prev, newRow]); // immutable
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-10xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Front End Developer</h2>
          <button
            onClick={handleAddRow}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
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
                    checked={selectAll}
                    onChange={handleSelectAll}
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
              {rows.map((row, index) => (
                <tr key={row.id} className="divide-x divide-gray-200 hover:bg-gray-50 transition">
                  <td className="p-3 border-b border-gray-100 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-blue-500 cursor-pointer"
                      checked={!!rowSelections[index]}
                      onChange={() => handleRowSelect(index)}
                    />
                  </td>
                  <td className="p-3 border-b border-gray-100">{row.name}</td>
                  <td className="p-3 border-b border-gray-100">{row.email}</td>
                  <td className="p-3 border-b border-gray-100">{row.phone}</td>
                  <td className="p-3 border-b border-gray-100">{row.dob}</td>
                  <td className="p-3 border-b border-gray-100">{row.domicile}</td>
                  <td className="p-3 border-b border-gray-100">{row.gender}</td>
                  <td className="p-3 border-b border-gray-100">
                    <a
                      href={row.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Profile
                    </a>
                  </td>
                </tr>
              ))}

              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">No data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
