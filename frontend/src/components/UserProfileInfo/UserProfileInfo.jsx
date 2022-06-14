import React from "react";
import "./UserProfileInfo.css";


const UserProfileInfo = ({ user, setProfileEdit }) => {

    return (

        <div className="userProfileInfo">
            <div className="userProfileInfo__container">
                <p className="userProfileInfo__text">
                    <span className="heading">UserName: </span>
                    {user.userName}
                </p>
                <p className="userProfileInfo__text">
                    <span className="heading">Name: </span>
                    {user.firstName} {user.lastName}
                </p>
                <p className="userProfileInfo__text">
                    <span className="heading">Location: </span>
                    {user.location}
                </p>
            </div>

            <div className="userProfileInfo__buttonContainer">
                <button
                    className="userProfileInfo__button"
                    onClick={() => { setProfileEdit(true) }}
                >
                    Edit Profile Information
                </button>
            </div>

        </div>

    );
};


export default UserProfileInfo;
