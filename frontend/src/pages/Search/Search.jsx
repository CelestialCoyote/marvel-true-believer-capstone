import React, { useState } from 'react';
import axios from 'axios';
import MarvelSearch from '../../components/MarvelSearch/MarvelSearch';
import CharacterCardMapper from '../../components/ChacterCardMapper/CharacterCardMapper';
import generateMarvelAuthentication from '../../marvelAPI/generateMarvelAuthentication';
//import { comicData } from '../../comicTestData/hulkTestData';
//import { comicData, comicData } from '../../comicTestData/spiderTestData';
import './Search.css';


const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [characters, setCharacters] = useState([]);

    const searchCharacters = async () => {
        const BASE_MARVEL_URL = 'http://gateway.marvel.com/v1/public/';
        const marvelAuth = generateMarvelAuthentication();

        let url = `${BASE_MARVEL_URL}/characters?nameStartsWith=${searchText}${marvelAuth}`;

        try {
            let comicData = await axios.get(url);
            
            setCharacters(comicData.data.data.results);
        } catch (error) {
            console.log(error.message);
        }
        
        //setCharacters(comicData.data.results);
    };

    return (

        <div className='search'>
            <div>
            <MarvelSearch setSearchText={setSearchText} searchText={searchText} searchCharacters={searchCharacters} />
            <CharacterCardMapper characters={characters} />
            </div>
            
        </div>

    );
};


export default Search;
