import { useAuth } from "../features/auth/context/AuthContext";
import DoctorCard from "../features/doctors/components/DoctorCard";
import { INITIAL_DOCTORS } from "../data/initialData";

export default function HomePage() {
  const { showToast } = useAuth();

  const firstDoctor = INITIAL_DOCTORS[0];

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Home Page hai ye
        </h1>

        <p className="mb-8 text-gray-600">
          Find the right doctor and book your appointment easily.
        </p>

        {firstDoctor && (
          <div className="max-w-md">
            <DoctorCard
              doctor={firstDoctor}
              onViewProfile={(doctor) =>
                showToast(`Selected Dr. ${doctor.name}`)
              }
            />
          </div>
        )}
      </div>
    </main>
  );
}