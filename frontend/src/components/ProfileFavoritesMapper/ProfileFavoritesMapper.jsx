import ProfileFavoriteCard from '../ProfileFavoriteCard/ProfileFavoriteCard';
import './ProfileFavoritesMapper.css';


const FavoritesMapper = ({ 
    characters,
    setFavoriteCharacter,
    setCharacterDetails,
    removeFromFavorites
}) => {

    return (

        <div className="favoritesMapper">

            <ul className="favoritesMapper__ul">
                {characters &&
                    characters.map(character =>
                        <li key={character.id}>
                            <ProfileFavoriteCard
                                character={character}
                                setFavoriteCharacter={setFavoriteCharacter}
                                setCharacterDetails={setCharacterDetails}
                                removeFromFavorites={removeFromFavorites}
                            />
                        </li>
                    )
                }
            </ul>

        </div>

    );
}

export default FavoritesMapper;
