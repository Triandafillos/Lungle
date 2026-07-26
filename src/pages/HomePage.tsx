import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome to Lungle</h1>
          <p className="py-6">
            Lungle is a daily word guessing game based on clues in other languages. Test your multilingual skills!
          </p>
          <button className="btn btn-primary" onClick={() => navigate('play')}>Try It Out</button>
        </div>
      </div>
    </div>
  )
}