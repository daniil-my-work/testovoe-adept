import { v4 as uuidv4 } from 'uuid';
import { ICompanyItem } from "../types/types";

function generateRandomCompanyName(): string {
    const legalForm = ["ИП", "ООО", "ПАО", "ЗАО"];
    const сompanyName = ["Ленина", "Мира", "Советская", "Победы", "Фрунзе"];
    const randomLegalForm = legalForm[Math.floor(Math.random() * legalForm.length)];
    const randomCompanyName = сompanyName[Math.floor(Math.random() * сompanyName.length)];
    return `${randomLegalForm} ${randomCompanyName}`;
}

function generateRandomAddress(): string {
    const cities = ["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань"];
    const streets = ["Ленина", "Мира", "Советская", "Победы", "Фрунзе"];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const street = streets[Math.floor(Math.random() * streets.length)];
    const houseNumber = Math.floor(Math.random() * 100) + 1; // случайный номер дома
    return `г. ${city}, ул. ${street}, д. ${houseNumber}`;
}

// Функция для генерации массива компаний
function generateCompanies(count: number): ICompanyItem[] {
    const companies: ICompanyItem[] = [];

    for (let i = 0; i < count; i++) {
        companies.push({
            id: uuidv4(),
            companyName: generateRandomCompanyName(), // случайное название компании
            address: generateRandomAddress(), // случайный адрес
        });
    }

    return companies;
}

// Генерация 100 компаний
const companyList = generateCompanies(100);

// Преобразование массива в JSON
const companyListJson = JSON.stringify(companyList, null, 2);
// console.log(companyListJson);



