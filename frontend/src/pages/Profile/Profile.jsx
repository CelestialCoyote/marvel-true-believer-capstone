import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard';
import FavoritesMapper from '../../components/FavoritesMapper/FavoritesMapper';
import './Profile.css';


const Profile = () => {
    const { user } = useContext(AuthContext);
    const BASE_USER_URL = 'http://localhost:3015/api/users';
    const [ favData, setFavData ] = useState(null);

    const getUserFavoriteCharacters = async () => {
        let favorites = await axios.get(
                    `${BASE_USER_URL}/${user._id}/getFavoriteCharacters`,
                    { headers: { "x-auth-token": localStorage.getItem("token") } }
                );
            setFavData(favorites.data);
            //console.log('favData from getUserFavoriteCharacters: ', favData);
    };

    useEffect(() => {
        getUserFavoriteCharacters();
    }, [user]);

    return (
        <div className="profile">
            <UserProfileCard user={user} />
            <FavoritesMapper characters={favData} />
        </div>
    );
};


export default Profile;
