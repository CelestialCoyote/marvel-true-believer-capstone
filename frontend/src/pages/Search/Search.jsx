import React, { useContext, useState } from 'react';
import axios from 'axios';
import MarvelSearch from '../../components/MarvelSearch/MarvelSearch';
import CharacterCardMapper from '../../components/ChacterCardMapper/CharacterCardMapper';
//import FavoriteCharacterList from '../../components/FavoriteCharacterList/FavoriteCharacterList';
import generateMarvelAuthentication from '../../marvelAPI/generateMarvelAuthentication';
import AuthContext from '../../context/AuthContext';
//import { comicData } from '../../comicTestData/hulkTestData';
//import { comicData, comicData } from '../../comicTestData/spiderTestData';
import './Search.css';


const Search = () => {
    const { user, setUser } = useContext(AuthContext);
    const [searchText, setSearchText] = useState('');
    const [characters, setCharacters] = useState([]);

    const BASE_MARVEL_URL = 'http://gateway.marvel.com/v1/public/';
    const marvelAuth = generateMarvelAuthentication();

    const getUserFavoriteCharacters = async () => {
        let userFavorites = user.favoriteCharacters;
        
        let favorites = axios
            .all(userFavorites
                .map((favorite) => axios.get(`${BASE_MARVEL_URL}characters/${favorite.marvelID}?${marvelAuth}`)))
            .then((data) => console.log(data)
            );
    }

    const searchCharacters = async () => {
        let url = `${BASE_MARVEL_URL}/characters?nameStartsWith=${searchText}${marvelAuth}`;

        try {
            let comicData = await axios.get(url);

            setCharacters(comicData.data.data.results);
        } catch (error) {
            console.log(error.message);
        }

        //setCharacters(comicData.data.results);
    };

    //    const removeFromFavoriteCharacters = async () => {
    //
    //    };

    return (

        <div className='search'> <button onClick={getUserFavoriteCharacters}>click me</button>
            <MarvelSearch
                setSearchText={setSearchText}
                searchText={searchText}
                searchCharacters={searchCharacters}
            />
            <div>
                <CharacterCardMapper
                    characters={characters}
                />
                {/*<FavoriteCharacterList
                    favorites={favorites}
                    removeFavChar={removeFromFavoriteCharacters}
                />*/}
            </div>

        </div>

    );
};


export default Search;
