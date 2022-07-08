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
            <div className="post_avatar">
                <img src={`http://localhost:3015/${props.post.userID.image}`} alt="" />
            </div>
            <div className="post_body">
                <div className="post_header">
                    <div className="post_userName">
                        {props.post.userID.userName}
                    </div>
                    <div className="post_text">
                        {props.post.text}
                    </div>
                </div>
                <div className="post_footer">
                    <p className="post_date">Date: {new Date(props.post.createdAt).toLocaleDateString()}</p>
                    <div className="post_like">
                        <BiLike
                            color="var(--captainAmerica-white)"
                            fontSize="1.5em"
                            onClick={addLike}
                        />
                        <p className="post_likeCount">{props.post.likes}</p>
                    </div>
                </div>
            </div>
            
        </div >

    );
}


export default Post;
