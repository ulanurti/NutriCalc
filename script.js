// ==========================================================
// NutriCalc
// ДВИЖОК РАСЧЁТОВ ПИТАНИЯ
// Новая логика:
// BMR (Миффлин + Харрис) → EAR → цель → КБЖУ
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
// КЛИНИЧЕСКИЕ ПРАВИЛА
// ==========================================================
//
// ВАЖНО:
//
// Энергетическая ценность НЕ считается по ккал/кг.
//
// Энергия:
// фактическая масса тела
// ↓
// BMR
// ↓
// EAR
// ↓
// коррекция цели
//
// Белок:
// фактическая + скорректированная масса тела
//
// Жиры:
// 30% энергии
//
// Углеводы:
// остаток энергии
// ==========================================================


let nutritionRules = {



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

        name: "Ожирение",

        protein: [1.2, 1.5],

        fatPercent: 30

    },



    // ------------------------------------------------------
    // ХБП 1-2 СТАДИЯ
    // ------------------------------------------------------

    ckd12: {

        name: "ХБП 1-2 стадия",

        protein: [0.8, 1.0],

        fatPercent: 30

    },



    // ------------------------------------------------------
    // ХБП 3-4 СТАДИЯ
    // ------------------------------------------------------

    ckd34: {

        name: "ХБП 3-4 стадия",

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
    // ЦИРРОЗ ПЕЧЕНИ
    // ------------------------------------------------------

    cirrhosis: {

        name: "Цирроз печени",

        protein: [1.2, 1.5],

        fatPercent: 30

    },



    // ------------------------------------------------------
    // БЕРЕМЕННОСТЬ
    // ------------------------------------------------------

    pregnancy: {

        name: "Беременность",

        protein: [1.1, 1.3],

        fatPercent: 30

    },



    // ------------------------------------------------------
    // ГРУДНОЕ ВСКАРМЛИВАНИЕ
    // ------------------------------------------------------

    lactation: {

        name: "Грудное вскармливание",

        protein: [1.1, 1.3],

        fatPercent: 30

    },



    // ------------------------------------------------------
    // ХОБЛ
    // ------------------------------------------------------

    copd: {

        name: "ХОБЛ",

        protein: [1.2, 1.5],

        fatPercent: 30

    }

};
// ==========================================================
// ЦЕЛИ КОНСУЛЬТАЦИИ
// ==========================================================
//
// Дефицит считается от EAR:
//
// - поддержание: 0%
//
// - снижение 15%:
//   EAR - 15%
//
// - снижение 20%:
//   EAR - 20%
//
// - набор массы:
//   увеличение EAR на заданный процент
// ==========================================================


let consultationModes = {


    maintain: {

        name: "Поддержание массы тела",

        reduction: 0,

        increase: 0

    },


    weightLoss15: {

        name: "Снижение массы тела на 15%",

        reduction: 0.15,

        increase: 0

    },


    weightLoss20: {

        name: "Снижение массы тела на 20%",

        reduction: 0.20,

        increase: 0

    },


    weightGain: {

        name: "Набор массы тела",

        reduction: 0,

        increase: 0.15

    }


};



// ==========================================================
// ПОЛУЧЕНИЕ ДАННЫХ ПАЦИЕНТА
// ==========================================================


function getPatientData() {


    let weight =
        Number(
            document.getElementById("weight")?.value
        );


    let height =
        Number(
            document.getElementById("height")?.value
        );


    let age =
        Number(
            document.getElementById("age")?.value
        );


    let gender =
        document.getElementById("gender")?.value;



    if (

        !weight ||
        !height ||
        !age

    ) {


        return null;


    }



    return {


        weight: weight,

        height: height,

        age: age,

        gender: gender


    };


}





// ==========================================================
// ОСНОВНОЙ ОБМЕН
// МИФФЛИН — САН ЖЕОР
// ==========================================================


function calculateBMRMifflin() {


    let data =
        getPatientData();



    if (!data) {


        return 0;


    }



    let bmr;



    if (data.gender === "male") {



        bmr =

            10 * data.weight +

            6.25 * data.height -

            5 * data.age +

            5;



    }

    else {



        bmr =

            10 * data.weight +

            6.25 * data.height -

            5 * data.age -

            161;


    }



    return bmr;


}





// ==========================================================
// ОСНОВНОЙ ОБМЕН
// ХАРРИС — БЕНЕДИКТ
// ==========================================================


function calculateBMRHarris() {


    let data =
        getPatientData();



    if (!data) {


        return 0;


    }



    let bmr;



    if (data.gender === "male") {



        bmr =

            66.5 +

            13.75 * data.weight +

            5.003 * data.height -

            6.755 * data.age;



    }

    else {



        bmr =

            655.1 +

            9.563 * data.weight +

            1.850 * data.height -

            4.676 * data.age;



    }



    return bmr;


}
// ==========================================================
// КОЭФФИЦИЕНТ ФИЗИЧЕСКОЙ АКТИВНОСТИ
// ==========================================================

function getActivityCoefficient() {


    let activityElement =
        document.getElementById("activity");


    let activity = 1.2;


    if (activityElement) {


        activity =
            Number(activityElement.value) || 1.2;


    }


    return activity;

}





// ==========================================================
// РАСЧЁТ EAR
// По двум формулам BMR
//
// Возвращает диапазон:
// EAR min — EAR max
// ==========================================================


function calculateEAR() {


    let bmrMifflin =
        calculateBMRMifflin();



    let bmrHarris =
        calculateBMRHarris();



    let activity =
        getActivityCoefficient();



    let earMifflin =
        bmrMifflin * activity;



    let earHarris =
        bmrHarris * activity;




    return {


        mifflin:

            Math.round(earMifflin),



        harris:

            Math.round(earHarris),



        min:

            Math.round(
                Math.min(
                    earMifflin,
                    earHarris
                )
            ),



        max:

            Math.round(
                Math.max(
                    earMifflin,
                    earHarris
                )
            )

    };


}





// ==========================================================
// ЭНЕРГЕТИЧЕСКАЯ ЦЕННОСТЬ С УЧЁТОМ ЦЕЛИ
// ==========================================================
//
// Сначала получаем EAR диапазон.
//
// Затем:
// дефицит = процент от EAR.
//
// Например:
// EAR 1600-1800
//
// 15%:
// дефицит 240-270 ккал
//
// итог:
// 1360-1530 ккал
// ==========================================================


function calculateEnergy(goal) {


    let mode =
        consultationModes[goal];



    if (!mode) {


        mode =
            consultationModes.maintain;


    }



    let EAR =
        calculateEAR();




    let deficitMin =

        EAR.min *
        mode.reduction;



    let deficitMax =

        EAR.max *
        mode.reduction;




    let increaseMin =

        EAR.min *
        mode.increase;



    let increaseMax =

        EAR.max *
        mode.increase;





    let caloriesMin =

        EAR.min -
        deficitMin +
        increaseMin;



    let caloriesMax =

        EAR.max -
        deficitMax +
        increaseMax;





    return {


        EARmin:

            EAR.min,


        EARmax:

            EAR.max,



        deficitMin:

            Math.round(deficitMin),



        deficitMax:

            Math.round(deficitMax),



        caloriesMin:

            Math.round(caloriesMin),



        caloriesMax:

            Math.round(caloriesMax)

    };


}
// ==========================================================
// ИДЕАЛЬНАЯ МАССА
// Формула Devine
// ==========================================================


function calculateIdealWeight() {


    let heightCm =

        Number(
            document.getElementById("height")?.value
        );


    let gender =

        document.getElementById("gender")?.value;



    if (!heightCm) {


        return 0;


    }



    let idealWeight;



    if (gender === "male") {


        idealWeight =

            50 +
            0.9 *
            (heightCm - 152.4);



    }

    else {


        idealWeight =

            45.5 +
            0.9 *
            (heightCm - 152.4);



    }



    return idealWeight;


}





// ==========================================================
// СКОРРЕКТИРОВАННАЯ МАССА ТЕЛА
//
// Формула:
// идеальная масса +
// 0.4 × (фактическая - идеальная)
// ==========================================================


function calculateCorrectedWeight() {


    let actualWeight =

        Number(
            document.getElementById("weight")?.value
        );



    let idealWeight =

        calculateIdealWeight();



    if (
        !actualWeight ||
        !idealWeight
    ) {


        return actualWeight;


    }



    let corrected =


        idealWeight +

        0.4 *

        (
            actualWeight -
            idealWeight
        );



    return corrected;


}





// ==========================================================
// ПОЛУЧЕНИЕ ДВУХ МАСС
// Для расчёта белка
// ==========================================================


function getPatientWeights() {


    let actual =


        Number(
            document.getElementById("weight")?.value
        );



    let corrected =


        Number(
            calculateCorrectedWeight()
        );



    if (!corrected) {


        corrected = actual;


    }



    return {


        actual: actual,


        corrected: corrected


    };


}





// ==========================================================
// РАСЧЁТ БЕЛКА
//
// Белок считается:
// 1. по фактической массе
// 2. по скорректированной массе
//
// Врач выбирает значение из диапазона.
// ==========================================================


function calculateProtein(patientCategory) {


    let rule =

        nutritionRules[patientCategory];



    if (!rule) {


        rule =
            nutritionRules.healthy;


    }



    let weights =

        getPatientWeights();




    let proteinMin =

        rule.protein[0];



    let proteinMax =

        rule.protein[1];





    // -------------------------------
    // Фактическая масса
    // -------------------------------


    let actualLow =

        weights.actual *
        proteinMin;



    let actualHigh =

        weights.actual *
        proteinMax;





    // -------------------------------
    // Скорректированная масса
    // -------------------------------


    let correctedLow =

        weights.corrected *
        proteinMin;



    let correctedHigh =

        weights.corrected *
        proteinMax;





    return {


        actualLow:

            Math.round(actualLow),



        actualHigh:

            Math.round(actualHigh),



        correctedLow:

            Math.round(correctedLow),



        correctedHigh:

            Math.round(correctedHigh),



        min:

            Math.round(
                Math.min(
                    actualLow,
                    correctedLow
                )
            ),



        max:

            Math.round(
                Math.max(
                    actualHigh,
                    correctedHigh
                )
            )


    };


}
