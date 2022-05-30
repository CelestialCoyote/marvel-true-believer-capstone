import React from "react";
import "./UserProfileInfo.css";


const UserProfileInfo = (props) => {
    const handleEditShow = () => {
        props.setProfileEdit(true);
    }

    return (

        <div className="userProfileInfo">
            <p>
                UserName: {props.user.userName}
            </p>
            <p>
                Gender: {props.user.gender}
            </p>
            {/*<p>
                        Age: {props.user.age}
                    </p>*/}
            <p>
                Location: {props.user.location}
            </p>
            <button onClick={handleEditShow}>Edit Profile Information</button>
        </div>

    );
};


export default UserProfileInfo;
