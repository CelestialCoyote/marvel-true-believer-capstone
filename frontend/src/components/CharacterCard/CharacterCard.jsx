import React, { useContext } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { BiLike } from 'react-icons/bi';
import AuthContext from '../../context/AuthContext';
import './CharacterCard.css';


const CharacterCard = ({ character, setFavorite }) => {
    const { user, setUser } = useContext(AuthContext);
    const BASE_USER_URL = `http://localhost:3015/api/users`;
    const BASE_CHARACTER_URL = `http://localhost:3015/api/characters`;
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

    const likeCharacter = async () => {
        console.log('CharacterToLike: ', character.id, character.name);

        try {
            await axios
                .post(
                    `${BASE_CHARACTER_URL}/${user._id}/characterLike/${character.id}`,
                    //character,
                    { marvelID: `${character.id}`, marvelName: `${character.name}`, likes: 1 },
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

        <div className="characterCard">
            <img src={characterImage} alt="character" />
            <div className="characterCardInfo">
                <p className="">Marvel ID: {character.id}</p>
                <p className="">Name: {character.name}</p>
                <p className="">Description: {character.description}</p>
                <div className="">
                    <button onClick={addToFavoriteCharacters}>Add to Favorites</button>
                    <button>Show Comics</button>
                    <button >
                        <BiLike
                            color="var(--captainAmerica-darkBlue)"
                            fontSize="1.5em"
                            onClick={likeCharacter}
                        />
                        Like
                    </button>
                </div>
            </div>

        </div>
    );
};


export default CharacterCard;
