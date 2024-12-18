const toggleModoOscuro = document.getElementById('toggle-modo-oscuro');
const body = document.body;
toggleModoOscuro.addEventListener('click', () => {
    body.classList.toggle('modo-oscuro');
    toggleModoOscuro.textContent = body.classList.contains('modo-oscuro') ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
    document.body.classList.toggle('modo-oscuro');

    if (document.body.classList.contains('modo-oscuro')) {
        localStorage.setItem('modoOscuro', 'true');
    } else {
        localStorage.setItem('modoOscuro', 'false');
    }
});
if (localStorage.getItem('modoOscuro') === 'true') {
    document.body.classList.add('modo-oscuro');
}
