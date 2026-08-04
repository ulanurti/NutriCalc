let patient = {

    name: "",
    age: "",
    height: 0,
    consultations: []

};


// ===============================
// Клинические рекомендации NutriCalc
// ===============================

let nutritionRules = {


    healthy: {

        name: "Здоровый человек",

        weightType: "actual",

        calories: [25, 30],      // ккал/кг

        protein: [0.8, 1.0],     // г/кг

        fatPercent: [25, 35]     // % калорийности

    },


    obesity: {

        name: "Ожирение",

        weightType: "corrected",

        calories: [20, 25],

        protein: [1.2, 1.5],

        fatPercent: [25, 30]

    },


    ckd: {

        name: "Хроническая болезнь почек",

        weightType: "actual",

        calories: [30, 35],

        protein: [0.6, 0.8],

        fatPercent: [30, 35]

    },


    dialysis: {

        name: "Гемодиализ",

        weightType: "actual",

        calories: [30, 35],

        protein: [1.0, 1.2],

        fatPercent: [30, 35]

    },


    cirrhosis: {

        name: "Цирроз печени",

        weightType: "actual",

        calories: [30, 35],

        protein: [1.2, 1.5],

        fatPercent: [30, 35]

    },


    pregnancy: {

        name: "Беременность",

        weightType: "actual",

        calories: [30, 35],

        protein: [1.1, 1.3],

        fatPercent: [30, 35]

    },


    lactation: {

        name: "Грудное вскармливание",

        weightType: "actual",

        calories: [30, 35],

        protein: [1.1, 1.3],

        fatPercent: [30, 35]

    },


    anorexia: {

        name: "Анорексия",

        weightType: "actual",

        calories: [30, 40],

        protein: [1.2, 1.5],

        fatPercent: [30, 35]

    },


    copd: {

        name: "ХОБЛ",

        weightType: "actual",

        calories: [30, 35],

        protein: [1.2, 1.5],

        fatPercent: [35, 40]

    }

};



//========================================
// Режим консультации
//========================================

let consultationModes = {


    maintain: {

        name: "Поддержание массы тела",

        calorieCoefficient: 1.0,

        description: "Поддержание текущей массы тела"

    },


    weightLoss: {

        name: "Снижение массы тела (-15% за 6 месяцев)",

        calorieCoefficient: 0.8,

        description: "Снижение калорийности примерно на 20% от EAR"

    },


    weightGain: {

        name: "Набор массы тела",

        calorieCoefficient: 1.15,

        description: "Постепенное увеличение массы тела"

    },


    muscleGain: {

        name: "Набор мышечной массы",

        calorieCoefficient: 1.10,

        description: "Увеличение мышечной массы при тренировках"

    },


    preoperative: {

        name: "Подготовка к операции",

        calorieCoefficient: 1.0,

        description: "Оптимизация нутритивного статуса перед операцией"

    },


    rehabilitation: {

        name: "Реабилитация",

        calorieCoefficient: 1.10,

        description: "Восстановление после заболевания или операции"

    }

};

// Главная кнопка "Рассчитать"

function calculateAll() {

    // Основные расчеты
    let bmiResult = calculateBMI();
    let idealWeightResult = calculateIdealWeight();
    let correctedWeightResult = calculateCorrectedWeight();
    let bmrResult = calculateBMR();
    let earResult = calculateEAR();

    // Цель консультации
    let goal = document.getElementById("goal").value;

    // Категория пациента
    let patientCategory = document.getElementById("patientCategory").value;

    // Рекомендуемая калорийность
    let caloriesResult = calculateCalories(goal, patientCategory);

    // КБЖУ
    let macros = calculateMacros(goal, patientCategory);

    // Вывод результатов
    document.getElementById("result").innerHTML =

        "<h3>Результаты консультации</h3>" +

        "<b>ИМТ:</b> " + bmiResult.bmi.toFixed(1) + "<br>" +
        "<b>Категория ИМТ:</b> " + bmiResult.category + "<br><br>" +

        "<b>Идеальная масса:</b> " +
        Math.round(idealWeightResult) + " кг<br>" +

        "<b>Скорректированная масса:</b> " +
        Math.round(correctedWeightResult) + " кг<br><br>" +

        "<b>Основной обмен (BMR):</b> " +
        Math.round(bmrResult) + " ккал/сут<br>" +

        "<b>EAR:</b> " +
        Math.round(earResult) + " ккал/сут<br><br>" +

        "<b>Цель консультации:</b> " +
        consultationGoals[goal].name + "<br>" +

        "<b>Категория пациента:</b> " +
        nutritionRules[patientCategory].name + "<br><br>" +

        "<b>Рекомендуемая калорийность:</b> " +
        Math.round(caloriesResult.min) +
        " – " +
        Math.round(caloriesResult.max) +
        " ккал/сут<br><br>" +

        "<b>Белки:</b> " +
        Math.round(macros.proteinMin) +
        " – " +
        Math.round(macros.proteinMax) +
        " г<br>" +

        "<b>Жиры:</b> " +
        Math.round(macros.fatMin) +
        " – " +
        Math.round(macros.fatMax) +
        " г<br>" +

        "<b>Углеводы:</b> " +
        Math.round(macros.carbsMin) +
        " – " +
        Math.round(macros.carbsMax) +
        " г";

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

function calculateMacros(patientCategory) {

    let ear = calculateEAR();

    let weight = Number(document.getElementById("weight").value);


    // получаем нормы выбранной категории
    let rules = nutritionRules[patientCategory];


    // белок
    let protein = weight * rules.protein;


    // жиры
    let fatCalories = ear * (rules.fat / 100);

    let fat = fatCalories / 9;


    // калории белка
    let proteinCalories = protein * 4;


    // углеводы - остаток
    let carbsCalories = ear - proteinCalories - fatCalories;

    let carbs = carbsCalories / 4;


    return {
        protein: protein,
        fat: fat,
        carbs: carbs
    };

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
