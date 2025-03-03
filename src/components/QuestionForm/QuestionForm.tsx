import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import Button from "../Button/Button";
import cookie from "js-cookie";
import { useRouter } from "next/router";

const QuestionForm = () => {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const insertQuestion = async () => {
    try {
      const headers = {
        authorization: cookie.get("jwt_token"),
      };

      const body = {
        title: title,
      };

      const response = await axios.post(`http://localhost:3000/`, body, {
        headers,
      });

      console.log(response);

      if (response.status === 201) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Add question</h1>
      <div className={styles.form}>
        <input
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
        <Button title="add" isLoading={false} onClick={insertQuestion} />
      </div>
    </div>
  );
};

export default QuestionForm;


