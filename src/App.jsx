import { Routes, Route, Navigate } from "react-router";
import OffresPage from "./pages/OffresPage";
import AddJob from "./pages/Addjob";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<OffresPage />} />
      <Route path="/add-job" element={<AddJob />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
