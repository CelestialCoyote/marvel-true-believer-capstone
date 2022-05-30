import React from 'react';
import './MarvelSearch.css';


const MarvelSearch = ({ searchText, setSearchText, searchCharacters }) => {
    const submitForm = (event) => {
        event.preventDefault();
        searchCharacters();
        setSearchText('');
    }

    return (
        
        <form id="searchForm" className="searchBar" onSubmit={submitForm}>

            <input
                className="searchText"
                type="text"
                value={searchText}
                placeholder="character name, i.e. Hulk"
                onChange={(event) => setSearchText(event.target.value)}
            />

            <button id="search-button" type="Submit">Search</button>
        </form>
    )
}


export default MarvelSearch;
