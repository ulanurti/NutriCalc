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
