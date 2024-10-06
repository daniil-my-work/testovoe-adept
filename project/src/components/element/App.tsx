import { useCallback, useEffect, useState } from "react";
import { companyFromServer } from "../../const/const";
import CompanyTable from "./company-table/CompanyTable";
import { ICompanyItem } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  clearCompanyIds,
  deleteCompany,
  setCompany,
  setNewCompanyId,
} from "../../store/companySlice";
import { v4 as uuidv4 } from "uuid";

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
  const [isAddedNewRow, setIsAddedNewRow] = useState(false);
  const checkedIds = useAppSelector((state) => state.company.checkedCompanyIds);
  const companies = useAppSelector((state) => state.company.companies);
  console.log(offset);

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
      dispatch(setCompany([...companies, ...result])); // Обновляем состояние с новыми данными
      setOffset((prevOffset) => prevOffset + LIMIT); // Увеличиваем offset для следующей подгрузки
    } else {
      console.log("Нет больше компаний для загрузки."); // Сообщаем, если больше нет компаний
    }
  }

  const handleDeleteCompanies = useCallback(() => {
    dispatch(deleteCompany(checkedIds));
    dispatch(clearCompanyIds());
  }, [dispatch, checkedIds]);

  const handleAddCompany = useCallback(() => {
    setIsAddedNewRow(true);

    if (!isAddedNewRow) {
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
  }, [dispatch, companies, isAddedNewRow]);

  return (
    <div className="flex justify-center p-4">
      <div className="w-full h-full max-w-3xl overflow-y-auto">
        <h1 className="text-3xl text-center mb-4">
          Приложение "Список компаний"
        </h1>

        {/* <button onClick={fetchNewCompany}>Добавить</button> */}

        {checkedIds.length > 0 ? (
          <div className="flex justify-between mb-3">
            <h3>
              Выбрано: <span className="font-medium">{checkedIds.length}</span>
            </h3>

            <button
              onClick={() => handleDeleteCompanies()}
              className="text-white bg-red-500 p-1 px-2 rounded"
            >
              Удалить
            </button>
          </div>
        ) : (
          <div className="flex justify-end mb-3">
            <button
              onClick={() => handleAddCompany()}
              className={`text-white ${
                isAddedNewRow ? "bg-slate-500" : "bg-green-500"
              }  p-1 px-2 rounded`}
              disabled={isAddedNewRow}
            >
              + Добавить
            </button>
          </div>
        )}

        <CompanyTable />
      </div>
    </div>
  );
}

export default App;
