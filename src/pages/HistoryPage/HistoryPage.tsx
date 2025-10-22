import "./HistoryPage.css";
import { historyList } from "../../utils/historyList";
import { TestResult } from "../../components/TestResult";

export const HistoryPage = () => {
  return (
    <div className="history-page">
      <div className="history-list">
        {historyList.map((item, index) => (
          <TestResult key={index} text={item.text} stats={item.stats} showFullButtons={false} />
        ))}
      </div>
    </div>
  );
};
