import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setSearchQuery } from '../../store/moviesSlice'
import styles from './Header.module.css'

function Header() {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector((state) => state.movies.searchQuery)
  const [inputValue, setInputValue] = useState(searchQuery)

  // sync local input when Redux searchQuery is cleared externally (e.g. genre selected)
  useEffect(() => {
    if (searchQuery === '') setInputValue('')
  }, [searchQuery])

  useEffect(() => {
    const trimmed = inputValue.trim()
    const timer = setTimeout(() => {
      if (trimmed !== searchQuery) {
        dispatch(setSearchQuery(trimmed))
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [inputValue, dispatch, searchQuery])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  function handleClear() {
    setInputValue('')
    dispatch(setSearchQuery(''))
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>🎬</span>
        <span className={styles.logoText}>Movies App</span>
      </div>
      <div className={styles.searchWrapper}>
        <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search movies..."
          value={inputValue}
          onChange={handleChange}
          aria-label="Search movies"
        />
        {inputValue && (
          <button className={styles.clearBtn} onClick={handleClear} aria-label="Clear search">
            ×
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
