import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { SidebarNavData } from './SidebarNavData';
import AuthContext from "../../context/AuthContext";
import marvelLogo from '../../images/marvel.png';
import './SidebarNav.css';


const SidebarNav = () => {
    const { logoutUser, user } = useContext(AuthContext);
    const [sidebar, setSidebar] = useState(false);

    const navigate = useNavigate();
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <div>
            <IconContext.Provider value={{ color: "#ed1d24" }}>
                <div className="sidebarNav">
                    <Link to="#" className="sidebarNav_menuBars">
                        <FaBars onClick={showSidebar} />
                    </Link>
                    <img src={marvelLogo} alt='logo' />
                    <i className="sidebarNav__title">True Believer!</i>
                    {user ? (
                        <button
                            className="sidebarNav__logInOut"
                            onClick={logoutUser}
                        >
                            <BiLogOut /> Logout
                        </button>
                    ) : (
                        <button
                            className="sidebarNav__logInOut"
                            onClick={() => navigate("/login")}
                        >
                            <BiLogIn /> Login
                        </button>
                    )}
                </div>
                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarNavData.map((item, index) => {
                            return (
                                <li key={index} className={item.className}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })};
                    </ul>
                </nav>
            </IconContext.Provider>
        </div>
    );
};


export default SidebarNav