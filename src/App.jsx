import { Routes, Route, Navigate } from "react-router";
import OffresPage from "./pages/OffresPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<OffresPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
