import React, { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import useCustomForm from '../../hooks/useCustomForm';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import './UserProfileEdit.css';


const UserProfileEdit = (props) => {
    const baseUrl = `http://localhost:3015/api/users`;
    const { user, setUser } = useContext(AuthContext);
    const defaultValues = {
        userName: user.userName,
        email: user.email,
        gender: user.gender,
        location: user.location,
    };
    const [formData, handleInputChange] = useCustomForm(defaultValues);
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setisValid] = useState(false);
    const [file, setFile] = useState();

    // referencing the URL
    const filePickerRef = useRef();


    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const handleProfileUpdate = async (event) => {
        event.preventDefault();
        try {
            await axios
                .put(
                    `${baseUrl}/${user._id}/updateUser`,
                    formData,
                    { headers: { "x-auth-token": localStorage.getItem("token") } }
                )
                .then((res) => {
                    localStorage.setItem("token", res.headers["x-auth-token"]);
                    setUser(jwtDecode(localStorage.getItem("token")));
                });
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageSelect = (event) => {
        let pickedFile;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setisValid(true);
        } else {
            setisValid(false);
        }
    };

    const handlePhotoUpdate = async (event) => {
        event.preventDefault();
        const form = new FormData();
        form.append("image", file);

        try {
            await axios
                .put(
                    `${baseUrl}/${user._id}/updateUserImage`,
                    form,
                    { headers: { "x-auth-token": localStorage.getItem("token") }}
                )
                .then((res) => {
                    localStorage.setItem("token", res.headers["x-auth-token"]);
                    setUser(jwtDecode(localStorage.getItem("token")));
                });
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditShow = () => {
        props.setProfileEdit(false);
    }

    return (

        <div className="userProfileEditContainer">
            <form className="userProfileEditForm" onSubmit={(event) => handleProfileUpdate(event)}>
                <label>
                    UserName:{" "}
                    <input
                        type="text"
                        name="userName"
                        placeholder="user name here."
                        value={formData.userName}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Gender:{" "}
                    <input
                        type="text"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Location:{" "}
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Update Profile</button>
            </form>

            <form className="userProfileEditForm" onSubmit={(event) => handlePhotoUpdate(event)}>
                <label>
                    Edit Photo
                    <input
                        ref={filePickerRef}
                        type="file"
                        accept=".jpg,.png,.jpeg"
                        onChange={(event) => handleImageSelect(event)}
                    />
                </label>
                <button type="submit">Update Photo</button>
            </form>
            <button onClick={handleEditShow}>Done</button>
        </div>

    );
};


export default UserProfileEdit;
