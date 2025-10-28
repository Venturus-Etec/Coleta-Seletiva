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