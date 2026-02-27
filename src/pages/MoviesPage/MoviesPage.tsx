import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store'
import { loadGenres } from '../../store/genresSlice'
import { loadMovies, setGenre, setPage } from '../../store/moviesSlice'
import MoviesList from '../../components/MoviesList/MoviesList'
import UserInfo from '../../components/UserInfo/UserInfo'
import styles from './MoviesPage.module.css'

function MoviesPage() {
  const dispatch = useDispatch<AppDispatch>()
  const genres = useSelector((state: RootState) => state.genres.items)
  const { currentPage, totalPages, selectedGenreId } = useSelector(
    (state: RootState) => state.movies
  )

  useEffect(() => {
    dispatch(loadGenres())
    dispatch(loadMovies())
  }, [dispatch])

  function handleGenreSelect(genreId: number | null) {
    dispatch(setGenre(genreId))
    dispatch(loadMovies())
  }

  function handlePageChange(page: number) {
    dispatch(setPage(page))
    dispatch(loadMovies())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pageNumbers = buildPageNumbers(currentPage, totalPages)

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <UserInfo />
        <nav className={styles.genreNav}>
          <h2 className={styles.genreTitle}>Genres</h2>
          <ul className={styles.genreList}>
            <li>
              <button
                className={`${styles.genreBtn} ${selectedGenreId === null ? styles.active : ''}`}
                onClick={() => handleGenreSelect(null)}
              >
                All Movies
              </button>
            </li>
            {genres.map(genre => (
              <li key={genre.id}>
                <button
                  className={`${styles.genreBtn} ${selectedGenreId === genre.id ? styles.active : ''}`}
                  onClick={() => handleGenreSelect(genre.id)}
                >
                  {genre.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className={styles.main}>
        <MoviesList />
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ‹
            </button>
            {pageNumbers.map((p, i) =>
              p === '...' ? (
                <span key={`dots-${i}`} className={styles.dots}>…</span>
              ) : (
                <button
                  key={p}
                  className={`${styles.pageBtn} ${currentPage === p ? styles.activePage : ''}`}
                  onClick={() => handlePageChange(p as number)}
                >
                  {p}
                </button>
              )
            )}
            <button
              className={styles.pageBtn}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

function buildPageNumbers(current: number, total: number): (number | string)[] {
  const capped = Math.min(total, 500)
  if (capped <= 7) return Array.from({ length: capped }, (_, i) => i + 1)

  const pages: (number | string)[] = [1]
  if (current > 3) pages.push('...')
  for (let p = Math.max(2, current - 1); p <= Math.min(capped - 1, current + 1); p++) {
    pages.push(p)
  }
  if (current < capped - 2) pages.push('...')
  pages.push(capped)
  return pages
}

export default MoviesPage
