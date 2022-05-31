import React from "react";
import "./UserProfileInfo.css";


const UserProfileInfo = ({ user, setProfileEdit }) => {
    const handleEditShow = () => {
        setProfileEdit(true);
    }

    return (

        <div className="userProfileInfo">
            <p>
                UserName: {user.userName}
            </p>
            <p>
                Name: {user.firstName} {user.lastName}
            </p>
            <p>
                Location: {user.location}
            </p>
            <button onClick={handleEditShow}>Edit Profile Information</button>
        </div>

    );
};


export default UserProfileInfo;
