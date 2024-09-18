import React from 'react';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import injectContext from './store/appContext';
import LandingPage from './pages/LandingPage.jsx';

import { Login } from "./pages/login.jsx";
import { SignUp } from "./pages/signup.jsx";

//create your first component
const Layout = () => {
    const basename = process.env.BASENAME || '';

    return (
        <div>
            <BrowserRouter basename={basename}>
                    <Routes>
                        <Route element={<LandingPage />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
