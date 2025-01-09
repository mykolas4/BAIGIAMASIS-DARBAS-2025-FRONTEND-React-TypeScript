import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { Question } from "@/types/question";
import Button from "@/src/components/Button/Button";
import PageTemplate from "@/src/components/PageTemplate/PageTemplate";
import { getAllQuestions, deleteQuestionbyId } from "@/api/question";

const QuestionPage = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchQuestion = async (id: string) => {
    setLoading(true);
    try {
      const response = await getAllQuestions(); 
      const fetchedQuestion = response.data((question: Question) => question.id === id);
      setQuestion(fetchedQuestion || null);
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestionById = async (id: string) => { 
    setLoading(true); 
    try {
      const response = await deleteQuestionbyId(id);
      if (response.status === 200) {
        router.push("/");
      }
    } catch (err) {
      console.error("Error deleting question:", err);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    const { id } = router.query;
    if (typeof id === 'string') {
      fetchQuestion(id); 
    }
  }, [router.query.id]);

  return (
    <PageTemplate>
      <section className={styles.content}>
        {question ? (
          <>
            <div className={styles.buttonWrapper}>
              <Button
                isLoading={isLoading}
                title={"Delete question"}
                className={styles.dangerBtn}
                onClick={() => {
                  if (question?.id) {
                    handleDeleteQuestionById(question.id); 
                  }
                }}
              />
            </div>
            <div>
              <h2>{question.title}</h2>
            </div>
          </>
        ) : (
          <p>Loading question...</p> 
        )}
      </section>
    </PageTemplate>
  );
};

export default QuestionPage;