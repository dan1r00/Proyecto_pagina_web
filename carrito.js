const listaCarrito = document.getElementById('cart-items');
const totalCarrito = document.getElementById('total');

const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function cargarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((producto) => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        listaCarrito.appendChild(li);

        total += producto.precio;
    });

    totalCarrito.textContent = total.toFixed(2);
}

cargarCarrito();
