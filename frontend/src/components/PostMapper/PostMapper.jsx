import Post from '../Post/Post';
import './PostMapper.css';


const PostMapper = (props) => {

    return (

        <div className="postMapper">

            <ul className="postMapper__ul">
                {props.postsWithUserInfo &&
                    props.postsWithUserInfo.map(post =>
                        <li
                            key={post._id}>
                            <Post
                                post={post}
                                setPosts={props.setPosts}
                                handleGetPosts={props.handleGetPosts}
                            />
                        </li>)
                }
            </ul>

        </div>

    );
}

export default PostMapper;