import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard';
import CharacterCardMapper from '../../components/ChacterCardMapper/CharacterCardMapper';
import generateMarvelAuthentication from '../../marvelAPI/generateMarvelAuthentication';
import './Profile.css';


const Profile = () => {
    const baseUrl = `http://localhost:3015/api/users`;
    const { user } = useContext(AuthContext);
    const decodedUser = localStorage.getItem("token");
    const [favoriteCharacterArray, setFavoriteCharacterArray] = useState([]);
    const [favCharData, setFavCharData] = useState([]);

    //const handleGetFavoriteCharacterArray = async () => {
    //    let response = await axios.get(
    //        `${baseUrl}/${user._id}/getFavoriteCharacters`,
    //        { headers: { "x-auth-token": decodedUser } }
    //    );
    //    setFavoriteCharacterArray(response.data);
    //};

    //    const populateFavCharData = () => {
    //
    //    };

    const getFavCharData = async (marvelID) => {
        const BASE_MARVEL_URL = 'http://gateway.marvel.com/v1/public/';
        const marvelAuth = generateMarvelAuthentication();

        let url = `${BASE_MARVEL_URL}/characters/${marvelID}${marvelAuth}`;

        try {
            let comicData = await axios.get(url);
            return comicData;
        } catch (error) {
            console.log(error.message);
            return (error.message);
        }
    };

    useEffect(() => {
        //handleGetFavoriteCharacterArray();
        //getFavCharData();
    }, [favoriteCharacterArray]);

    return (
        <div className="profile">
            <UserProfileCard user={user} />
            <CharacterCardMapper characters={user.favoriteCharacters} />
        </div>
    );
};


export default Profile;
