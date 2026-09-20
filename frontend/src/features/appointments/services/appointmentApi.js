
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/appointments";

// Book Appointment
export const bookAppointment = async (appointmentData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/book`,
    appointmentData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

// Get Patient Appointments
export const getPatientAppointments = async (patientId) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/patient/${patientId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

