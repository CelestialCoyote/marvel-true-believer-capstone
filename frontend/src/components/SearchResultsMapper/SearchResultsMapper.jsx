import CharacterCard from '../CharacterCard/CharacterCard';
import './SearchResultsMapper.css';


const SearchResultsMapper = ({ characters }) => {

    return (

        <div className="searchResultsMapper">

            <ul className="searchResultsMapper__ul">
                {characters &&
                    characters.map(character =>
                        <li key={character.id}>
                            <CharacterCard
                                character={character}
                            />
                        </li>
                    )
                }
            </ul>

        </div>

    );
}

export default SearchResultsMapper;