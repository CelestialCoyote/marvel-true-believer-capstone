import React from 'react';
import FavoriteCharacterCard from '../FavoriteCharacterCard/FavoriteCharacterCard';
import './FavoriteCharacterList.css';


const FavoriteCharacterList = ({ favorites, removeFromFavorites }) => {

    return (

        <div className='favoriteCharacterList'>

            <div className="favoriteCharacterList__title">Favorites List</div>

            <ul className="favoriteCharacterList__ul">
                {favorites &&
                    favorites.map(favorite =>
                        <li key={favorite.id}>
                            <FavoriteCharacterCard
                                favorite={favorite}
                                removeFromFavorites={removeFromFavorites}
                            />
                        </li>
                    )
                };
            </ul>

        </div>

    );
};


export default FavoriteCharacterList;
