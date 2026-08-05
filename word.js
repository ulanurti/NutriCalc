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
    // Получаем данные пациента
    // =========================

    let age = document.getElementById("age")?.value || "-";
    let gender = document.getElementById("gender")?.value || "-";

    let weight = document.getElementById("weight")?.value || "-";
    let height = document.getElementById("height")?.value || "-";

    let waist = document.getElementById("waist")?.value || "-";
    let hips = document.getElementById("hips")?.value || "-";
    let shoulders = document.getElementById("shoulders")?.value || "-";


    // Результаты расчёта
    let result = document.getElementById("result")?.innerText || 
    "Расчёты не выполнены";


    // Дата

    let date = new Date().toLocaleDateString("ru-RU");



    // =========================
    // Таблица пациента
    // =========================

    function row(title, value){

        return new TableRow({

            children:[

                new TableCell({

                    children:[
                        new Paragraph(title)
                    ]

                }),

                new TableCell({

                    children:[
                        new Paragraph(String(value))
                    ]

                })

            ]

        });

    }



    let patientTable = new Table({

        rows:[

            row("Возраст", age),
            row("Пол", gender),
            row("Рост", height + " см"),
            row("Вес", weight + " кг"),
            row("Талия", waist + " см"),
            row("Бёдра", hips + " см"),
            row("Плечо", shoulders + " см")

        ]

    });



    // =========================
    // Создание документа
    // =========================


    let doc = new Document({

        sections:[

            {

                children:[


                    new Paragraph({

                        children:[

                            new TextRun({

                                text:"NutriCalc",
                                bold:true,
                                size:32

                            })

                        ]

                    }),



                    new Paragraph(
                        "Консультация по питанию"
                    ),


                    new Paragraph(
                        "Дата: " + date
                    ),



                    new Paragraph(
                        " "
                    ),



                    new Paragraph({

                        children:[

                            new TextRun({

                                text:"Антропометрические данные",
                                bold:true

                            })

                        ]

                    }),



                    patientTable,



                    new Paragraph(
                        " "
                    ),



                    new Paragraph({

                        children:[

                            new TextRun({

                                text:"Результаты расчётов",
                                bold:true

                            })

                        ]

                    }),



                    new Paragraph(result),



                    new Paragraph(
                        " "
                    ),



                    new Paragraph({

                        children:[

                            new TextRun({

                                text:"Рекомендации специалиста",
                                bold:true

                            })

                        ]

                    }),



                    new Paragraph(
                        "________________________________"
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
    // Скачивание Word
    // =========================


    Packer.toBlob(doc)

    .then(blob=>{

        saveAs(
            blob,
            "NutriCalc_Консультация.docx"
        );

    });


}
