import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchMovieById, getPosterUrl } from '../../api/tmdb'
import GenreBadge from '../../components/GenreBadge/GenreBadge'
import StarsRating from '../../components/StarsRating/StarsRating'
import type { MovieDetail } from '../../types'
import styles from './MovieDetailPage.module.css'

function MovieDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [movie, setMovie] = useState<MovieDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setIsLoading(true)
    setError(null)
    fetchMovieById(Number(id))
      .then((data: MovieDetail) => {
        setMovie(data)
        setIsLoading(false)
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to load movie')
        setIsLoading(false)
      })
  }, [id])

  function handleBack() {
    navigate(-1)
  }

  if (isLoading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.spinner} />
        <p>Loading...</p>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className={styles.loadingState}>
        <p className={styles.error}>{error ?? 'Movie not found'}</p>
        <button className={styles.backBtn} onClick={handleBack}>← Go Back</button>
      </div>
    )
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null

  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null

  return (
    <div className={styles.page}>
      {backdropUrl && (
        <div className={styles.backdrop} style={{ backgroundImage: `url(${backdropUrl})` }} />
      )}
      <div className={styles.content}>
        <button className={styles.backBtn} onClick={handleBack}>
          ← Back
        </button>
        <div className={styles.details}>
          <div className={styles.posterWrap}>
            <img
              src={getPosterUrl(movie.poster_path)}
              alt={movie.title}
              className={styles.poster}
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/500x750/1a1a2e/e0e0e0?text=No+Poster'
              }}
            />
          </div>
          <div className={styles.info}>
            <h1 className={styles.title}>{movie.title}</h1>
            {movie.tagline && <p className={styles.tagline}>{movie.tagline}</p>}
            <div className={styles.meta}>
              <span className={styles.year}>{year}</span>
              {runtime && <span className={styles.runtime}>{runtime}</span>}
              <span className={styles.status}>{movie.status}</span>
            </div>
            <StarsRating voteAverage={movie.vote_average} />
            {movie.genres.length > 0 && (
              <div className={styles.genres}>
                {movie.genres.map(g => (
                  <GenreBadge key={g.id} name={g.name} />
                ))}
              </div>
            )}
            <div className={styles.overviewSection}>
              <h2 className={styles.overviewTitle}>Overview</h2>
              <p className={styles.overview}>
                {movie.overview || 'No description available for this movie.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailPage
