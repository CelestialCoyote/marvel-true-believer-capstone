import React from 'react';
import { BiLike } from 'react-icons/bi';
import './CharacterCard.css';


const CharacterCard = ({ character, addToFavorites, likeCharacter }) => {
    const characterImage = `${character.thumbnail.path}.${character.thumbnail.extension}`;

    return (

        <div className="characterCard">
            <img className="characterCard__imgage" src={characterImage} alt="character" />
            <div className="characterCard__info">
                <p className="">Marvel ID: {character.id}</p>
                <p className="">Name: {character.name}</p>
                {/*<p className="">Description: {character.description}</p>*/}
                <div className="characterCard__actions">
                    <button onClick={() => { addToFavorites(character) }}>
                        Add to Favorites
                    </button>
                    {/*<button>Show More</button>*/}
                    <button onClick={() => likeCharacter(character)}>
                        <BiLike
                            color="var(--captainAmerica-darkBlue)"
                            fontSize="1.5em"
                        />
                        Like
                    </button>
                </div>
            </div>

        </div>
    );
};


export default CharacterCard;
