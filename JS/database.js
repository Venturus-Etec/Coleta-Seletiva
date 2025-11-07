const login = document.getElementById('LoginBtn');
const cadastro = document.getElementById('CadastroBtn');
const linkCadastro = document.getElementById('link-cadastro');
const linkLogin = document.getElementById('link-login');
const fecharPopupBtn = document.getElementById('fecharPopupBtn');
const fecharPopupBtn2 = document.getElementById('fecharPopupBtn2')
const loginFormContainer = document.getElementById('login-form-container');
const cadastroFormContainer = document.getElementById('cadastro-form-container');
const email = document.getElementById('loginEmail');
const senha = document.getElementById('loginSenha');
const nomec = document.getElementById('cadastroNome');
const emailc = document.getElementById('cadastroEmail');
const senhac = document.getElementById('cadastroSenha');
const pontos = localStorage.getItem('pontos');

function mostrarUsuario(nome, emailUser, pontos){
    const usuarioInfo = document.getElementById('usuario-info');
    const mostraNome = document.getElementById('mostrarNome');
    const mostrarEmail = document.getElementById('mostrarEmail');
    const mostrarPontos = document.getElementById('mostrarPontos');
    usuarioInfo.style.display = 'block';
    mostraNome.textContent = `Nome: ${nome}`;
    mostrarEmail.textContent = `Email: ${emailUser}`
    mostrarPontos.textContent = `Pontos: ${pontos || 0}`;
}

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

login.addEventListener('click', (e) => {
    if (email.value.trim() !== '' && senha.value.trim() !== '') {
        if (
            (email.value.toLowerCase() === 'matheus123@gmail.com' && senha.value === '123') ||
            (email.value.toLowerCase() === 'mariafer123@gmail.com' && senha.value === '123') ||
            (email.value.toLowerCase() === 'lucas123@gmail.com' && senha.value === '123') ||
            (email.value.toLowerCase() === 'otavio123@gmail.com' && senha.value === '123')
        ) {
            e.preventDefault();
            localStorage.setItem('logado', 'true');
            localStorage.setItem('emailUsuario', email.value.toLowerCase());
            let nome = '';
            if (email.value.toLowerCase() === 'matheus123@gmail.com') nome = 'Matheus Henrique';
            else if (email.value.toLowerCase() === 'mariafer123@gmail.com') nome = 'Maria Fernanda';
            else if (email.value.toLowerCase() === 'lucas123@gmail.com') nome = 'Lucas';
            else if (email.value.toLowerCase() === 'otavio123@gmail.com') nome = 'Otávio';
            localStorage.setItem('nomeUsuario', nome);
            meuPopup.classList.remove('mostrar');
            loginFormContainer.style.display = 'none';
            mostrarUsuario(nome, email.value.toLowerCase());
        } else {
            alert('Você não possui cadastro.');
        }
    } else {
        alert('Preencha o e-mail e a senha antes de continuar!');
    }
});

cadastro.addEventListener('click', (e) => {
    if (nomec.value.trim() !== '' && emailc.value.trim() !== '' && senhac.value.trim() !== ''){
        if (
            (nomec.value.toLowerCase() === 'matheus' && emailc.value.toLowerCase() === 'matheus123@gmail.com' && senhac.value === '123') || 
            (nomec.value.toLowerCase() === 'maria fernanda' && emailc.value.toLowerCase() === 'mariafer123@gmail.com' && senhac.value === '123') || 
            (nomec.value.toLowerCase() === 'lucas' && emailc.value.toLowerCase() === 'lucas123@gmail.com' && senhac.value === '123') || 
            (nomec.value.toLowerCase() === 'otavio' && emailc.value.toLowerCase() === 'otavio123@gmail.com' && senhac.value === '123')
            ){
                e.preventDefault();
                meuPopup2.classList.add('mostrar');
                localStorage.setItem('logado', 'true');
                localStorage.setItem('nomeUsuario', nomec.value);
                localStorage.setItem('emailUsuario', emailc.value.toLowerCase());
                mostrarUsuario(nomec.value, emailc.value.toLowerCase());
            }
    }else{
        alert('Preencha o nome, e-mail e a senha antes de continuar!')
    }
});

fecharPopupBtn.addEventListener('click', () => {
    meuPopup.classList.remove('mostrar');
    loginFormContainer.style.display = 'none';
    
});

fecharPopupBtn2.addEventListener('click', () => {
   meuPopup2.classList.remove('mostrar'); 
   cadastroFormContainer.style.display = 'none';
});

window.addEventListener('load', () => {
    const logado = localStorage.getItem('logado');
    const nome = localStorage.getItem('nomeUsuario');
    const email = localStorage.getItem('emailUsuario');
    const pontos = localStorage.getItem('pontos');
    if (logado === 'true' && nome && email) {
        loginFormContainer.style.display = 'none';
        mostrarUsuario(nome, email, pontos);
    }
});

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('logado');
        localStorage.removeItem('nomeUsuario');
        localStorage.removeItem('emailUsuario');
        localStorage.removeItem('pontos');
        localStorage.removeItem('codigoUsado');
        document.getElementById('usuario-info').style.display = 'none';
        loginFormContainer.style.display = 'block';
    });
}