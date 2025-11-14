type ResultButtonProps = { action: () => void; name: string; icon: string };

export const ResultButton = ({ action, name, icon }: ResultButtonProps) => {
  return (
    <button type="button" className="result-button" onClick={action}>
      <p>{name}</p>
      <svg width={24} height={24}>
        <use href={`./src/assets/icons.svg#${icon}`} />
      </svg>
    </button>
  );
};
