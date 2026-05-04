import { Icon } from "../../shared/Icon";

type HistoryControlProps = { className?: string; action: () => void; name: string; icon: string };

export const HistoryControl = ({ className, action, name, icon }: HistoryControlProps) => {
  return (
    <button type="button" className={`history-control-button ${className}`} onClick={action}>
      <Icon width={24} height={24} icon={icon} />
      <p className="control-button-name">{name}</p>
    </button>
  );
};
