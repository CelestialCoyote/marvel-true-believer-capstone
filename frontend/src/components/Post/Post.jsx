import axios from 'axios';
import { useContext } from 'react';
import { BiLike } from 'react-icons/bi';
import AuthContext from '../../context/AuthContext';
import './Post.css';


const Post = (props) => {
    const baseUrl = `http://localhost:3015/api/posts`;
    const { user } = useContext(AuthContext);
    const decodedUser = localStorage.getItem("token");

    const addLike = async () => {
        let updatedPost = {
            "userID": props.post.userID._id,
            "text": props.post.text,
            "likes": props.post.likes + 1
        };

        try {
            await axios
                .put(
                    `${baseUrl}/${user._id}/updatePost/${props.post._id}`, updatedPost,
                    { headers: { "x-auth-token": decodedUser } }
                )
                .then((res) => props.setPosts(res.data));
        } catch (error) {
            console.log('Update post likes failed.', error);
        }

    }

    return (

        <div className="post">
            <div className="post__avatar">
                <img src={`http://localhost:3015/${props.post.userID.image}`} alt="" />
            </div>
            <div className="post__body">
                <div className="post__header">
                    <div className="post__userName">
                        {props.post.userID.userName}
                    </div>
                    <div className="post__text">
                        {props.post.text}
                    </div>
                </div>
                <div className="post__footer">
                    <p className="post__date">Date: {new Date(props.post.createdAt).toLocaleDateString()}</p>
                    <div className="post__like">
                        <BiLike
                            color="var(--captainAmerica-white)"
                            fontSize="1.5em"
                            onClick={addLike}
                        />
                        <p className="post__likeCount">{props.post.likes}</p>
                    </div>
                </div>
            </div>
            {/*<div className="postCreator">
                <img
                    className="postCreatorProfilePic"
                    alt="profile pic"
                    src={`http://localhost:3015/${props.post.userID.image}`}
                />
                <label className="creatorText">Posted by:<br></br>{props.post.userID.userName}</label>
            </div>

            <div className="postDataContainer">
                <p className="postText">{props.post.text}</p>

                <div className="postData">

                    <p className="postText">Date posted: {new Date(props.post.createdAt).toLocaleDateString()}</p>

                    <div className="likePost">

                        <p className="postText">Likes: {props.post.likes}</p>
                        <button onClick={addLike} className="postLikeButton">Like!</button>

                    </div>

                    <label className="postText">Edit Post</label>
                    {!props.friendsList ? <button>Edit</button> : null}

                </div>
            </div>*/}

        </div >

    );
}


export default Post;


//useEffect(() => {
    //}, [props.post]);

    //options = {
    //    year: 'numeric', month: 'numeric', day: 'numeric',
    //    hour: 'numeric', minute: 'numeric', second: 'numeric',
    //    hour12: false,
    //    timeZone: 'America/Los_Angeles'
    //  };
