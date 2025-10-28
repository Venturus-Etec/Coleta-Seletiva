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