import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  clearNewCompanyId,
  deleteCompany,
  deleteCompanyId,
  toggleCompanyId,
  updateCompany,
} from "../../../store/companySlice";
import { ICompanyItem } from "../../../types/types";
import {
  createUpdatedInfo,
  isCompanyChecked,
} from "../../../utils/companyUtils";
import EditableCellMemo from "../../ui/editable-cell/EditableCell";
import ActionButtonMemo from "../action-button/ActionButton";

interface ICompanyTableRow {
  company: ICompanyItem;
  checkedIds: string[];
  isEvenRow: boolean;
}

function CompanyTableRow({
  company,
  checkedIds,
  isEvenRow,
}: ICompanyTableRow): JSX.Element {
  const dispatch = useAppDispatch();
  const { id, companyName, address } = company;

  const [isEdit, setIsEdit] = useState({
    companyName: { edit: false, value: companyName },
    address: { edit: false, value: address },
  });
  const newCompanyId = useAppSelector((state) => state.company.newCompanyId);

  useEffect(() => {
    setIsEdit({
      companyName: { edit: false, value: companyName },
      address: { edit: false, value: address },
    });
  }, [companyName, address]);

  const handleInputClick = useCallback(() => {
    dispatch(toggleCompanyId([id]));
  }, [dispatch, id]);

  const handleDeleteCompany = useCallback(() => {
    dispatch(deleteCompany([id]));
    dispatch(deleteCompanyId(id));
  }, [dispatch, id]);

  const handleUpdateCompanyInfo = useCallback(() => {
    const updatedInfo = createUpdatedInfo(
      id,
      isEdit.companyName.value,
      isEdit.address.value
    );
    dispatch(updateCompany(updatedInfo));

    setIsEdit((prev) => ({
      ...prev,
      companyName: { edit: false, value: prev.companyName.value },
      address: { edit: false, value: prev.address.value },
    }));
  }, [dispatch, id, isEdit.companyName.value, isEdit.address.value]);

  const handleSaveCompany = () => {
    handleUpdateCompanyInfo();
    dispatch(clearNewCompanyId());
  };

  const updateCompanyInfo = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      field: "companyName" | "address"
    ) => {
      const value = e.target.value;
      setIsEdit((prev) => ({
        ...prev,
        [field]: { ...prev[field], value },
      }));
    },
    []
  );

  const toggleEdit = (field: "companyName" | "address") => {
    setIsEdit((prev) => ({
      ...prev,
      [field]: { ...prev[field], edit: true },
    }));
  };

  const isChecked = isCompanyChecked(id, checkedIds);
  const isEditRow = isEdit.companyName.edit || isEdit.address.edit;

  return (
    <tr
      className={`${isEvenRow && !isChecked ? "bg-slate-100" : ""} ${
        isChecked ? "bg-blue-100" : ""
      }`}
    >
      <td className="w-[60px] text-center align-middle p-2 border border-slate-300">
        <input
          onChange={handleInputClick}
          type="checkbox"
          name={`company-${id}`}
          id={`company-${id}`}
          checked={isChecked}
        />
      </td>
      <EditableCellMemo
        value={isEdit.companyName.value}
        isEdit={isEdit.companyName.edit}
        onToggleEdit={() => toggleEdit("companyName")}
        onChange={(e) => updateCompanyInfo(e, "companyName")}
      />
      <EditableCellMemo
        value={isEdit.address.value}
        isEdit={isEdit.address.edit}
        onToggleEdit={() => toggleEdit("address")}
        onChange={(e) => updateCompanyInfo(e, "address")}
      />
      <ActionButtonMemo
        isEditing={isEditRow}
        isNewCompany={newCompanyId === id}
        onSave={handleSaveCompany}
        onDelete={handleDeleteCompany}
        onUpdate={handleUpdateCompanyInfo}
      />
    </tr>
  );
}

const CompanyTableRowMemo = React.memo(CompanyTableRow);

export default CompanyTableRowMemo;
