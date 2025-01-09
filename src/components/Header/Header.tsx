import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import cookie from "js-cookie";
import burgerBtn from "@/assets/img/burger-btn.svg";
import Link from "next/link";
import logOut from "@/assets/img/logout.svg";
import logo from "@/assets/img/logo.svg"

const Header = () => {
  const [isBurgerButtonClicked, setBurgerButtonClicked] = useState(false);

  const router = useRouter();

  const logoutUser = () => {
    cookie.remove("jwt_token");
    router.push("/login")
  };

  const navbar = (
    <ul>
      <li>
        <Link href="/login">Main</Link>
      </li>
      <li>
        <Link href="/insert">Ask Question</Link>
      </li>
      <li>
        <button
          onClick={() => {
            logoutUser();
          }}
          className={styles.logOutBtn}
        >
          <img src={logOut.src} />
        </button>
      </li>
    </ul>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Link href="/"><img src={logo.src} alt="Logo" style={{ width: '150px', height: 'auto' }} /> </Link>{" "}
      </div>
      <nav className={styles.desktopNav}>{navbar} </nav>

      <button onClick={() => setBurgerButtonClicked(!isBurgerButtonClicked)}>
        <img src={burgerBtn.src} alt="burger btn" />
      </button>

      <div
        className={`${styles.overlay}  ${
          isBurgerButtonClicked && styles.overlayOpen
        }`}
      >
        <nav className={styles.mobileNav}>{navbar} </nav>
      </div>
    </div>
  );
};

export default Header;
