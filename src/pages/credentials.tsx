import React from "react";
import Login from "../components/login/login";
import styles from "./credentials.module.css";

export default function Credentials() {
  return (
    <div className={styles.credentials__main}>
      <Login />
    </div>
  );
}
