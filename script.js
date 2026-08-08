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
// ==========================================================
// РАСЧЁТ КБЖУ
//
// Энергия:
// диапазон EAR после выбранной цели
//
// Белок:
// фактическая + скорректированная масса
//
// Жиры:
// 30% от итоговой энергии
//
// Углеводы:
// остаток энергии
// ==========================================================


function calculateMacros(goal, patientCategory) {


    let energy =

        calculateEnergy(goal);



    let protein =

        calculateProtein(patientCategory);



    let fatPercent =

        nutritionRules[patientCategory]?.fatPercent || 30;




    // ======================================================
    // ЖИРЫ
    // ======================================================


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





    // ======================================================
    // УГЛЕВОДЫ
    //
    // Нижняя граница:
    // минимальная энергия +
    // минимальный белок +
    // жиры от минимальной энергии
    //
    // Верхняя граница:
    // максимальная энергия +
    // максимальный белок +
    // жиры от максимальной энергии
    // ======================================================



    let carbMin =


        (

            energy.caloriesMin -

            (
                protein.min *
                4
            ) -

            (
                fatMin *
                9
            )

        ) / 4;





    let carbMax =


        (

            energy.caloriesMax -

            (
                protein.max *
                4
            ) -

            (
                fatMax *
                9
            )

        ) / 4;







    return {


        energy: {


            EARmin:

                energy.EARmin,


            EARmax:

                energy.EARmax,


            deficitMin:

                energy.deficitMin,


            deficitMax:

                energy.deficitMax,


            caloriesMin:

                energy.caloriesMin,


            caloriesMax:

                energy.caloriesMax

        },



        protein: protein,



        fat: {


            percent: fatPercent,


            min:

                Math.round(fatMin),


            max:

                Math.round(fatMax)

        },



        carbohydrates: {


            min:

                Math.round(carbMin),


            max:

                Math.round(carbMax)

        }


    };


}
// =========================================================// ==========================================================
// ГЛАВНАЯ ФУНКЦИЯ РАСЧЁТА
// ==========================================================

function calculateAll() {


let bmiResult =

    getBMI();



let idealWeight =

    calculateIdealWeight();



let correctedWeight =

    calculateCorrectedWeight();



let goal =

    document.getElementById("goal")?.value

    ||

    "maintain";



let patientCategory =

    document.getElementById("patientCategory")?.value

    ||

    "healthy";





let bmrMifflin =

    calculateBMRMifflin();



let bmrHarris =

    calculateBMRHarris();





let EAR =

    calculateEAR();





let macros =

    calculateMacros(

        goal,

        patientCategory

    );





let result = "";




// ===============================
// ИМТ
// ===============================


result +=

"<h3>Результаты консультации</h3>";



result +=

"<b>ИМТ:</b> "

+

bmiResult.bmi.toFixed(1)

+

"<br>";



result +=

"<b>Категория ИМТ:</b> "

+

bmiResult.category

+

"<br><br>";




// ===============================
// МАССА ТЕЛА
// ===============================


result +=

"<b>Идеальная масса:</b> "

+

Math.round(idealWeight)

+

" кг<br>";



result +=

"<b>Скорректированная масса:</b> "

+

Math.round(correctedWeight)

+

" кг<br><br>";




// ===============================
// ОСНОВНОЙ ОБМЕН
// ===============================


result +=

"<b>BMR Миффлин:</b> "

+

Math.round(bmrMifflin)

+

" ккал/сут<br>";



result +=

"<b>BMR Харрис-Бенедикт:</b> "

+

Math.round(bmrHarris)

+

" ккал/сут<br><br>";





// ===============================
// EAR
// ===============================


result +=

"<b>EAR диапазон:</b> "

+

Math.round(EAR.min)

+

" - "

+

Math.round(EAR.max)

+

" ккал/сут<br>";



result +=

"(расчёт по двум формулам основного обмена и активности)<br><br>";





// ===============================
// ЭНЕРГЕТИЧЕСКАЯ ЦЕННОСТЬ
// ===============================


result +=

"<b>Энергетическая ценность рациона:</b> "

+

Math.round(macros.energy.caloriesMin)

+

" - "

+

Math.round(macros.energy.caloriesMax)

+

" ккал/сут<br>";



result +=

"<b>Коррекция по цели:</b> "

+

goal

+

"<br><br>";





// ===============================
// БЕЛОК
// ===============================


result +=

"<b>Белок:</b><br>";



result +=

"По фактической массе тела: "

+

macros.protein.actualLow

+

" - "

+

macros.protein.actualHigh

+

" г/сут<br>";



result +=

"По скорректированной массе тела: "

+

macros.protein.correctedLow

+

" - "

+

macros.protein.correctedHigh

+

" г/сут<br>";



result +=

"Итоговый рекомендуемый диапазон: "

+

macros.protein.min

+

" - "

+

macros.protein.max

+

" г/сут<br><br>";





// ===============================
// ЖИРЫ
// ===============================


result +=

"<b>Жиры:</b> "

+

macros.fat.min

+

" - "

+

macros.fat.max

+

" г/сут<br>";



result +=

"(30% энергетической ценности рациона)<br><br>";





// ===============================
// УГЛЕВОДЫ
// ===============================


result +=

"<b>Углеводы:</b> "

+

macros.carbohydrates.min

+

" - "

+

macros.carbohydrates.max

+

" г/сут<br>";



result +=

"(остаток энергии после расчёта белков и жиров)";





document.getElementById("result").innerHTML = result;





// сохраняем полную консультацию

saveConsultation({

    bmi: bmiResult,

    idealWeight: idealWeight,

    correctedWeight: correctedWeight,

    bmrMifflin: bmrMifflin,

    bmrHarris: bmrHarris,

    EAR: EAR,

    macros: macros,

    goal: goal,

    patientCategory: patientCategory

});


}
// ==========================================================
// СОХРАНЕНИЕ КОНСУЛЬТАЦИИ В ИСТОРИЮ
// ==========================================================

function saveConsultation(data) {


let weight =

    Number(
        document.getElementById("weight")?.value
    );



let height =

    Number(
        document.getElementById("height")?.value
    );



let waist =

    document.getElementById("waist")?.value

    ||

    "-";



let hips =

    document.getElementById("hips")?.value

    ||

    "-";



let shoulder =

    document.getElementById("shoulder")?.value

    ||

    "-";





patient.height = height;





patient.consultations.push({



    // дата консультации

    date: new Date(),



    // антропометрия

    weight: weight,

    height: height,

    waist: waist,

    hips: hips,

    shoulder: shoulder,



    // ИМТ

    bmi:

        data.bmi.bmi,


    bmiCategory:

        data.bmi.category,





    // массы тела

    idealWeight:

        Math.round(data.idealWeight),



    correctedWeight:

        Math.round(data.correctedWeight),





    // обмен

    bmrMifflin:

        Math.round(data.bmrMifflin),



    bmrHarris:

        Math.round(data.bmrHarris),





    // EAR

    EARmin:

        Math.round(data.EAR.min),



    EARmax:

        Math.round(data.EAR.max),





    // энергетическая ценность

    caloriesMin:

        Math.round(
            data.macros.energy.caloriesMin
        ),



    caloriesMax:

        Math.round(
            data.macros.energy.caloriesMax
        ),





    // белок

    proteinMin:

        Math.round(
            data.macros.protein.min
        ),



    proteinMax:

        Math.round(
            data.macros.protein.max
        ),





    // жиры

    fatMin:

        Math.round(
            data.macros.fat.min
        ),



    fatMax:

        Math.round(
            data.macros.fat.max
        ),





    // углеводы

    carbsMin:

        Math.round(
            data.macros.carbohydrates.min
        ),



    carbsMax:

        Math.round(
            data.macros.carbohydrates.max
        ),





    // дополнительные параметры

    goal:

        data.goal,



    patientCategory:

        data.patientCategory



});


}
// ==========================================================
// ПРОСМОТР ИСТОРИИ КОНСУЛЬТАЦИЙ
// ==========================================================

function showConsultation() {


let history = "";




if (
    patient.consultations.length === 0
) {


    document.getElementById("history").innerHTML =

        "История консультаций отсутствует";


    return;


}





patient.consultations.forEach(

function(c, index) {



history +=


"<h3>Консультация №" +

(index + 1)

+

"</h3>";



history +=


"Дата: "

+

c.date.toLocaleDateString()

+

"<br>";





// ===============================
// Антропометрия
// ===============================


history +=

"<b>Антропометрия</b><br>";



history +=

"Рост: "

+

c.height

+

" см<br>";



history +=

"Вес: "

+

c.weight

+

" кг<br>";



history +=

"Талия: "

+

c.waist

+

" см<br>";



history +=

"Бёдра: "

+

c.hips

+

" см<br>";



history +=

"Плечо: "

+

c.shoulder

+

" см<br><br>";





// ===============================
// ИМТ
// ===============================


history +=

"<b>ИМТ</b><br>";



history +=

c.bmi.toFixed(1)

+

" — "

+

c.bmiCategory

+

"<br><br>";





// ===============================
// Масса тела
// ===============================


history +=

"<b>Расчёт массы тела</b><br>";



history +=

"Идеальная масса: "

+

c.idealWeight

+

" кг<br>";



history +=

"Скорректированная масса: "

+

c.correctedWeight

+

" кг<br><br>";





// ===============================
// Энергия
// ===============================


history +=

"<b>Энергетический обмен</b><br>";



history +=

"BMR Миффлин: "

+

c.bmrMifflin

+

" ккал<br>";



history +=

"BMR Харрис-Бенедикт: "

+

c.bmrHarris

+

" ккал<br>";



history +=

"EAR: "

+

c.EARmin

+

" - "

+

c.EARmax

+

" ккал/сут<br><br>";





// ===============================
// КБЖУ
// ===============================


history +=

"<b>Рекомендованный рацион</b><br>";



history +=

"Энергия: "

+

c.caloriesMin

+

" - "

+

c.caloriesMax

+

" ккал<br>";



history +=

"Белок: "

+

c.proteinMin

+

" - "

+

c.proteinMax

+

" г<br>";



history +=

"Жиры: "

+

c.fatMin

+

" - "

+

c.fatMax

+

" г<br>";



history +=

"Углеводы: "

+

c.carbsMin

+

" - "

+

c.carbsMax

+

" г<br>";



history +=

"<hr>";



}

);





document.getElementById("history").innerHTML = history;


}
