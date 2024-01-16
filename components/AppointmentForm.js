import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Update import statement
import axios from "axios";
import { io } from "socket.io-client";

const AppointmentForm = () => {
  const socket = io();
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    doctorId: "",
  });
  const [doctors, setDoctors] = useState([]);
  const router = useRouter();

  useEffect(() => {
    socketInitializer();
    axios.get("/api/doctors").then((result) => {
      setDoctors(result.data);
    });
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("update-input", (msg) => {
      // Handle socket update if needed
    });
  };

  const handleSubmit = async (e) => {
    const sockets = "socket";
    e.preventDefault();
    try {
      const result = await axios.post("/api/appointments", formData);
      setFormData(result.data);
      socket.emit("input-change", sockets);
      router.replace("/appointments");
    } catch (error) {
      console.error("Error scheduling appointment:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Schedule an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-600"
          >
            Start Time:
          </label>
          <input
            type="time"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-600"
          >
            End Time:
          </label>
          <input
            type="time"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="doctor"
            className="block text-sm font-medium text-gray-600"
          >
            Select Doctor:
          </label>
          <select
            value={formData.doctorId}
            onChange={(ev) =>
              setFormData({
                ...formData,
                doctorId: ev.target.value,
              })
            }
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="">Select Doctor</option>
            {doctors.length > 0 &&
              doctors.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-800 transition duration-300"
        >
          Schedule Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
