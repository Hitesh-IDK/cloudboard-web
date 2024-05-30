import React from "react";
import Login from "../components/login/login";
import styles from "./credentials.module.css";
import Header from "../components/login/header";

export default function Credentials() {
  return (
    <>
      <Header />
      <div className={styles.credentials__main}>
        <Login />
      </div>
    </>
  );
}
