import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { selectPaginatedHistory } from "../../store/selectors/historySelectors";
import { HistoryControls } from "../../features/history/HistoryControls";
import { HistoryList } from "../../widgets/History/HistoryList";
import { Icon } from "../../shared/ui/Icon";
import "./HistoryPage.css";

export const HistoryPage = () => {
  const history = useSelector(selectPaginatedHistory);

  return (
    <div className="history-page">
      <HistoryControls />

      {history.length > 0 ?
        <HistoryList history={history} />
      : <EmptyHistory />}
    </div>
  );
};

const EmptyHistory = () => {
  const { t } = useTranslation();
  return (
    <div className="empty-history">
      <Icon width={90} height={90} icon="empty-history-icon" />
      <h1 className="empty-history-title">{t("history.title")}</h1>
      <p className="empty-history-action">{t("history.action")}</p>
    </div>
  );
};
