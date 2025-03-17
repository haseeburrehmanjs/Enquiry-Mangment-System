import axios from "axios";
import { useState, useEffect } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await axios.get("http://localhost:3000/website/api/inquiry-list");
      setInquiries(response.data.inquiryData);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNavigation = (section) => {
    setActiveSection(section);
    if (section === "inquiries") {
      fetchInquiries();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/website/api/inquiry-insert", formData, {
        headers: { "Content-Type": "application/json" }
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      fetchInquiries();
    } catch (error) {
      setError("Error submitting inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/website/api/inquiry-delete/${id}`);
      fetchInquiries();
    } catch (error) {
      console.error("Error deleting inquiry:", error);
    }
  };

  const handleEdit = (inquiry) => {
    setEditingId(inquiry._id);
    setFormData({
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      message: inquiry.message
    });
    setActiveSection("home");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => handleNavigation("home")}>Home</li>
          <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => handleNavigation("inquiries")}>Inquiries</li>
          <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => handleNavigation("settings")}>Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6 overflow-auto">
        {activeSection === "inquiries" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Inquiry List</h2>
            <ul>
              {inquiries.map((inquiry) => (
                <li key={inquiry._id} className="p-3 border-b flex justify-between items-center">
                  <div>
                    <p><strong>Name:</strong> {inquiry.name}</p>
                    <p><strong>Email:</strong> {inquiry.email}</p>
                    <p><strong>Phone:</strong> {inquiry.phone}</p>
                    <p><strong>Message:</strong> {inquiry.message}</p>
                  </div>
                  <div>
                    <button onClick={() => handleEdit(inquiry)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                    <button onClick={() => handleDelete(inquiry._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeSection === "home" && (
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-center">Inquiry Form</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
              <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" required />
              <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} className="w-full p-2 border rounded" required />
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" disabled={loading}>
                {loading ? "Submitting..." : editingId ? "Update" : "Submit"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}