import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../Context';
import SingleRelatedProduct from './SingleRelatedProduct';


function ProductDetail() {
  const baseUrl = 'http://127.0.0.1:8000/api';
  const { product_id } = useParams();
  const [productData, setProductData] = useState({});
  const [productImgs, setProductImgs] = useState([]);
  const [productTags, setProductTags] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cartButtonClickStatus, setCartButtonClickStatus] = useState(false);
  const { cartData, setCartData } = useContext(CartContext);

  useEffect(() => {
    fetchData(`${baseUrl}/product/${product_id}`);
    fetchRelatedData(`${baseUrl}/related-products/${product_id}`);
    checkProductInCart(product_id);
  }, [baseUrl, product_id]);

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProductData(data);
      setProductImgs(data.product_imgs);
      setProductTags(data.tag_list);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function fetchRelatedData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setRelatedProducts(data.results);
      });
  }

  function checkProductInCart(product_id) {
    const isProductInCart = cartData.some((cart) => cart.product && cart.product.id === product_id);
    setCartButtonClickStatus(isProductInCart);
  }

  const cartAddButtonHandler = () => {
    const cartItem = {
      product: {
        id: productData.id,
        title: productData.title,
        price: productData.price,
        image: productData.image,
      },
      user: {
        id: 1,
      },
    };

    if (!cartButtonClickStatus) {
      const updatedCartData = [...cartData, cartItem];
      setCartData(updatedCartData);
      setCartButtonClickStatus(true);
    }
  };

  const cartRemoveButtonHandler = () => {
    if (cartButtonClickStatus) {
      const updatedCartData = cartData.filter((cart) => cart.product.id !== productData.id);
      setCartData(updatedCartData);
      setCartButtonClickStatus(false);
    }
  };

  return (
    <section className="container mt-4">
      <div className="row">
        <div className="col-4">
          {productImgs.length > 0 && (
            <div
              id="productThumbnailSlider"
              className="carousel slide carousel-dark carousel-fade"
              data-bs-ride="carousel"
              data-bs-interval="2000"
            >
              <div className="carousel-indicators">
                {productImgs.map((img, index) => (
                  <button
                    type='button'
                    data-bs-target="#productThumbnailSlider"
                    data-bs-slide-to={index}
                    className={index === 0 ? 'active' : ''}
                    aria-current={index === 0 ? 'true' : 'false'}
                    key={index}
                  ></button>
                ))}
              </div>
              <div className="carousel-inner">
                {productImgs.map((img, index) => (
                  <div
                    className={`carousel-item ${index === 0 ? 'active' : ''}`}
                    key={index}
                  >
                    <img src={img.image} className="img-thumbnail mb-5" alt="Product" />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#productThumbnailSlider" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#productThumbnailSlider" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          )}
        </div>
        <div className="col-8">
          <h3>{productData.title}</h3>
          <p>{productData.detail}</p>
          <h5 className="Card-title">{productData.price}</h5>
          <p className='mt-3'>
            <a title='Location' href={productData.location_url} target='_blank' className='btn btn-dark ms-1 me-1'>
              <i className='fa-solid fa-location'></i>Location
            </a>
            {!cartButtonClickStatus && (
              <button title="Add to Cart" type='button' onClick={cartAddButtonHandler} className='btn btn-primary'>
                <i className="fa-solid fa-cart-plus"></i>Add to Cart
              </button>
            )}
            {cartButtonClickStatus && (
              <button title="Remove from Cart" type='button' onClick={cartRemoveButtonHandler} className='btn btn-warning'>
                <i className="fa-solid fa-cart-plus"></i>Remove from Cart
              </button>
            )}
            <button title="Add to Cart" className='btn btn-success ms-1'>
              <i className="fa-solid fa-plus"></i>Book Now
            </button>
            <button title="Add to Wishlist" className='btn btn-danger ms-1'>
              <i className="fa fa-heart"></i>Wishlist
            </button>
          </p>
          <div className='producttags mt-4'>
            <h5>Tags</h5>
            {productTags.length > 0 ? (
              <p>
                {productTags.map((tag, index) => (
                  <Link
                    className='badge bg-secondary text-white me-1'
                    to={`/products/${tag}`}
                    key={index}
                  >
                    {tag}
                  </Link>
                ))}
              </p>
            ) : (
              <p>No tags available for this product.</p>
            )}
          </div>
        </div>
        {relatedProducts.length > 0 && (
          <>
            <h3 className='mt-5 mb-3 text-center'>Related Properties</h3>
            <div id='relatedProductsSlider' className='carousel carousel-dark slide' data-bs-ride='true'>
              <div className='carousel-indicators'>
                {relatedProducts.map((product, index) => {
                  if (index === 0) {
                    return (
                      <button
                        type='button'
                        data-bs-target="#relatedProductsSlider"
                        data-bs-slide-to={index}
                        className='active'
                        aria-current="true"
                        aria-label={`slide${index + 1}`}
                        key={index}
                      ></button>
                    );
                  } else {
                    return (
                      <button
                        type='button'
                        data-bs-target="#relatedProductsSlider"
                        data-bs-slide-to={index}
                        className='active'
                        aria-current="true"
                        aria-label={`slide${index + 1}`}
                        key={index}
                      ></button>
                    );
                  }
                })}
              </div>
              <div className='carousel-inner'>
                {relatedProducts.map((product, index) => {
                  if (index === 0) {
                    return <div className='carousel-item active' key={index}>
                      <SingleRelatedProduct product={product} />
                    </div>
                  } else {
                    return <div className='carousel-item' key={index}>
                      <SingleRelatedProduct product={product} />
                    </div>
                  }
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ProductDetail;
