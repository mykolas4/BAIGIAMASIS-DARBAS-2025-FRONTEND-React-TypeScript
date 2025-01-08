import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { Task } from "@/types/question";
import Button from "@/src/components/Button/Button";
import PageTemplate from "@/src/components/PageTemplate/PageTemplate";
import { getAllQuestions, deleteQuestionbyId } from "@/api/question";

const TaskPage = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchTask = async (id: string) => {
    setLoading(true);
    try {
      const response = await getAllQuestions(); 
      const fetchedTask = response.data((question: Task) => question.id === id);
      setTask(fetchedTask || null);
    } catch (error) {
      console.error("Error fetching task:", error);
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
      console.error("Error deleting task:", err);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    const { id } = router.query;
    if (typeof id === 'string') {
      fetchTask(id); 
    }
  }, [router.query.id]);

  return (
    <PageTemplate>
      <section className={styles.content}>
        {task ? (
          <>
            <div className={styles.buttonWrapper}>
              <Button
                isLoading={isLoading}
                title={"Delete task"}
                className={styles.dangerBtn}
                onClick={() => {
                  if (task?.id) {
                    handleDeleteQuestionById(task.id); 
                  }
                }}
              />
            </div>
            <div>
              <h2>{task.title}</h2>
            </div>
          </>
        ) : (
          <p>Loading task...</p> 
        )}
      </section>
    </PageTemplate>
  );
};

export default TaskPage;