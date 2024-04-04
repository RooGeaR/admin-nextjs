import { CSSProperties } from "react";
import styles from "./button.module.css";

interface ButtonProps {
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  title: string;
  type?: "submit";
  style?: CSSProperties;
}
export default function Button({
  disabled,
  loading,
  onClick,
  title,
  type,
  style,
}: ButtonProps) {
  return (
    <button
      type={type || "button"}
      className={styles.button}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {loading ? "Loading..." : title}
    </button>
  );
}
