const hamburguesa = document.getElementById('hamburguesa');
const Menu = document.querySelector('.MenuNavegacion');

hamburguesa.addEventListener('click', () => {
    Menu.classList.toggle('show');
});

// Cerrar menú al hacer click en un enlace (para mobile)
const enlaces = document.querySelectorAll('.MenuNavegacion .Links');
enlaces.forEach(enlace => {
    enlace.addEventListener('click', () => {
        Menu.classList.remove('show');
    });
});

// Cerrar menú al hacer click fuera del menú
document.addEventListener('click', (e) => {
    if (!hamburguesa.contains(e.target) && !Menu.contains(e.target)) {
        Menu.classList.remove('show');
    }
});