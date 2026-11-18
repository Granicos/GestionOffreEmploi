import { Routes, Route, Navigate } from "react-router";
import OffresPage from "./pages/OffresPage";
import AddJob from "./pages/Addjob";
import EditJob from "./pages/EditJob";
import OffresDetailsPage from "./pages/OffresDetailsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<OffresPage />} />
      <Route path="/add-job" element={<AddJob />} />
      <Route path="/edit-job/:id" element={<EditJob />} />
      <Route path="/jobs/:id" element={<OffresDetailsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
