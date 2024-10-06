import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { addCompanyIds, clearCompanyIds } from "../../../store/companySlice";
import CompanyTableRowMemo from "../company-table-row/CompanyTableRow";

function CompanyTable(): JSX.Element {
  const dispatch = useAppDispatch();
  const companies = useAppSelector((state) => state.company.companies);
  const checkedIds = useAppSelector((state) => state.company.checkedCompanyIds);
  const companyIds = companies.map((company) => company.id);

  // Проверяем, выбраны ли все компании
  const isCheckedAll = useMemo(() => {
    return companies.length > 0 && checkedIds.length === companies.length;
  }, [companies.length, checkedIds.length]);

  function handleInputClick(companyIds: string[]) {
    if (isCheckedAll) {
      dispatch(clearCompanyIds());
    } else {
      dispatch(addCompanyIds(companyIds));
    }
  }

  return (
    <div className="h-[80vh] overflow-y-auto">
      <table className="w-full border border-slate-400 border-collapse">
        <thead>
          <tr className="bg-slate-200">
            <th className="w-[60px] p-2 border border-slate-300">
              <input
                onChange={() => handleInputClick(companyIds)}
                type="checkbox"
                name="company-all"
                id="company-all"
                checked={isCheckedAll}
              />
            </th>
            <th className="p-2 border border-slate-300">Название компании</th>
            <th className="p-2 border border-slate-300">Адрес</th>
            <th className="p-2 border border-slate-300">Действие</th>
          </tr>
        </thead>

        <tbody>
          {companies &&
            companies.length > 0 &&
            companies.map((company, index) => {
              const isEvenRow = index % 2 === 0;

              return (
                <CompanyTableRowMemo
                  key={`company-${index}`}
                  company={company}
                  checkedIds={checkedIds}
                  isEvenRow={isEvenRow}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default CompanyTable;
