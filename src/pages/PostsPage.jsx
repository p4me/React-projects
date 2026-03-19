// CONCEPT: React Query — useQuery
// React Query manages server state: fetching, caching, loading & error states automatically.
// Without it, you'd need useState + useEffect + manual error handling for every fetch.

import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import './PostsPage.css'

// Keep fetch functions outside the component — they're plain async functions, not hooks
async function fetchPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=15')
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

function PostsPage() {
  const navigate = useNavigate()

  // useQuery takes a unique key and a fetch function.
  // It automatically gives you: data, isLoading, isError, error, and more.
  // It also CACHES the result — navigating back won't re-fetch unnecessarily.
  const { data: posts, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],   // unique cache key
    queryFn: fetchPosts,
  })

  if (isLoading) {
    return <p className="status-msg">Loading posts...</p>
  }

  if (isError) {
    return <p className="status-msg error">Error: {error.message}</p>
  }

  return (
    <div className="posts-page">
      <h2>Posts</h2>
      <p className="posts-concept">
        Concept: <code>useQuery</code> (React Query) + <code>useNavigate</code>
      </p>

      <ul className="posts-list">
        {posts.map(post => (
          <li
            key={post.id}
            className="post-card"
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            <span className="post-id">#{post.id}</span>
            <div>
              <h3>{post.title}</h3>
              <p>{post.body.slice(0, 90)}…</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostsPage
