type ButtonProps = { click: () => void; name: string; icon: string };

export const ResultButton = ({ click, name, icon }: ButtonProps) => {
  return (
    <button type="button" className="result-button" onClick={click}>
      <p>{name}</p>
      <svg width={24} height={24}>
        <use href={`./src/assets/icons.svg#${icon}`} />
      </svg>
    </button>
  );
};
