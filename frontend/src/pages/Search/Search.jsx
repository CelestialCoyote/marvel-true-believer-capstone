import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import MarvelSearch from '../../components/MarvelSearch/MarvelSearch';
import CharacterCardMapper from '../../components/ChacterCardMapper/CharacterCardMapper';
import FavoriteCharacterList from '../../components/FavoriteCharacterList/FavoriteCharacterList';
import generateMarvelAuthentication from '../../marvelAPI/generateMarvelAuthentication';
import AuthContext from '../../context/AuthContext';
//import { comicData } from '../../comicTestData/hulkTestData';
//import { comicData, comicData } from '../../comicTestData/spiderTestData';
import './Search.css';


const Search = () => {
    const { user, setUser } = useContext(AuthContext);
    const [searchText, setSearchText] = useState('');
    const [characters, setCharacters] = useState([]);
    const [favChars, setFavChars] = useState([]);

    const BASE_USER_URL = 'http://localhost:3015/api/users'
    const BASE_MARVEL_URL = 'http://gateway.marvel.com/v1/public/';
    const marvelAuth = generateMarvelAuthentication();
    let requestReload = true

    let favoritesData =[];

    const getUserFavoriteCharacters = async () => {
        let favorites = [];
        try {
            favorites = await axios
                .get(
                    `${BASE_USER_URL}/${user._id}/getFavoriteCharacters`,
                    { headers: { "x-auth-token": localStorage.getItem("token") } }
                );
            console.log('userFavorites: ', favorites.data);
        } catch (error) {
            console.log(error);
        };

        favorites.data.forEach(async fav => {
            try {
                let comicData = await axios.get(`${BASE_MARVEL_URL}characters/${fav.marvelID}?${marvelAuth}`);
    
                favoritesData.push(comicData.data.data.results[0]);
            } catch (error) {
                console.log(error.message);
            }
        });

        setFavChars(favoritesData);
        console.log('favoritesData: ', favoritesData);
        console.log('favChars:', favChars);
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
    
//    if (favChars == null)
 //       getUserFavoriteCharacters();

    //useEffect(() => {
    //    getUserFavoriteCharacters();
    //  }, [user] );

    return (

        <div className='search'>
            {/*<button onClick={getUserFavoriteCharacters}>Axios favoriteCharacters</button>*/}
            <MarvelSearch
                setSearchText={setSearchText}
                searchText={searchText}
                searchCharacters={searchCharacters}
            />
            <CharacterCardMapper
                    characters={characters}
                />
            {/*<div className="search__table">
                
                <FavoriteCharacterList
                    favorites={favoritesData}
                    //favorites={favChars}
                    //removeFavChar={removeFromFavoriteCharacters}
                />
            </div>*/}

        </div>

    );
};


export default Search;



//const getFavoritesData = async () => {
//    let marvelData = axios
//        .all(favChar.map((favorite) => axios.get(`${BASE_MARVEL_URL}characters/${favorite.marvelID}?${marvelAuth}`)))
//        .then((data) => console.log(data));
//}