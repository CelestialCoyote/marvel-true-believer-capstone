import React from 'react';
import FavoriteCharacterCard from '../FavoriteCharacterCard/FavoriteCharacterCard';
import './FavoriteCharacterList.css';


const FavoriteCharacterList = ({ favorites }) => {
    console.log('favorites from FavoriteCharacterList: ', favorites);

    return (

        <div className='favoriteCharacterList'>

            <ul className="favoriteCharacterList__ul">
                {favorites &&
                    favorites.map(favorite =>
                        <li key={favorite.id}>
                            <FavoriteCharacterCard
                                favorite={favorite}
                                //removeFromFavorites={removeFromFavorites}
                            />
                        </li>
                    )
                };
            </ul>

        </div>

    );
};


export default FavoriteCharacterList;
