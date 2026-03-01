import { useAppSelector } from '../../store/hooks'
import MoviesListCard from '../MoviesListCard/MoviesListCard'
import styles from './MoviesList.module.css'

function MoviesList() {
  const { items, isLoading, error } = useAppSelector((state) => state.movies)
  const genres = useAppSelector((state) => state.genres.items)

  if (isLoading) {
    return (
      <div className={styles.status}>
        <div className={styles.spinner} />
        <p>Loading movies...</p>
      </div>
    )
  }

  if (error) {
    return <div className={styles.status}><p className={styles.error}>{error}</p></div>
  }

  if (!items.length) {
    return <div className={styles.status}><p>No movies found.</p></div>
  }

  return (
    <div className={styles.grid}>
      {items.map(movie => (
        <MoviesListCard key={movie.id} movie={movie} genres={genres} />
      ))}
    </div>
  )
}

export default MoviesList
