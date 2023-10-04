import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SingleProduct from './SingleProduct';
import { useParams } from 'react-router-dom';

function CategoryProducts(props) {
  const baseUrl = 'http://127.0.0.1:8000/api';
  const [products, setProducts] = useState([]);
  const [totalResult, setTotalResults] = useState(0);
  const { category_slug, category_id } = useParams();

  useEffect(() => {
    fetchData(baseUrl + '/products/?category=' + category_id);
  }, []);

  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.results);
        setTotalResults(data.count);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  function changeUrl(baseurl) {
    fetchData(baseurl);
  }

  const links = [];
  const limit = 1;
  const totalLinks = Math.ceil(totalResult / limit);

  for (let i = 1; i <= totalLinks; i++) {
    links.push(
      <li key={i} className="page-item">
        <Link
          onClick={() =>
            changeUrl(baseUrl + `/products/?category=${category_id}&page=${i}`)
          }
          to={`/category/${category_slug}/${category_id}/?page=${i}`}
          className="page-link"
        >
          {i}
        </Link>
      </li>
    );
  }

  return (
    <section className="container mt-4">
      <h3 className="mb-4">All Properties</h3>
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

export default CategoryProducts;
