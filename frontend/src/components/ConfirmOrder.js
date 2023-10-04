import React, { useEffect, useState } from 'react';
import { UserContext } from '../Context';
import { CartContext } from '../Context';
import axios from 'axios';
import { useContext } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const baseUrl = 'http://127.0.0.1:8000/api';

function ConfirmOrder() {
  const userContext = useContext(UserContext);
  const { cartData, setcartData } = useContext(CartContext);
  const [orderId, setOrderId] = useState('');
  const [OrderStatus, setOrderStatus] = useState(false);
  const [payMethod, setPayMethod] = useState('');

  useEffect(() => {
    if (!userContext || userContext.login === null) {
      console.log('Redirecting to login page...');
      window.location.href = '/customer/login';
    } else {
      addOrderInTable();
    }
  }, [userContext]);

  function addOrderInTable() {
    const customerId = localStorage.getItem('customer_id');

    // Create the order
    axios
      .post(baseUrl + '/orders/', { customer: customerId })
      .then(function (response) {
        console.log(response.data.id);
        var orderId = response.data.id;
        setOrderId(orderId);
        orderItems(orderId);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function orderItems(orderId) {
    var previousCart = localStorage.getItem('cartData');
    var cartJson = JSON.parse(previousCart);

    if (cartJson != null) {
      cartJson.forEach((cart, index) => {
        const formData = new FormData();
        formData.append('order', orderId);
        formData.append('product', cart.product.id);
        formData.append('qty', 1);
        formData.append('price', cart.product.price);

        // Submit data
        axios
          .post(baseUrl + '/orderitems/', formData)
          .then(function (response) {
            // Remove cart item from local storage
            cartJson.splice(index, 1);
            localStorage.setItem('cartData', JSON.stringify(cartJson));
            // Now, update the cartData state
            setcartData(cartJson);
          })
          .catch(function (error) {
            console.error(error);
          });
      });
    }
  }

  function updateOrderStatus(orderId) {
    axios
      .post(baseUrl + `/update-order-status/${orderId}/`, { order_status: 'completed' })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function changePaymentMethod(payMethod) {
    setPayMethod(payMethod);
  }

  function payNowButton() {
    if (payMethod !== '') {
      changePaymentMethod(payMethod);
      updateOrderStatus(orderId);
    } else {
      alert('Select Payment Method!!');
    }
  }

  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col-6 offset-3'>
          <div className='card py-3 text-center'>
            <h3>
              <i className='fa fa-check-circle text-success' /> Your Order Has Been Confirmed
            </h3>
            <h5>ORDER ID: {orderId}</h5>
          </div>
          <div className='card p-3 mt-4'>
            <form>
              <div className='form-group'>
                <label>
                  <input type='radio' onChange={() => changePaymentMethod('paypal')} name='payMethod' /> Paypal
                </label>
              </div>

              <div className='form-group'>
                <label>
                  <input type='radio' onChange={() => changePaymentMethod('esewa')} name='payMethod' /> E-sewa
                </label>
              </div>
              <div className='form-group'>
                <label>
                  <input type='radio' onChange={() => changePaymentMethod('khalti')} name='payMethod' /> Khalti
                </label>
              </div>
              <button type='button' onClick={payNowButton} className='btn btn-sm btn-success mt-3'>
                Next
              </button>
            </form>
            {payMethod === 'paypal' && (
              <PayPalScriptProvider
                options={{
                  'client-id': 'AQ4kyt7m5niQkwKsJMahfE7C2Zy-GPgjoY-A-tpzmCLuFm-X0tY9DpGCzJc8vJxLcfHU_GYhLgcllPoQ',
                }}
              >
                <PayPalButtons
                  className='mt-3'
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            currency_code: 'USD',
                            value: '3',
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      const name = details.payer.name.given_name;
                      //alert(`Transaction completed by ${name}`);
                      updateOrderStatus(orderId);
                    });
                  }}
                />
              </PayPalScriptProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOrder;
