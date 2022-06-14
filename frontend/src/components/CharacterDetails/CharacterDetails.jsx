import React, { useEffect, useState } from 'react';
import axios from 'axios';
import generateMarvelAuthentication from '../../marvelAPI/generateMarvelAuthentication';
import './CharacterDetails.css';


const CharacterDetails = ({ character, setCharacterDetails }) => {
    const characterImage = `${character.thumbnail.path}.${character.thumbnail.extension}`;
    const [comicsData, setComicsData] = useState([]);


    useEffect(() => {
        const getComicsData = async () => {
            const BASE_MARVEL_URL = 'http://gateway.marvel.com/v1/public/';
            const marvelAuth = generateMarvelAuthentication();
            const url = `${BASE_MARVEL_URL}/characters/${character.id}/comics?${marvelAuth}`;

            try {
                let comicsData = await axios.get(url);
                setComicsData(comicsData.data.data.results);
            } catch (error) {
                console.log(error.message);
            }
        }

        getComicsData();
    }, []);

    return (
        <div className="characterDetails">

            <div className="characterDetails__container">

                <div className="characterDetails__character">
                    <img className="characterDetails__image" src={characterImage} alt="character" />
                    <div className="characterDetails__info">
                        <p
                            className="characterDetails__text">
                            <span className="heading">Marvel ID: </span>
                            {character.id}
                        </p>
                        <p
                            className="characterDetails__text">
                            <span className="heading">Name: </span>
                            {character.name}
                        </p>
                        <div className="characterDetails__description">
                            <p
                                className="characterDetails__text">
                                <span className="heading">Description: </span>
                                {character.description}
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    className="characterDetails__button"
                    onClick={() => {
                        setCharacterDetails(false);
                    }}
                >
                    Back
                </button>

            </div>

            <div className="characterDetails__comics">
                <div className="comics__header">
                    Comics:
                </div>
                <ul className="comics__ul">
                    {comicsData.map((comic) => {
                        return <li key={comic.id}>
                            <div className="comicCard">
                                <img
                                    className="comicCard__imgage"
                                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                    alt="comic"
                                />
                                <div className="comicCard__info">
                                    <p
                                        className="comic__text">
                                        <span className="heading">Title: </span>
                                        {comic.title}
                                    </p>
                                    <p
                                        className="comic__text">
                                        <span className="heading">Issue: </span>
                                        {comic.issueNumber}
                                    </p>
                                    <div className="comic__description">
                                        <p
                                            className="comic__text">
                                            <span className="heading">Description: </span>
                                            {comic.description}
                                        </p>
                                    </div>
                                    <p
                                        className="comic__text">
                                        <span className="heading">Page Count: </span>
                                        {comic.pageCount}
                                    </p>
                                </div>
                            </div>
                        </li>
                    })}
                </ul>
            </div>

        </div>
    );
};


export default CharacterDetails;
