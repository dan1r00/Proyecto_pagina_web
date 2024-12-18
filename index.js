$(document).ready(function () {
    const listaCarrito = $('#cart-items');
    const totalCarrito = $('#total');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function actualizarCarrito() {
        listaCarrito.empty();
        let total = 0;

        carrito.forEach((producto, index) => {
            const li = $(`
                <li>
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-carrito">
                    <span>${producto.nombre} - $${producto.precio.toFixed(2)}</span>
                    <button class="eliminar-producto" data-index="${index}">Eliminar</button>
                </li>
            `);
            listaCarrito.append(li);
            total += producto.precio;
        });

        totalCarrito.text(total.toFixed(2));

        $('.eliminar-producto').on('click', function () {
            const index = $(this).data('index');
            carrito.splice(index, 1); 
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito();
        });
    }

    $('.agregar-al-carrito').on('click', function () {
        const nombre = $(this).data('nombre');
        const precio = parseFloat($(this).data('precio') || 0);
        const imagen = $(this).data('imagen'); 

        const producto = { nombre, precio, imagen };
        carrito.push(producto);

        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();

        alert(`${nombre} se añadió al carrito.`);
    });

    $('#search').on('input', function (event) {
        const searchTerm = event.target.value.toLowerCase();
        const productos = $('.producto');

        productos.each(function () {
            const nombreProducto = $(this).find('h3').text().toLowerCase();
            if (nombreProducto.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $('.ofertas-contenedor').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '#flechaIzquierda',
        nextArrow: '#flechaDerecha',
    });

    $('.carrito-icon').on('click', function () {
        $('#carrito-modal').toggle();
    });

    $('#cerrar-carrito').on('click', function () {
        $('#carrito-modal').hide();
    });    

    actualizarCarrito();
});
