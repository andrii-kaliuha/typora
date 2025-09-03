import { Header } from "./components/Header/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TestPage } from "./pages/TestPage";
import { LearningPage } from "./pages/LearningPage";
import { HistoryPage } from "./pages/HistoryPage";

export const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/test" replace />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};
