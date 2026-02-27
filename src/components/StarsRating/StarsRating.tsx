import styles from './StarsRating.module.css'

interface Props {
  voteAverage: number
}

function StarsRating({ voteAverage }: Props) {
  const rating = voteAverage / 2
  const fullStars = Math.floor(rating)
  const hasHalf = rating - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)

  return (
    <div className={styles.stars} aria-label={`Rating: ${rating.toFixed(1)} out of 5`}>
      {Array.from({ length: fullStars }, (_, i) => (
        <span key={`full-${i}`} className={styles.full}>★</span>
      ))}
      {hasHalf && <span className={styles.half}>★</span>}
      {Array.from({ length: emptyStars }, (_, i) => (
        <span key={`empty-${i}`} className={styles.empty}>★</span>
      ))}
      <span className={styles.score}>{rating.toFixed(1)}</span>
    </div>
  )
}

export default StarsRating
