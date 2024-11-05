// index.js
document.addEventListener('DOMContentLoaded', function () {
    const cartItems = document.getElementById('cart-items');
    const total = document.getElementById('total');
    let cart = [];

    document.querySelectorAll('.agregar-carrito').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.dataset.nombre;
            const price = parseFloat(button.dataset.precio);

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
});

