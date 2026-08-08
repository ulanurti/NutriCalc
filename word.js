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
        ? genderElement.options[
            genderElement.selectedIndex
        ].text
        : "-";



let weight =
    document.getElementById("weight")?.value || "-";


let height =
    document.getElementById("height")?.value || "-";


let waist =
    document.getElementById("waist")?.value || "-";


let hips =
    document.getElementById("hips")?.value || "-";


let shoulder =
    document.getElementById("shoulder")?.value || "-";





// ======================================================
// КАТЕГОРИЯ И ЦЕЛЬ
// ======================================================


let patientCategoryElement =
    document.getElementById("patientCategory");


let patientCategory =
    patientCategoryElement
        ? patientCategoryElement.options[
            patientCategoryElement.selectedIndex
        ].text
        : "-";




let goalElement =
    document.getElementById("goal");


let goal =
    goalElement
        ? goalElement.options[
            goalElement.selectedIndex
        ].text
        : "-";





// ======================================================
// РЕЗУЛЬТАТЫ С ЭКРАНА
// ======================================================


let result =
    document.getElementById("result")?.innerText || "";



let resultParagraphs = [];



result.split("\n").forEach(line => {


    if (line.trim() === "") {


        resultParagraphs.push(
            new Paragraph("")
        );


    } else {


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


});






// ======================================================
// СОЗДАНИЕ ДОКУМЕНТА
// ======================================================


let doc =

new Document({

sections: [{

properties: {},


children: [



new Paragraph({

children:[

new TextRun({

text:"NutriCalc",

bold:true,

size:32

})

],

alignment:"center"

}),



new Paragraph({

children:[

new TextRun({

text:"Консультация по питанию",

bold:true,

size:24

})

],

alignment:"center"

}),



new Paragraph(
"Дата: " +
new Date().toLocaleDateString()
),




// ===============================
// ДАННЫЕ
// ===============================


new Paragraph(""),

new Paragraph({

children:[

new TextRun({

text:"ДАННЫЕ ПАЦИЕНТА",

bold:true,

size:24

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




// ===============================
// КАТЕГОРИЯ
// ===============================


new Paragraph(""),

new Paragraph({

children:[

new TextRun({

text:"КАТЕГОРИЯ ПАЦИЕНТА И ЦЕЛЬ",

bold:true,

size:24

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





// ===============================
// РАСЧЁТЫ
// ===============================


new Paragraph(""),

new Paragraph({

children:[

new TextRun({

text:"РЕЗУЛЬТАТЫ РАСЧЁТОВ",

bold:true,

size:24

})

]

}),



...resultParagraphs,





// ===============================
// РЕКОМЕНДАЦИИ
// ===============================


new Paragraph(""),

new Paragraph({

children:[

new TextRun({

text:"РЕКОМЕНДАЦИИ",

bold:true,

size:24

})

]

}),



new Paragraph(
"• Использовать рассчитанный диапазон энергетической ценности рациона."
),


new Paragraph(
"• Белок рассчитывается согласно категории пациента и клинической ситуации."
),


new Paragraph(
"• При ожирении и ХБП учитываются фактическая и скорректированная масса тела."
),


new Paragraph(
"• Жиры рассчитываются как 30% энергетической ценности рациона."
),


new Paragraph(
"• Углеводы рассчитываются как остаток энергии после учёта белков и жиров."
),


new Paragraph(
"• Окончательный выбор диапазона проводит врач."
),





// ===============================
// ЗАКЛЮЧЕНИЕ
// ===============================


new Paragraph(""),

new Paragraph({

children:[

new TextRun({

text:"ЗАКЛЮЧЕНИЕ ВРАЧА",

bold:true,

size:24

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
"Подпись специалиста:"
),


new Paragraph(
"____________________________________________"
)



]


}]

});





// ======================================================
// СОХРАНЕНИЕ
// ======================================================


Packer.toBlob(doc).then(blob => {


saveAs(

blob,

"NutriCalc_Консультация.docx"

);


});


}
