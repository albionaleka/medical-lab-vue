import axios from "axios";
import { NetworkError, AuthenticationError } from "../utils/errors";

export const login = async (data) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const authAxios = axios.create({
      baseURL: apiUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await authAxios.post("/auth/login", data);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw new NetworkError("Network issue");
    }

    if (error.response.status === 401) {
      throw new AuthenticationError("Invalid credentials");
    }

    throw error;
  }
};
