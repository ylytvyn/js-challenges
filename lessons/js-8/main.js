'use strict';

// Initial info about cat
let catObj = {
        name: 'Harry',
        type: 'Abyssinian',
        color: 'Black'
    },
    form = document.forms['catForm'];

(function() {
    // Choose cat
    let chooseBtn = document.querySelector('.select');
    chooseBtn.onclick = changeCatObj;

    drawCat();
})();

// Summarize two numbers function
function drawCat() {
    let img = document.querySelector('.cat-img'),
        text = document.querySelector('.cat-name');

    form.catName.value = catObj.name;
    form.catType.value = catObj.type;
    form.catColor.value = catObj.color;

    img.src = `images/${catObj.type}-${catObj.color}.jpg`;
    text.innerHTML = catObj.name;
}

function changeCatObj() {
    catObj.name = form.catName.value;
    catObj.type = form.catType.value;
    catObj.color = form.catColor.value;

    drawCat();
}