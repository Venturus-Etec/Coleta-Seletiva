const imgs = document.getElementById('img1');
const img = document.querySelectorAll('#img1 img');

let idex = 0 

function carrossel(){
    img[idex].classList.remove('active');
    idex++;
    if(idex > img.length -1){
        idex = 0;
    }
    img[idex].classList.add('active');
    imgs.style.transform = `translateX(${-idex * 100}%)`;
}

setInterval(carrossel, 4000);