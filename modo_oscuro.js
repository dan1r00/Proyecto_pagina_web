const toggleModoOscuro = document.getElementById('toggle-modo-oscuro');
const body = document.body;
toggleModoOscuro.addEventListener('click', () => {  
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
