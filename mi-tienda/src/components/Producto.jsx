import React from 'react';
import { Link } from 'react-router-dom';

const Producto = ({ id, nombre, precio, imagen }) => {
    return (
        <div className="producto">
            <img src={imagen} alt={nombre} />
            <h3>{nombre}</h3>
            <p>${precio}</p>
            <Link to={`/producto/${id}`}>
                <button className="ver-detalles">Ver Detalles</button>
            </Link>
        </div>
    );
};

export default Producto;
