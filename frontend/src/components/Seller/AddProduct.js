//packages
import { Link } from 'react-router-dom';
//assets
import logo from '../../logo.svg';
import SellerSidebar from './SellerSidebar';

function AddProduct(props) {
  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-3 col-12 mb-2'>
          <SellerSidebar />
        </div>
        <div className='col-md-9 col-12'>
          <div className='card'>
            <h4 className='card-header'>Add Property</h4>
            <div className='card-body'>
              <form>
                <div className="mb-3">
                  <label htmlFor="Title" className="form-label">Title</label>
                  <select className='form-control'>
                    <option>1BHK</option>
                    <option>2BHK</option>
                    <option>3BHK</option>
                    <option>4BHK</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="Price" className="form-label">Price</label>
                  <input type="number" className="form-control" id='Price'/>
                </div>
                <div className="mb-3">
                  <label htmlFor="Description" className="form-label">Description</label>
                  <textarea className="form-control" rows="8" id='Description'></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="ProductImage" className="form-label">Property Images</label>
                  <input type="file" className="form-control" id='ProductImg'/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
