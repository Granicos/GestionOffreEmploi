import { Routes, Route, Navigate } from "react-router";
import OffresPage from "./pages/OffresPage";
import AddJob from "./pages/Addjob";
import EditJob from "./pages/EditJob";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import OffresDetailsPage from "./pages/OffresDetailsPage";
import InscriptionPage from "./pages/InscriptionPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<OffresPage />} />
      <Route
        path="/add-job"
        element={
          <ProtectedRoute>
            <AddJob />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-job/:id"
        element={
          <ProtectedRoute>
            <EditJob />
          </ProtectedRoute>
        }
      />
      <Route path="/jobs/:id" element={<OffresDetailsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/inscription" element={<InscriptionPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
