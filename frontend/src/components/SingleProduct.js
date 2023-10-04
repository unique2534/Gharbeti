// packages
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// assets
import logo from '../logo.svg';
import { useParams } from 'react-router-dom';

function SingleProduct(props) {
    if (!props.product || !props.product.title) {
        return null; // or display a loading message or something else
  }
  return (
    <div className="col-12 col-md-3 col-sm mb-4">
      <div className="card">
        <Link to={`/product/${props.product.title}/${props.product.id}`}>
          <img src={props.product.image} className="card-img-top" alt="..." />
        </Link>
        <div className="card-body">
          <h5 className="Card-title"><Link to={`/product/${props.product.title}/${props.product.id}`}>{props.product.title}</Link></h5>
          <h5 className="Card-title text-muted">{props.product.price}</h5>
        </div>
        <div className='card-footer'>
         <button title="Add to Cart" className='btn btn-success btn-sm'>
            <i className="fa-solid fa-cart-plus"></i>
          </button>
          <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'>
            <i className="fa fa-heart"></i>
            </button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
