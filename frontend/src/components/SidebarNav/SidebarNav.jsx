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
                    <Link to="#" className="sidebarNav__menuBars">
                        <FaBars onClick={showSidebar} />
                    </Link>
                    <img className="sidebarNav__img" src={marvelLogo} alt='logo' />
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
                <nav className={sidebar ? "sidebarNav__menu active" : "sidebarNav__menu"}>
                    <ul className="sidebarNav__menuItems" onClick={showSidebar}>
                        <li className="sidebarNav__toggle">
                            <Link to="#" className="sidebarNav__menuBars">
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