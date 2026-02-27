import styles from './GenreBadge.module.css'

interface Props {
  name: string
}

function GenreBadge({ name }: Props) {
  return <span className={styles.badge}>{name}</span>
}

export default GenreBadge
