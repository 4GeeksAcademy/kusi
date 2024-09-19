import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import injectContext from './store/appContext';
import LandingPage from './pages/LandingPage.jsx';
import Development from "./pages/development.jsx";
import { Profile } from './pages/profile.jsx';
import { Menu } from "./pages/menu.jsx";
import { Login } from "./pages/login.jsx";
import { SignUp } from "./pages/signup.jsx";
import { ShoppingCart } from "./pages/shoppingCart.jsx";
import { Paypal } from "./pages/paypal.jsx";
import { PaymentMade } from "./pages/paymentMade.jsx";
import { PaymentNotMade } from "./pages/paymentNotMade.jsx";

const Layout = () => {
    const basename = process.env.BASENAME || '';

    return (
        <div>
            <BrowserRouter basename={basename}>
                <Routes>
                    <Route element={<Development />} path="*" />
                    <Route element={<LandingPage />} path="/" />
                    <Route element={<Profile />} path="/profile" />
                    <Route element={<Login />} path="/login" />
                    <Route element={<SignUp />} path="/signup" />
                    <Route element={<Menu />} path="/menu" />
                    <Route element={<ShoppingCart />} path="/shopping-cart" />
                    <Route element={<Paypal />} path="/paypal" />
                    <Route element={<PaymentMade />} path="/payment-made" />
                    <Route element={<PaymentNotMade />} path="/payment-not-made" />
                    <Route element={<h1>Not found!</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
