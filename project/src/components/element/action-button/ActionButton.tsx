import React from "react";
import CustomButton from "../../ui/custom-button/CustomButton";

interface ActionButtonProps {
  isEditing: boolean;
  isNewCompany: boolean;
  onSave: () => void;
  onDelete: () => void;
  onUpdate: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  isEditing,
  isNewCompany,
  onSave,
  onDelete,
  onUpdate,
}) => {
  return (
    <td className="p-2 border text-center border-slate-300">
      {isNewCompany ? (
        <CustomButton
          className="bg-blue-500"
          buttonText="Сохранить"
          onClick={onSave}
        />
      ) : (
        <>
          {isEditing ? (
            <CustomButton
              className="bg-blue-500"
              buttonText="Обновить"
              onClick={onUpdate}
            />
          ) : (
            <CustomButton
              className="bg-red-500"
              buttonText="Удалить"
              onClick={onDelete}
            />
          )}
        </>
      )}
    </td>
  );
};

const ActionButtonMemo = React.memo(ActionButton);

export default ActionButtonMemo;
