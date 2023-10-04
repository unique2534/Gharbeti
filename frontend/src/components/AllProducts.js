import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SingleProduct from './SingleProduct';

function AllProducts() {
  const baseUrl = 'http://localhost:8000/api/products/';
  const [products, setProducts] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
  fetchData(`${baseUrl}?page=${currentPage}`);
}, [currentPage]);

  async function fetchData(url) {
    console.log('Fetching data from URL:', url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Received data:', data);
      setProducts(data.results);
      setTotalResults(data.count);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message);
      console.error('Error fetching data:', error);
    }
  }

  const productsPerPage = 8;
  const totalPages = Math.ceil(totalResults / productsPerPage);

  const pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    pageLinks.push(
      <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
        <Link
          className="page-link"
          onClick={() => setCurrentPage(i)}
          to={`/products/?page=${i}`}
        >
          {i}
        </Link>
      </li>
    );
  }

  return (
    <section className="container mt-4">
      <h3 className="mb-4">All Properties</h3>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <>
          <div className="row mb-4">
            {products.map((product) => (
              <SingleProduct key={product.id} product={product} />
            ))}
          </div>
          <nav aria-label="page navigation example">
            <ul className="pagination">{pageLinks}</ul>
          </nav>
        </>
      )}
    </section>
  );
}

export default AllProducts;
