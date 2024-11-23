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

    const ofertasContenedor = document.querySelector('.ofertas-contenedor');
    const productos = Array.from(document.querySelectorAll('.producto'));
    const totalProductos = productos.length;

    productos.forEach(producto => {
        const cloneStart = producto.cloneNode(true);
        const cloneEnd = producto.cloneNode(true);
        ofertasContenedor.appendChild(cloneEnd);
        ofertasContenedor.insertBefore(cloneStart, ofertasContenedor.firstChild);
    });

    const productoWidth = 220; 
    let desplazamiento = -totalProductos * productoWidth; 
    ofertasContenedor.style.transform = `translateX(${desplazamiento}px)`;

    document.getElementById('flechaDerecha').addEventListener('click', () => {
        desplazamiento -= productoWidth;
        ofertasContenedor.style.transition = 'transform 0.3s ease';
        ofertasContenedor.style.transform = `translateX(${desplazamiento}px)`;

        if (desplazamiento <= -(totalProductos + totalProductos) * productoWidth) {
            setTimeout(() => {
                ofertasContenedor.style.transition = 'none';
                desplazamiento = -totalProductos * productoWidth;
                ofertasContenedor.style.transform = `translateX(${desplazamiento}px)`;
            }, 300);
        }
    });

    document.getElementById('flechaIzquierda').addEventListener('click', () => {
        desplazamiento += productoWidth;
        ofertasContenedor.style.transition = 'transform 0.3s ease';
        ofertasContenedor.style.transform = `translateX(${desplazamiento}px)`;

        if (desplazamiento >= 0) {
            setTimeout(() => {
                ofertasContenedor.style.transition = 'none';
                desplazamiento = -totalProductos * productoWidth;
                ofertasContenedor.style.transform = `translateX(${desplazamiento}px)`;
            }, 300);
        }
    });
});
