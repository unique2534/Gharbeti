import { Link } from 'react-router-dom';
import logo from '../logo.svg';

function OrderSuccess() {
  return (
    <div className='container mt-4'>
      <div className='col-md-8 offset-2'>
        <div className='card'>
          <div className='card-body text-center'>
            <p><i className='fa fa-check-circle text-success fa-3x'></i></p>
            <h3 className='text-success'>Thanks For The Order</h3>
            <p className='mt-4'>
              <Link to="/" className='btn btn-primary ms-2'>Home</Link>
              <Link to="/customer/dashboard" className='btn btn-secondary'>Dashboard</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
