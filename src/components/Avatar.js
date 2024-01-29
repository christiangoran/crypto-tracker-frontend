import React from "react";
import styles from "../styles/Avatar.module.css";

//The Avatar function takes the following props that
//are destructured within the function parameter
//brackets;
// - src: Takes currentUser.profile_image from parent
// - height: takes size data from parent
// - text: To add a text next to profile image

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
