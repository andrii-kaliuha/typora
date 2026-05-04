import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "../widgets/Header/Header";
import { TestPage } from "../pages/TestPage/TestPage";
import { LearningPage } from "../pages/LearningPage/LearningPage";
import { HistoryPage } from "../pages/HistoryPage/HistoryPage";

export const App = () => {
  return (
    <div className="app">
      <HashRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/test" replace />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="*" element={<Navigate to="/test" replace />} />
          </Routes>
        </main>
      </HashRouter>
    </div>
  );
};
