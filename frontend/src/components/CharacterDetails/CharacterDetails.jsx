import React from 'react';
import './CharacterDetails.css';
import '../../comicTestData/spiderTestData';


const CharacterDetails = ({ character, setCharacterDetails }) => {
    const characterImage = `${character.thumbnail.path}.${character.thumbnail.extension}`;

    return (
        <div className="characterDetails">
            {console.log('character data: ', character)}

            <img className="characterDetails__imgage" src={characterImage} alt="character" />
            <div className="characterDetails__info">
                <p className="">Marvel ID: {character.id}</p>
                <p className="">Name: {character.name}</p>
                <p className="">Description: {character.description}</p>
                <div className="characterDetails__actions">
                    
        
                </div>
            </div>

            <button
                className="characterCard__button"
                onClick={() => {
                    console.log('Character Object: ', character);
                    setCharacterDetails(false);
                }}
            >
                Show Less
            </button>

        </div>
    );
};


export default CharacterDetails;
