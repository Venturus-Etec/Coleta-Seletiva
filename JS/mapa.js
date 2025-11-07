function Mostrarmap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const accuracy = pos.coords.accuracy;
  
          const map = L.map('map').setView([lat, lon], 15);
          const icon = new L.Icon({
              iconUrl: 'IMG/lixeira_pontos.png',
              iconSize: [38, 38],
              iconAnchor: [16, 32],
              popupAnchor: [0, -32],
              shadowUrl: null,
            });
  
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            minZoom: 8
          }).addTo(map);
  
          const marker = L.marker([lat, lon]).addTo(map);
          marker.bindPopup("Você está aqui!<br>Precisão: " + accuracy + " metros").openPopup();
          L.circle([lat, lon], { radius: accuracy }).addTo(map);
  
           const pontosColeta = [
            { lat: -21.911418445393206, lon: -49.89756946618182, nome: "Ponto De Coleta" },
            { lat: -21.686356474595634, lon: -49.75168074036299, nome: "Ponto De Coleta" },
            { lat: -21.649110717229846, lon: -49.738585918570706, nome: "Ponto De Coleta" },
            { lat: -21.661703910168615, lon: -49.75310489599966, nome: "Ponto De Coleta" },
            { lat: -22.192484308999113, lon: -49.95718676405406, nome: "Ponto De Coleta" },
            { lat: -22.218403366264127, lon: -49.9388512414958, nome: "Ponto De Coleta" },
            { lat: -22.252182784232936, lon: -49.925523468475006, nome: "Ponto De Coleta" },
            { lat: -21.800285027454688, lon: -49.92715971054123, nome: "Ponto De Coleta" },
            { lat: -22.010182666466108, lon: -49.78641708272278, nome: "Ponto De Coleta" },
            { lat: -21.894264624201643, lon: -49.58571685873648, nome: "Ponto De Coleta" },
            { lat: -21.80440750421986,  lon: -49.601097969947034, nome: "Ponto De Coleta" },
            { lat: -22.100316552771524, lon: -50.1829166917781, nome: "Ponto De Coleta" },
            { lat: -21.619793156214293, lon: -49.79976107048435, nome: "Ponto De Coleta" },
            { lat: -21.54023450106248,  lon: -49.857055386636844, nome: "Ponto De Coleta" },
  
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