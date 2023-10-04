import { Link } from 'react-router-dom';
//assets
import logo from '../../logo.svg';
import SellerSidebar from './SellerSidebar';

function Customers() {
  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-3 col-12 mb-2'>
          <SellerSidebar />
        </div>
        <div className='col-md-9 col-12 mb-2'>
          <div className='row'>
            <div className='table-responsive'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>
                            John Doe
                        </td>
                        <td>john@gmail.com</td>
                        <td>+9779800000000</td>
                        <td>
                        <button className='btn btn-primary btn-sm'>Orders</button>
                          <button className='btn btn-danger btn-sm ms-1 '>Remove From List</button>
                        </td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>
                            Alex Doe
                        </td>
                        <td>alex@gmail.com</td>
                        <td>+9779800000001</td>
                        <td>
                        <button className='btn btn-primary btn-sm'>Orders</button>
                          <button className='btn btn-danger btn-sm ms-1 '>Remove From List</button>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customers;
