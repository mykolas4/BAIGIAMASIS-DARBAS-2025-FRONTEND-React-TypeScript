import cookie from "js-cookie";
import axios from "axios";

const token = cookie.get("jwt_token");

const headers = {
  authorization: token || "",
};

export const getAllQuestions = async () => {
  const response = await axios.get("http://localhost:3002/questions/", {
    headers,
  });

  return response;
};


export const insertQuestion = async () => {
  const response = await axios.post(`http://localhost:3002/question/`, {
    headers,
  });

  return response;
};


export const deleteQuestionbyId= async (id: string) => {
  const response = await axios.delete(`http://localhost:3002/question/${id}`, {
    headers,
  });

  return response;
};

