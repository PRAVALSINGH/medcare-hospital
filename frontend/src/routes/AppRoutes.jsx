import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

import PatientDashboard from "../features/patient-dashboard'/pages/PatientDashboard";

import FindDoctorsPage from "../features/doctors/pages/FindDoctorsPage";
import DoctorDetailPage from "../features/doctors/pages/DoctorDetailPage";

import BookAppointmentPage from "../features/appointments/pages/BookAppointmentPage";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/patient-dashboard"
        element={<PatientDashboard />}
      />

      <Route
        path="/doctors"
        element={<FindDoctorsPage />}
      />

      <Route
        path="/doctors/:id"
        element={<DoctorDetailPage />}
      />

      <Route
         path="/doctors/:id/book-appointment"
         element={<BookAppointmentPage />}
        />
    </Routes>
  );
}