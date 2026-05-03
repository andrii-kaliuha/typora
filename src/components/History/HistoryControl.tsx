type HistoryControlProps = { className?: string; action: () => void; name: string; icon: string };

export const HistoryControl = ({ className, action, name, icon }: HistoryControlProps) => {
  return (
    <button type="button" className={`history-control-button ${className}`} onClick={action}>
      <svg width={24} height={24}>
        <use href={`./src/assets/icons.svg#${icon}`} />
      </svg>
      <p className="control-button-name">{name}</p>
    </button>
  );
};
