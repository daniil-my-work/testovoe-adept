import { useCallback, useEffect, useRef, useState } from "react";
import { companyFromServer } from "../../const/const";
import CompanyTable from "./company-table/CompanyTable";
import { ICompanyItem } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  clearCompanyIds,
  clearNewCompanyId,
  deleteCompany,
  setCompany,
  setNewCompanyId,
} from "../../store/companySlice";
import { v4 as uuidv4 } from "uuid";
import useScroll from "../../hooks/useScroll";
import { Trash } from "lucide-react";
import CustomButton from "../ui/custom-button/CustomButton";

const LIMIT = 20;

const fetchCompanies = (
  start: number,
  limit: number
): Promise<ICompanyItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result: ICompanyItem[] = companyFromServer.slice(
        start,
        start + limit
      );
      resolve(result);
    }, 500);
  });
};

function App() {
  const dispatch = useAppDispatch();
  const [offset, setOffset] = useState(0);
  const parentRef = useRef(null);
  const childrenRef = useRef(null);
  const checkedIds = useAppSelector((state) => state.company.checkedCompanyIds);
  const newCompanyId = useAppSelector((state) => state.company.newCompanyId);
  const companies = useAppSelector((state) => state.company.companies);

  useEffect(() => {
    async function fetchResult() {
      const result = await fetchCompanies(offset, LIMIT);
      dispatch(setCompany(result));
      setOffset(LIMIT);
    }

    fetchResult();
  }, [dispatch]);

  // Функция для подгрузки новых компаний
  async function fetchNewCompany() {
    const result = await fetchCompanies(offset, LIMIT);
    if (result.length > 0) {
      dispatch(setCompany([...companies, ...result]));
      setOffset((prevOffset) => prevOffset + LIMIT);
    }
  }
  // Подключаем кастомный хук для подгрузки данных
  useScroll(parentRef, childrenRef, fetchNewCompany);

  const handleDeleteCompanies = () => {
    dispatch(deleteCompany(checkedIds));
    dispatch(clearCompanyIds());

    if (newCompanyId !== "") {
      dispatch(clearNewCompanyId());
    }
  };

  const handleAddCompany = () => {
    if (newCompanyId === "") {
      const uniqId = uuidv4();

      dispatch(
        setCompany([
          {
            id: uniqId,
            companyName: "",
            address: "",
          },
          ...companies,
        ])
      );

      dispatch(setNewCompanyId(uniqId));
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full h-full max-w-3xl overflow-y-auto">
        <h1 className="text-2xl text-center mb-4">
          Приложение <span className="text-3xl">"Список компаний"</span>
        </h1>

        {checkedIds.length > 0 ? (
          <div className="flex justify-between mb-4">
            <h3>
              Выбрано: <span className="font-medium">{checkedIds.length}</span>
            </h3>

            <CustomButton
              className="bg-red-500"
              onClick={handleDeleteCompanies}
            >
              <Trash size={18} />
            </CustomButton>
          </div>
        ) : (
          <div className="flex justify-end mb-4">
            <CustomButton
              className={`${
                newCompanyId !== "" ? "bg-slate-500" : "bg-green-500"
              }`}
              buttonText="+ Добавить"
              onClick={handleAddCompany}
              disabled={newCompanyId !== ""}
            />
          </div>
        )}

        <CompanyTable parentRef={parentRef} childrenRef={childrenRef} />
      </div>
    </div>
  );
}

export default App;
