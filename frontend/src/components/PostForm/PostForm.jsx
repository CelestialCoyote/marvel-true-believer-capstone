import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import "../PostForm/PostForm.css";


const PostForm = (props) => {
    const BASE_URL = "http://localhost:3015/api/posts";
    const decodedUser = localStorage.getItem("token");
    const { user } = useContext(AuthContext);
    const defaultValues = { userID: user._id, text: "" };
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
        defaultValues,
        createNewPost
    );

    async function createNewPost() {
        try {
            await axios
                .post(`${BASE_URL}/${user._id}/createPost`, formData, {
                    headers: { "x-auth-token": decodedUser },
                })
                .then((res) => props.setPosts(res.data));
            reset();
        } catch (error) {
            console.log("fail from PostForm ", error);
        }
    }

    return (
        <div className="postForm">
            <form className="postForm__form" onSubmit={handleSubmit}>
                <p className="postForm__userName">Logged in as: {user.userName}</p>

                <div className="postForm__container">
                    <img className="postForm__image" src={`http://localhost:3015/${props.user.image}`} alt="" />

                    <input
                        className="postForm__input"
                        type="text"
                        name="text"
                        placeholder="What's on your mind?"
                        value={formData.text}
                        onChange={handleInputChange}
                    />
                </div>

                <button className="postForm__button" type="submit">Post</button>
            </form>
        </div>
    );
};


export default PostForm;
