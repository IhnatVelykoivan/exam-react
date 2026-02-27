import styles from './UserInfo.module.css'

function UserInfo() {
  return (
    <div className={styles.userInfo}>
      <div className={styles.avatar}>IK</div>
      <div className={styles.details}>
        <span className={styles.name}>Ihnat Velykoivan</span>
        <span className={styles.role}>Movie Enthusiast</span>
      </div>
    </div>
  )
}

export default UserInfo
