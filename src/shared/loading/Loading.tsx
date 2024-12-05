import styles from "./styles/loading.module.scss";
import { CircularProgress } from "@mui/material";
export const Loading = ({ loadingText = "Cargando", show }) => {
  return (
    show && (
      <div className={styles.background}>
        <CircularProgress
          size={80}
          thickness={5}
          sx={{
            color: "#4a7370",
            marginBottom: "7.5rem",
            opacity: 100,
          }}
        />
        <p className={styles.text}>{loadingText}</p>
      </div>
    )
  );
};
