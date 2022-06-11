import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import './FavoriteCharacterCard.css';


const FavoriteCharacterCard = ({ favorite, removeFromFavorites }) => {
    const favoriteImage = `${favorite.thumbnail.path}.${favorite.thumbnail.extension}`;

    return (

        <div className="favoriteCharacterCard">
            <div className="favoriteCharacterCard__card">
                <img src={favoriteImage} alt="fav" />
                <div className="favoriteCharacterCard__name">{favorite.name}</div>
                <MdDeleteForever
                    className="favoriteCharacterCard__remove"
                    onClick={() => { removeFromFavorites(favorite.id) }}
                />
            </div>
        </div>


    );
};


export default FavoriteCharacterCard;

{/*<Row>
    <Col className={style.teamFlex}>
        <img src={hero.teamImage} alt='myTeam' />
        <p className={style.teamName}>{hero.name}</p>
        <MdDeleteForever className={style.remove} onClick={() => { removeFromMyTeam(hero.id) }} />
    </Col>
</Row>*/}
