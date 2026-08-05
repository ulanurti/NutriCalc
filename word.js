function createWordReport() {

    const {
        Document,
        Packer,
        Paragraph,
        TextRun,
        Table,
        TableRow,
        TableCell
    } = docx;


    // =========================
    // Данные пациента
    // =========================

    let name = document.getElementById("name")?.value || "Не указано";
    let age = document.getElementById("age")?.value || "Не указано";
    let gender = document.getElementById("gender")?.value || "Не указано";

    let weight = document.getElementById("weight")?.value || "Не указано";
    let height = document.getElementById("height")?.value || "Не указано";

    let waist = document.getElementById("waist")?.value || "Не указано";
    let hips = document.getElementById("hips")?.value || "Не указано";


    // =========================
    // Результаты расчётов
    // =========================

    let result = document.getElementById("result")?.innerText 
        || "Расчёты не выполнены";


    // =========================
    // Таблица пациента
    // =========================

    let patientTable = new Table({

        rows: [

            new TableRow({

                children: [

                    new TableCell({

                        children: [
                            new Paragraph("Параметр")
                        ]

                    }),

                    new TableCell({

                        children: [
                            new Paragraph("Значение")
                        ]

                    })

                ]

            }),


            createRow("Имя", name),
            createRow("Возраст", age),
            createRow("Пол", gender),
            createRow("Рост", height + " см"),
            createRow("Вес", weight + " кг"),
            createRow("Талия", waist + " см"),
            createRow("Бёдра", hips + " см")

        ]

    });



    // =========================
    // Документ Word
    // =========================

    let doc = new Document({

        sections: [

            {

                children: [

                    new Paragraph({

                        children: [

                            new TextRun({

                                text: "NutriCalc\n",
                                bold: true,
                                size: 32

                            }),

                            new TextRun({

                                text: "Консультация по питанию",
                                size: 24

                            })

                        ]

                    }),



                    new Paragraph(
                        "Данные пациента:"
                    ),


                    patientTable,



                    new Paragraph(
                        "Результаты расчётов:"
                    ),


                    new Paragraph(result),



                    new Paragraph(
                        "Рекомендации:"
                    ),


                    new Paragraph(
                        "________________________________"
                    ),

                    new Paragraph(
                        "________________________________"
                    )

                ]

            }

        ]

    });



    // =========================
    // Сохранение файла
    // =========================

    Packer.toBlob(doc)
        .then(blob => {

            saveAs(
                blob,
                "NutriCalc_Консультация.docx"
            );

        });

}



// =========================
// Создание строки таблицы
// =========================

function createRow(parameter, value) {

    const {
        TableRow,
        TableCell,
        Paragraph
    } = docx;


    return new TableRow({

        children: [

            new TableCell({

                children: [
                    new Paragraph(parameter)
                ]

            }),


            new TableCell({

                children: [
                    new Paragraph(String(value))
                ]

            })

        ]

    });

}
