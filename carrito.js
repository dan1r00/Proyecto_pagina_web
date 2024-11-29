const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const carritoContainer = document.getElementById("carrito-container");
        const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

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

        function eliminarProducto(event) {
            const index = event.target.dataset.index;
            carrito.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderizarCarrito();
        }

        vaciarCarritoBtn.addEventListener("click", () => {
            localStorage.removeItem("carrito");
            renderizarCarrito();
        });

        renderizarCarrito();