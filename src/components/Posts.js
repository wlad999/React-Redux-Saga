import React from "react";
import Post from "./Post";
import {connect} from 'react-redux'


const Posts = ({syncPost}) => {
    if (!syncPost.length) {
        return <p className='text-center'>Posts are not yet</p>
    }
    return syncPost.map(post => <Post post={post} key={post.id}/>)
}
const MSTP = (state) => {
    return {
        syncPost: state.posts.posts
    }
}


export default connect(MSTP, null)(Posts)