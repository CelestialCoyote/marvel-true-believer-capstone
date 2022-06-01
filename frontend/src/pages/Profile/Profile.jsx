import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard';
import CharacterCardMapper from '../../components/ChacterCardMapper/CharacterCardMapper';
import './Profile.css';


const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="profile">
            <UserProfileCard user={user} />
            {/*<CharacterCardMapper characters={user.favoriteCharacters} />*/}
        </div>
    );
};


export default Profile;
