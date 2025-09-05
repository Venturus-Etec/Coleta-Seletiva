const imgs = document.getElementById('img1');
const img = document.querySelectorAll('#img1 img');

let idex = 0 

function carrossel(){
    idex++;
    if(idex > img.length -1){
        idex = 0;
    }
    imgs.style.transform = `translateX(${-idex * 1250}px)`;
}

setInterval(carrossel, 1800);