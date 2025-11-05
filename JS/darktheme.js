const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const logoPrincipal = document.getElementById('menu-acc2');
const logoClaro = 'IMG/acessibilidade.png';
const logoEscuro = 'IMG/acessibilidade_mododark.png';

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

if (themeToggle) {
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
}