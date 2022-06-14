import React from 'react';
import { BiLike } from 'react-icons/bi';
import './ProfileFavoriteCard.css';


const ProfileFavoriteCard = ({ character, addToFavorites, likeCharacter, setFavoriteCharacter, setCharacterDetails }) => {
    const characterImage = `${character.thumbnail.path}.${character.thumbnail.extension}`;

    return (

        <div className="profileFavoriteCard">

            <img className="profileFavoriteCard__image" src={characterImage} alt="character" />
            <div className="characterCard__info">

            </div>
            <div className="profileFavoriteCard__container">
                <div className="profileFavoriteCard__info">
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

                <div className="profileFavoriteCard__actions">
                    <button
                        className="profileFavoriteCard__button"
                        onClick={() => {
                            setFavoriteCharacter(character);
                            setCharacterDetails(true);
                        }}
                    >
                        Show More
                    </button>
                    <button
                        className="profileFavoriteCard__button"
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


export default ProfileFavoriteCard;
