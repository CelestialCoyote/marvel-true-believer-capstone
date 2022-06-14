import React, { useRef, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import AuthContext from '../../context/AuthContext';
import useCustomForm from '../../hooks/useCustomForm';
import './UserProfileEdit.css';


const UserProfileEdit = ({ setProfileEdit }) => {
    const baseUrl = `http://localhost:3015/api/users`;
    const { user, setUser } = useContext(AuthContext);
    const defaultValues = {
        userName: user.userName,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
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

    return (

        <div className="userProfileEditContainer">

            <form
                className="userProfileEditForm"
                onSubmit={(event) => handleProfileUpdate(event)}
            >
                <div className="userProfileEditForm__userInfo">
                    <div className="userProfileEditForm__field">
                        <label className="userProfileEditForm__label" >
                            UserName:{" "}
                        </label>
                        <input
                            className="userProfileEditForm__input"
                            type="text"
                            name="userName"
                            placeholder="user name here."
                            value={formData.userName}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="userProfileEditForm__field">
                        <label className="userProfileEditForm__label">
                            firstName:{" "}
                        </label>
                        <input
                            className="userProfileEditForm__input"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="userProfileEditForm__field">
                        <label className="userProfileEditForm__label">
                            lastName:{" "}
                        </label>
                        <input
                            className="userProfileEditForm__input"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="userProfileEditForm__field">
                        <label className="userProfileEditForm__label">
                            Location:{" "}
                        </label>
                        <input
                            className="userProfileEditForm__input"
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                        />

                    </div>
                </div>

                <div className="userProfileEdit__buttonContainer">
                    <button
                        className="userProfileEdit__button"
                        type="submit"
                    >
                        Update Profile
                    </button>
                </div>

            </form>

            <form
                className="userProfileEditForm"
                onSubmit={(event) => handlePhotoUpdate(event)}
            >
            
                <label className="userProfileEditForm__label">
                    Edit Photo:
                </label>

                <div className="userProfileEditForm__imageSelect">
                    <input
                        ref={filePickerRef}
                        type="file"
                        id="file"
                        className="userProfileEditForm__file"
                        accept=".jpg,.png,.jpeg"
                        onChange={(event) => handleImageSelect(event)}
                    />
                    <label
                        className="userProfileEditForm__select"
                        htmlFor="file"
                    >
                        Select Image
                    </label>
                </div>

                <button
                    className="userProfileEdit__button"
                    type="submit"
                >
                    Update Photo
                </button>

            </form>

            <div className="userProfileEdit__buttonDone">
                <button
                    className="userProfileEdit__button"
                    onClick={() => { setProfileEdit(false) }}
                >
                    Done
                </button>
            </div>

        </div>

    );
};


export default UserProfileEdit;
