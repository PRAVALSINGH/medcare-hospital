import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleDashboard = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else if (user?.role === "doctor") {
      navigate("/doctor-dashboard");
    } else {
      navigate("/patient-dashboard");
    }
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button
          onClick={() => navigate("/")}
          className="text-xl font-bold text-blue-600"
        >
          MedCare Hospital
        </button>

        <nav className="flex items-center gap-6">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-700 hover:text-blue-600"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/doctors")}
            className="text-sm text-gray-700 hover:text-blue-600"
          >
            Find Doctors
          </button>

          {user ? (
            <>
              <button
                onClick={handleDashboard}
                className="text-sm text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </button>

              <button
                onClick={logout}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-sm text-gray-700 hover:text-blue-600"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Register
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}