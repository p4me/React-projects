// CONCEPT: useParams (React Router)
// useParams reads the dynamic segment from the URL.
// For a route like /posts/:id, useParams() returns { id: "5" }.

// CONCEPT: useQuery with a dynamic key
// ['post', id] is a unique cache key per post — React Query caches each post separately.

import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import './PostDetailPage.css'

function PostDetailPage() {
  const { id } = useParams()   // reads :id from the current URL
  const navigate = useNavigate()

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['post', id],    // different key for each post id
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      if (!res.ok) throw new Error('Post not found')
      return res.json()
    },
  })

  if (isLoading) return <p className="status-msg">Loading post...</p>
  if (isError) return <p className="status-msg error">Post not found.</p>

  return (
    <div className="post-detail">
      <button className="btn-back" onClick={() => navigate(-1)}>
        ← Back to Posts
      </button>
      <p className="post-detail-concept">
        Concept: <code>useParams</code> reads <code>id = {id}</code> from the URL
      </p>
      <h2>{post.title}</h2>
      <p className="post-body">{post.body}</p>
    </div>
  )
}

export default PostDetailPage
