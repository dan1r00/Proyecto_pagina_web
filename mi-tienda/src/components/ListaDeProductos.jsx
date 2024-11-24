import React, { useState, useEffect } from 'react';
import Producto from './Producto';

const ListaDeProductos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch('/productos.json')
            .then(response => response.json())
            .then(data => setProductos(data));
    }, []);

    return (
        <div className="productos-lista">
            {productos.map(producto => (
                <Producto key={producto.id} nombre={producto.nombre} precio={producto.precio} imagen={producto.imagen} />
            ))}
        </div>
    );
};

export default ListaDeProductos;
