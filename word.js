function createWordReport() {

    const {
        Document,
        Packer,
        Paragraph,
        TextRun
    } = docx;


    // Данные пациента
    let age = document.getElementById("age")?.value || "-";
    let gender = document.getElementById("gender")?.value || "-";

    let weight = document.getElementById("weight")?.value || "-";
    let height = document.getElementById("height")?.value || "-";

    let waist = document.getElementById("waist")?.value || "-";
    let hips = document.getElementById("hips")?.value || "-";
    let shoulder = document.getElementById("shoulder")?.value || "-";


    // Результаты расчётов
    let result = document.getElementById("result")?.innerText || "";


    let doc = new Document({

        sections: [
            {
                properties: {},

                children: [

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
                                text: "Консультация по питанию",
                                bold: true,
                                size: 24
                            })
                        ],
                        alignment: "center"
                    }),


                    new Paragraph("Дата: " + new Date().toLocaleDateString()),



                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "ДАННЫЕ ПАЦИЕНТА",
                                bold: true,
                                size: 24
                            })
                        ]
                    }),


                    new Paragraph("Возраст: " + age + " лет"),

                    new Paragraph("Пол: " + gender),

                    new Paragraph("Рост: " + height + " см"),

                    new Paragraph("Вес: " + weight + " кг"),

                    new Paragraph("Талия: " + waist + " см"),

                    new Paragraph("Бёдра: " + hips + " см"),

                    new Paragraph("Плечо: " + shoulder + " см"),



                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "РЕЗУЛЬТАТЫ РАСЧЁТОВ",
                                bold: true,
                                size: 24
                            })
                        ]
                    }),


                    new Paragraph(result),



                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "РЕКОМЕНДАЦИИ",
                                bold: true,
                                size: 24
                            })
                        ]
                    }),


                    new Paragraph("• Соблюдать рассчитанную энергетическую ценность рациона."),

                    new Paragraph("• Соблюдать рекомендуемое количество белков, жиров и углеводов."),

                    new Paragraph("• Контролировать массу тела не реже 1 раза в неделю."),

                    new Paragraph("• Поддерживать адекватную физическую активность."),

                    new Paragraph("• Повторная консультация через 1 месяц."),



                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "ЗАКЛЮЧЕНИЕ ВРАЧА",
                                bold: true,
                                size: 24
                            })
                        ]
                    }),


                    new Paragraph(""),

                    new Paragraph("____________________________________"),

                    new Paragraph("____________________________________"),

                    new Paragraph("____________________________________"),



                    new Paragraph("Подпись специалиста:"),

                    new Paragraph("____________________________________")

                ]
            }
        ]
    });



    Packer.toBlob(doc).then(blob => {

        saveAs(blob, "NutriCalc_Консультация.docx");

    });

}
