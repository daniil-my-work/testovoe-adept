import React from "react";
import CustomInput from "../custom-input/CustomInput";

interface EditableCellProps {
  value: string;
  isEdit: boolean;
  onToggleEdit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  value,
  isEdit,
  onToggleEdit,
  onChange,
}) => {
  return (
    <td className="p-2 border border-slate-300" onClick={onToggleEdit}>
      {isEdit ? (
        <CustomInput onChange={onChange} value={value} />
      ) : (
        <span>{value}</span>
      )}
    </td>
  );
};

const EditableCellMemo = React.memo(EditableCell);

export default EditableCellMemo;
