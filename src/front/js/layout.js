import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import injectContext from './store/appContext';
import LandingPage from './pages/LandingPage.jsx';
import { Menu } from "./pages/menu.jsx"
import { Login } from "./pages/login.jsx";
import { SignUp } from "./pages/signup.jsx";
import { ShoppingCart } from "./pages/shoppingCart.jsx";
import { Navbar } from './component/Navbar.jsx';

const Layout = () => {
    const basename = process.env.BASENAME || '';

    return (
        <div>
            <BrowserRouter basename={basename}>
                <Navbar/>
                <Routes>
                    <Route element={<LandingPage />} path="/" />
                    <Route element={<Login />} path="/login" />
                    <Route element={<SignUp />} path="/signup" />
                    <Route element={<Menu />} path="/menu" />
                    <Route element={<ShoppingCart />} path="/shopping-cart" />
                    <Route element={<h1>Not found!</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
