"use strict";
import { v4 as uuidv4 } from 'uuid';
// var uuid_1 = require("uuid");

function generateRandomCompanyName() {
    var legalForm = ["ИП", "ООО", "ПАО", "ЗАО"];
    var сompanyName = ["Ленина", "Мира", "Советская", "Победы", "Фрунзе"];
    var randomLegalForm = legalForm[Math.floor(Math.random() * legalForm.length)];
    var randomCompanyName = сompanyName[Math.floor(Math.random() * сompanyName.length)];
    return "".concat(randomLegalForm, " ").concat(randomCompanyName);
}
function generateRandomAddress() {
    var cities = ["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань"];
    var streets = ["Ленина", "Мира", "Советская", "Победы", "Фрунзе"];
    var city = cities[Math.floor(Math.random() * cities.length)];
    var street = streets[Math.floor(Math.random() * streets.length)];
    var houseNumber = Math.floor(Math.random() * 100) + 1; // случайный номер дома
    return "\u0433. ".concat(city, ", \u0443\u043B. ").concat(street, ", \u0434. ").concat(houseNumber);
}
// Функция для генерации массива компаний
function generateCompanies(count) {
    var companies = [];
    for (var i = 0; i < count; i++) {
        companies.push({
            id: (0, uuidv4)(),
            companyName: generateRandomCompanyName(), // случайное название компании
            address: generateRandomAddress(), // случайный адрес
        });
    }
    return companies;
}
// Генерация 100 компаний
var companyList = generateCompanies(100);
// Преобразование массива в JSON
var companyListJson = JSON.stringify(companyList, null, 2);
console.log(companyListJson);
