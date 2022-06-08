import CharacterCard from '../CharacterCard/CharacterCard';
import './ProfileFavoritesMapper.css';


const FavoritesMapper = ({ characters }) => {
    //console.log('characters from favorites mapper: ', characters);

    return (

        <div className="favoritesMapper">

            <ul className="favoritesMapper__ul">
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

export default FavoritesMapper;
