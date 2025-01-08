import React, { useEffect, useState } from "react";
import Tasks from "@/src/components/Questions/Questions";
import { Task } from "@/types/question";
import PageTemplate from "@/src/components/PageTemplate/PageTemplate";
import { getAllQuestions } from "@/api/question";
const MainPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await getAllQuestions();
  
      if (response && response.data && response.data.tasks) {
          setTasks(response.data.tasks);
      } else {
          console.error("Unexpected response structure:", response);
      }
  } catch (error) {
      console.error("Error fetching questions:", error);
  }
}

  useEffect(() => {
    fetchTasks();
  }, []); //

  return (
    <PageTemplate>
      <Tasks tasks={tasks} />
    </PageTemplate>
  );
};

export default MainPage;
