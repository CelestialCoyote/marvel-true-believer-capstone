import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
//import './FavoriteCharacterCard.css';


const FavoriteCharacterCard = ({ favorite, removeFromFavorites }) => {
    const favoriteImage = `${favorite.thumbnail.path}.${favorite.thumbnail.extension}`;

    return (

        <div className="favor">
            <img src={favoriteImage} alt="fav" />
            <p className="">{favorite.name}</p>
            <MdDeleteForever className="remove" onClick={() => { removeFromFavorites(favorite.id) }} />
        </div>
        
    );
};


export default FavoriteCharacterCard;
