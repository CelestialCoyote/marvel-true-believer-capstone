import CharacterCard from '../CharacterCard/CharacterCard';
import './SearchResultsMapper.css';


const SearchResultsMapper = ({ characters }) => {

    return (

        <div className="characterCardMapper">

            <ul className="characterCardMapper__ul">
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