import type { HistoryTestResultProps } from "../../shared/types/types";
import { HistoryTestResult } from "../../features/history/HistoryTestResult";
import { Pagination } from "../../features/history/Pagination";
import "./HistoryList.css";

type HistoryListProps = { history: HistoryTestResultProps[] };

export const HistoryList = ({ history }: HistoryListProps) => {
  return (
    <>
      <ul className="history-list">
        {history.map((item) => (
          <HistoryTestResult key={item.id} textData={item.textData} stats={item.stats} id={item.id} />
        ))}
      </ul>
      <Pagination />
    </>
  );
};
