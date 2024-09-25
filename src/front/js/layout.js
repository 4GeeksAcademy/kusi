import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import injectContext from './store/appContext';
import LandingPage from './pages/LandingPage.jsx';
import { Profile } from './pages/profile.jsx';
import { Menu } from "./pages/Menu.jsx";
import { Login } from "./pages/login.jsx";
import { SignUp } from "./pages/signup.jsx";
import { ShoppingCart } from "./pages/shoppingCart.jsx";
import { Paypal } from "./pages/paypal.jsx";
import { PaymentMade } from "./pages/paymentMade.jsx";
import { PaymentNotMade } from "./pages/paymentNotMade.jsx";
import { ResetPassword } from "./pages/resetPassword.jsx";
import { EmailSent } from "./pages/emailSent.jsx";
import { Chat } from "./component/chat.jsx";
import { Orders } from './pages/Orders.jsx';
import { ViewOrderDetails } from './pages/ViewOrderDetails.jsx';
import { Users } from "./pages/users.jsx";

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
                    <Route element={<Paypal />} path="/paypal" />
                    <Route element={<PaymentMade />} path="/payment-made" />
                    <Route element={<PaymentNotMade />} path="/payment-not-made" />
                    <Route element={<ResetPassword />} path="/reset-password" />
                    <Route element={<EmailSent />} path="/email-sent" />
                    <Route element={<Chat />} path="/chat"/>
                    <Route element={<Orders />} path="/orders" />
                    <Route element={<ViewOrderDetails/>} path="/orders/:id" />
                    <Route element={<Users />} path="/users" />
                    <Route element={<h1>Not found!</h1>} path="*"/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
