$(document).ready(function () {
    const cartItems = $('#cart-items');
    const total = $('#total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    $('.agregar-al-carrito').on('click', function () {
        const name = $(this).data('nombre');
        const price = parseFloat($(this).data('precio') || 0);

        cart.push({ name, price });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    });

    function updateCart() {
        cartItems.empty();
        let totalPrice = 0;

        cart.forEach(item => {
            const li = $('<li>').text(`${item.name} - $${item.price}`);
            cartItems.append(li);
            totalPrice += item.price;
        });

        total.text(totalPrice.toFixed(2));
    }

    updateCart();

    $('#search').on('input', async function (event) {
        const searchTerm = event.target.value.toLowerCase();

        if (searchTerm.length === 0) {
            $('#contenedor-productos').empty();
            return;
        }

        const response = await fetch(`buscar_producto.php?q=${searchTerm}`);
        const productos = await response.json();

        const contenedorProductos = $('#contenedor-productos');
        contenedorProductos.empty(); 

        if (productos.length > 0) {
            productos.forEach(producto => {
                const productoHTML = `
                    <div class="producto">
                        <h3>${producto.nombre_producto}</h3>
                        <p>Precio: $${producto.precio_producto}</p>
                        <p>${producto.descripcion_producto}</p>
                        <button class="agregar-al-carrito" 
                                data-nombre="${producto.nombre_producto}" 
                                data-precio="${producto.precio_producto}">
                            Agregar al carrito
                        </button>
                    </div>
                `;
                contenedorProductos.append(productoHTML);
            });
        } else {
            contenedorProductos.html('<p>No se encontraron productos.</p>');
        }
    });

    $('.ofertas-contenedor').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '#flechaIzquierda',
        nextArrow: '#flechaDerecha',
    });

    setTimeout(function () {
        document.getElementById('pop').classList.add('active');
    }, 10000);

    document.getElementById('closePop').addEventListener('click', function () {
        document.getElementById('pop').classList.remove('active');
    });
});
