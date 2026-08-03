let patient = {
    name: "",
    age: "",
    height: 0,
    consultations: []
};


// Главная кнопка "Рассчитать"

function calculateAll() {

    let bmiResult = calculateBMI();
    let bmrResult = calculateBMR();
    let EARResult = calculateEAR();
    let IdealWeightResult = calculateIdealWeight();

    document.getElementById("result").innerHTML =
        "<b>Результаты консультации</b><br><br>" +
        "ИМТ: " + bmiResult.bmi.toFixed(1) + "<br>" +
        "Категория: " + bmiResult.category + "<br><br>" +
        "Основной обмен: " + Math.round(bmrResult) + " ккал/сут";
}



// Расчёт ИМТ

function calculateBMI() {

    let weight = Number(document.getElementById("weight").value);

    // Рост вводится в сантиметрах
    let heightCm = Number(document.getElementById("height").value);

    // Для ИМТ переводим в метры
    let heightM = heightCm / 100;


    let waist = Number(document.getElementById("waist").value);
    let hips = Number(document.getElementById("hips").value);
    let shoulders = Number(document.getElementById("shoulders").value);


    let bmi = weight / (heightM * heightM);


    let category = "";


    if (bmi < 18.5) {
        category = "Недостаточный вес";
    }
    else if (bmi < 25) {
        category = "Нормальный вес";
    }
    else if (bmi < 30) {
        category = "Избыточный вес";
    }
    else if (bmi < 35) {
        category = "Ожирение I степени";
    }
    else if (bmi < 40) {
        category = "Ожирение II степени";
    }
    else {
        category = "Ожирение III степени";
    }


    patient.height = heightCm;


    patient.consultations.push({

        date: new Date(),
        weight: weight,
        height: heightCm,
        waist: waist,
        hips: hips,
        shoulders: shoulders,
        bmi: bmi

    });


    return {

        bmi: bmi,
        category: category

    };

}



// Расчёт основного обмена BMR

function calculateBMR() {

    let weight = Number(document.getElementById("weight").value);

    // Здесь нужна высота в сантиметрах
    let heightCm = Number(document.getElementById("height").value);

    let age = Number(document.getElementById("age").value);

    let gender = document.getElementById("gender").value;


    let bmr;


    if (gender === "male") {

        bmr =
            10 * weight +
            6.25 * heightCm -
            5 * age +
            5;

    }
    else {

        bmr =
            10 * weight +
            6.25 * heightCm -
            5 * age -
            161;

    }


    document.getElementById("result").innerHTML =
    "Основной обмен: " + Math.round(bmr) + " ккал";


function calculateEAR() {

    // Получаем основной обмен
    let bmr = calculateBMR();

    // Получаем коэффициент активности
    let activity = Number(document.getElementById("activity").value);

    // Рассчитываем суточную потребность
    let ear = bmr * activity;

    // Выводим результат
    document.getElementById("result").innerHTML +=
        "<br>Основной обмен: " +
        Math.round(bmr) +
        " ккал" +
        "<br>Суточная потребность (EAR): " +
        Math.round(ear) +
        " ккал";

    return ear;
}
// Расчёт идеального веса

function calculateIdealWeight() {


    // Рост берём в сантиметрах
    let heightCm = Number(document.getElementById("height").value);

    let gender = document.getElementById("gender").value;


    let brock;
    let devine;


    if (gender === "male") {

        brock = heightCm - 100;

        devine =
            50 + 0.9 * (heightCm - 152.4);

    }
    else {

        brock = heightCm - 110;

        devine =
            45.5 + 0.9 * (heightCm - 152.4);

    }


    // Для ИМТ нужен рост в метрах

    let heightM = heightCm / 100;


    let targetMin =
        21 * heightM * heightM;

    let targetMax =
        23 * heightM * heightM;



    document.getElementById("idealWeight").innerHTML =

        "<b>Идеальный вес</b><br>" +
        "По Броку: " + brock.toFixed(1) + " кг<br>" +
        "По Девину: " + devine.toFixed(1) + " кг<br>" +
        "Диапазон ИМТ 21-23: " +
        targetMin.toFixed(1) +
        " - " +
        targetMax.toFixed(1) +
        " кг";

}



// История консультаций

function showConsultation() {

    let text = "";


    for (let i = 0; i < patient.consultations.length; i++) {

        let c = patient.consultations[i];


        text +=

            "<b>Консультация " + (i + 1) + "</b><br>" +
            "Вес: " + c.weight + " кг<br>" +
            "Рост: " + c.height + " см<br>" +
            "ИМТ: " + c.bmi.toFixed(1) + "<br>" +
            "Талия: " + c.waist + " см<br>" +
            "Бёдра: " + c.hips + " см<br>" +
            "Плечо: " + c.shoulders + " см<br><br>";

    }


    document.getElementById("history").innerHTML = text;

}



// Пока заглушка

function showGraph() {

    alert("График добавим следующим этапом");

}
