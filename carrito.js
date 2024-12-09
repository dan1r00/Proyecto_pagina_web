const listaCarrito = document.getElementById('cart-items');
const totalCarrito = document.getElementById('total');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function cargarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${producto.nombre} - $${producto.precio.toFixed(2)}
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
