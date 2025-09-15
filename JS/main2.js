const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const logoPrincipal = document.getElementById('menu-acc2');
const logoClaro = 'IMG/menu-acc3.png';
const logoEscuro = 'IMG/menu-acc4.png';

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        if (logoPrincipal) {
            logoPrincipal.src = logoEscuro;
        }
    } else {
        if (logoPrincipal) {
            logoPrincipal.src = logoClaro;
        }
    }
});

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');

    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        if (logoPrincipal) {
            logoPrincipal.src = logoEscuro;
        }
    } else {
        localStorage.setItem('theme', 'light');
        if (logoPrincipal) {
            logoPrincipal.src = logoClaro;
        }
    }
});

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
    // Retorna o tamanho atual ou o padrão se não encontrar
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
        // Salva o tamanho padrão no localStorage
        localStorage.setItem('tamanhoFonte', tamanhoPadrao);
    });
}