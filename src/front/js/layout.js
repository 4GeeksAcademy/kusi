import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import injectContext from './store/appContext';
import LandingPage from './pages/LandingPage.jsx';
import { Profile } from './pages/profile.jsx';
import { Menu } from "./pages/Menu.jsx";
import { Login } from "./pages/login.jsx";
import { SignUp } from "./pages/signup.jsx";
import { ShoppingCart } from "./pages/shoppingCart.jsx";
import { Orders } from './pages/Orders.jsx';
import { ViewOrderDetails } from './pages/ViewOrderDetails.jsx';


const Layout = () => {
    const basename = process.env.BASENAME || '';

    return (
        <div>
            <BrowserRouter basename={basename}>
                <Routes>
                    <Route element={<LandingPage />} path="/" />
                    <Route element={<Profile />} path="/profile" />
                    <Route element={<Login />} path="/login" />
                    <Route element={<SignUp />} path="/signup" />
                    <Route element={<Menu />} path="/menu" />
                    <Route element={<ShoppingCart />} path="/shopping-cart" />
                    <Route element={<Orders />} path="/orders" />
                    <Route element={<ViewOrderDetails/>} path="/orders/:id" />
                    <Route element={<h1>Not found!</h1>} path="*"/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
