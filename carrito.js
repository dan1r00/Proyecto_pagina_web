const listaCarrito = document.getElementById('cart-items');
const totalCarrito = document.getElementById('total');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function cargarCarrito() {
    listaCarrito.innerHTML = ''; 
    let total = 0;

    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-carrito">
            <span>${producto.nombre} - $${producto.precio.toFixed(2)}</span>
            <button class="eliminar-producto" data-index="${index}">Eliminar</button>
        `;
        listaCarrito.appendChild(li);
        total += producto.precio;
    });

    totalCarrito.textContent = total.toFixed(2);

    document.querySelectorAll('.eliminar-producto').forEach((btn) => {
        btn.addEventListener('click', () => {
            const index = btn.getAttribute('data-index');
            carrito.splice(index, 1); 
            localStorage.setItem('carrito', JSON.stringify(carrito)); 
            cargarCarrito(); 
        });
    });
}

cargarCarrito();
