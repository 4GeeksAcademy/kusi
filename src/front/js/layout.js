import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import injectContext from './store/appContext';
import LandingPage from './pages/LandingPage.jsx';
import { Menu } from "./pages/menu.jsx"
import { Login } from "./pages/login.jsx";
import { SignUp } from "./pages/signup.jsx";

const Layout = () => {
    const basename = process.env.BASENAME || '';

    return (
        <div>
            <BrowserRouter basename={basename}>
                    <Routes>
                        <Route element={<LandingPage />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<Menu />} path="/menu" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
