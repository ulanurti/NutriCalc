function createWordReport() {

    const {
        Document,
        Packer,
        Paragraph
    } = docx;


    let age = document.getElementById("age").value;
    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;


    let text = 
    "NutriCalc\n\n" +
    "Возраст: " + age + " лет\n" +
    "Вес: " + weight + " кг\n" +
    "Рост: " + height + " см";


    let doc = new Document({

        sections: [

            {

                children: [

                    new Paragraph(text)

                ]

            }

        ]

    });


    Packer.toBlob(doc)

    .then(blob => {

        saveAs(
            blob,
            "Проверка_данных_NutriCalc.docx"
        );

    });

}
