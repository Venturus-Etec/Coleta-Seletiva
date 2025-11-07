const abrirPopupLink = document.getElementById('abrirPopupLink');
const meuPopup = document.getElementById('meuPopup');
const meuPopup2 = document.getElementById('meuPopup2');
const fecharPopupBtn = document.getElementById('fecharPopupBtn');
const GanharP = document.getElementById('GanharP');
const mensagemErro = document.getElementById('mensagemErro');
const meuInput = document.getElementById('Codigo');
const fecharPopupBtn2 = document.getElementById('fecharPopupBtn2');


abrirPopupLink.addEventListener('click', (e) => {
    e.preventDefault();
    meuPopup.classList.add('mostrar');
});

GanharP.addEventListener('click', () => {
    const codigo = meuInput.value.trim();
    const logado = localStorage.getItem('logado');
    const codigoUsado = localStorage.getItem('codigoUsado')
    if (codigo === '') {
        mensagemErro.textContent = 'O campo não pode ficar vazio.';
        mensagemErro.style.color = 'red';
        return;
    }else if (codigo !== 'CODIGO1000'){
        mensagemErro.textContent = 'O codigo esta incorreto.';
        mensagemErro.style.color = 'red';
        return;
    }else if (logado !== 'true'){
        mensagemErro.textContent = 'Precisa estar logado.';
        mensagemErro.style.color = 'red';
        return
    }else if(codigoUsado === 'true'){
        mensagemErro.textContent = 'Você já usou este código.';
        mensagemErro.style.color = 'red';
        return;
    }else{
        meuPopup.classList.remove('mostrar');
        meuPopup2.classList.add('mostrar');
        localStorage.setItem('pontos','1000');
        localStorage.setItem('codigoUsado', 'true');
    } 
});

fecharPopupBtn.addEventListener('click', () => {
    meuPopup.classList.remove('mostrar');
});

fecharPopupBtn2.addEventListener('click', () => {
    meuPopup2.classList.remove('mostrar');
    
})