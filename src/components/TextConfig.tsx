export const TextConfig = () => {
  return (
    <div className="text-config">
      <ul className="text-config-list">
        <li className="text-config-item active">Текст</li>
        <li className="text-config-item">Мова</li>
        <li className="text-config-item">Тривалість</li>
      </ul>
      <ul className="text-config-list">
        <li className="text-config-item active">Випадковий текст</li>
        <li className="text-config-item">Власний текст</li>

        {/* <li className="text-config-item">Українська</li>
        <li className="text-config-item">English</li>

        <li className="text-config-item">30</li>
        <li className="text-config-item">60</li>
        <li className="text-config-item">90</li>
        <li className="text-config-item">120</li> */}
      </ul>
    </div>
  );
};
