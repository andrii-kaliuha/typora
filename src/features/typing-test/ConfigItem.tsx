import { useState } from "react";
import { CustomTextModal } from "./CustomTextModal";

type ConfigItemProps<T extends string | number> = { id: T; onSelect: (id: T) => void; activeKey: T; label: string };

export const ConfigItem = <T extends string | number>({ id, onSelect, activeKey, label }: ConfigItemProps<T>) => {
  return (
    <button key={id} onClick={() => onSelect(id)} className={`text-config-item ${activeKey === id ? "active" : ""}`}>
      {label}
    </button>
  );
};

export const CustomTextButton = ({ label, activeKey }: { label: string; activeKey: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleToggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <>
      <button onClick={handleToggleModal} className={`text-config-item ${activeKey === "custom" ? "active" : ""}`}>
        {label}
      </button>

      <CustomTextModal isOpen={isModalOpen} onClose={handleToggleModal} />
    </>
  );
};
