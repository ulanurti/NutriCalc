function createWordReport() {

    const {
        Document,
        Packer,
        Paragraph,
        TextRun
    } = docx;


    // ======================================================
    // ДАННЫЕ ПАЦИЕНТА
    // ======================================================

    let age =
        document.getElementById("age")?.value || "-";

    let genderElement =
        document.getElementById("gender");

    let gender =
        genderElement
            ? genderElement.options[genderElement.selectedIndex]?.text
            : "-";


    let weight =
        document.getElementById("weight")?.value || "-";

    let height =
        document.getElementById("height")?.value || "-";

    let waist =
        document.getElementById("waist")?.value || "-";

    let hips =
        document.getElementById("hips")?.value || "-";

    // В движке используется именно "shoulders"
    let shoulders =
        document.getElementById("shoulders")?.value || "-";


    // ======================================================
    // КАТЕГОРИЯ ПАЦИЕНТА
    // ======================================================

    let patientCategoryElement =
        document.getElementById("patientCategory");

    let patientCategory =
        patientCategoryElement
            ? patientCategoryElement
                .options[
                    patientCategoryElement.selectedIndex
                ]?.text
            : "Здоровый человек";


    // ======================================================
    // ЦЕЛЬ КОНСУЛЬТАЦИИ
    // ======================================================

    let goalElement =
        document.getElementById("goal");

    let goal =
        goalElement
            ? goalElement
                .options[
                    goalElement.selectedIndex
                ]?.text
            : "Поддержание массы тела";


    // ======================================================
    // РЕЗУЛЬТАТЫ РАСЧЁТОВ
    // ======================================================

    let result =
        document.getElementById("result")?.innerText || "";


    // ======================================================
    // ПРЕОБРАЗУЕМ РЕЗУЛЬТАТЫ В ОТДЕЛЬНЫЕ СТРОКИ
    // ======================================================

    let resultParagraphs = [];


    let resultLines =
        result.split("\n");


    for (
        let i = 0;
        i < resultLines.length;
        i++
    ) {

        let line =
            resultLines[i].trim();


        if (line === "") {

            resultParagraphs.push(
                new Paragraph("")
            );

            continue;

        }


        resultParagraphs.push(

            new Paragraph({

                children: [

                    new TextRun({

                        text: line,

                        size: 22

                    })

                ]

            })

        );

    }



    // ======================================================
    // СОЗДАНИЕ WORD-ДОКУМЕНТА
    // ======================================================

    let doc =
        new Document({

            sections: [

                {

                    properties: {},

                    children: [


                        // ==================================
                        // ЗАГОЛОВОК
                        // ==================================

                        new Paragraph({

                            children: [

                                new TextRun({

                                    text: "NutriCalc",

                                    bold: true,

                                    size: 32

                                })

                            ],

                            alignment: "center"

                        }),


                        new Paragraph({

                            children: [

                                new TextRun({

                                    text:
                                        "Консультация по питанию",

                                    bold: true,

                                    size: 24

                                })

                            ],

                            alignment: "center"

                        }),


                        new Paragraph(""),


                        new Paragraph({

                            children: [

                                new TextRun({

                                    text:
                                        "Дата: " +
                                        new Date()
                                            .toLocaleDateString(),

                                    size: 22

                                })

                            ]

                        }),


                        new Paragraph(""),



                        // ==================================
                        // ДАННЫЕ ПАЦИЕНТА
                        // ==================================

                        new Paragraph({

                            children: [

                                new TextRun({

                                    text:
                                        "ДАННЫЕ ПАЦИЕНТА",

                                    bold: true,

                                    size: 24

                                })

                            ]

                        }),


                        new Paragraph(
                            "Возраст: " +
                            age +
                            " лет"
                        ),


                        new Paragraph(
                            "Пол: " +
                            gender
                        ),


                        new Paragraph(
                            "Рост: " +
                            height +
                            " см"
                        ),


                        new Paragraph(
                            "Вес: " +
                            weight +
                            " кг"
                        ),


                        new Paragraph(
                            "Талия: " +
                            waist +
                            " см"
                        ),


                        new Paragraph(
                            "Бёдра: " +
                            hips +
                            " см"
                        ),


                        new Paragraph(
                            "Плечо: " +
                            shoulders +
                            " см"
                        ),


                        new Paragraph(""),



                        // ==================================
                        // КАТЕГОРИЯ И ЦЕЛЬ
                        // ==================================

                        new Paragraph({

                            children: [

                                new TextRun({

                                    text:
                                        "КАТЕГОРИЯ И ЦЕЛЬ",

                                    bold: true,

                                    size: 24

                                })

                            ]

                        }),


                        new Paragraph(
                            "Категория пациента: " +
                            patientCategory
                        ),


                        new Paragraph(
                            "Цель консультации: " +
                            goal
                        ),


                        new Paragraph(""),



                        // ==================================
                        // РЕЗУЛЬТАТЫ
                        // ==================================

                        new Paragraph({

                            children: [

                                new TextRun({

                                    text:
                                        "РЕЗУЛЬТАТЫ РАСЧЁТОВ",

                                    bold: true,

                                    size: 24

                                })

                            ]

                        }),


                        // Здесь автоматически попадает
                        // новый результат движка
                        ...resultParagraphs,


                        new Paragraph(""),



                        // ==================================
                        // РЕКОМЕНДАЦИИ
                        // ==================================

                        new Paragraph({

                            children: [

                                new TextRun({

                                    text:
                                        "РЕКОМЕНДАЦИИ",

                                    bold: true,

                                    size: 24

                                })

                            ]

                        }),


                        new Paragraph(
                            "• Соблюдать рассчитанную " +
                            "энергетическую ценность рациона."
                        ),


                        new Paragraph(
                            "• Соблюдать рассчитанный " +
                            "диапазон белков, жиров и углеводов."
                        ),


                        new Paragraph(
                            "• Окончательное количество белка " +
                            "определяется врачом с учётом " +
                            "клинической ситуации."
                        ),


                        new Paragraph(
                            "• Контролировать массу тела " +
                            "не реже 1 раза в неделю."
                        ),


                        new Paragraph(
                            "• Поддерживать адекватную " +
                            "физическую активность."
                        ),


                        new Paragraph(
                            "• Повторная консультация " +
                            "через 1 месяц."
                        ),


                        new Paragraph(""),



                        // ==================================
                        // ЗАКЛЮЧЕНИЕ
                        // ==================================

                        new Paragraph({

                            children: [

                                new TextRun({

                                    text:
                                        "ЗАКЛЮЧЕНИЕ ВРАЧА",

                                    bold: true,

                                    size: 24

                                })

                            ]

                        }),


                        new Paragraph(""),


                        new Paragraph(
                            "____________________________________________"
                        ),


                        new Paragraph(
                            "____________________________________________"
                        ),


                        new Paragraph(
                            "____________________________________________"
                        ),


                        new Paragraph(
                            "____________________________________________"
                        ),


                        new Paragraph(""),


                        new Paragraph(
                            "Подпись специалиста:"
                        ),


                        new Paragraph(
                            "____________________________________________"
                        )

                    ]

                }

            ]

        });



    // ======================================================
    // СОХРАНЕНИЕ WORD
    // ======================================================

    Packer.toBlob(doc).then(blob => {

        saveAs(
            blob,
            "NutriCalc_Консультация.docx"
        );

    });

}
