import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home, ShopPage, ProductPage, PageNotFound, LoginPage, CartPage, ShippingPage, PlaceOrderPage, OrderPage, RegistrationPage, ProfilePage,
        UsersListPage, UsersEditPage, ProductsListPage, ProductEditPage} from './pages';
import { useEffect } from 'react';
import { Navbar, Footer } from './components';
import { useDispatch } from 'react-redux';
import { initializeCategories } from './reducers/categoriesReducer'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(initializeCategories())
    }, [dispatch]);
 
  return (
    <BrowserRouter>
    <Navbar />
        <Routes>
          <Route path="/" element ={<Home />} />
          <Route path="/products" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage/>}/>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/cart" element={<CartPage />}/>
          <Route path="/shipping" element={<ShippingPage />}/>
          <Route exact path="/order" element={<PlaceOrderPage />}/>
          <Route path="/order/:id" element={<OrderPage />}/>
          <Route path="/registration" element={<RegistrationPage />}/>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin/users" element={<UsersListPage />}/>
          <Route path="/admin/users/:id" element={<UsersEditPage />}/>
          <Route path="/admin/products" element={<ProductsListPage />} />
          <Route path="/admin/products/:id" element={<ProductEditPage />} />
        </Routes>
      <Footer />    
    </BrowserRouter>
  );
}

export default App;
