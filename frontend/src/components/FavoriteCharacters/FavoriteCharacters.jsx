import React, { useContext } from 'react';
import AuthContext from "../../context/AuthContext";
import './FavoriteCharacters.css';


const FavoriteCharacters = ( {character} ) => {
    const { user } = useContext(AuthContext);
    const characterImage = `${character.thumbnail.path}.${character.thumbnail.extension}`;

    return (
        
        <div className='characterCard'>
            <img src={characterImage} alt="character" />
            <div className="characterCardInfo">
                <p className="">Marvel ID: {character.id}</p>
                <p className="">Name: {character.name}</p>
                <p className="">Description: {character.description}</p>
            </div>

        </div>
    );
};


export default FavoriteCharacters;
