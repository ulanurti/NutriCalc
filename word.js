function createWordReport() {

    const {
        Document,
        Packer,
        Paragraph,
        TextRun
    } = docx;


    let age = document.getElementById("age")?.value || "-";
    let gender = document.getElementById("gender")?.value || "-";

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

Пол: ${gender}

Рост: ${height} см

Вес: ${weight} кг

Талия: ${waist} см

Бёдра: ${hips} см

Плечо: ${shoulders} см



РЕЗУЛЬТАТЫ РАСЧЁТОВ


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
