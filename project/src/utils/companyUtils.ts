// Обновление информации о компании
export const createUpdatedInfo = (id: string, companyName: string, address: string) => {
    return {
        id,
        companyName,
        address,
    };
};

// Проверка, выбрана ли компания
export const isCompanyChecked = (id: string, checkedIds: string[]) => {
    return checkedIds.includes(id);
};

