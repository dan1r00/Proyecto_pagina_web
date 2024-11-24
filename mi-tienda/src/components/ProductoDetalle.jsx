import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductoDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        fetch('/productos.json')
            .then(response => response.json())
            .then(data => {
                const productoEncontrado = data.find(p => p.id === parseInt(id));
                setProducto(productoEncontrado);
            });
    }, [id]);

    if (!producto) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h2>{producto.nombre}</h2>
            <img src={producto.imagen} alt={producto.nombre} />
            <p>Precio: ${producto.precio}</p>
            <button className="agregar-al-carrito">Agregar al carrito</button>
        </div>
    );
};

export default ProductoDetalle;
