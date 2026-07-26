let patient = {
    name: "",
    age: "",
    height: 0,
    consultations: []
};

function calculateBMI() {

    let weight = Number(document.getElementById("weight").value);
    let heightCm = Number(document.getElementById("height").value);
    let height = heightCm / 100;
    let age = Number(document.getElementById("age").value);
    let gender = document.getElementById("gender").value;

    let waist = Number(document.getElementById("waist").value);
    let hips = Number(document.getElementById("hips").value);
    let shoulders = Number(document.getElementById("shoulders").value);

    let bmi = weight / (height * height);

    let result = "";

    if (bmi < 18.5) {
        result = "Недостаточный вес";
    }
    else if (bmi < 25) {
        result = "Нормальный вес";
    }
    else if (bmi < 30) {
        result = "Избыточный вес";
    }
    else if (bmi < 35) {
        result = "Ожирение I степени";
    }
    else if (bmi < 40) {
        result = "Ожирение II степени";
    }
    else {
        result = "Ожирение III степени (морбидное ожирение)";
    }

    // Основной обмен (формула Миффлина — Сан Жеора)

    let bmr;

    if (gender === "male") {
        bmr = 10 * weight + 6.25 * heightCm - 5 * age + 5;
    }
    else {
        bmr = 10 * weight + 6.25 * heightCm - 5 * age - 161;
    }

    patient.age = age;
    patient.height = heightCm;

    patient.consultations.push({
        date: new Date(),
        weight: weight,
        waist: waist,
        hips: hips,
        shoulders: shoulders,
        bmi: bmi,
        bmr: bmr
    });

    document.getElementById("result").innerHTML =
        "<b>Результаты</b><br><br>" +
        "ИМТ: " + bmi.toFixed(1) + "<br>" +
        "Категория: " + result + "<br>" +
        "Основной обмен: " + Math.round(bmr) + " ккал/сут";
}

function calculateIdealWeight() {

    let height = Number(document.getElementById("height").value);
    let gender = document.getElementById("gender").value;

    // Вес по Броку

    let brock;

    if (gender === "male") {
        brock = height - 100;
    }
    else {
        brock = height - 110;
    }

    // Вес по Девину

    let devine;

    if (gender === "male") {
        devine = 50 + 0.9 * (height - 152.4);
    }
    else {
        devine = 45.5 + 0.9 * (height - 152.4);
    }

    // Целевой вес по ИМТ 21–23

    let heightM = height / 100;

    let targetMin = 21 * heightM * heightM;
    let targetMax = 23 * heightM * heightM;

    document.getElementById("idealWeight").innerHTML =
        "<b>Идеальный вес</b><br><br>" +
        "По Броку: " + brock.toFixed(1) + " кг<br>" +
        "По Девину: " + devine.toFixed(1) + " кг<br>" +
        "ИМТ 21: " + targetMin.toFixed(1) + " кг<br>" +
        "ИМТ 23: " + targetMax.toFixed(1) + " кг";
}

function showConsultation() {

    let text = "";

    for (let i = 0; i < patient.consultations.length; i++) {

        let c = patient.consultations[i];

        text +=
            "<b>Консультация " + (i + 1) + "</b><br>" +
            "Дата: " + c.date.toLocaleDateString() + "<br>" +
            "Вес: " + c.weight + " кг<br>" +
            "ИМТ: " + c.bmi.toFixed(1) + "<br>" +
            "Основной обмен: " + Math.round(c.bmr) + " ккал/сут<br>" +
            "Талия: " + c.waist + " см<br>" +
            "Бёдра: " + c.hips + " см<br>" +
            "Плечо: " + c.shoulders + " см<br><br>";
    }

    document.getElementById("history").innerHTML = text;
}

function showGraph() {
    alert("График мы добавим на следующем этапе.");
}
