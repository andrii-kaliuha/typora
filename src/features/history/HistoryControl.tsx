import { Icon } from "../../shared/ui/Icon";

type HistoryControlProps = { className?: string; action: () => void; name: string; icon: string; disabled?: boolean };

export const HistoryControl = ({ className, action, name, icon, disabled }: HistoryControlProps) => {
  return (
    <button type="button" className={`history-control-button ${className}`} onClick={action} disabled={disabled}>
      <Icon width={24} height={24} icon={icon} />
      <p className="control-button-name">{name}</p>
    </button>
  );
};
