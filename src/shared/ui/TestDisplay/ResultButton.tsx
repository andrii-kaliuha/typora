import { Icon } from "../Icon";
import "./ResultButton.css";

type ResultButtonProps = { action: () => void; name: string; icon: string };

export const ResultButton = ({ action, name, icon }: ResultButtonProps) => {
  return (
    <button type="button" className="result-button" onClick={action}>
      <span>{name}</span>
      <Icon width={24} height={24} icon={icon} />
    </button>
  );
};
