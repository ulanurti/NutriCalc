function createWordReport() {

    const {
        Document,
        Packer,
        Paragraph,
        TextRun
    } = docx;


    let age = document.getElementById("age")?.value || "-";
    let gender = document.getElementById("gender")?.value || "-";let genderText = gender;

if (gender === "female") {
    genderText = "Женский";
} else if (gender === "male") {
    genderText = "Мужской";
}
let patientCategory =
document.getElementById("patientCategory")?.value || "healthy";

let categoryName =
nutritionRules[patientCategory].name;
    let weight = document.getElementById("weight")?.value || "-";
    let height = document.getElementById("height")?.value || "-";

    let waist = document.getElementById("waist")?.value || "-";
    let hips = document.getElementById("hips")?.value || "-";
    let shoulders = document.getElementById("shoulders")?.value || "-";


    let result = document.getElementById("result")?.innerText ||
    "Расчёты не выполнены";


    let date = new Date().toLocaleDateString("ru-RU");



    let text =

`NutriCalc

Консультация по питанию

Дата: ${date}


ДАННЫЕ ПАЦИЕНТА

Возраст: ${age}

Пол: ${genderText}

Рост: ${height} см

Вес: ${weight} кг

Талия: ${waist} см

Бёдра: ${hips} см

Плечо: ${shoulders} см



РЕЗУЛЬТАТЫ РАСЧЁТОВ
Категория пациента: ${categoryName}

${result}



РЕКОМЕНДАЦИИ


____________________________________


____________________________________


____________________________________

`;



    let doc = new Document({

        sections: [

            {

                children: [

                    new Paragraph({

                        children: [

                            new TextRun({

                                text: text,

                                size: 24

                            })

                        ]

                    })

                ]

            }

        ]

    });



    Packer.toBlob(doc)

    .then(blob => {

        saveAs(

            blob,

            "NutriCalc_Консультация.docx"

        );

    });


}
