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

const urlBackend = 'https://apppy-production-7dc2.up.railway.app';
const formsContainer = document.getElementById('forms-container');
const bemVindo = document.getElementById('bem-vindo');
const nomeUsuario = document.getElementById('nome-usuario');
const mensagemElemento = document.getElementById('mensagem');
const pontosUsuario = document.getElementById('pontos-usuario');
const emailUsuario = document.getElementById('email-usuario');

const loginFormContainer = document.getElementById('login-form-container');
const cadastroFormContainer = document.getElementById('cadastro-form-container');
const linkCadastro = document.getElementById('link-cadastro');
const linkLogin = document.getElementById('link-login');

if (linkCadastro) {
    linkCadastro.addEventListener('click', (e) => {
        e.preventDefault();
        if (loginFormContainer && cadastroFormContainer) {
            loginFormContainer.style.display = 'none';
            cadastroFormContainer.style.display = 'block';
        }
    });
}

if (linkLogin) {
    linkLogin.addEventListener('click', (e) => {
        e.preventDefault();
        if (loginFormContainer && cadastroFormContainer) {
            cadastroFormContainer.style.display = 'none';
            loginFormContainer.style.display = 'block';
        }
    });
}

function atualizarInterface(logado, nome = null, email = null, pontos = null) {
    if (logado) {
        if (formsContainer) formsContainer.style.display = 'none';
        if (bemVindo) {
            bemVindo.style.display = 'block';
            if (nomeUsuario && nome) nomeUsuario.textContent = nome;

            const emailUsuario = document.getElementById('email-usuario');
            if (emailUsuario && email) emailUsuario.textContent = email;

            if (pontosUsuario && pontos !== null) pontosUsuario.textContent = pontos;

            // Lógica do botão de sacar
            const botaoSacar = document.getElementById('sacar');
            const mensagemSacar = document.getElementById('mensagemsacar');

            if (botaoSacar && mensagemSacar) {
                botaoSacar.addEventListener('click', () => {
                    mensagemSacar.textContent = 'Saque apenas acima de 10000 pontos.';
                });
            }
        }
    } else {
        if (formsContainer) formsContainer.style.display = 'block';
        if (bemVindo) bemVindo.style.display = 'none';
    }
}

const formCadastro = document.getElementById('formCadastro');
if (formCadastro) {
    formCadastro.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('cadastroNome').value;
        const senha = document.getElementById('cadastroSenha').value;
        const email = document.getElementById('cadastroEmail').value;
        const pontos = 0;

        fetch(`${urlBackend}/cadastrar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nome,
                    senha: senha,
                    email: email,
                    pontos: pontos
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.mensagem && data.mensagem.includes('sucesso')) {
                    if (linkLogin) {
                        linkLogin.click();
                    }
                } else {
                    if (mensagemElemento) {
                        mensagemElemento.textContent = data.mensagem;
                        mensagemElemento.style.color = 'red';
                    }
                }
            })
            .catch(error => {
                console.error('Erro de cadastro:', error);
                if (mensagemElemento) {
                    mensagemElemento.textContent = 'Erro ao se conectar com o servidor.';
                    mensagemElemento.style.color = 'red';
                }
            });
    });
}

const formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const senha = document.getElementById('loginSenha').value;

        fetch(`${urlBackend}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    senha: senha
                })
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.mensagem);
                    });
                }
                return response.json();
            })
            .then(data => {
                if (data.token) {
                    localStorage.setItem('userToken', data.token);
                    atualizarInterface(true, data.usuario_logado.nome, data.usuario_logado.email, data.usuario_logado.pontos);
                } else {
                    if (mensagemElemento) {
                        mensagemElemento.textContent = data.mensagem;
                        mensagemElemento.style.color = 'red';
                    }
                }
            })
            .catch(error => {
                console.error('Erro de login:', error);
                if (mensagemElemento) {
                    mensagemElemento.textContent = error.message || 'Erro ao se conectar com o servidor.';
                    mensagemElemento.style.color = 'red';
                }
            });
    });
}

function verificarStatusLogin() {
    const token = localStorage.getItem('userToken');

    if (!token) {
        atualizarInterface(false);
        return;
    }

    fetch(`${urlBackend}/status`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.logado) {
            atualizarInterface(true, data.nome, data.email, data.pontos);
        } else {
            localStorage.removeItem('userToken');
            atualizarInterface(false);
        }
    })
    .catch(error => {
        console.error('Erro ao verificar status:', error);
        localStorage.removeItem('userToken');
        atualizarInterface(false);
    });
}

window.addEventListener('load', verificarStatusLogin);

const logoutButton = document.getElementById('logout-button');

if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('userToken');
        window.location.reload();
    });
}

const abrirPopupLink = document.getElementById('abrirPopupLink');
const meuPopup = document.getElementById('meuPopup');
const fecharPopupBtn = document.getElementById('fecharPopupBtn');
const GanharP = document.getElementById('GanharP');
const mensagemErro = document.getElementById('mensagemErro');
const meuInput = document.getElementById('Codigo');

abrirPopupLink.addEventListener('click', (e) => {
    e.preventDefault();
    meuPopup.classList.add('mostrar');
});

GanharP.addEventListener('click', () => {
    const codigo = meuInput.value.trim();
    if (codigo === '') {
        mensagemErro.textContent = 'O campo não pode ficar vazio.';
        mensagemErro.style.color = 'red';
        return;
    }

    const token = localStorage.getItem('userToken');
    if (!token) {
        mensagemErro.textContent = 'Você precisa estar logado para resgatar pontos.';
        mensagemErro.style.color = 'red';
        return;
    }

    fetch(`${urlBackend}/validar-codigo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                codigo: codigo
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.sucesso) {
                mensagemErro.textContent = data.mensagem;
                mensagemErro.style.color = 'green';
                pontosUsuario.textContent = data.novos_pontos;
                meuPopup.classList.remove('mostrar');
            } else {
                mensagemErro.textContent = data.mensagem;
                mensagemErro.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Erro ao resgatar código:', error);
            mensagemErro.textContent = 'Clique Novamente.';
            mensagemErro.style.color = 'red';
        });
});


fecharPopupBtn.addEventListener('click', () => {
    meuPopup.classList.remove('mostrar');
});

function btt_navbar() {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('responsive');
}

