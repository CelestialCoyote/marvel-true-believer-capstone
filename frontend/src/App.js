import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from "./utils/PrivateRoute";

import SidebarNav from './components/SidebarNav/SidebarNav';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Search from './pages/Search/Search';
import Statistics from './pages/Statistics/Statistics';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

import './App.css';


function App() {

    return (

        <div className="app">
            <SidebarNav />
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                {/*<Route path="/" exact element={<Home />} />*/}
                <Route path="/profile" element={<Profile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
        </div>

    );
}


export default App;
