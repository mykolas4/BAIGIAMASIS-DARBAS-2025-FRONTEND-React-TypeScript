import cookie from "js-cookie";
import axios from "axios";

const token = cookie.get("jwt_token");

const headers = {
  authorization: token || "",
};

export const getAnswersById = async (id: string) => {
  const response = await axios.get(`http://localhost:3002/questions/${id}/answers`, {
    headers,
  });

  return response;
};


export const insertAnswersById = async (id: string, answerData: object) => {
  const response = await axios.post(`http://localhost:3002/questions/${id}/answers`, answerData, {
    headers,
  });
  return response;
};

export const deleteAnswersById= async (questionId: string, answerId: string) => {
  const response = await axios.delete(`http://localhost:3002/questions/${questionId}/answers/${answerId}`, {
    headers,
  });

  return response;
};


