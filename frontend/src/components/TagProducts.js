import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SingleProduct from './SingleProduct';
import { useParams } from 'react-router-dom';

function TagProducts() {
  const baseUrl = 'http://127.0.0.1:8000/api';
  const [products, setProducts] = useState([]);
  const [totalResult, setTotalResults] = useState(0);
  const { tag } = useParams();

  useEffect(() => {
    fetchData(`${baseUrl}/products`);
  }, [tag]);

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // Filter products based on the category derived from tags
      const filteredProducts = data.results.filter(product => product.tag_list.includes(tag));
      setProducts(filteredProducts);
      setTotalResults(filteredProducts.length); // Update total results count
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const links = [];
  const limit = 1;
  const totalLinks = Math.ceil(totalResult / limit);

  for (let i = 1; i <= totalLinks; i++) {
    links.push(
      <li key={i} className="page-item">
        <Link
          onClick={() => fetchData(`${baseUrl}/products/?tag=${tag}&page=${i}`)}
          to={`/products/${tag}/?page=${i}`}
          className="page-link"
        >
          {i}
        </Link>
      </li>
    );
  }

  return (
    <section className="container mt-4">
      <h3 className="mb-4">Products with Tag: {tag}</h3>
      <div className="row mb-4">
        {products.map((product) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </div>
      <nav aria-label="page navigation example">
        <ul className="pagination">{links}</ul>
      </nav>
    </section>
  );
}

export default TagProducts;
