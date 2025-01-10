import React, { useEffect, useState } from "react";
import Questions from "@/src/components/Questions/Questions";
import { Question } from "@/types/question";
import { useRouter } from "next/router";
import PageTemplate from "@/src/components/PageTemplate/PageTemplate";
import { getAllQuestions } from "@/api/question";
import { AxiosError } from "axios";

const MainPage = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<Question[]>([]);

  const fetchQuestions = async () => {
    try {
      const response = await getAllQuestions();

      if (response.data && response.data.questions) {
        setTasks(response.data.questions); 
      } else {
      }
    } catch (err) {
      const error = err as AxiosError;

      if (error.response) {
        if (error.response.status === 401) {
          router.push("/login");
        } else {
        }
      } else {
      }
    }
};

  useEffect(() => {
    fetchQuestions();
  }, []); //

  return (
    <PageTemplate>
      <Questions questions={tasks} />
    </PageTemplate>
  );
};

export default MainPage;
