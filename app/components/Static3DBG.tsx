import styles from "./Static3DBG.module.css";

export default function Static3DBG() {
  return (
    <div className={styles.background} aria-hidden="true">
      <div className={styles.scanlines} />
    </div>
  );
}
