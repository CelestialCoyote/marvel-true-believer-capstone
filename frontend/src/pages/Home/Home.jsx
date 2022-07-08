import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import PostForm from "../../components/PostForm/PostForm";
import Post from "../../components/Post/Post";
import TwitterFeed from '../../components/TwitterFeed/TwitterFeed';
import "./Home.css";


const Home = () => {
    const { user } = useContext(AuthContext);
    const decodedUser = localStorage.getItem("token");
    const [setPosts] = useState(null);
    const [postsWithUserInfo, setPostsWithUserInfo] = useState(null);

    const handleGetPosts = async () => {
        let response = await axios.get(
            `http://localhost:3015/api/posts/getPostsAndAuthorData/`,
            { headers: { "x-auth-token": decodedUser } }
        );
        setPostsWithUserInfo(response.data);
    };

    useEffect(() => {
        handleGetPosts();
    });

    return (

        <div className="home">
            
            <div className="home_postFeed">

                    <PostForm user={user} setPosts={setPosts} />

                    <div className="postMapper">
                        {postsWithUserInfo &&
                            postsWithUserInfo.map(post =>
                                <Post
                                    //key={post._id}
                                    post={post}
                                    setPosts={setPosts}
                                    handleGetPosts={handleGetPosts}
                                />
                            )}
                    </div>

            </div>

            <TwitterFeed />

        </div>

    );
};


export default Home;
