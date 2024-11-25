import React from "react";
import { Link } from "react-router-dom";
import { products } from "../data";

const Home = () => {
  return (
    <div className="productos">
      {products.map((product) => (
        <div key={product.id} className="producto">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>Precio: ${product.price}</p>
          <Link to={`/product/${product.id}`}>Ver detalles</Link> {}
        </div>
      ))}
    </div>
  );
};

export default Home;
