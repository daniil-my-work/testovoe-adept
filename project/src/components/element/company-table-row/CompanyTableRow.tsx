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
import CustomButton from "../../ui/custom-button/CustomButton";

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

  const handleUpdateCompanyInfo = () => {
    const updatedInfo = {
      id: id,
      companyName: isEdit.companyName.value,
      address: isEdit.address.value,
    };

    dispatch(updateCompany(updatedInfo));

    setIsEdit((prev) => ({
      ...prev,
      companyName: { edit: false, value: prev.companyName.value },
      address: { edit: false, value: prev.address.value },
    }));
  };

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

  const isChecked = checkedIds.includes(id);
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
          name="company-all"
          id="company-{1}"
          checked={isChecked}
        />
      </td>
      <td
        className="p-2 border border-slate-300"
        onClick={() => toggleEdit("companyName")}
      >
        {!isEdit.companyName.edit ? (
          <span>{companyName}</span>
        ) : (
          <input
            className="p-0.5 px-2 rounded border border-gray-300"
            type="text"
            onChange={(e) => updateCompanyInfo(e, "companyName")}
            value={isEdit.companyName.value}
          />
        )}
      </td>
      <td
        className="p-2 border border-slate-300"
        onClick={() => toggleEdit("address")}
      >
        {!isEdit.address.edit ? (
          <span>{address}</span>
        ) : (
          <input
            className="p-0.5 px-2 rounded border border-gray-300"
            type="text"
            onChange={(e) => updateCompanyInfo(e, "address")}
            value={isEdit.address.value}
          />
        )}
      </td>
      <td className="p-2 border text-center border-slate-300">
        {newCompanyId === id ? (
          <CustomButton
            className="bg-blue-500"
            buttonText="Сохранить"
            onClick={handleSaveCompany}
          />
        ) : (
          <>
            {isEditRow ? (
              <CustomButton
                className="bg-blue-500"
                buttonText="Обновить"
                onClick={handleUpdateCompanyInfo}
              />
            ) : (
              <CustomButton
                className="bg-red-500"
                buttonText="Удалить"
                onClick={handleDeleteCompany}
              />
            )}
          </>
        )}
      </td>
    </tr>
  );
}

const CompanyTableRowMemo = React.memo(CompanyTableRow);

export default CompanyTableRowMemo;
