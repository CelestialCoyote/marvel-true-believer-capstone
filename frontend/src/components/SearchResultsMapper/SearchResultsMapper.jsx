import CharacterCard from '../CharacterCard/CharacterCard';
import './SearchResultsMapper.css';


const SearchResultsMapper = ({ characters, addToFavorites, likeCharacter, setCharacter, setCharacterDetails }) => {

    return (

        <div className="searchResultsMapper">

            <ul className="searchResultsMapper__ul">
                {characters &&
                    characters.map(character =>
                        <li key={character.id}>
                            <CharacterCard
                                character={character}
                                addToFavorites={addToFavorites}
                                setCharacter={setCharacter}
                                setCharacterDetails={setCharacterDetails}
                                likeCharacter={likeCharacter}
                            />
                        </li>
                    )
                }
            </ul>

        </div>

    );
}

export default SearchResultsMapper;