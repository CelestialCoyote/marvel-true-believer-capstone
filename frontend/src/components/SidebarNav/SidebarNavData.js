import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { BsSearch } from 'react-icons/bs';
import { BiStats } from 'react-icons/bi';


export const SidebarNavData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiOutlineHome />,
        className: 'sidebarNav__text'
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <CgProfile />,
        className: 'sidebarNav__text'
    },
    {
        title: 'Search',
        path: '/search',
        icon: <BsSearch />,
        className: 'sidebarNav__text'
    },
    {
        title: 'Statistics',
        path: '/statistics',
        icon: <BiStats />,
        className: 'sidebarNav__text'
    }
];