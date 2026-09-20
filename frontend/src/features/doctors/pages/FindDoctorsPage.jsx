import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, LoaderCircle } from "lucide-react";

import DoctorCard from "../components/DoctorCard";
import { getAllDoctors } from "../services/doctorApi";

export default function FindDoctorsPage() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllDoctors();

        setDoctors(data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load doctors. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const searchText = search.toLowerCase();

    return (
      doctor.name?.toLowerCase().includes(searchText) ||
      doctor.specialization?.toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <section className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            Doctors
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Find a Doctor
          </h1>

          <p className="mt-2 text-slate-600">
            Search and find the right doctor for your healthcare needs.
          </p>
        </section>

        {/* Search */}
        <section className="mb-8">
          <div className="relative max-w-2xl">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by doctor name or specialization..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </section>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-60 items-center justify-center">
            <div className="flex items-center gap-3 text-slate-600">
              <LoaderCircle
                size={24}
                className="animate-spin"
              />

              <span>Loading doctors...</span>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center">
            <p className="font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Doctors */}
        {!loading && !error && (
          <>
            <div className="mb-4">
              <p className="text-sm text-slate-500">
                {filteredDoctors.length} doctor
                {filteredDoctors.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {filteredDoctors.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard
                    key={doctor._id}
                    doctor={doctor}
                    onViewProfile={() =>
                      navigate(`/doctors/${doctor._id}`, {
                        state: { doctor },
                      })
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <Search
                  size={40}
                  className="mx-auto text-slate-400"
                />

                <h2 className="mt-4 font-semibold text-slate-800">
                  No doctors found
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Try searching with a different name or specialization.
                </p>
              </div>
            )}
          </>
        )}

      </div>
    </main>
  );
}