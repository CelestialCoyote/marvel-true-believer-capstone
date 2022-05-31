import React, { useContext } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import AuthContext from "../../context/AuthContext";
import './CharacterCard.css';


const CharacterCard = ( {character} ) => {
    const baseUrl = `http://localhost:3015/api/users`;
    const { user, setUser } = useContext(AuthContext);
    const characterImage = `${character.thumbnail.path}.${character.thumbnail.extension}`;

    const addToFavoriteCharacters = async () => {
        //const data = {
        //    marvelID: `${character.id}`,
        //    marvelName: `${character.name}`,
        //    marvelImage: `${characterImage}`,
        //    marvelDescription: `${character.description}`
        //};

        console.log('CharacterToAdd: ', character);

        try {
            await axios
                .put(
                    `${baseUrl}/${user._id}/updateUser/addFavoriteCharacter`,
                    //data,
                    character,
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
