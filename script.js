// ==========================================================
// NutriCalc — ОСНОВНОЙ ДВИЖОК
// ==========================================================


// ==========================================================
// ДАННЫЕ ПАЦИЕНТА
// ==========================================================

let patient = {

    name: "",

    age: "",

    height: 0,

    consultations: []

};



// ==========================================================
// КЛИНИЧЕСКИЕ ПРАВИЛА NutriCalc
// ==========================================================

let clinicalRules = {


    // ------------------------------------------------------
    // ЗДОРОВЫЙ ЧЕЛОВЕК
    // ------------------------------------------------------

    healthy: {

        name: "Здоровый человек",

        protein: [1.0, 1.2],

        fatPercent: 30

    },


    // ------------------------------------------------------
    // ОЖИРЕНИЕ БЕЗ ХБП
    // ------------------------------------------------------

    obesity: {

        name: "Ожирение без ХБП",

        protein: [1.2, 1.5],

        fatPercent: 30

    },


    // ------------------------------------------------------
    // ХБП 1–2
    // ------------------------------------------------------

    ckd12: {

        name: "ХБП 1–2 стадия",

        protein: [0.8, 1.0],

        fatPercent: 30

    },


    // ------------------------------------------------------
    // ХБП 3–4
    // ------------------------------------------------------

    ckd34: {

        name: "ХБП 3–4 стадия",

        protein: [0.6, 0.8],

        fatPercent: 30

    },


    // ------------------------------------------------------
    // ГЕМОДИАЛИЗ
    // ------------------------------------------------------

    dialysis: {

        name: "Гемодиализ",

        protein: [1.2, 1.4],

        fatPercent: 30

    },


    // ------------------------------------------------------
    // ОЖИРЕНИЕ + ХБП 1–2
    // ------------------------------------------------------

    ckd12_obesity: {

        name: "Ожирение + ХБП 1–2 стадия",

        protein: [0.8, 1.0],

        fatPercent: 30

    },


    // ------------------------------------------------------
    // ОЖИРЕНИЕ + ХБП 3–4
    // ------------------------------------------------------

    ckd34_obesity: {

        name: "Ожирение + ХБП 3–4 стадия",

        protein: [0.6, 0.8],

        fatPercent: 30

    },


    // ------------------------------------------------------
    // ОЖИРЕНИЕ + ГЕМОДИАЛИЗ
    // ------------------------------------------------------

    dialysis_obesity: {

        name: "Ожирение + гемодиализ",

        protein: [1.2, 1.4],

        fatPercent: 30

    },


    // ------------------------------------------------------
    // ЦИРРОЗ
    // ------------------------------------------------------

    cirrhosis: {

        name: "Цирроз печени",

        protein: null,

        fatPercent: 30

    },


    // ------------------------------------------------------
    // БЕРЕМЕННОСТЬ
    // ------------------------------------------------------

    pregnancy: {

        name: "Беременность",

        protein: null,

        fatPercent: 30

    },


    // ------------------------------------------------------
    // ГРУДНОЕ ВСКАРМЛИВАНИЕ
    // ------------------------------------------------------

    lactation: {

        name: "Грудное вскармливание",

        protein: null,

        fatPercent: 30

    },


    // ------------------------------------------------------
    // ХОБЛ
    // ------------------------------------------------------

    copd: {

        name: "ХОБЛ",

        protein: [1.2, 1.5],

        fatPercent: 30

    },


    // ------------------------------------------------------
    // НЕДОСТАТОЧНАЯ МАССА / АНОРЕКСИЯ
    // ------------------------------------------------------

    anorexia: {

        name: "Недостаточная масса тела",

        protein: [1.2, 1.5],

        fatPercent: 30

    }

};



// ==========================================================
// ЦЕЛИ КОНСУЛЬТАЦИИ
// ==========================================================

let consultationModes = {


    // ------------------------------------------------------
    // ПОДДЕРЖАНИЕ
    // ------------------------------------------------------

    maintain: {

        name: "Поддержание массы тела",

        reduction: 0

    },


    // ------------------------------------------------------
    // СНИЖЕНИЕ НА 15%
    // ------------------------------------------------------

    loss15: {

        name: "Снижение энергетической ценности на 15%",

        reduction: 0.15

    },


    // ------------------------------------------------------
    // СНИЖЕНИЕ НА 20%
    // ------------------------------------------------------

    loss20: {

        name: "Снижение энергетической ценности на 20%",

        reduction: 0.20

    },


    // ------------------------------------------------------
    // НАБОР МАССЫ
    // ------------------------------------------------------

    weightGain: {

        name: "Набор массы",

        increase: 0.15

    },


    // ------------------------------------------------------
    // НАБОР МЫШЦ
    // ------------------------------------------------------

    muscleGain: {

        name: "Набор мышц",

        increase: 0.10

    }

};



// ==========================================================
// ГЛАВНАЯ ФУНКЦИЯ
// ==========================================================

function calculateAll() {


    // ------------------------------------------------------
    // Основные расчёты
    // ------------------------------------------------------

    let bmiResult =
        getBMI();


    let idealWeightResult =
        calculateIdealWeight();


    let correctedWeightResult =
        calculateCorrectedWeight();


    let bmrResult =
        calculateBMR();


    let earResult =
        calculateEAR();


    // ------------------------------------------------------
    // Категория пациента
    // ------------------------------------------------------

    let patientCategoryElement =
        document.getElementById("patientCategory");


    let patientCategory =
        patientCategoryElement
            ? patientCategoryElement.value
            : "healthy";


    // ------------------------------------------------------
    // Цель
    // ------------------------------------------------------

    let goalElement =
        document.getElementById("goal");


    let goal =
        goalElement
            ? goalElement.value
            : "maintain";


    // ------------------------------------------------------
    // Расчёт КБЖУ
    // ------------------------------------------------------

    let macros =
        calculateMacros(
            goal,
            patientCategory
        );


    // ------------------------------------------------------
    // Сохраняем консультацию
    // ------------------------------------------------------

    saveConsultation();


    // ------------------------------------------------------
    // Формируем результат
    // ------------------------------------------------------

    let resultHTML =

        "<h3>Результаты консультации</h3>" +


        "<b>Категория пациента:</b> " +
        (
            clinicalRules[patientCategory]
                ? clinicalRules[patientCategory].name
                : "-"
        ) +

        "<br>" +


        "<b>Цель:</b> " +
        (
            consultationModes[goal]
                ? consultationModes[goal].name
                : "-"
        ) +

        "<br><br>" +


        "<b>ИМТ:</b> " +
        bmiResult.bmi.toFixed(1) +

        "<br>" +


        "<b>Категория ИМТ:</b> " +
        bmiResult.category +

        "<br><br>" +


        "<b>Идеальная масса:</b> " +
        Math.round(idealWeightResult) +
        " кг" +

        "<br>" +


        "<b>Скорректированная масса:</b> " +
        Math.round(correctedWeightResult) +
        " кг" +

        "<br><br>" +


        "<b>BMR:</b> " +
        Math.round(bmrResult) +
        " ккал/сут" +

        "<br>" +


        "<b>EAR:</b> " +
        Math.round(earResult) +
        " ккал/сут" +

        "<br><br>";


    // ------------------------------------------------------
    // ЭНЕРГИЯ
    // ------------------------------------------------------

    if (macros && macros.energy) {


        resultHTML +=

            "<b>Энергетическая ценность:</b><br>" +


            "По скорректированной массе: " +
            Math.round(macros.energy.baseMin) +
            " ккал/сут" +

            "<br>" +


            "По фактической массе: " +
            Math.round(macros.energy.baseMax) +
            " ккал/сут" +

            "<br>" +


            "Расчётный диапазон: " +
            Math.round(macros.energy.baseMin) +
            "–" +
            Math.round(macros.energy.baseMax) +
            " ккал/сут" +

            "<br>";


        if (macros.energy.reduction > 0) {


            resultHTML +=

                "После снижения на " +
                Math.round(
                    macros.energy.reduction * 100
                ) +
                "%: " +

                Math.round(
                    macros.energy.caloriesMin
                ) +

                "–" +

                Math.round(
                    macros.energy.caloriesMax
                ) +

                " ккал/сут" +

                "<br>";

        }


        resultHTML +=

            "<br>";

    }



    // ------------------------------------------------------
    // БЕЛОК
    // ------------------------------------------------------

    if (macros && macros.protein) {


        let p =
            macros.protein;


        resultHTML +=

            "<b>Белок:</b><br>" +


            "Скорректированная масса " +
            p.correctedWeight +
            " кг × " +
            p.proteinLow +
            " г/кг = " +
            p.correctedLow +
            " г/сут" +

            "<br>" +


            "Скорректированная масса " +
            p.correctedWeight +
            " кг × " +
            p.proteinHigh +
            " г/кг = " +
            p.correctedHigh +
            " г/сут" +

            "<br>" +


            "Фактическая масса " +
            p.actualWeight +
            " кг × " +
            p.proteinLow +
            " г/кг = " +
            p.actualLow +
            " г/сут" +

            "<br>" +


            "Фактическая масса " +
            p.actualWeight +
            " кг × " +
            p.proteinHigh +
            " г/кг = " +
            p.actualHigh +
            " г/сут" +

            "<br>" +


            "<b>Расчётный диапазон белка: </b>" +
            p.min +
            "–" +
            p.max +
            " г/сут" +

            "<br><br>" +


            "<b>Окончательное количество белка выбирает врач.</b>" +

            "<br><br>";

    }



    // ------------------------------------------------------
    // ЖИРЫ
    // ------------------------------------------------------

    if (macros && macros.fat) {


        resultHTML +=

            "<b>Жиры:</b> " +

            macros.fat.min +
            "–" +
            macros.fat.max +
            " г/сут" +

            " (" +
            macros.fat.percent +
            "% энергии)" +

            "<br>";

    }



    // ------------------------------------------------------
    // УГЛЕВОДЫ
    // ------------------------------------------------------

    if (macros && macros.carbohydrates) {


        resultHTML +=

            "<b>Углеводы:</b> " +

            macros.carbohydrates.min +
            "–" +
            macros.carbohydrates.max +
            " г/сут";

    }



    // ------------------------------------------------------
    // Вывод
    // ------------------------------------------------------

    document.getElementById("result").innerHTML =
        resultHTML;

}



// ==========================================================
// ИМТ
// ==========================================================

function getBMI() {


    let weight =
        Number(
            document.getElementById("weight").value
        );


    let heightCm =
        Number(
            document.getElementById("height").value
        );


    if (!weight || !heightCm) {


        return {

            bmi: 0,

            category: "Нет данных"

        };

    }


    let heightM =
        heightCm / 100;


    let bmi =
        weight /
        (heightM * heightM);


    let category = "";


    if (bmi < 18.5) {

        category =
            "Недостаточный вес";

    }

    else if (bmi < 25) {

        category =
            "Нормальный вес";

    }

    else if (bmi < 30) {

        category =
            "Избыточный вес";

    }

    else if (bmi < 35) {

        category =
            "Ожирение I степени";

    }

    else if (bmi < 40) {

        category =
            "Ожирение II степени";

    }

    else {

        category =
            "Ожирение III степени";

    }


    return {

        bmi: bmi,

        category: category

    };

}



// ==========================================================
// СОХРАНЕНИЕ КОНСУЛЬТАЦИИ
// ==========================================================

function saveConsultation() {


    let weight =
        Number(
            document.getElementById("weight").value
        );


    let height =
        Number(
            document.getElementById("height").value
        );


    let waist =
        Number(
            document.getElementById("waist").value
        );


    let hips =
        Number(
            document.getElementById("hips").value
        );


    let shoulders =
        Number(
            document.getElementById("shoulders").value
        );


    let bmiResult =
        getBMI();


    patient.height =
        height;


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



// ==========================================================
// ОСНОВНОЙ ОБМЕН BMR
// ==========================================================

function calculateBMR() {


    let weight =
        Number(
            document.getElementById("weight").value
        );


    let heightCm =
        Number(
            document.getElementById("height").value
        );


    let age =
        Number(
            document.getElementById("age").value
        );


    let genderElement =
        document.getElementById("gender");


    let gender =
        genderElement
            ? genderElement.value
            : "female";


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


    return bmr;

}



// ==========================================================
// EAR
// ==========================================================

function calculateEAR() {


    let bmr =
        calculateBMR();


    let activityElement =
        document.getElementById("activity");


    let activity =
        1.2;


    if (activityElement) {


        activity =
            Number(
                activityElement.value
            ) || 1.2;

    }


    return bmr * activity;

}



// ==========================================================
// EAR ДЛЯ КОНКРЕТНОЙ МАССЫ
// ==========================================================

function calculateEARForWeight(weight) {


    let heightCm =
        Number(
            document.getElementById("height").value
        );


    let age =
        Number(
            document.getElementById("age").value
        );


    let genderElement =
        document.getElementById("gender");


    let gender =
        genderElement
            ? genderElement.value
            : "female";


    let activityElement =
        document.getElementById("activity");


    let activity =
        activityElement
            ? Number(activityElement.value) || 1.2
            : 1.2;


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


    return bmr * activity;

}



// ==========================================================
// ИДЕАЛЬНЫЙ ВЕС — DEVINE
// ==========================================================

function calculateIdealWeight() {


    let heightCm =
        Number(
            document.getElementById("height").value
        );


    let genderElement =
        document.getElementById("gender");


    let gender =
        genderElement
            ? genderElement.value
            : "female";


    let devine;


    if (gender === "male") {


        devine =

            50 +
            0.9 *
            (heightCm - 152.4);

    }

    else {


        devine =

            45.5 +
            0.9 *
            (heightCm - 152.4);

    }


    return devine;

}



// ==========================================================
// СКОРРЕКТИРОВАННАЯ МАССА
// ==========================================================

function calculateCorrectedWeight() {


    let actualWeight =
        Number(
            document.getElementById("weight").value
        );


    let idealWeight =
        calculateIdealWeight();


    let corrected =

        idealWeight +

        0.4 *
        (actualWeight - idealWeight);


    return corrected;

}



// ==========================================================
// ПОЛУЧЕНИЕ МАССЫ
// ==========================================================

function getPatientWeights() {


    let actualWeight =
        Number(
            document.getElementById("weight").value
        );


    if (!actualWeight || actualWeight <= 0) {

        return null;

    }


    let correctedWeight =
        calculateCorrectedWeight();


    if (
        !correctedWeight ||
        correctedWeight <= 0
    ) {

        correctedWeight =
            actualWeight;

    }


    return {

        actual:
            actualWeight,

        corrected:
            correctedWeight

    };

}



// ==========================================================
// РАСЧЁТ ЭНЕРГИИ
// ==========================================================

function calculateCalories(
    goal,
    patientCategory
) {


    let mode =
        consultationModes[goal];


    if (!mode) {

        mode =
            consultationModes.maintain;

    }


    let weights =
        getPatientWeights();


    if (!weights) {

        return null;

    }


    // ------------------------------------------------------
    // EAR по скорректированной массе
    // ------------------------------------------------------

    let EARCorrected =
        calculateEARForWeight(
            weights.corrected
        );


    // ------------------------------------------------------
    // EAR по фактической массе
    // ------------------------------------------------------

    let EARActual =
        calculateEARForWeight(
            weights.actual
        );


    // ------------------------------------------------------
    // Начальный диапазон
    // ------------------------------------------------------

    let baseMin =
        Math.min(
            EARCorrected,
            EARActual
        );


    let baseMax =
        Math.max(
            EARCorrected,
            EARActual
        );


    // ------------------------------------------------------
    // Дефицит
    // ------------------------------------------------------

    let reduction =
        mode.reduction || 0;


    let increase =
        mode.increase || 0;


    let caloriesMin;


    let caloriesMax;


    if (reduction > 0) {


        caloriesMin =
            baseMin *
            (1 - reduction);


        caloriesMax =
            baseMax *
            (1 - reduction);

    }

    else if (increase > 0) {


        caloriesMin =
            baseMin *
            (1 + increase);


        caloriesMax =
            baseMax *
            (1 + increase);

    }

    else {


        caloriesMin =
            baseMin;


        caloriesMax =
            baseMax;

    }


    return {


        baseMin:
            Math.round(baseMin),


        baseMax:
            Math.round(baseMax),


        correctedEAR:
            Math.round(EARCorrected),


        actualEAR:
            Math.round(EARActual),


        caloriesMin:
            Math.round(caloriesMin),


        caloriesMax:
            Math.round(caloriesMax),


        reduction:
            reduction

    };

}



// ==========================================================
// РАСЧЁТ БЕЛКА
// ==========================================================

function calculateProtein(
    patientCategory
) {


    let rules =
        clinicalRules[
            patientCategory
        ];


    if (!rules || !rules.protein) {

        return null;

    }


    let weights =
        getPatientWeights();


    if (!weights) {

        return null;

    }


    let correctedWeight =
        weights.corrected;


    let actualWeight =
        weights.actual;


    let proteinLow =
        rules.protein[0];


    let proteinHigh =
        rules.protein[1];


    // ------------------------------------------------------
    // 1. Скорректированная масса × нижняя норма
    // ------------------------------------------------------

    let correctedLow =

        correctedWeight *
        proteinLow;


    // ------------------------------------------------------
    // 2. Скорректированная масса × верхняя норма
    // ------------------------------------------------------

    let correctedHigh =

        correctedWeight *
        proteinHigh;


    // ------------------------------------------------------
    // 3. Фактическая масса × нижняя норма
    // ------------------------------------------------------

    let actualLow =

        actualWeight *
        proteinLow;


    // ------------------------------------------------------
    // 4. Фактическая масса × верхняя норма
    // ------------------------------------------------------

    let actualHigh =

        actualWeight *
        proteinHigh;


    // ------------------------------------------------------
    // Общие границы
    // ------------------------------------------------------

    let proteinMin =

        Math.min(

            correctedLow,

            correctedHigh,

            actualLow,

            actualHigh

        );


    let proteinMax =

        Math.max(

            correctedLow,

            correctedHigh,

            actualLow,

            actualHigh

        );


    return {


        correctedWeight:
            Math.round(correctedWeight),


        actualWeight:
            Math.round(actualWeight),


        proteinLow:
            proteinLow,


        proteinHigh:
            proteinHigh,


        correctedLow:
            Math.round(correctedLow),


        correctedHigh:
            Math.round(correctedHigh),


        actualLow:
            Math.round(actualLow),


        actualHigh:
            Math.round(actualHigh),


        min:
            Math.round(proteinMin),


        max:
            Math.round(proteinMax)

    };

}



// ==========================================================
// РАСЧЁТ КБЖУ
// ==========================================================

function calculateMacros(
    goal,
    patientCategory
) {


    let rules =
        clinicalRules[
            patientCategory
        ];


    if (!rules) {

        rules =
            clinicalRules.healthy;

    }


    // ------------------------------------------------------
    // Энергия
    // ------------------------------------------------------

    let energy =
        calculateCalories(
            goal,
            patientCategory
        );


    if (!energy) {

        return null;

    }


    // ------------------------------------------------------
    // Белок
    // ------------------------------------------------------

    let protein =
        calculateProtein(
            patientCategory
        );


    // ------------------------------------------------------
    // ЖИРЫ
    // ------------------------------------------------------

    let fatPercent =
        rules.fatPercent;


    let fatMin =

        (
            energy.caloriesMin *
            fatPercent /
            100
        ) / 9;


    let fatMax =

        (
            energy.caloriesMax *
            fatPercent /
            100
        ) / 9;


    fatMin =
        Math.round(fatMin);


    fatMax =
        Math.round(fatMax);


    // ------------------------------------------------------
    // УГЛЕВОДЫ
    // ------------------------------------------------------

    let carbsMin =
        null;


    let carbsMax =
        null;


    if (protein) {


        let carbValues = [];


        let caloriesValues = [

            energy.caloriesMin,

            energy.caloriesMax

        ];


        let proteinValues = [

            protein.min,

            protein.max

        ];


        for (
            let i = 0;
            i < caloriesValues.length;
            i++
        ) {


            for (
                let j = 0;
                j < proteinValues.length;
                j++
            ) {


                let calories =
                    caloriesValues[i];


                let proteinGrams =
                    proteinValues[j];


                let fatGrams =

                    (
                        calories *
                        fatPercent /
                        100
                    ) / 9;


                let carbohydrates =

                    (
                        calories -

                        proteinGrams * 4 -

                        fatGrams * 9

                    ) / 4;


                carbValues.push(
                    carbohydrates
                );

            }

        }


        carbsMin =
            Math.round(
                Math.min(...carbValues)
            );


        carbsMax =
            Math.round(
                Math.max(...carbValues)
            );

    }


    return {


        energy:
            energy,


        protein:
            protein,


        fat: {

            percent:
                fatPercent,

            min:
                fatMin,

            max:
                fatMax

        },


        carbohydrates: {

            min:
                carbsMin,

            max:
                carbsMax

        }

    };

}



// ==========================================================
// ИСТОРИЯ КОНСУЛЬТАЦИЙ
// ==========================================================

function showConsultation() {


    let historyElement =
        document.getElementById("history");


    if (!historyElement) {

        return;

    }


    if (
        patient.consultations.length === 0
    ) {


        historyElement.innerHTML =

            "История консультаций пока пустая";


        return;

    }


    let text = "";


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


    historyElement.innerHTML =
        text;

}



// ==========================================================
// ПЕЧАТЬ КОНСУЛЬТАЦИИ
// ==========================================================

function printConsultation() {


    let resultElement =
        document.getElementById("result");


    let resultText =
        resultElement
            ? resultElement.innerText
            : "";


    let report =

        "NutriCalc\n" +

        "Отчёт консультации\n\n" +

        "Дата: " +

        new Date().toLocaleDateString() +

        "\n\n" +

        resultText;


    let win =
        window.open("");


    if (!win) {

        return;

    }


    win.document.write(

        "<pre style='font-family: Arial; white-space: pre-wrap;'>" +

        report +

        "</pre>"

    );


    win.print();

}



// ==========================================================
// ГРАФИК — ПОКА ЗАГЛУШКА
// ==========================================================

function showGraph() {


    alert(
        "График ИМТ добавим следующим этапом"
    );

}
