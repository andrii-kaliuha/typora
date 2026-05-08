import { useState } from "react";
import { UserTextModal } from "./UserTextModal";

type ConfigItemProps<T extends string | number> = { id: T; onSelect: (id: T) => void; activeKey: T; label: string };

export const ConfigItem = <T extends string | number>({ id, onSelect, activeKey, label }: ConfigItemProps<T>) => {
  return (
    <button key={id} onClick={() => onSelect(id)} className={`test-config-item ${activeKey === id ? "active" : ""}`}>
      {label}
    </button>
  );
};

export const UserTextButton = ({ label, activeKey }: { label: string; activeKey: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleToggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <>
      <button onClick={handleToggleModal} className={`test-config-item ${activeKey === "custom" ? "active" : ""}`}>
        {label}
      </button>

      <UserTextModal isOpen={isModalOpen} onClose={handleToggleModal} />
    </>
  );
};
