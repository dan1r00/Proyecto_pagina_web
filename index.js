$(document).ready(function(){
    const cartItems = $('#cart-items');
    const total = $('#total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    $('.agregar-al-carrito').on('click', function() {
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

function agregarAlCarrito(event) {
    const boton = event.target;
    const nombre = boton.dataset.nombre;
    const precio = parseFloat(boton.dataset.precio);

    const producto = { nombre, precio };

    carrito.push(producto);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert(`"${nombre}" se añadió al carrito.`);
}

botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
});
