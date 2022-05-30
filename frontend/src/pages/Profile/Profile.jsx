import React, { useContext } from 'react';
import AuthContext from "../../context/AuthContext";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";
import './Profile.css';


const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="profile">
            <UserProfileCard user={user} />
        </div>
    );
};


export default Profile;
