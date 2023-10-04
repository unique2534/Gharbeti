//packages
import { Link } from 'react-router-dom';
//assets
import logo from '../../logo.svg';
import SellerSidebar from './SellerSidebar';

function Register(props) {
  return (
    <div className='container mt-4'>
      <div className='row justify-content-center'>
        <div className='col-md-6 col-12'>
          <div className='card'>
            <h4 className='card-header'>Register</h4>
            <div className='card-body'>
              <form>
                <div className='mb-3'>
                  <label htmlFor='firstName' className='form-label'>
                    First Name
                  </label>
                  <input type='text' className='form-control' id='firstName' />
                </div>
                <div className='mb-3'>
                  <label htmlFor='lastName' className='form-label'>
                    Last Name
                  </label>
                  <input type='text' className='form-control' id='lastName' />
                </div>
                <div className='mb-3'>
                  <label htmlFor='username' className='form-label'>
                    Username
                  </label>
                  <input type='text' className='form-control' id='username' />
                </div>
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label'>
                    Email
                  </label>
                  <input type='email' className='form-control' id='email' />
                </div>
                <div className='mb-3'>
                  <label htmlFor='pwd' className='form-label'>
                    Password
                  </label>
                  <input type='password' className='form-control' id='pwd' />
                </div>
                <button type='submit' className='btn btn-primary'>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
