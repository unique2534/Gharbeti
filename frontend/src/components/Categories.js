import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

function Categories() {
  const baseUrl = 'http://127.0.0.1:8000/api';
  const [categories, setCategories] = useState([]);
  const [totalResult, setTotalResults] = useState(0);

  useEffect(() => {
    fetchData(baseUrl + '/categories');
  }, []);

  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.results);
        setTotalResults(data.count);
      });
  }

  function changeUrl(page) {
    fetchData(`${baseUrl}/categories/?page=${page}`);
  }

  const links = [];
  const limit = 8;
  const totalLinks = Math.ceil(totalResult / limit);
  for (let i = 1; i <= totalLinks; i++) {
    links.push(
      <li className="page-item" key={i}>
        <Link onClick={() => changeUrl(i)} to={`/categories/?page=${i}`} className="page-link">
          {i}
        </Link>
      </li>
    );
  }

  return (
    <section className="container mt-4">
      {/* categories */}
      <h3 className="mb-4">All Categories</h3>
      <div className="row mb-2">
        {categories.map((category) => (
          <div className="col-12 col-md-3 mb-4" key={category.id}>
            <div className="card">
              <img src={logo} className="card-img-top" alt={category.title} />
              <div className="card-body">
                <h4 className="Card-title">
                  <Link to={`/category/${category.title}/${category.id}`}>{category.title}</Link>
                </h4>
              </div>
              <div className="card-footer">Property Ratings: 2345</div>
            </div>
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {links}
        </ul>
      </nav>
    </section>
  );
}

export default Categories;
