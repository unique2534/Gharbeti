import {Link} from"react-router-dom";
import logo from '../logo.svg';
import SingleProduct from './SingleProduct';
import { useState, useEffect } from "react";
function Home(){
  const products=[
    {
      'title':'property1',
      'price':1000
    },
    {
      'title':'property2',
      'price':2000
    },
    {
      'title':'property3',
      'price':3000
    },
    {
      'title':'property4',
      'price':4000
    },
  ]
    return(
<main className="mt-4">
        <div className="container">
          {/* Latest Products */}
          <h3 className="mb-4">
            Latest Properties{' '}
            <Link to="/products" className="float-end btn btn-dark">
              View All Properties <i className="fa-solid fa-arrow-right-long"></i>
            </Link>
          </h3>
          <div className="row mb-4">
            {
              products.map((product)=><SingleProduct product={product} />)
            }
          </div>

          {/* popular categories */}
          <h3 className='mb-4'>Popular Categories <a href='#' className='float-end btn btn-dark m-2'>View All Categories<i className='fa-solid fa-arrow-right-long'></i></a></h3>
          <div className="row mb-4">
            {/* Category Box */}
            <div className="col-12 col-md-3 mb-4">
              <div className="card">
                <img
                  src={logo}
                  className="card-img-top"
                  alt="Logo"
                />
                <div className="card-body">
                  <h4 className="Card-title">Category title</h4>
                </div>
                <div className='card-footer'>
                 Property Ratings: 2345
                </div>
              </div>
            </div>
            {/* Category Box End */}
            {/* Product Box */}
            <div className="col-12 col-md-3 mb-4">
              <div className="card">
                <img
                  src={logo}
                  className="card-img-top"
                  alt="Logo"
                />
                <div className="card-body">
                  <h4 className="Card-title">Category title</h4>
                </div>
                <div className='card-footer'>
                 Property Ratings: 2345
                </div>
              </div>
            </div>
            {/* Product Box End */}
            {/* Product Box */}
            <div className="col-12 col-md-3 mb-4">
              <div className="card">
                <img
                  src={logo}
                  className="card-img-top"
                  alt="Logo"
                />
                <div className="card-body">
                  <h4 className="Card-title">Category title</h4>
                </div>
                <div className='card-footer'>
                 Property Ratings: 2345
                </div>
              </div>
            </div>
            {/* Product Box End */}
            {/* Product Box */}
            <div className="col-12 col-md-3 mb-4">
              <div className="card">
                <img
                  src={logo}
                  className="card-img-top"
                  alt="Logo"
                />
                <div className="card-body">
                  <h4 className="Card-title">Category title</h4>
                </div>
                <div className='card-footer'>
                 Property Ratings: 2345
                </div>
              </div>
            </div>
            {/* Product Box End */}
          </div>
          {/* End popular categories */}
          {/* popular properties */}
          <h3 className="mb-4">
            Popular Properties{' '}
            <a href="#" className="float-end btn btn-dark m-2">
              View All Properties<i className="fa-solid fa-arrow-right-long"></i>
            </a>
          </h3>
          <div className="row mb-4">
            {/* Product Box */}
            <div className="col-12 col-md-3 mb-4">
              <div className="card">
                <img
                  src={logo}
                  className="card-img-top"
                  alt="Logo"
                />
                <div className="card-body">
                  <h4 className="Card-title">Property title</h4>
                  <h5 className="Card-title text-muted">Price: NRs.1000</h5>
                </div>
                <div className='card-footer'>
                  <button title="Add to Cart" className='btn btn-success btn-sm'><i className="fa-solid fa-cart-plus"></i></button>
                  <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'><i className="fa fa-heart"></i></button>
                </div>
              </div>
            </div>
            {/* Product Box End */}
            {/* Product Box */}
            <div className="col-12 col-md-3 mb-4">
              <div className="card">
                <img
                  src={logo}
                  className="card-img-top"
                  alt="Logo"
                />
                <div className="card-body">
                  <h4 className="Card-title">Property title</h4>
                  <h5 className="Card-title text-muted">Price: NRs.1000</h5>
                </div>
                <div className='card-footer'>
                  <button title="Add to Cart" className='btn btn-success btn-sm'><i className="fa-solid fa-cart-plus"></i></button>
                  <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'><i className="fa fa-heart"></i></button>
                </div>
              </div>
            </div>
            {/* Product Box End */}
            {/* Product Box */}
            <div className="col-12 col-md-3 mb-4">
              <div className="card">
                <img
                  src={logo}
                  className="card-img-top"
                  alt="Logo"
                />
                <div className="card-body">
                  <h4 className="Card-title">Property title</h4>
                  <h5 className="Card-title text-muted">Price: NRs.1000</h5>
                </div>
                <div className='card-footer'>
                  <button title="Add to Cart" className='btn btn-success btn-sm'><i className="fa-solid fa-cart-plus"></i></button>
                  <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'><i className="fa fa-heart"></i></button>
                </div>
              </div>
            </div>
            {/* Product Box End */}
            {/* Product Box */}
            <div className="col-12 col-md-3 mb-4">
              <div className="card">
                <img
                  src={logo}
                  className="card-img-top"
                  alt="Logo"
                />
                <div className="card-body">
                  <h4 className="Card-title">Property title</h4>
                  <h5 className="Card-title text-muted">Price: NRs.1000</h5>
                </div>
                <div className='card-footer'>
                  <button title="Add to Cart" className='btn btn-success btn-sm'><i className="fa-solid fa-cart-plus"></i></button>
                  <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'><i className="fa fa-heart"></i></button>
                </div>
              </div>
            </div>
            {/* Product Box End */}
          </div>
          {/* End popular properties */}

          {/* popular sellers */}
          <h3 className='mb-4'>Popular Sellers <a href='#' className='float-end btn btn-dark m-2'>View All Sellers<i className='fa-solid fa-arrow-right-long'></i></a></h3>
          <div className="row mb-4">
            {/* seller Box */}
            <div className="col-12 col-md-3 mb-4">
              <div className="card">
                <img
                  src={logo}
                  className="card-img-top"
                  alt="Logo"
                />
                <div className="card-body">
                  <h4 className="Card-title">seller Name</h4>
                </div>
                <div className='card-footer'>
                Categories: <a href='#'>1 BHK</a>,<a href='#'>2 BHK</a>
                </div>
              </div>
            </div>
            {/* seller Box End */}
            {/* seller Box */}
            <div className="col-12 col-md-3 mb-4">
              <div className="card">
                <img
                  src={logo}
                  className="card-img-top"
                  alt="Logo"
                />
                <div className="card-body">
                  <h4 className="Card-title">seller Name</h4>
                </div>
                <div className='card-footer'>
                Categories: <a href='#'>1 BHK</a>,<a href='#'>2 BHK</a>
                </div>
              </div>
            </div>
            {/* seller Box End */}
            {/* seller Box */}
            <div className="col-12 col-md-3 mb-4">
              <div className="card">
                <img
                  src={logo}
                  className="card-img-top"
                  alt="Logo"
                />
                <div className="card-body">
                  <h4 className="Card-title">seller Name</h4>
                </div>
                <div className='card-footer'>
                Categories: <a href='#'>1 BHK</a>,<a href='#'>2 BHK</a>
                </div>
              </div>
            </div>
            {/* seller Box End */}
            {/* seller Box */}
            <div className="col-12 col-md-3 mb-4">
              <div className="card">
                <img
                  src={logo}
                  className="card-img-top"
                  alt="Logo"
                />
                <div className="card-body">
                  <h4 className="Card-title">seller Name</h4>
                </div>
                <div className='card-footer'>
                 Categories: <a href='#'>1 BHK</a>,<a href='#'>2 BHK</a>
                </div>
              </div>
            </div>
            {/* seller Box End */}
          </div>
          {/* End popular sellers */}

          {/* Rating  and Reviews*/}

            <div id="carouselExampleIndicators" className="carousel slide my-4 border bg-dark text-white p-5" data-bs-ride="true">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <figure className="text-center">
                    <blockquote className="blockquote">
                      <p>A well-known quote, contained in a blockquote element.</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                    <i className='fa fa-star text-warning'></i> 
                    <i className='fa fa-star text-warning'></i> 
                    <i className='fa fa-star text-warning'></i> 
                    <i className='fa fa-star text-warning'></i> 
                       <cite title="Source Title">Customer Name</cite>
                    </figcaption>
                  </figure>
                </div>
                <div className="carousel-item">
                  <figure className="text-center">
                    <blockquote className="blockquote">
                      <p>A well-known quote, contained in a blockquote element.</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                      <i className='fa fa-star text-warning'></i> 
                      <i className='fa fa-star text-warning'></i> 
                      <i className='fa fa-star text-warning'></i> 
                      <cite title="Source Title">Customer Name</cite>
                    </figcaption>
                  </figure>
                </div>
                <div className="carousel-item">
                  <figure className="text-center">
                    <blockquote className="blockquote">
                      <p>A well-known quote, contained in a blockquote element.</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                      <i className='fa fa-star text-warning'></i> 
                      <i className='fa fa-star text-warning'></i> 
                      <i className='fa fa-star text-warning'></i> 
                      <i className='fa fa-star text-warning'></i> 
                      <cite title="Source Title">Customer Name</cite>
                    </figcaption>
                  </figure>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          {/* End */}
        </div>
      </main>
      )
    }
    
    export default Home;