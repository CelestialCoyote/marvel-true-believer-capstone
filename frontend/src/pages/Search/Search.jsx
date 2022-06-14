import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import MarvelSearch from '../../components/MarvelSearch/MarvelSearch';
import SearchResultsMapper from '../../components/SearchResultsMapper/SearchResultsMapper';
import FavoriteCharacterList from '../../components/FavoriteCharacterList/FavoriteCharacterList';
import CharacterDetails from '../../components/CharacterDetails/CharacterDetails';
import generateMarvelAuthentication from '../../marvelAPI/generateMarvelAuthentication';
import AuthContext from '../../context/AuthContext';
import './Search.css';


const Search = () => {
    const { user, setUser } = useContext(AuthContext);
    const [searchText, setSearchText] = useState('');
    const [characters, setCharacters] = useState([]);
    const [character, setCharacter] = useState();
    const [favoritesData, setfavoritesData] = useState(null);
    const [characterDetails, setCharacterDetails] = useState(false);

    const BASE_USER_URL = 'http://localhost:3015/api/users';
    const BASE_CHARACTER_URL = `http://localhost:3015/api/characters`;
    const BASE_MARVEL_URL = 'http://gateway.marvel.com/v1/public/';
    const marvelAuth = generateMarvelAuthentication();


    const searchCharacters = async () => {
        let url = `${BASE_MARVEL_URL}/characters?nameStartsWith=${searchText}${marvelAuth}`;

        try {
            let comicData = await axios.get(url);

            setCharacters(comicData.data.data.results);
        } catch (error) {
            console.log(error.message);
        }
    };

    const addToFavorites = async (character) => {
        const isFavorite = favoritesData.find(({ id }) => id === character.id);

        if (!isFavorite) {
            console.log('Add to favorites list.');
            try {
                await axios
                    .put(
                        `${BASE_USER_URL}/${user._id}/addFavoriteCharacter`,
                        character,
                        { headers: { "x-auth-token": localStorage.getItem("token") } }
                    )
                    .then((res) => {
                        localStorage.setItem("token", res.headers["x-auth-token"]);
                        setUser(jwtDecode(localStorage.getItem("token")));
                    });
            } catch (error) {
                console.log('Error from frontend', error);
            };
        } else {
            alert('Already in Favorites List.');
        }
    };

    const removeFromFavorites = async (id) => {
        try {
            await axios
                .put(
                    `${BASE_USER_URL}/${user._id}/removeFavoriteCharacter`,
                    { marvelID: `${id}` },
                    { headers: { "x-auth-token": localStorage.getItem("token") } }
                )
                .then((res) => {
                    localStorage.setItem("token", res.headers["x-auth-token"]);
                    setUser(jwtDecode(localStorage.getItem("token")));
                });
        } catch (error) {
            console.log('Error from frontend', error);
        };
    };

    const likeCharacter = async (character) => {
        try {
            await axios
                .post(
                    `${BASE_CHARACTER_URL}/${user._id}/characterLike/${character.id}`,
                    { marvelID: `${character.id}`, marvelName: `${character.name}`, likes: 1 },
                    { headers: { "x-auth-token": localStorage.getItem("token") } }
                )
                .then((res) => {
                    localStorage.setItem("token", res.headers["x-auth-token"]);
                    setUser(jwtDecode(localStorage.getItem("token")));
                });
        } catch (error) {
            console.log('Error from frontend', error);
        };
    };

    useEffect(() => {
        const getUserFavoriteCharacters = async () => {
            let favorites = await axios.get(
                `${BASE_USER_URL}/${user._id}/getFavoriteCharacters`,
                { headers: { "x-auth-token": localStorage.getItem("token") } }
            );
            setfavoritesData(favorites.data);
        };

        getUserFavoriteCharacters();
    }, [user]);

    return (

        <div className='search'>

            <MarvelSearch
                setSearchText={setSearchText}
                searchText={searchText}
                searchCharacters={searchCharacters}
            />


            <div className="search__table">
                {!characterDetails &&
                    <SearchResultsMapper
                        characters={characters}
                        addToFavorites={addToFavorites}
                        setCharacter={setCharacter}
                        setCharacterDetails={setCharacterDetails}
                        likeCharacter={likeCharacter}
                    />
                }

                {characterDetails &&
                    <CharacterDetails
                        character={character}
                        setCharacterDetails={setCharacterDetails}
                    />
                }

                <FavoriteCharacterList
                    favorites={favoritesData}
                    removeFromFavorites={removeFromFavorites}
                />
            </div>

        </div>

    );
};


export default Search;
