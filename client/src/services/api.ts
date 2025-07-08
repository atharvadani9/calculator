import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const calculateAPI = async (data: any): Promise<any> => {
  const response = await api.post("calculate", data);
  if (response.status !== 200) {
    throw new Error("Failed to get Calculate API");
  }
  return response.data;
};

export default api;
