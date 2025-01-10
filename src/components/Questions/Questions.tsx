import React from "react";
import { Question } from "@/types/question";
import Card from "../Card/Card";
import styles from "./styles.module.css"


type QuestionsProps = {
  questions: Question[];
};

const Questions = ({ questions }: QuestionsProps) => {
  return (
    <div className={styles.wrapper}>
      {questions.map((question) => {
        return (
          <Card
          id={question.id}
            key={question.id}
            title={question.title}
          />
        );
      })}
    </div>
  );
};
export default Questions;
