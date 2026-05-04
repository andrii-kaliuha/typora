import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { selectPaginatedHistory } from "../../store/selectors/historySelectors";
import type { HistoryTestResultProps } from "../../types/types";
import { HistoryControls } from "../../features/history/HistoryControls";
import { HistoryTestResult } from "../../features/history/HistoryTestResult";
import { Pagination } from "../../features/history/Pagination";
import "./HistoryPage.css";

import emptyHistoryIcon from "../../assets/empty-history.svg";

export const HistoryPage = () => {
  const history = useSelector(selectPaginatedHistory);

  return (
    <div className="history-page">
      <HistoryControls />

      {history.length > 0 ?
        <>
          <HistoryList history={history} />
          <Pagination />
        </>
      : <EmptyHistory />}
    </div>
  );
};

type HistoryListProps = { history: HistoryTestResultProps[] };

const HistoryList = ({ history }: HistoryListProps) => {
  return (
    <ul className="history-list">
      {history.map((item) => (
        <HistoryTestResult key={item.id} textData={item.textData} stats={item.stats} id={item.id} />
      ))}
    </ul>
  );
};

const EmptyHistory = () => {
  const { t } = useTranslation();
  return (
    <div className="empty-history">
      <svg width={128} height={128}>
        <use href={emptyHistoryIcon} />
      </svg>

      <h1 className="empty-history-title">{t("history.title")}</h1>
      <p className="empty-history-action">{t("history.action")}</p>
    </div>
  );
};
