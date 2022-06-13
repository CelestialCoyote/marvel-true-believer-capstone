import React, { useState } from "react";
import UserProfileInfo from "../UserProfileInfo/UserProfileInfo";
import UserProfileEdit from "../UserProfileEdit/UserProfileEdit";
import "./UserProfileCard.css";


const UserProfileCard = (props) => {
    const [profileEdit, setProfileEdit] = useState(false);

    return (

        <div className="userProfileCard">

            <div className="userProfileCard_imageDiv">
                <img
                    className="userProfileCard_image"
                    alt="profile pic"
                    src={`http://localhost:3015/${props.user.image}`}
                />
            </div>


            {!profileEdit && <UserProfileInfo user={props.user} setProfileEdit={setProfileEdit} />}
            {profileEdit && <UserProfileEdit setProfileEdit={setProfileEdit} />}
        </div>

    );
};


export default UserProfileCard;
