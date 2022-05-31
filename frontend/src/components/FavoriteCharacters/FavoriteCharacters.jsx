import React, { useContext } from 'react';
import AuthContext from "../../context/AuthContext";
import './FavoriteCharacters.css';


const FavoriteCharacters = ( {character} ) => {
    const { user } = useContext(AuthContext);

    return (
        
        <div className='characterCard'>
            <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt="character" />
            <div className="characterCardInfo">
                <p className="">Marvel ID: {character.id}</p>
                <p className="">Name: {character.name}</p>
                <p className="">Description: {character.description}</p>
            </div>

        </div>
    );
};


export default FavoriteCharacters;
