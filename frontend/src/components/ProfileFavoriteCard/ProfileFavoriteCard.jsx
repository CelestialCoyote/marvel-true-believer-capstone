import React from 'react';
import { BiLike } from 'react-icons/bi';
import './ProfileFavoriteCard.css';


const ProfileFavoriteCard = ({ character, addToFavorites, likeCharacter, setFavoriteCharacter, setCharacterDetails }) => {
    const characterImage = `${character.thumbnail.path}.${character.thumbnail.extension}`;

    return (

        <div className="profileFavoriteCard">

            <img className="profileFavoriteCard__imgage" src={characterImage} alt="character" />
            <div className="profileFavoriteCard__info">
                <div className="profileFavoriteCard__text">
                    <p className="">Marvel ID: {character.id}</p>
                    <p className="">Name: {character.name}</p>
                </div>

                <div className="profileFavoriteCard__actions">
                    <button
                        className="profileFavoriteCard__button"
                        onClick={() => {
                            //console.log('Character Object: ', character);
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
