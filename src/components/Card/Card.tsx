import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

type CardProps = {
  id: string;
  title: string;
};

const Card = ({ id, title}: CardProps) => {
  return (
    <Link className={styles.link} href={`/question/${id}`}>
      <div className={styles.card}>
        <span> {title} </span>
      </div>
    </Link>
  );
};

export default Card;
