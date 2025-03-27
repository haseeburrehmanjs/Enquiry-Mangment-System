import axios from "axios";
import { useState, useEffect } from "react";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/v1/employee-list");
      setEmployees(response.data.employeeData);
      console.log(response.data.employeeData);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError("Failed to load employee data");
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = (delId) => {
    axios.delete(`http://localhost:3000/api/v1/delete/${delId}`)
      .then(() => {
        alert("Employee deleted successfully");
        fetchEmployees()
      })
      .catch((err) => console.error("Error deleting employee:", err));
  }

  const filteredEmployees = employees.filter((emp) =>
    Object.values(emp).some(value =>
      typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="w-full p-6 overflow-auto">
        <h2 className="text-2xl font-semibold mb-4">Employee List</h2>
        <input
          type="text"
          placeholder="Enter search term (name, email, phone, etc.)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full mb-4"
        />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Phone</th>
                <th className="border border-gray-300 p-2">Position</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <tr key={employee._id} className="text-center">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{employee.fullName}</td>
                  <td className="border border-gray-300 p-2">{employee.email}</td>
                  <td className="border border-gray-300 p-2">{employee.contactNumber}</td>
                  <td className="border border-gray-300 p-2">{employee.job}</td>
                  <td className="border border-gray-300 p-2">
                    <button onClick={() => deleteEmployee(employee._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
