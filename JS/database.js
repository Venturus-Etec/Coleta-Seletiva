const login = document.getElementById('LoginBtn');
const cadastro = document.getElementById('CadastroBtn');
const linkCadastro = document.getElementById('link-cadastro');
const linkLogin = document.getElementById('link-login');
const fecharPopupBtn = document.getElementById('fecharPopupBtn');
const loginFormContainer = document.getElementById('login-form-container');
const cadastroFormContainer = document.getElementById('cadastro-form-container');

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
    e.preventDefault();
    meuPopup.classList.add('mostrar');
});

cadastro.addEventListener('click', (e) => {
    e.preventDefault();
    meuPopup2.classList.add('mostrar');
});

fecharPopupBtn.addEventListener('click', () => {
    meuPopup.classList.remove('mostrar');
});

fecharPopupBtn.addEventListener('click', () => {
   meuPopup2.classList.remove('mostrar'); 
});
