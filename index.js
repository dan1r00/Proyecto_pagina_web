document.addEventListener('DOMContentLoaded', function () {
    const cartItems = document.getElementById('cart-items');
    const total = document.getElementById('total');
    let cart = [];

    document.querySelectorAll('.agregar-al-carrito').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.dataset.nombre;
            const price = parseFloat(button.dataset.precio || 0);

            cart.push({ name, price });
            updateCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;
            cartItems.appendChild(li);
            totalPrice += item.price;
        });

        total.textContent = totalPrice.toFixed(2);
    }

    // Código para la búsqueda de productos
    document.getElementById('search').addEventListener('input', function (event) {
        const searchTerm = event.target.value.toLowerCase();
        const products = document.querySelectorAll('.producto');

        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });

    let desplazamiento = 0;

    function moverProductos(direccion) {
        const contenedor = document.querySelector('.ofertas-contenedor');
        const anchoProducto = contenedor.querySelector('.producto').offsetWidth;
        desplazamiento += direccion * anchoProducto;

        const maxDesplazamiento = -contenedor.scrollWidth + contenedor.clientWidth;
        desplazamiento = Math.max(maxDesplazamiento, Math.min(0, desplazamiento));

        contenedor.style.transform = `translateX(${desplazamiento}px)`;
    }

    document.querySelector('.navegacion-flecha.izquierda').addEventListener('click', () => moverProductos(-1));
    document.querySelector('.navegacion-flecha.derecha').addEventListener('click', () => moverProductos(1));
});
