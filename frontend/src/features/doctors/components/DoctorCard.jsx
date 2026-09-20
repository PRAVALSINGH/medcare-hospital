import { CalendarDays, Mail, ArrowRight } from "lucide-react";

import DoctorAvatar from "../../../common/DoctorAvatar";

export default function DoctorCard({ doctor, onViewProfile }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      
      {/* Doctor Header */}
      <div className="relative bg-blue-600 px-6 pb-6 pt-7">
        
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />

        <div className="relative flex flex-col items-center text-center">
          
          <div className="rounded-full bg-white p-1.5 shadow-md">
            <DoctorAvatar
              doctor={doctor}
              size="lg"
            />
          </div>

          <h2 className="mt-4 text-xl font-bold text-white">
            Dr. {doctor.name}
          </h2>

          <p className="mt-1 text-sm font-medium text-blue-100">
            {doctor.specialization}
          </p>

        </div>
      </div>

      {/* Doctor Information */}
      <div className="space-y-4 p-6">

        {/* Experience */}
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
            <CalendarDays
              size={19}
              className="text-blue-600"
            />
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500">
              Experience
            </p>

            <p className="text-sm font-semibold text-slate-900">
              {doctor.experience || 0} years
            </p>
          </div>

        </div>

        {/* Email */}
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
            <Mail
              size={19}
              className="text-blue-600"
            />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500">
              Email
            </p>

            <p className="truncate text-sm font-semibold text-slate-900">
              {doctor.email || "Not available"}
            </p>
          </div>

        </div>

        {/* View Profile Button */}
        <button
          type="button"
          onClick={onViewProfile}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
          View Profile

          <ArrowRight
            size={18}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>

      </div>
    </article>
  );
}