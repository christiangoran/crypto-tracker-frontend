import React from "react";
import styles from "../styles/Avatar.module.css";

const Avatar = ({ src, height = "10vw", text }) => {
  return (
    <span>
      <img
        className={`${styles.Avatar} img-fluid`}
        src={src}
        style={{ height: height, width: height }}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;
