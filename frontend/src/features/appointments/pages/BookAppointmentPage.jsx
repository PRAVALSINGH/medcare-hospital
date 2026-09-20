
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Mail,
  BriefcaseMedical,
  CheckCircle2,
} from "lucide-react";

import DoctorAvatar from "../../../common/DoctorAvatar";
import { bookAppointment } from "../services/appointmentApi";

export default function BookAppointmentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const doctor = location.state?.doctor;

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const timeSlots = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
  ];

  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleBookAppointment = async () => {
    setError("");

    if (!selectedDate || !selectedTime) {
      setError("Please select both date and time.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.id) {
      setError("Patient information not found. Please login again.");
      return;
    }

    if (!doctor?._id) {
      setError("Doctor information not found.");
      return;
    }

    try {
      setLoading(true);

      const appointmentData = {
        patientId: user.id,
        doctorId: doctor._id,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
      };

      console.log("Booking appointment:", appointmentData);

      const response = await bookAppointment(appointmentData);

      console.log("Appointment response:", response);

      // Booking successful
      setSuccess(true);
    } catch (error) {
      console.error("Booking appointment error:", error);

      const message =
        error.response?.data?.message ||
        "Failed to book appointment. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Doctor not found
  if (!doctor) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <CalendarDays
              size={30}
              className="text-red-500"
            />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Doctor not found
          </h1>

          <p className="mt-2 text-slate-500">
            Please select a doctor before booking an appointment.
          </p>

          <button
            type="button"
            onClick={() => navigate("/doctors")}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Doctors
          </button>
        </div>
      </main>
    );
  }

  // Success Screen
  if (success) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">

          <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-xl sm:px-12">

            {/* Decorative Background */}
            <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-green-100/60" />

            <div className="absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-blue-100/60" />

            <div className="relative">

              {/* Success Icon */}
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow-lg">
                  <CheckCircle2
                    size={38}
                    strokeWidth={2.5}
                    className="text-white"
                  />
                </div>

              </div>

              {/* Heading */}
              <h1 className="mt-7 text-3xl font-bold text-slate-900 sm:text-4xl">
                Congratulations! 🎉
              </h1>

              <p className="mt-3 text-xl font-semibold text-green-600">
                Your appointment is scheduled successfully.
              </p>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
                Your appointment with{" "}
                <span className="font-semibold text-slate-700">
                  Dr. {doctor.name}
                </span>{" "}
                has been successfully scheduled.
              </p>

              {/* Appointment Details */}
              <div className="mx-auto mt-8 max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left">

                <h2 className="mb-4 text-sm font-semibold text-slate-900">
                  Appointment Details
                </h2>

                <div className="space-y-3">

                  {/* Doctor */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-slate-500">
                      Doctor
                    </span>

                    <span className="text-right text-sm font-semibold text-slate-900">
                      Dr. {doctor.name}
                    </span>
                  </div>

                  {/* Specialization */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-slate-500">
                      Specialization
                    </span>

                    <span className="text-right text-sm font-semibold text-slate-900">
                      {doctor.specialization}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-slate-500">
                      Date
                    </span>

                    <span className="text-sm font-semibold text-slate-900">
                      {selectedDate}
                    </span>
                  </div>

                  {/* Time */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-slate-500">
                      Time
                    </span>

                    <span className="text-sm font-semibold text-slate-900">
                      {selectedTime}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-slate-500">
                      Status
                    </span>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Upcoming
                    </span>
                  </div>

                </div>
              </div>

              {/* Dashboard Message */}
              <div className="mx-auto mt-6 max-w-md rounded-xl bg-blue-50 px-4 py-3">
                <p className="text-sm leading-6 text-blue-700">
                  You can check your appointment details and status
                  anytime from your patient dashboard.
                </p>
              </div>

              {/* Dashboard Button */}
              <button
                type="button"
                onClick={() => navigate("/patient-dashboard")}
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
              >
                <CalendarDays size={18} />
                View My Appointments
              </button>

            </div>
          </div>
        </div>
      </main>
    );
  }

  // Booking Page
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            Appointment
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Book an Appointment
          </h1>

          <p className="mt-2 text-slate-600">
            Select your preferred date and time for the consultation.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">

          {/* LEFT */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            {/* Doctor Info */}
            <div className="flex flex-col gap-5 rounded-2xl bg-blue-50 p-5 sm:flex-row sm:items-center">

              <div className="rounded-full bg-white p-1.5 shadow-sm">
                <DoctorAvatar
                  doctor={doctor}
                  size="lg"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-blue-600">
                  Consultation with
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Dr. {doctor.name}
                </h2>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                  <BriefcaseMedical size={16} />

                  <span>
                    {doctor.specialization}
                  </span>
                </div>

                {doctor.email && (
                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                    <Mail size={15} />

                    <span>
                      {doctor.email}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* DATE */}
            <div className="mt-8">

              <div className="flex items-center gap-2">
                <CalendarDays
                  size={20}
                  className="text-blue-600"
                />

                <h2 className="text-lg font-bold text-slate-900">
                  Select Date
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Choose the date for your appointment.
              </p>

              <input
                type="date"
                min={getTodayDate()}
                value={selectedDate}
                onChange={(event) => {
                  setSelectedDate(event.target.value);
                  setError("");
                }}
                className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* TIME */}
            <div className="mt-8">

              <div className="flex items-center gap-2">
                <Clock3
                  size={20}
                  className="text-blue-600"
                />

                <h2 className="text-lg font-bold text-slate-900">
                  Select Time
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Choose an available time slot.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">

                {timeSlots.map((time) => {
                  const isSelected = selectedTime === time;

                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => {
                        setSelectedTime(time);
                        setError("");
                      }}
                      className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
                        isSelected
                          ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                          : "border-slate-200 bg-white text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}

              </div>
            </div>

            {/* INFO */}
            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-green-100 bg-green-50 p-4">

              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0 text-green-600"
              />

              <div>
                <p className="text-sm font-semibold text-green-800">
                  Appointment Information
                </p>

                <p className="mt-1 text-sm leading-6 text-green-700">
                  Your appointment will be created after you confirm
                  the selected date and time.
                </p>
              </div>

            </div>
          </section>

          {/* RIGHT */}
          <aside>
            <div className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <p className="text-sm font-medium text-blue-600">
                Appointment Summary
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                Confirm Details
              </h2>

              <div className="mt-6 space-y-4">

                {/* Doctor */}
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Doctor
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    Dr. {doctor.name}
                  </p>
                </div>

                {/* Specialization */}
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Specialization
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {doctor.specialization}
                  </p>
                </div>

                {/* Date */}
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Date
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {selectedDate || "Not selected"}
                  </p>
                </div>

                {/* Time */}
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Time
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {selectedTime || "Not selected"}
                  </p>
                </div>

              </div>

              {/* Confirm Button */}
              <button
                type="button"
                onClick={handleBookAppointment}
                disabled={
                  loading ||
                  !selectedDate ||
                  !selectedTime
                }
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CalendarDays size={18} />

                {loading
                  ? "Booking..."
                  : "Confirm Appointment"}
              </button>

              <p className="mt-3 text-center text-xs text-slate-400">
                Please select both date and time to continue.
              </p>

            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}

