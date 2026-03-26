import React, { useEffect, useState } from 'react'

const getPost = async () => {
   const res = await fetch('https://jsonplaceholder.typicode.com/posts', {method: 'GET'})
   const data = await res.json();
   return data;
}

const Posts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        getPost().then((result) => {
        setPosts(result)
        }).catch((error) => console.error(error));
    },[]);
  return (
    <div>
        {  (posts && posts.length > 0) ?
        <ul>
            {
                posts.map((post) =>
                <li key={post.id}>{post.title}</li>
)
            }
        </ul>
           : <p> No posts found. </p>
        }
    </div>
  )
}

export default Posts