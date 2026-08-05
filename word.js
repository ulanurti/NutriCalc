function createWordReport() {

    alert("Функция Word работает");


    if (typeof docx === "undefined") {

        alert("Библиотека docx не загружена");

        return;

    }


    if (typeof saveAs === "undefined") {

        alert("FileSaver не загружен");

        return;

    }


    const {

        Document,
        Packer,
        Paragraph

    } = docx;


    let doc = new Document({

        sections: [

            {

                children: [

                    new Paragraph(
                        "NutriCalc. Тестовый отчёт"
                    ),

                    new Paragraph(
                        "Word работает!"
                    )

                ]

            }

        ]

    });



    Packer.toBlob(doc)

    .then(blob => {

        saveAs(
            blob,
            "test_NutriCalc.docx"
        );

    });


}
