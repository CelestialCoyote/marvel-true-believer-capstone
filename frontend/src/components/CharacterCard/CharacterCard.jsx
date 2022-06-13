import React from 'react';
import { BiLike } from 'react-icons/bi';
import './CharacterCard.css';


const CharacterCard = ({ character, addToFavorites, likeCharacter, setFavoriteCharacter, setCharacterDetails, favoritesButton }) => {
    const characterImage = `${character.thumbnail.path}.${character.thumbnail.extension}`;

    return (

        <div className="characterCard">

            <img className="characterCard__imgage" src={characterImage} alt="character" />
            <div className="characterCard__info">
                <div className="characterCard__text">
                    <p className="">Marvel ID: {character.id}</p>
                    <p className="">Name: {character.name}</p>
                </div>

                <div className="characterCard__actions">
                    {favoritesButton && <button
                        className="characterCard__button"
                        onClick={() => { addToFavorites(character) }}
                    >
                        Add to Favorites
                    </button>}
                    <button
                        className="characterCard__button"
                        onClick={() => {
                            //console.log('Character Object: ', character);
                            setFavoriteCharacter(character);
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
