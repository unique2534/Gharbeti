import { Link } from "react-router-dom";
//Assests
import logo from '../../logo.svg';
import Sidebar from './Sidebar';
function Wishlist(){
    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3 col-12 mb-2">
                    <Sidebar />
                </div>
                <div className="col-md-9 col-12 mb-2">
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <Link><img src={logo} className="img-thumbnail" width="80" alt="..."/></Link>
                                            <p><Link>1BHK</Link></p>
                                        </td>
                                        <td>NRs. 1000</td>
                                        <td><button className="btn btn-danger btn-sm">Remove</button></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>
                                            <Link><img src={logo} className="img-thumbnail" width="80" alt="..."/></Link>
                                            <p><Link>2BHK</Link></p>
                                        </td>
                                        <td>NRs. 2000</td>
                                        <td><button className="btn btn-danger btn-sm">Remove</button></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>
                                            <Link><img src={logo} className="img-thumbnail" width="80" alt="..."/></Link>
                                            <p><Link>3BHK</Link></p>
                                        </td>
                                        <td>NRs. 3000</td>
                                        <td><button className="btn btn-danger btn-sm">Remove</button></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>
                                            <Link><img src={logo} className="img-thumbnail" width="80" alt="..."/></Link>
                                            <p><Link>4BHK</Link></p>
                                        </td>
                                        <td>NRs. 4000</td>
                                        <td><button className="btn btn-danger btn-sm">Remove</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wishlist;