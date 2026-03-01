import { Link } from 'react-router-dom'
import type { Genre, Movie } from '../../types'
import MovieInfo from '../MovieInfo/MovieInfo'
import PosterPreview from '../PosterPreview/PosterPreview'
import styles from './MoviesListCard.module.css'

interface Props {
  movie: Movie
  genres: Genre[]
}

function MoviesListCard({ movie, genres }: Props) {
  return (
    <Link to={`/movie/${movie.id}`} className={styles.card}>
      <PosterPreview posterPath={movie.poster_path} title={movie.title} />
      <MovieInfo
        title={movie.title}
        overview={movie.overview}
        voteAverage={movie.vote_average}
        releaseDate={movie.release_date}
        genreIds={movie.genre_ids}
        genres={genres}
      />
    </Link>
  )
}

export default MoviesListCard
