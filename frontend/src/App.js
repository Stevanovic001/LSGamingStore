import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useState, useEffect } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SinginScreen from './screens/SigninScreen';
import SingupScreen from './screens/SignupScreen';
import BillingAddressScreen from './screens/BillingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaaceOrderScreen from './screens/PlaaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import Button from 'react-bootstrap/Button';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';

function App() {
  const{state, dispatch: ctxDispatch} = useContext(Store); 
  const {cart,userInfo} = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('billingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/';
  }

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const[categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
    try{
      const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);

    }catch(err){
      toast.error(getError(err))
    }
    }
  fetchCategories(); 
  }, [])
  

  return (
    <BrowserRouter>
     <div
        className={
          sidebarIsOpen
             ?'d-flex flex-column site-container active-cont'
             :'d-flex flex-column site-container'
            
        }
      >
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Button
             variant="dark"
             onClick={() => setSidebarIsOpen(!sidebarIsOpen)} 
             >
              <i className="fas fa-bars"></i>
               

            </Button>
            <LinkContainer to="/">
            <Navbar.Brand className="d-flex justify-content-center">LS Gaming</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <SearchBox />
            <Nav className="me-auto w-100 justify-content-end">
              <Link to="/cart" className="nav-link">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)} 
                  </Badge>
                )}
              </Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link
                  className="dropdown-item"
                  to="#signout"
                  onClick={signoutHandler}
                  >Sign Out</Link>
                </NavDropdown>
              ):(
                <Link className="nav-link" to="/signin">
                Sign In
                </Link>
              )}
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

               <div className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }   >
            <Nav className='flex-column text-white w-100 p-2'>
              <Nav.Item>
                <strong>Categories</strong>
              </Nav.Item>
              {categories.map((category)=>
              <Nav.Item key={category}>
                <LinkContainer 
                to={{ pathname: '/search', search: `category=${category}` }}
                onClick={() => setSidebarIsOpen(false)}
                >
                <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              )}
            </Nav>
                </div> 
    
      <main>
        <Container className="mt-3">
        <Routes>
          <Route path="/product/:slug" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen/>} />
          <Route path="/search" element={<SearchScreen/>} />
          <Route path="/signin" element={<SinginScreen/>} />
          <Route path="/signup" element={<SingupScreen/>} />
          <Route path="/profile" element={<ProfileScreen/>} />
          <Route path="/placeorder" element={<PlaaceOrderScreen/>} />
          <Route path="/billing" element={<BillingAddressScreen/>} />
          <Route path="/payment" element={<PaymentMethodScreen/>} />
          <Route path="/order/:id" element={<OrderScreen/>} />
          <Route path="/orderhistory" element={<OrderHistoryScreen/>} />
          <Route path="/" element={<HomeScreen/>} />
        </Routes>
        </Container>
      </main>
      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
