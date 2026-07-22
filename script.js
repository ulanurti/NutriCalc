let patient = {
    name: "",
    age: "",
    height: 0,
    consultations: []
};

function calculateBMI() {

    let weight = Number(document.getElementById("weight").value);
    let height = Number(document.getElementById("height").value);
    let waist = Number(document.getElementById("waist").value);
    let hips = Number(document.getElementById("hips").value);
    let shoulders = Number(document.getElementById("shoulders").value);

    height = height / 100;

    let bmi = weight / (height * height);

    patient.height = height;

    patient.consultations.push({
        date: new Date(),
        weight: weight,
        waist: waist,
        hips: hips,
        shoulders: shoulders,
        bmi: bmi
    });
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

    document.getElementById("result").innerHTML =
        "Ваш ИМТ: " + bmi.toFixed(1) + "<br>" +
        "Категория: " + result;
}
function calculateIdealWeight(height, gender){
целевой вес по броку
    let weight;

    if(gender === "male"){
        weight = height - 100;
    }

    else if(gender === "female"){
        weight = height - 110;
    }

    return weight;
целевой вес по дельвину
let devine;

    if (gender === "male") {
        devine = 50 + 0.9 * (height - 152.4);
    } 
    
    else if (gender === "female") {
        devine = 45.5 + 0.9 * (height - 152.4);
    }


    // Целевой вес по ИМТ 21-23

    let heightM = height / 100;

    let bmiMin = 21;
    let bmiMax = 23;

    let targetMin = bmiMin * (heightM * heightM);
    let targetMax = bmiMax * (heightM * heightM);


    return {
        devine: devine.toFixed(1),
        targetMin: targetMin.toFixed(1),
        targetMax: targetMax.toFixed(1)
    };
    let result = calculateIdealWeight(170, "female");

console.log(result);
}
function showConsultation() {

    let text = "";

    for (let i = 0; i < patient.consultations.length; i++) {

        let c = patient.consultations[i];

        text +=
            "<b>Консультация " + (i + 1) + "</b><br>" +
            "Вес: " + c.weight + " кг<br>" +
            "ИМТ: " + c.bmi.toFixed(1) + "<br>" +
            "Талия: " + c.waist + " см<br>" +
            "Бёдра: " + c.hips + " см<br>" +
            "Плечо: " + c.shoulders + " см<br><br>";
    }

    document.getElementById("history").innerHTML = text;
}

function showGraph() {
    alert("График мы добавим на следующем этапе.");
}
