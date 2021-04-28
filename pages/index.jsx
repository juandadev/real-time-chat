import axios from "axios";
import React, { useEffect, useState, Fragment } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    price: "",
    category: "",
    skus: [],
  });

  useEffect(() => {
    axios.get("/api/products").then(({ data }) => setProducts(data));
  }, []);

  function getProductDetail(id) {
    axios
      .get(`api/products/${id}`)
      .then(({ data }) => setSelectedProduct(data[0]));
  }

  return (
    <Fragment>
      <h1>Home</h1>

      <ol>
        {products.map((product) => (
          <li onClick={() => getProductDetail(product.id)}>{product.name}</li>
        ))}
      </ol>

      <div className="product-detail">
        <h3>Name: {selectedProduct.name}</h3>

        <p>Price: ${selectedProduct.price}</p>

        <p>Category: {selectedProduct.category}</p>

        <p>Sizes:</p>

        <ul>
          {selectedProduct.skus.map((size) => (
            <li>{size.sku}</li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
}
