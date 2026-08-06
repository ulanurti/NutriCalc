function createWordReport() {

    const {
        Document,
        Packer,
        Paragraph,
        TextRun
    } = docx;

    let patient = getPatientData();

    let doc = new Document({

        sections: [

            {

                children: [

                    createTitle(),

                    createPatientSection(patient),

                    createResultsSection(),

                    createRecommendationsSection()

                ]

            }

        ]

    });

    Packer.toBlob(doc).then(blob => {

        saveAs(blob, "NutriCalc_Консультация.docx");

    });

}



function getPatientData() {

    return {

        age: document.getElementById("age").value,

        gender: document.getElementById("gender").value,

        weight: document.getElementById("weight").value,

        height: document.getElementById("height").value,

        waist: document.getElementById("waist").value,

        hips: document.getElementById("hips").value,

        shoulders: document.getElementById("shoulders").value

    };

}



function createTitle() {

    return new Paragraph({

        children: [

            new TextRun({

                text: "NutriCalc",

                bold: true,

                size: 36

            })

        ],

        spacing: {

            after: 300

        }

    });

}



function createPatientSection(patient) {

    return new Paragraph({

        children: [

            new TextRun({

                text:
`ДАННЫЕ ПАЦИЕНТА

Возраст: ${patient.age}

Пол: ${patient.gender}

Рост: ${patient.height} см

Вес: ${patient.weight} кг

Талия: ${patient.waist} см

Бёдра: ${patient.hips} см

Плечо: ${patient.shoulders} см
`,

                size: 24

            })

        ],

        spacing: {

            after: 300

        }

    });

}



function createResultsSection() {

    let result = document.getElementById("result").innerText;

    return new Paragraph({

        children: [

            new TextRun({

                text:
`РЕЗУЛЬТАТЫ РАСЧЁТОВ

${result}
`,

                size: 24

            })

        ],

        spacing: {

            after: 300

        }

    });

}



function createRecommendationsSection() {

    return new Paragraph({

        children: [

            new TextRun({

                text:
`РЕКОМЕНДАЦИИ

_____________________________________

_____________________________________

_____________________________________

_____________________________________
`,

                size: 24

            })

        ]

    });

}
