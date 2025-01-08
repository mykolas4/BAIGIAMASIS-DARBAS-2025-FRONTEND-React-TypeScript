import cookie from "js-cookie";
import axios from "axios";

const token = cookie.get("jwt_token");

const headers = {
  authorization: token || "",
};

export const getAllQuestions = async () => {
  try {
    const url = `${process.env.BASE_URL}/questions`;

    const response = await axios.get(url, {
      headers,
    });

    return response.data; 
  } catch  {
  }
};

export const insertQuestion = async () => {
  const response = await axios.post(`${process.env.BASE_URL}/questions/`, {
    headers,
  });

  return response;
};

export const deleteQuestionbyId= async (id: string) => {
  const response = await axios.delete(`${process.env.BASE_URL}/questions/${id}`, {
    headers,
  });

  return response;
};

