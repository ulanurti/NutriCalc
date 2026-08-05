
function createWordReport() {

    // ===============================
    // Получаем данные пациента
    // ===============================

    let name = document.getElementById("name")?.value || "Не указано";
    let age = document.getElementById("age")?.value || "Не указано";
    let gender = document.getElementById("gender")?.value || "Не указано";

    let weight = document.getElementById("weight")?.value || "Не указано";
    let height = document.getElementById("height")?.value || "Не указано";

    let waist = document.getElementById("waist")?.value || "Не указано";
    let hips = document.getElementById("hips")?.value || "Не указано";


    // ===============================
    // Получаем результаты расчётов
    // ===============================

    let result = document.getElementById("result")?.innerHTML 
    || "Расчёты ещё не выполнены";


    // ===============================
    // Дата консультации
    // ===============================

    let today = new Date();

    let date = today.toLocaleDateString("ru-RU");


    // ===============================
    // Создание документа
    // ===============================

    let content = `

<html>

<head>

<meta charset="UTF-8">

<style>

body {
    font-family: Arial;
    font-size: 14px;
}

h1 {
    text-align: center;
}

h2 {
    margin-top: 20px;
}

table {

    border-collapse: collapse;
    width: 100%;

}

td, th {

    border: 1px solid black;
    padding: 5px;

}

</style>

</head>


<body>


<h1>
NutriCalc
</h1>


<h2>
Консультация по питанию
</h2>


<p>
Дата консультации: ${date}
</p>



<h2>
Данные пациента
</h2>


<table>

<tr>
<td>Имя</td>
<td>${name}</td>
</tr>


<tr>
<td>Возраст</td>
<td>${age}</td>
</tr>


<tr>
<td>Пол</td>
<td>${gender}</td>
</tr>


<tr>
<td>Рост</td>
<td>${height} см</td>
</tr>


<tr>
<td>Вес</td>
<td>${weight} кг</td>
</tr>


</table>



<h2>
Антропометрия
</h2>


<table>


<tr>
<td>Талия</td>
<td>${waist} см</td>
</tr>


<tr>
<td>Бёдра</td>
<td>${hips} см</td>
</tr>


</table>




<h2>
Результаты расчётов
</h2>


<div>

${result}

</div>




<h2>
Рекомендации
</h2>


<p>

__________________________________________________

</p>


<p>

__________________________________________________

</p>


<p>

__________________________________________________

</p>



</body>

</html>

`;



    // ===============================
    // Сохранение как Word
    // ===============================


    let blob = new Blob(

        [
            "\ufeff",
            content
        ],

        {
            type:
            "application/msword"
        }

    );



    let link = document.createElement("a");


    link.href =
    URL.createObjectURL(blob);



    link.download =
    "NutriCalc_Консультация.doc";



    link.click();



}
