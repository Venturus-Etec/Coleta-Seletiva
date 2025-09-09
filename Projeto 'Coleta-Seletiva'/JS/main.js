const imgs = document.getElementById('img1');
const img = document.querySelectorAll('#img1 img');

let idex = 0 

function carrossel(){
    idex++;
    if(idex > img.length -1){
        idex = 0;
    }
    imgs.style.transform = `translateX(${-idex * 100}%)`;
}

setInterval(carrossel, 4000);

function Mostrarmap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const accuracy = pos.coords.accuracy;

        const map = L.map('map').setView([lat, lon], 15);
        const icon = new L.Icon({
            iconUrl: 'IMG/lixeira-removebg-preview.png',
            iconSize: [38, 38],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
            shadowUrl: null,
          });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19
        }).addTo(map);

        const marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup("Você está aqui!<br>Precisão: " + accuracy + " metros").openPopup();
        L.circle([lat, lon], { radius: accuracy }).addTo(map);

         const pontosColeta = [
          { lat: -21.911418445393206, lon: -49.89756946618182, nome: "Ponto De Coleta" },
          { lat: -21.686356474595634, lon: -49.75168074036299, nome: "Ponto De Coleta" },
          { lat: -21.649110717229846, lon: -49.738585918570706, nome: "Ponto De Coleta" },
          { lat: -21.661703910168615, lon: -49.75310489599966, nome: "Ponto De Coleta" }
        ];

        pontosColeta.forEach((ponto, index) => {
          const pontoMarker = L.marker([ponto.lat, ponto.lon], { icon: icon }).addTo(map);

          pontoMarker.bindPopup(`
            ${ponto.nome}<br>
            <button class="rotaBtn" data-index="${index}" style="
      background-color: #2e7d32; 
      color: white; 
      border: none; 
      padding: 8px 12px; 
      border-radius: 5px; 
      cursor: pointer; 
      font-weight: bold;
      font-size: 14px;
      text-align: center;
      display: block;
      margin: auto;
    ">Ver Rota</button>
          `);
        });

        map.on('popupopen', function(e) {
          const btns = document.querySelectorAll('.rotaBtn');
          btns.forEach((btn) => {
            btn.addEventListener('click', () => {
              const idx = btn.getAttribute('data-index');
              const destino = pontosColeta[idx];
              navigator.geolocation.getCurrentPosition((posUser) => {
                const url = `https://www.google.com/maps/dir/${posUser.coords.latitude},${posUser.coords.longitude}/${destino.lat},${destino.lon}`;
                window.open(url, '_blank');
              });
            });
          });
        });
      },
      (err) => {
        alert("Erro ao pegar localização: " + err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  } else {
    alert("Geolocalização não suportada pelo navegador.");
  }
}


