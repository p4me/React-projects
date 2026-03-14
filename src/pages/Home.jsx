import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Home page. Add your content here.</p>
      <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
    </div>
  )
}

export default Home
