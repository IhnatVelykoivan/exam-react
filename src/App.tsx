import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import MoviesPage from './pages/MoviesPage/MoviesPage'
import MovieDetailPage from './pages/MovieDetailPage/MovieDetailPage'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
      </Routes>
    </>
  )
}

export default App
