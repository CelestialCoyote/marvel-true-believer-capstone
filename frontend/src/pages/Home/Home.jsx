import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import PostForm from "../../components/PostForm/PostForm";
import PostMapper from "../../components/PostMapper/PostMapper";
import TwitterFeed from '../../components/TwitterFeed/TwitterFeed';
import "./Home.css";


const Home = () => {
    const [posts, setPosts] = useState(null);
    const [postsWithUserInfo, setPostsWithUserInfo] = useState(null);
    const { user } = useContext(AuthContext);
    const decodedUser = localStorage.getItem("token");

    const handleGetPosts = async () => {
        let response = await axios.get(
            `http://localhost:3015/api/posts/getPostsAndAuthorData/`,
            { headers: { "x-auth-token": decodedUser } }
        );
        setPostsWithUserInfo(response.data);
    };

    useEffect(() => {
        handleGetPosts();
    }, [posts]);

    return (

        <div className="home">
            <div className="home_postFeed">

                <div className="">
                    <PostForm user={user} setPosts={setPosts} />

                    <PostMapper postsWithUserInfo={postsWithUserInfo} setPosts={setPosts} handleGetPosts={handleGetPosts} />
                </div>

            </div>
            <TwitterFeed />
        </div>
        
    );
};


export default Home;
