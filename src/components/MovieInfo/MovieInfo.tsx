import type { Genre } from '../../types'
import GenreBadge from '../GenreBadge/GenreBadge'
import StarsRating from '../StarsRating/StarsRating'
import styles from './MovieInfo.module.css'

interface Props {
  title: string
  overview: string
  voteAverage: number
  releaseDate: string
  genreIds: number[]
  genres: Genre[]
}

function MovieInfo({ title, overview, voteAverage, releaseDate, genreIds, genres }: Props) {
  const year = releaseDate ? releaseDate.slice(0, 4) : 'N/A'

  const movieGenres = genres.filter(g => genreIds.includes(g.id)).slice(0, 3)

  return (
    <div className={styles.info}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.meta}>
        <span className={styles.year}>{year}</span>
        <StarsRating voteAverage={voteAverage} />
      </div>
      {movieGenres.length > 0 && (
        <div className={styles.genres}>
          {movieGenres.map(genre => (
            <GenreBadge key={genre.id} name={genre.name} />
          ))}
        </div>
      )}
      {overview && (
        <p className={styles.description}>{overview}</p>
      )}
    </div>
  )
}

export default MovieInfo
