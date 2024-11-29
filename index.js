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

    $('#search').on('input', function(event) {
        const searchTerm = event.target.value.toLowerCase();
        const products = $('.producto');

        products.each(function() {
            const productName = $(this).find('h3').text().toLowerCase();
            if (productName.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $('.ofertas-contenedor').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '#flechaIzquierda',
        nextArrow: '#flechaDerecha'
    });

    let target = document.querySelectorAll('.socList>li>a');

    target.forEach(ele => {
        ele.addEventListener('mouseenter', function(event) {
            let color = event.target.getAttribute('data-color');
            document.getElementsByTagName('body')[0].style.backgroundColor = color;
        });
    });

    target.forEach(ele => {
        ele.addEventListener('mouseleave', function(event) {
            document.getElementsByTagName('body')[0].style.backgroundColor = '#fff';
        });
    });

    VanillaTilt.init(document.querySelectorAll(".socList li>a"), {
        max: 30,
        speed: 100,
        glare: true,
        "max-glare": 0.65
    });

    setTimeout(function(){
        document.getElementById('pop').classList.add('active');
    }, 10000);

    document.getElementById('closePop').addEventListener('click', function(){
        document.getElementById('pop').classList.remove('active');
    });
});

const botonesAgregar = document.querySelectorAll(".agregar-al-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(event) {
    const boton = event.target;
    const nombre = boton.dataset.nombre;
    const precio = parseFloat(boton.dataset.precio);

    const producto = { nombre, precio };

    carrito.push(producto);

    guardarCarrito();

    alert(`"${nombre}" se añadió al carrito.`);
}

function mostrarCarrito() {
    const carritoModal = document.getElementById("carrito-modal");
    const carritoContenido = document.getElementById("carrito-contenido");

    carritoContenido.innerHTML = ""; 

    if (carrito.length === 0) {
        carritoContenido.innerHTML = "<p>Tu carrito está vacío.</p>";
    } else {
        carrito.forEach((producto, index) => {
            const item = document.createElement("div");
            item.classList.add("carrito-item");
            item.innerHTML = `
                <span>${producto.nombre} - $${producto.precio}</span>
                <button data-index="${index}" class="eliminar-producto">Eliminar</button>
            `;
            carritoContenido.appendChild(item);
        });

        document.querySelectorAll(".eliminar-producto").forEach((boton) => {
            boton.addEventListener("click", eliminarProducto);
        });
    }

    carritoModal.style.display = "block";
}

function eliminarProducto(event) {
    const index = event.target.dataset.index;
    carrito.splice(index, 1); 
    guardarCarrito(); 
    mostrarCarrito(); 
}

function cerrarCarrito() {
    const carritoModal = document.getElementById("carrito-modal");
    carritoModal.style.display = "none";
}

document.querySelectorAll(".agregar-al-carrito").forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
});

document.querySelector(".carrito-icon").addEventListener("click", mostrarCarrito);

document.getElementById("cerrar-carrito").addEventListener("click", cerrarCarrito);
function vaciarCarrito() {
    carrito = []; 
    guardarCarrito();
    mostrarCarrito();
    if (document.getElementById("carrito-contenido-html")) {
        actualizarCarritoHTML(); 
    }
    alert("El carrito se ha vaciado.");
}

function actualizarCarritoHTML() {
    const carritoContenidoHTML = document.getElementById("carrito-contenido-html");
    carritoContenidoHTML.innerHTML = "";

    if (carrito.length === 0) {
        carritoContenidoHTML.innerHTML = "<p>Tu carrito está vacío.</p>";
    } else {
        carrito.forEach((producto, index) => {
            const item = document.createElement("div");
            item.classList.add("carrito-item");
            item.innerHTML = `
                <span>${producto.nombre} - $${producto.precio}</span>
                <button data-index="${index}" class="eliminar-producto">Eliminar</button>
            `;
            carritoContenidoHTML.appendChild(item);
        });

        document.querySelectorAll(".eliminar-producto").forEach((boton) => {
            boton.addEventListener("click", eliminarProducto);
        });
    }
}

if (document.getElementById("carrito-contenido-html")) {
    actualizarCarritoHTML();
    document.getElementById("vaciar-carrito-btn").addEventListener("click", vaciarCarrito);
}

document.getElementById("vaciar-carrito-modal").addEventListener("click", vaciarCarrito);
   /* updateCart();

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
