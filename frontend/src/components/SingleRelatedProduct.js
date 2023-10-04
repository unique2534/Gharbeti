import React from 'react';
import { Link } from 'react-router-dom';

function SingleRelatedProduct(props) {
  if (!props.product || !props.product.title) {
    return null;
  }

  return (
    <div className="col-4 offset-4 mb-4">
      <div className="card">
        <Link to={`/product/${props.product.slug}/${props.product.id}`}>
          <img src={props.product.image} className="card-img-top" alt="..." />
        </Link>
        <div className="card-body">
          <h5 className="Card-title">
            <Link to={`/product/${props.product.title}/${props.product.id}`}>
              {props.product.title}
            </Link>
          </h5>
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

export default SingleRelatedProduct;
