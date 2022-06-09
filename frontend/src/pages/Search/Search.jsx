import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import MarvelSearch from '../../components/MarvelSearch/MarvelSearch';
import SearchResultsMapper from '../../components/SearchResultsMapper/SearchResultsMapper';
import FavoriteCharacterList from '../../components/FavoriteCharacterList/FavoriteCharacterList';
import generateMarvelAuthentication from '../../marvelAPI/generateMarvelAuthentication';
import AuthContext from '../../context/AuthContext';
//import { comicData } from '../../comicTestData/hulkTestData';
//import { comicData, comicData } from '../../comicTestData/spiderTestData';
import './Search.css';


const Search = () => {
    const { user } = useContext(AuthContext);
    const [searchText, setSearchText] = useState('');
    const [characters, setCharacters] = useState([]);
    const [favoritesData, setfavoritesData] = useState(null);

    const BASE_USER_URL = 'http://localhost:3015/api/users'
    const BASE_MARVEL_URL = 'http://gateway.marvel.com/v1/public/';
    const marvelAuth = generateMarvelAuthentication();

    const getUserFavoriteCharacters = async () => {
        let favorites = await axios.get(
                    `${BASE_USER_URL}/${user._id}/getFavoriteCharacters`,
                    { headers: { "x-auth-token": localStorage.getItem("token") } }
                );
            setfavoritesData(favorites.data);
            //console.log('favData from getUserFavoriteCharacters: ', favData);
    };

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

    useEffect(() => {
        getUserFavoriteCharacters();
    }, [user]);

    return (

        <div className='search'>
            {/*<button onClick={getUserFavoriteCharacters}>Axios favoriteCharacters</button>*/}
            <MarvelSearch
                setSearchText={setSearchText}
                searchText={searchText}
                searchCharacters={searchCharacters}
            />


            <div className="search__table">
                <SearchResultsMapper
                    characters={characters}
                />

                <FavoriteCharacterList
                    favorites={favoritesData}
                //favorites={favChars}
                //removeFavChar={removeFromFavoriteCharacters}
                />
            </div>

        </div>

    );
};


export default Search;



//const getFavoritesData = async () => {
//    let marvelData = axios
//        .all(favChar.map((favorite) => axios.get(`${BASE_MARVEL_URL}characters/${favorite.marvelID}?${marvelAuth}`)))
//        .then((data) => console.log(data));
//}