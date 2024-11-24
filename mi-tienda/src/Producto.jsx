import React from 'react';

const Producto = ({ nombre, precio, imagen }) => {
    return (
        <div className="producto">
            <img src={imagen} alt={nombre} />
            <h3>{nombre}</h3>
            <p>${precio}</p>
            <button className="agregar-al-carrito">Agregar al carrito</button>
        </div>
    );
};

export default Producto;
