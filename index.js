const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


const carritoContainer = document.getElementById("carrito-container");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const productosContainer = document.getElementById("productos-container");

function renderizarCarrito() {
    carritoContainer.innerHTML = ""; 

    if (carrito.length === 0) {
        carritoContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
        return;
    }

    carrito.forEach((producto, index) => {
        const item = document.createElement("div");
        item.classList.add("carrito-item");
        item.innerHTML = `
            <span>${producto.nombre} - $${producto.precio}</span>
            <button data-index="${index}" class="eliminar-producto">Eliminar</button>
        `;
        carritoContainer.appendChild(item);
    });

    document.querySelectorAll(".eliminar-producto").forEach((boton) => {
        boton.addEventListener("click", eliminarProducto);
    });
}

function agregarAlCarrito(producto) {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito)); 
    alert(`${producto.nombre} agregado al carrito.`);
    renderizarCarrito();
}

function eliminarProducto(event) {
    const index = event.target.dataset.index; 
    carrito.splice(index, 1); 
    localStorage.setItem("carrito", JSON.stringify(carrito)); 
    renderizarCarrito();
}

vaciarCarritoBtn?.addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("El carrito ya está vacío.");
        return;
    }
    localStorage.removeItem("carrito");
    carrito.length = 0;
    renderizarCarrito();
});

function renderizarProductos() {
    if (!productosContainer) return;

    const productos = [
        { id: 1, nombre: "Producto 1", precio: 100 },
        { id: 2, nombre: "Producto 2", precio: 200 },
        { id: 3, nombre: "Producto 3", precio: 300 },
        { id: 4, nombre: "Producto 4", precio: 400 },
    ];

    productosContainer.innerHTML = "";

    productos.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("producto-card");
        card.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button class="btn-agregar" data-id="${producto.id}">Agregar al Carrito</button>
        `;
        productosContainer.appendChild(card);
    });
    document.querySelectorAll(".btn-agregar").forEach((boton) => {
        boton.addEventListener("click", (event) => {
            const id = event.target.dataset.id;
            const producto = productos.find((prod) => prod.id == id);
            if (producto) agregarAlCarrito(producto);
        });
    });
}

renderizarCarrito();
renderizarProductos();
/*$(document).ready(function () {
    const cartItems = $('#cart-items'); 
    const total = $('#total'); 
    let cart = JSON.parse(localStorage.getItem('cart')) || []; 

    function updateCart() {
        cartItems.empty(); 
        let totalPrice = 0;
        cart.forEach((item, index) => {
            const li = $(`
                <li>
                    ${item.name} - $${item.price.toFixed(2)}
                    <button class="eliminar-producto" data-index="${index}">Eliminar</button>
                </li>
            `);
            cartItems.append(li);
            totalPrice += item.price;
        });

        total.text(totalPrice.toFixed(2)); 

        $('.eliminar-producto').on('click', function () {
            const index = $(this).data('index');
            cart.splice(index, 1); 
            localStorage.setItem('cart', JSON.stringify(cart)); 
            updateCart(); 
        });
    }

    $('.agregar-al-carrito').on('click', function () {
        const name = $(this).data('nombre'); 
        const price = parseFloat($(this).data('precio') || 0); 

        cart.push({ name, price }); 
        localStorage.setItem('cart', JSON.stringify(cart)); 
        updateCart(); 

        alert(`${name} se añadió al carrito.`);
    });

    $('#search').on('input', function (event) {
        const searchTerm = event.target.value.toLowerCase(); 
        const products = $('.producto'); 

        products.each(function () {
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
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '#flechaIzquierda',
        nextArrow: '#flechaDerecha',
    });

    $('.carrito-icon').on('click', function () {
        $('#carrito-modal').show();
    });

    $('#cerrar-carrito').on('click', function () {
        $('#carrito-modal').hide();
    });

    updateCart();
});
$(document).on('click', function (event) {
    if ($(event.target).is('#carrito-modal')) {
        $('#carrito-modal').hide();
    }
});
---------------2------------------*/
/*$(document).ready(function () {
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
