import React, { useContext } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import AuthContext from '../../context/AuthContext';
import './CharacterCard.css';


const CharacterCard = ( { character, setFavorite } ) => {
    const { user, setUser } = useContext(AuthContext);
    const BASE_USER_URL = `http://localhost:3015/api/users`;
    const characterImage = `${character.thumbnail.path}.${character.thumbnail.extension}`;

    const addToFavoriteCharacters = async () => {
        console.log('CharacterToAdd: ', character.id);

        try {
            await axios
                .put(
                    `${BASE_USER_URL}/${user._id}/addFavoriteCharacter`,
                    character,
                    //{ marvelID: `${character.id}` },
                    { headers: { "x-auth-token": localStorage.getItem("token") } }
                )
                .then((res) => {
                    localStorage.setItem("token", res.headers["x-auth-token"]);
                    setUser(jwtDecode(localStorage.getItem("token")));
                });
        } catch (error) {
            console.log('Error from frontend', error);
        };
    };

    return (
        
        <div className='characterCard'>
            <img src={characterImage} alt="character" />
            <div className="characterCardInfo">
                <p className="">Marvel ID: {character.id}</p>
                <p className="">Name: {character.name}</p>
                <p className="">Description: {character.description}</p>
                <div>
                    <button onClick={addToFavoriteCharacters}>Add to Favorites</button>
                    <button>Show Comics</button>
                </div>
            </div>

        </div>
    );
};


export default CharacterCard;
