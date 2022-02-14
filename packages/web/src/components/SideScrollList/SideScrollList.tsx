import styles from './SideScrollList.module.css'

export const SideScrollList: React.FC = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}
