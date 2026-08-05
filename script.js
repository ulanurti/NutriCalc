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
        calories: [25, 30],
        protein: [0.8, 1.0],
        fatPercent: [25, 35]
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



// ===============================
// Цели консультации
// ===============================

let consultationModes = {

    maintain: {
        name: "Поддержание массы тела",
        calorieCoefficient: 1
    },


    weightLoss: {
        name: "Снижение веса",
        calorieCoefficient: 0.8
    },


    weightGain: {
        name: "Набор массы",
        calorieCoefficient: 1.15
    },


    muscleGain: {
        name: "Набор мышц",
        calorieCoefficient: 1.1
    }

};



// ===============================
// Главная функция
// ===============================

function calculateAll() {

    let bmiResult = getBMI();

    let idealWeightResult = calculateIdealWeight();

    let correctedWeightResult = calculateCorrectedWeight();

    let bmrResult = calculateBMR();

    let earResult = calculateEAR();


    let goal = "maintain";


    let patientCategory =
    document.getElementById("patientCategory").value;


    let caloriesResult =
    calculateCalories(goal, patientCategory);


    let macros =
    calculateMacros(goal, patientCategory);



    saveConsultation();



    document.getElementById("result").innerHTML =

    "<h3>Результаты консультации</h3>" +

    "<b>ИМТ:</b> " +
    bmiResult.bmi.toFixed(1) +

    "<br>" +

    "<b>Категория:</b> " +
    bmiResult.category +

    "<br><br>" +

    "<b>Идеальная масса:</b> " +
    Math.round(idealWeightResult) +
    " кг<br>" +

    "<b>Скорректированная масса:</b> " +
    Math.round(correctedWeightResult) +
    " кг<br><br>" +

    "<b>BMR:</b> " +
    Math.round(bmrResult) +
    " ккал/сут<br>" +

    "<b>EAR:</b> " +
    Math.round(earResult) +
    " ккал/сут<br><br>" +

    "<b>Калории:</b> " +
    Math.round(caloriesResult.min) +
    " - " +
    Math.round(caloriesResult.max) +
    " ккал<br><br>" +

    "<b>Белки:</b> " +
    Math.round(macros.proteinMin) +
    " - " +
    Math.round(macros.proteinMax) +
    " г<br>" +

    "<b>Жиры:</b> " +
    Math.round(macros.fatMin) +
    " - " +
    Math.round(macros.fatMax) +
    " г<br>" +

    "<b>Углеводы:</b> " +
    Math.round(macros.carbsMin) +
    " - " +
    Math.round(macros.carbsMax) +
    " г";

}
// ===============================
// Получение ИМТ без записи в историю
// ===============================

function getBMI() {

    let weight =
    Number(document.getElementById("weight").value);

    let heightCm =
    Number(document.getElementById("height").value);


    if (!weight || !heightCm) {

        return {
            bmi: 0,
            category: "Нет данных"
        };

    }


    let heightM = heightCm / 100;


    let bmi = weight / (heightM * heightM);


    let category = "";


    if (bmi < 18.5) {

        category = "Недостаточный вес";

    } else if (bmi < 25) {

        category = "Нормальный вес";

    } else if (bmi < 30) {

        category = "Избыточный вес";

    } else if (bmi < 35) {

        category = "Ожирение I степени";

    } else if (bmi < 40) {

        category = "Ожирение II степени";

    } else {

        category = "Ожирение III степени";

    }


    return {

        bmi: bmi,

        category: category

    };

}




// ===============================
// Сохранение консультации
// ===============================

function saveConsultation() {


    let weight =
    Number(document.getElementById("weight").value);


    let height =
    Number(document.getElementById("height").value);


    let waist =
    Number(document.getElementById("waist").value);


    let hips =
    Number(document.getElementById("hips").value);


    let shoulders =
    Number(document.getElementById("shoulders").value);



    let bmiResult = getBMI();



    patient.height = height;



    patient.consultations.push({

        date: new Date(),

        weight: weight,

        height: height,

        waist: waist,

        hips: hips,

        shoulders: shoulders,

        bmi: bmiResult.bmi

    });


}





// ===============================
// Основной обмен BMR
// ===============================

function calculateBMR() {


    let weight =
    Number(document.getElementById("weight").value);


    let heightCm =
    Number(document.getElementById("height").value);


    let age =
    Number(document.getElementById("age").value);


    let gender =
    document.getElementById("gender").value;



    let bmr;



    if (gender === "male") {


        bmr =
        10 * weight +
        6.25 * heightCm -
        5 * age +
        5;


    } else {


        bmr =
        10 * weight +
        6.25 * heightCm -
        5 * age -
        161;


    }


    return bmr;

}





// ===============================
// Суточная потребность EAR
// ===============================

function calculateEAR() {


    let bmr = calculateBMR();



    let activityElement =
    document.getElementById("activity");



    let activity = 1.2;



    if (activityElement) {

        activity =
        Number(activityElement.value) || 1.2;

    }



    return bmr * activity;


}

// ===============================
// Идеальный вес (формула Devine)
// ===============================

function calculateIdealWeight() {


    let heightCm =
    Number(document.getElementById("height").value);


    let gender =
    document.getElementById("gender").value;


    let devine;



    if (gender === "male") {


        devine =
        50 + 0.9 * (heightCm - 152.4);


    } else {


        devine =
        45.5 + 0.9 * (heightCm - 152.4);


    }



    return devine;

}




// ===============================
// Скорректированная масса тела
// ===============================

function calculateCorrectedWeight() {


    let actualWeight =
    Number(document.getElementById("weight").value);



    let idealWeight =
    calculateIdealWeight();



    let corrected =

    idealWeight +
    0.4 * (actualWeight - idealWeight);



    return corrected;

}




// ===============================
// Расчёт калорий
// ===============================

function calculateCalories(goal, patientCategory) {


    let rules =
    nutritionRules[patientCategory];


    let mode =
    consultationModes[goal];



    if (!rules) {

        rules = nutritionRules.healthy;

    }



    if (!mode) {

        mode = consultationModes.maintain;

    }



    let weight =
    Number(document.getElementById("weight").value);



    if (rules.weightType === "corrected") {

        weight =
        calculateCorrectedWeight();

    }



    let minCalories =
    rules.calories[0] * weight;


    let maxCalories =
    rules.calories[1] * weight;



    minCalories =
    minCalories * mode.calorieCoefficient;


    maxCalories =
    maxCalories * mode.calorieCoefficient;



    return {

        min: minCalories,

        max: maxCalories

    };

}





// ===============================
// Расчёт КБЖУ
// ===============================

function calculateMacros(goal, patientCategory) {


    let rules =
    nutritionRules[patientCategory];



    if (!rules) {

        rules =
        nutritionRules.healthy;

    }



    let weight =
    Number(document.getElementById("weight").value);



    let calories =
    calculateCalories(goal, patientCategory);



    let proteinMin =
    weight * rules.protein[0];


    let proteinMax =
    weight * rules.protein[1];



    let fatMin =

    calories.min *
    rules.fatPercent[0] /
    100 /
    9;



    let fatMax =

    calories.max *
    rules.fatPercent[1] /
    100 /
    9;




    let carbsMin =

    (calories.min -
    proteinMin * 4 -
    fatMin * 9) / 4;



    let carbsMax =

    (calories.max -
    proteinMax * 4 -
    fatMax * 9) / 4;




    return {


        proteinMin: proteinMin,

        proteinMax: proteinMax,


        fatMin: fatMin,

        fatMax: fatMax,


        carbsMin: carbsMin,

        carbsMax: carbsMax

    };


}

// ===============================
// История консультаций
// ===============================

function showConsultation() {


    let text = "";



    if (patient.consultations.length === 0) {


        document.getElementById("history").innerHTML =
        "История консультаций пока пустая";


        return;

    }



    for (
        let i = 0;
        i < patient.consultations.length;
        i++
    ) {


        let c =
        patient.consultations[i];



        text +=


        "<b>Консультация " +
        (i + 1) +
        "</b><br>" +


        "Дата: " +
        c.date.toLocaleDateString() +
        "<br>" +


        "Вес: " +
        c.weight +
        " кг<br>" +


        "Рост: " +
        c.height +
        " см<br>" +


        "ИМТ: " +
        c.bmi.toFixed(1) +
        "<br>" +


        "Талия: " +
        c.waist +
        " см<br>" +


        "Бёдра: " +
        c.hips +
        " см<br>" +


        "Плечо: " +
        c.shoulders +
        " см<br><br>";

    }



    document.getElementById("history").innerHTML =
    text;


}
function printConsultation() {

    let report =
`
NutriCalc
Отчёт консультации

Дата:
${new Date().toLocaleDateString()}


${document.getElementById("result").innerText}


`;

    let win = window.open("");

    win.document.write(
        "<pre>" + report + "</pre>"
    );

    win.print();

}




// ===============================
// График (пока заглушка)
// ===============================

function showGraph() {


    alert(
    "График ИМТ добавим следующим этапом"
    );


}
