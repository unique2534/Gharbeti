import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context';

function Checkout() {
  const { cartData, setCartData } = useContext(CartContext);
  const [cartButtonClickStatus, setCartButtonClickStatus] = useState(false);

  if (cartData == null || cartData.length === 0) {
    var cartItems = 0;
  } else {
    var cartItems = cartData.length;
  }

  var totalPrice = 0;

  const cartRemoveButtonHandler = (product_id) => {
    var previousCart = localStorage.getItem('cartData');
    var cartJson = JSON.parse(previousCart);
    cartJson = cartJson.filter((cart) => cart.product.id !== product_id);

    var cartString = JSON.stringify(cartJson);
    localStorage.setItem('cartData', cartString);
    setCartButtonClickStatus(false);
    setCartData(cartJson);
  }

  const proceedToCheckout = () => {
    const totalPrice = calculateTotalPrice(); // You need to implement this function to calculate the total price.
    localStorage.setItem('checkoutTotalPrice', totalPrice);
    window.location.href = '/confirm-order'; // Navigate to the checkout page.
  }

  const calculateTotalPrice = () => {
    // Implement your logic to calculate the total price here.
    // You can iterate through cartData and sum up the prices of items.
    // Return the total price.
  }

  return (
    <div className='container mt-4'>
      <h3 className='mb-4'>All Properties ({cartItems})</h3>
      {cartData.length > 0 ? (
        <div className='row'>
          <div className='col-12'>
            <div className='table-responsive'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Property</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((item, index) => {
                    totalPrice += parseFloat(item.product.price);
                    return (
                      <tr key={item.product.id}>
                        <td>{index + 1}</td>
                        <td>
                          <Link to={`/product/${item.product.id}`}>
                            <img src={item.product.image} className="img-thumbnail" width="80" alt="..." />
                            <p>{item.product.title}</p>
                          </Link>
                        </td>
                        <td>Rs. {item.product.price}</td>
                        <td>
                          <button
                            title='Remove from Cart'
                            type='button'
                            onClick={() => cartRemoveButtonHandler(item.product.id)}
                            className='btn btn-warning'
                          >
                            <i className='fa-solid fa-cart-plus'></i>Remove from Cart
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th></th>
                    <th>Total</th>
                    <th>RS. {totalPrice}</th>
                    <th></th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className='col-md-4 col-12'>
            <div className='action-row'>
              <Link to='/categories' className='btn btn-secondary'>
                Continue Shopping
              </Link>
            </div>
            <div className='action-row mt-3'>
              <button
                type='button'
                onClick={proceedToCheckout}
                className='btn btn-success'
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Your cart is empty. <Link to='/products'>Go shopping!</Link></p>
      )}
    </div>
  );
}

export default Checkout;
