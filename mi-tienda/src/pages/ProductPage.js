import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../data";

const ProductPage = () => {
  const { id } = useParams(); 
  const product = products.find((prod) => prod.id === parseInt(id)); 

  if (!product) {
    return <h2>Producto no encontrado</h2>; 
  }

  return (
    <div className="producto-detalle">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <button className="agregar-al-carrito">Agregar al carrito</button>
    </div>
  );
};

export default ProductPage;
