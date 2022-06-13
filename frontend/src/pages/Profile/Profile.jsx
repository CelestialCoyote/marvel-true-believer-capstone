import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard';
import ProfileFavoritesMapper from '../../components/ProfileFavoritesMapper/ProfileFavoritesMapper';
import CharacterDetails from '../../components/CharacterDetails/CharacterDetails';
import './Profile.css';


const Profile = () => {
    const { user } = useContext(AuthContext);
    const BASE_USER_URL = 'http://localhost:3015/api/users';
    const [favoritesData, setFavoritesData] = useState(null);
    const [characterDetails, setCharacterDetails] = useState(false);
    const [favoriteCharacter, setFavoriteCharacter] = useState();


    useEffect(() => {
        const getUserFavoriteCharacters = async () => {
            let favorites = await axios.get(
                `${BASE_USER_URL}/${user._id}/getFavoriteCharacters`,
                { headers: { "x-auth-token": localStorage.getItem("token") } }
            );
            setFavoritesData(favorites.data);
        };

        getUserFavoriteCharacters();
    }, [user]);

    return (
        <div className="profile">
            <UserProfileCard user={user} />

            {!characterDetails &&
                <ProfileFavoritesMapper
                    characters={favoritesData}
                    setFavoriteCharacter={setFavoriteCharacter}
                    setCharacterDetails={setCharacterDetails}
                />}
            {characterDetails &&
                <CharacterDetails
                    character={favoriteCharacter}
                    setCharacterDetails={setCharacterDetails}
                />}
        </div>
    );
};


export default Profile;
