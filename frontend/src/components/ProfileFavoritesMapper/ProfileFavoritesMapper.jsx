import CharacterCard from '../CharacterCard/CharacterCard';
import './ProfileFavoritesMapper.css';


const FavoritesMapper = ({ characters, setFavoriteCharacter, setCharacterDetails }) => {
    //console.log('characters from favorites mapper: ', characters);

    return (

        <div className="favoritesMapper">

            <ul className="favoritesMapper__ul">
                {characters &&
                    characters.map(character =>
                        <li key={character.id}>
                            <CharacterCard
                                character={character}
                                setFavoriteCharacter={setFavoriteCharacter}
                                setCharacterDetails={setCharacterDetails}
                            />
                        </li>
                    )
                }
            </ul>

        </div>

    );
}

export default FavoritesMapper;
