import { Routes, Route, Navigate } from "react-router";
import OffresPage from "./pages/OffresPage";
import OffresDetailsPage from "./pages/OffresDetailsPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<OffresPage />} />
      <Route path="/jobs/:id" element={<OffresDetailsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
