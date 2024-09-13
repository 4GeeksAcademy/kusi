import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import injectContext from './store/appContext';
import LandingPage from './pages/LandingPage.jsx';

const Layout = () => {
    const basename = process.env.BASENAME || '';

    return (
        <div>
            <BrowserRouter basename={basename}>
                <Routes>
                    <Route element={<LandingPage />} path="/" />
                    <Route element={<h1>Not found!</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
