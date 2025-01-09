import cookie from "js-cookie";
import axios from "axios";

const token = cookie.get("jwt_token");

const headers = {
  authorization: token || "",
};

export const getAllQuestions = async () => {
  try {
    const url = `http://localhost:3002/questions`;

    const response = await axios.get(url, {
      headers,
    });

    return response.data; 
  } catch  {
  }
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

