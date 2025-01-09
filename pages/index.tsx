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
        console.error("Unexpected response structure:", response);
      }
    } catch (err) {
      const error = err as AxiosError;
 
      if (error.response) {
        if (error.response.status === 401) {
          router.push("/login");
        } else {
          console.error("Axios Error:", error.response.data); 
        }
      } else {
        console.error("Error fetching tasks:", error.message || err); 
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
