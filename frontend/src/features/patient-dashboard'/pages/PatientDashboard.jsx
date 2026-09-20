
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Search,
  Sparkles,
  UserRound,
  X,
  Construction,
  AlertCircle,
} from "lucide-react";

import { getPatientAppointments } from "../../appointments/services/appointmentApi";

export default function PatientDashboard() {
  const navigate = useNavigate();

  const [showConstruction, setShowConstruction] = useState(false);
  const [constructionTitle, setConstructionTitle] = useState("");

  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [appointmentError, setAppointmentError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch Patient Appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?.id) {
        setAppointmentError(
          "Patient information not found. Please login again."
        );
        setLoadingAppointments(false);
        return;
      }

      try {
        setLoadingAppointments(true);
        setAppointmentError("");

        const response = await getPatientAppointments(user.id);

        console.log("Patient appointments:", response);

        setAppointments(response.data || []);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);

        const message =
          error.response?.data?.message ||
          "Failed to load appointments.";

        setAppointmentError(message);
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, [user?.id]);

  const openConstruction = (title) => {
    setConstructionTitle(title);
    setShowConstruction(true);
  };

  const closeConstruction = () => {
    setShowConstruction(false);
    setConstructionTitle("");
  };

  // Appointment Statistics
  const totalAppointments = appointments.length;

  const upcomingAppointments = appointments.filter(
    (appointment) => appointment.status === "upcoming"
  );

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "completed"
  );

  // Next Upcoming Appointment
  const nextAppointment = upcomingAppointments[0];

  // Recent Appointments
  const recentAppointments = appointments.slice(0, 5);

  return (
    <>
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Welcome Section */}
          <section className="mb-8">
            <p className="text-sm font-medium text-blue-600">
              Patient Dashboard
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Good Morning, {user?.name || "Patient"} 👋
            </h1>

            <p className="mt-2 text-slate-600">
              Manage your appointments and healthcare from one place.
            </p>
          </section>

          {/* Error */}
          {appointmentError && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              <AlertCircle size={18} />
              {appointmentError}
            </div>
          )}

          {/* Statistics */}
          <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {/* Total */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Total Appointments
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {loadingAppointments ? "..." : totalAppointments}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <CalendarDays size={24} />
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-400">
                All your appointments
              </p>
            </div>

            {/* Upcoming */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Upcoming
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {loadingAppointments
                      ? "..."
                      : upcomingAppointments.length}
                  </p>
                </div>

                <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                  <Clock3 size={24} />
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-400">
                Scheduled appointments
              </p>
            </div>

            {/* Completed */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Completed
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {loadingAppointments
                      ? "..."
                      : completedAppointments.length}
                  </p>
                </div>

                <div className="rounded-xl bg-green-50 p-3 text-green-600">
                  <CheckCircle2 size={24} />
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-400">
                Completed consultations
              </p>
            </div>

          </section>

          {/* Main Content */}
          <section className="grid gap-6 lg:grid-cols-3">

            {/* Upcoming Appointment */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Upcoming Appointment
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your next scheduled appointment
                  </p>
                </div>

                <CalendarDays
                  size={22}
                  className="text-blue-600"
                />
              </div>

              {/* Loading */}
              {loadingAppointments && (
                <div className="mt-6 rounded-xl bg-slate-50 p-8 text-center">
                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                  <p className="mt-3 text-sm text-slate-500">
                    Loading appointment...
                  </p>
                </div>
              )}

              {/* No Upcoming Appointment */}
              {!loadingAppointments && !nextAppointment && (
                <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">

                  <CalendarDays
                    size={42}
                    className="mx-auto text-slate-400"
                  />

                  <h3 className="mt-4 font-semibold text-slate-800">
                    No upcoming appointment
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
                    Find a doctor and book an appointment whenever
                    you need medical consultation.
                  </p>

                  <button
                    onClick={() => navigate("/doctors")}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    <Search size={18} />
                    Find a Doctor
                  </button>
                </div>
              )}

              {/* Upcoming Appointment Card */}
              {!loadingAppointments && nextAppointment && (
                <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                      <p className="text-sm font-medium text-blue-600">
                        Scheduled Consultation
                      </p>

                      <h3 className="mt-1 text-xl font-bold text-slate-900">
                        Dr.{" "}
                        {nextAppointment.doctorId?.name ||
                          "Doctor"}
                      </h3>

                      <p className="mt-1 text-sm text-slate-600">
                        {nextAppointment.doctorId?.specialization ||
                          "Specialist"}
                      </p>
                    </div>

                    <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Upcoming
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">

                    <div className="rounded-xl bg-white p-4">
                      <p className="text-xs font-medium text-slate-500">
                        Date
                      </p>

                      <p className="mt-1 font-semibold text-slate-900">
                        {nextAppointment.appointmentDate}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white p-4">
                      <p className="text-xs font-medium text-slate-500">
                        Time
                      </p>

                      <p className="mt-1 font-semibold text-slate-900">
                        {nextAppointment.appointmentTime}
                      </p>
                    </div>

                  </div>
                </div>
              )}

            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-xl font-semibold text-slate-900">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Frequently used options
              </p>

              <div className="mt-5 space-y-3">

                {/* Find Doctor */}
                <button
                  onClick={() => navigate("/doctors")}
                  className="flex w-full items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                    <Search size={20} />
                  </div>

                  <div>
                    <p className="font-medium text-slate-900">
                      Find a Doctor
                    </p>

                    <p className="text-xs text-slate-500">
                      Search available doctors
                    </p>
                  </div>
                </button>

                {/* Book Appointment */}
                <button
                  onClick={() =>
                    openConstruction("Book Appointment")
                  }
                  className="flex w-full items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                    <CalendarDays size={20} />
                  </div>

                  <div>
                    <p className="font-medium text-slate-900">
                      Book Appointment
                    </p>

                    <p className="text-xs text-slate-500">
                      Schedule a consultation
                    </p>
                  </div>
                </button>

                {/* My Appointments */}
                <button
                  onClick={() =>
                    openConstruction("My Appointments")
                  }
                  className="flex w-full items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <div className="rounded-lg bg-green-100 p-2 text-green-600">
                    <Clock3 size={20} />
                  </div>

                  <div>
                    <p className="font-medium text-slate-900">
                      My Appointments
                    </p>

                    <p className="text-xs text-slate-500">
                      View appointment history
                    </p>
                  </div>
                </button>

                {/* AI Assistant */}
                <button
                  onClick={() =>
                    openConstruction("AI Assistant")
                  }
                  className="flex w-full items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:border-purple-200 hover:bg-purple-50"
                >
                  <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
                    <Sparkles size={20} />
                  </div>

                  <div>
                    <p className="font-medium text-slate-900">
                      AI Assistant
                    </p>

                    <p className="text-xs text-slate-500">
                      Get general health guidance
                    </p>
                  </div>
                </button>

              </div>
            </div>

          </section>

          {/* Recent Appointments */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Recent Appointments
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your latest appointment activity
                </p>
              </div>

              <button
                onClick={() =>
                  openConstruction("My Appointments")
                }
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View All
              </button>

            </div>

            {/* Loading */}
            {loadingAppointments && (
              <div className="mt-6 rounded-xl bg-slate-50 p-8 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                <p className="mt-3 text-sm text-slate-500">
                  Loading appointments...
                </p>
              </div>
            )}

            {/* Empty */}
            {!loadingAppointments &&
              recentAppointments.length === 0 && (
                <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-8 text-center">

                  <Clock3
                    size={36}
                    className="mx-auto text-slate-400"
                  />

                  <p className="mt-3 font-medium text-slate-700">
                    No appointment history yet
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Your appointments will appear here once you
                    book one.
                  </p>

                </div>
              )}

            {/* Appointment List */}
            {!loadingAppointments &&
              recentAppointments.length > 0 && (
                <div className="mt-6 space-y-3">

                  {recentAppointments.map((appointment) => (
                    <div
                      key={appointment._id}
                      className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                    >

                      <div className="flex items-center gap-4">

                        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                          <CalendarDays size={21} />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            Dr.{" "}
                            {appointment.doctorId?.name ||
                              "Doctor"}
                          </p>

                          <p className="text-sm text-slate-500">
                            {appointment.doctorId?.specialization ||
                              "Specialist"}
                          </p>
                        </div>

                      </div>

                      <div className="flex flex-wrap items-center gap-3">

                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {appointment.appointmentDate}
                          </p>

                          <p className="text-xs text-slate-500">
                            {appointment.appointmentTime}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            appointment.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : appointment.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {appointment.status
                            ?.charAt(0)
                            .toUpperCase() +
                            appointment.status?.slice(1)}
                        </span>

                      </div>

                    </div>
                  ))}

                </div>
              )}

          </section>

          {/* AI Assistant */}
          <section className="mt-6 rounded-2xl border border-purple-100 bg-purple-50 p-6">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
                  <Sparkles size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Need health guidance?
                  </h2>

                  <p className="mt-1 max-w-xl text-sm text-slate-600">
                    Ask our AI Assistant for general health
                    information and guidance.
                  </p>
                </div>

              </div>

              <button
                onClick={() =>
                  openConstruction("AI Assistant")
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700"
              >
                <Sparkles size={18} />
                Open Assistant
              </button>

            </div>
          </section>

          {/* Profile Preview */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <UserRound size={26} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    {user?.name || "Patient"}
                  </h2>

                  <p className="text-sm text-slate-500">
                    {user?.email || "No email available"}
                  </p>
                </div>

              </div>

              <button
                onClick={() => openConstruction("Profile")}
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                View Profile
              </button>

            </div>
          </section>

        </div>
      </main>

      {/* Under Construction Modal */}
      {showConstruction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">

          <div className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">

            <button
              onClick={closeConstruction}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Construction size={32} />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              {constructionTitle}
            </h2>

            <p className="mt-2 text-xl font-semibold text-slate-800">
              Page Under Construction
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              This feature is currently under development.
              We will make it available soon.
            </p>

            <button
              onClick={closeConstruction}
              className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </>
  );
}

