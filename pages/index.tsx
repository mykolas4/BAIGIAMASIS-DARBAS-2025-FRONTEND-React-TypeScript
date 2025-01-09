import React, { useEffect, useState } from "react";
import Questions from "@/src/components/Questions/Questions";
import { Question } from "@/types/question";
import PageTemplate from "@/src/components/PageTemplate/PageTemplate";
import { getAllQuestions } from "@/api/question";
const MainPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const fetchQuestions = async () => {
    try {
      const response = await getAllQuestions();
  
      if (response && response.data && response.data.questions) {
          setQuestions(response.data.questions);
      } else {
          console.error("Unexpected response structure:", response);
      }
  } catch (error) {
      console.error("Error fetching questions:", error);
  }
}

  useEffect(() => {
    fetchQuestions();
  }, []); //

  return (
    <PageTemplate>
      <Questions questions={questions} />
    </PageTemplate>
  );
};

export default MainPage;
