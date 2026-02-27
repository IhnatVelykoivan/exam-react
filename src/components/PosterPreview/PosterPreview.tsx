import { useState } from 'react'
import { getPosterUrl } from '../../api/tmdb'
import styles from './PosterPreview.module.css'

interface Props {
  posterPath: string | null
  title: string
}

function PosterPreview({ posterPath, title }: Props) {
  const [hasError, setHasError] = useState(false)

  if (!posterPath || hasError) {
    return (
      <div className={styles.poster}>
        <div className={styles.placeholder}>
          <span className={styles.placeholderIcon}>🎬</span>
          <span className={styles.placeholderText}>{title}</span>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.poster}>
      <img
        src={getPosterUrl(posterPath)}
        alt={title}
        loading="lazy"
        onError={() => setHasError(true)}
      />
    </div>
  )
}

export default PosterPreview
