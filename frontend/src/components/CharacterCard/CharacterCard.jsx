import React from 'react';
//import { characters } from '../../comicTestData/hulkTestData';
import './CharacterCard.css';


const CharacterCard = ( {character} ) => {

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


export default CharacterCard;
