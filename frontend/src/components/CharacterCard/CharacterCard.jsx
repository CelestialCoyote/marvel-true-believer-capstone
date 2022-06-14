import React from 'react';
import { BiLike } from 'react-icons/bi';
import './CharacterCard.css';


const CharacterCard = ({ character, addToFavorites, setCharacter, setCharacterDetails, likeCharacter }) => {
    const characterImage = `${character.thumbnail.path}.${character.thumbnail.extension}`;

    return (

        <div className="characterCard">

            <img className="characterCard__image" src={characterImage} alt="character" />
            <div className="characterCard__container">
                <div className="characterCard__info">
                    <p
                        className="characterCard__text">
                        <span className="heading">Marvel ID: </span>
                        {character.id}
                    </p>
                    <p
                        className="characterCard__text">
                        <span className="heading">Name: </span>
                        {character.name}
                    </p>
                </div>

                <div className="characterCard__actions">
                    <button
                        className="characterCard__button"
                        onClick={() => { addToFavorites(character) }}
                    >
                        Add to Favorites
                    </button>
                    <button
                        className="characterCard__button"
                        onClick={() => {
                            setCharacter(character);
                            setCharacterDetails(true);
                        }}
                    >
                        Show More
                    </button>
                    <button
                        className="characterCard__button"
                        onClick={() => likeCharacter(character)}
                    >
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
