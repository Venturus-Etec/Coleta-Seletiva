const imgs = document.getElementById('img1');
const img = document.querySelectorAll('#img1 img');

let idex = 0 

function carrossel(){
    idex++;
    if(idex > img.length -1){
        idex = 0;
    }
    imgs.style.transform = `translateX(${-idex * 100}vw)`;
}

setInterval(carrossel, 4000);

function MudaTela (){
    window.location.href = "PgPontos.html"
}

function Mostrarmap() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          const map = L.map('map').setView([lat, lon], 13);
          const icon = new L.Icon({
            iconUrl: 'IMG/lixeira-removebg-preview.png',
            iconSize: [38, 38],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
            shadowUrl: null,
          });

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
          }).addTo(map);

          L.marker([-21.911418445393206, -49.89756946618182], { icon: icon }).addTo(map)
            .bindPopup("Ponto de Coleta Seletiva")

          L.marker([-21.686356474595634, -49.75168074036299], { icon: icon }).addTo(map)
            .bindPopup("Ponto de Coleta Seletiva")

          L.marker([-21.649110717229846, -49.738585918570706], { icon: icon }).addTo(map)
            .bindPopup("Ponto de Coleta Seletiva")

          L.marker([-21.661703910168615, -49.75310489599966], { icon: icon }).addTo(map)
            .bindPopup("Ponto de Coleta Seletiva")

          L.marker([lat, lon]).addTo(map)
            .bindPopup("Você está aqui!")
            .openPopup();
        });
      } else {
        alert("Seu navegador não suporta geolocalização.");
      }
    }


