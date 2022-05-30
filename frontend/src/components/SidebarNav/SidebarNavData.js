import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { BsSearch } from 'react-icons/bs';
import { BiLogIn } from 'react-icons/bi';


export const SidebarNavData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiOutlineHome />,
        className: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <CgProfile />,
        className: 'nav-text'
    },
    {
        title: 'Search',
        path: '/search',
        icon: <BsSearch />,
        className: 'nav-text'
    },
    //{
    //    title: 'Login',
    //    path: '/login',
    //    icon: <BiLogIn />,
    //    className: 'nav-text'
    //},
];