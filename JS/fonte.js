const tamanhoSalvo = localStorage.getItem('tamanhoFonte');
if (tamanhoSalvo) {
    document.documentElement.style.setProperty('--tamanho-fonte-base', `${tamanhoSalvo}px`);
}

const btnAumentar = document.getElementById('aumentar');
const btnDiminuir = document.getElementById('diminuir');
const btnReset = document.getElementById('reset');

const passo = 2;
const tamanhoMinimo = 10;
const tamanhoMaximo = 18;
const tamanhoPadrao = 16;

function getTamanhoFonteAtual() {
    const rootStyle = getComputedStyle(document.documentElement);
    const tamanhoStr = rootStyle.getPropertyValue('--tamanho-fonte-base');
    return parseFloat(tamanhoStr) || tamanhoPadrao;
}

if (btnAumentar) {
    btnAumentar.addEventListener('click', () => {
        const tamanhoAtual = getTamanhoFonteAtual();
        let novoTamanho = tamanhoAtual + passo;

        if (novoTamanho > tamanhoMaximo) {
            novoTamanho = tamanhoMaximo;
        }
        
        document.documentElement.style.setProperty('--tamanho-fonte-base', `${novoTamanho}px`);
        localStorage.setItem('tamanhoFonte', novoTamanho);
    });
}

if (btnDiminuir) {
    btnDiminuir.addEventListener('click', () => {
        const tamanhoAtual = getTamanhoFonteAtual();
        let novoTamanho = tamanhoAtual - passo;

        if (novoTamanho < tamanhoMinimo) {
            novoTamanho = tamanhoMinimo;
        }
        
        document.documentElement.style.setProperty('--tamanho-fonte-base', `${novoTamanho}px`);
        localStorage.setItem('tamanhoFonte', novoTamanho);
    });
}

if (btnReset) {
    btnReset.addEventListener('click', () => {
        document.documentElement.style.setProperty('--tamanho-fonte-base', `${tamanhoPadrao}px`);
        localStorage.setItem('tamanhoFonte', tamanhoPadrao);
    });
}