import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
  data: {
    operandOne: 10,
    operandTwo: 2,
    operator: "/",
  },
  withCredentials: true,
});

export const pingAPI = async (): Promise<{ message: string }> => {
  const response = await api.post("calculate");
  return response.data;
};

export default api;
