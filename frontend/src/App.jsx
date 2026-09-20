import { AuthProvider, useAuth } from "./features/auth/context/AuthContext";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ToastBanner from "./common/ToastBanner";

import AppRoutes from "./routes/AppRoutes";

function AppContent() {
  const { toast, showToast } = useAuth();

  return (
    <>
      <Navbar />

      <AppRoutes />

      <Footer />

      <ToastBanner
        toast={toast}
        onClose={() => showToast(null)}
      />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;