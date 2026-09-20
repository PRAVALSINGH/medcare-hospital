
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Mail,
  BriefcaseMedical,
  Clock3,
  ShieldCheck,
  MapPin,
  Star,
} from "lucide-react";

import DoctorAvatar from "../../../common/DoctorAvatar";

export default function DoctorDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const doctor = location.state?.doctor;

  if (!doctor) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <BriefcaseMedical
              size={30}
              className="text-red-500"
            />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Doctor not found
          </h1>

          <p className="mt-2 text-slate-500">
            Please go back and select a doctor.
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

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/doctors")}
          className="mb-6 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Doctors
        </button>

        {/* Main Doctor Profile */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* Profile Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 px-6 py-10 sm:px-10">
            
            {/* Decorative circles */}
            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10" />
            <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-white/5" />

            <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-center">

              {/* Avatar */}
              <div className="rounded-full bg-white p-2 shadow-xl">
                <DoctorAvatar
                  doctor={doctor}
                  size="lg"
                />
              </div>

              {/* Doctor Basic Info */}
              <div className="text-center sm:text-left">
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
                  <ShieldCheck size={14} />
                  Verified Doctor
                </div>

                <h1 className="text-3xl font-bold text-white sm:text-4xl">
                  Dr. {doctor.name}
                </h1>

                <p className="mt-2 text-lg text-blue-100">
                  {doctor.specialization}
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white">
                    <Star
                      size={15}
                      className="fill-current"
                    />
                    Experienced
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white">
                    <Clock3 size={15} />
                    Available
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_320px]">

            {/* Left Content */}
            <div>

              {/* About */}
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Doctor Information
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  View the doctor's professional information and
                  appointment details below.
                </p>
              </div>

              {/* Information Cards */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                {/* Specialization */}
                <div className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200 hover:shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                      <BriefcaseMedical
                        size={21}
                        className="text-blue-600"
                      />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Specialization
                      </p>

                      <p className="mt-1 font-semibold text-slate-900">
                        {doctor.specialization}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200 hover:shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                      <CalendarDays
                        size={21}
                        className="text-blue-600"
                      />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Experience
                      </p>

                      <p className="mt-1 font-semibold text-slate-900">
                        {doctor.experience || 0} years
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200 hover:shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                      <Mail
                        size={21}
                        className="text-blue-600"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm text-slate-500">
                        Email
                      </p>

                      <p className="mt-1 break-all font-semibold text-slate-900">
                        {doctor.email || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200 hover:shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50">
                      <Clock3
                        size={21}
                        className="text-green-600"
                      />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Current Status
                      </p>

                      <p className="mt-1 font-semibold capitalize text-green-600">
                        {doctor.status || "Active"}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Availability */}
              <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Clock3
                      size={20}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Appointment Availability
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Book an appointment with Dr. {doctor.name}
                      by selecting a suitable date and time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Booking Card */}
            <aside>
              <div className="sticky top-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">

                <p className="text-sm font-medium text-blue-600">
                  Appointment
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Book a Consultation
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Choose your preferred date and time to schedule
                  an appointment.
                </p>

                {/* Status */}
                <div className="mt-5 flex items-center gap-2 rounded-xl bg-white px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                  <span className="text-sm font-medium text-slate-700">
                    {doctor.status || "Active"}
                  </span>
                </div>

                {/* Location */}
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-white px-4 py-3">
                  <MapPin
                    size={17}
                    className="text-slate-500"
                  />

                  <span className="text-sm text-slate-600">
                    Clinic consultation
                  </span>
                </div>

                {/* Book Button */}
                <button
  type="button"
  onClick={() =>
    navigate(`/doctors/${doctor._id}/book-appointment`, {
      state: { doctor },
    })
  }
  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
>
  <CalendarDays size={18} />
  Book Appointment
</button>
                <p className="mt-3 text-center text-xs text-slate-400">
                  You can select your preferred date and time next.
                </p>

              </div>
            </aside>

          </div>
        </section>
      </div>
    </main>
  );
}

