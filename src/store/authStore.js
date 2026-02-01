import { defineStore } from "pinia";
import { login } from "../service/authService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    users: [],
    user: {},
    form: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    errors: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    isLoading: false,
    error: null,
  }),

  getters: {},

  actions: {
    setLoading(loading) {
      this.isLoading = loading;
    },

    setError(error) {
      this.error = {
        message: error.message || "An unknown error occurred",
        type: error.name || "Error",
        status: error.status || null,
      };
    },

    clearError() {
      this.error = null;
    },

    async login(email, password) {
      this.setLoading(true);
      this.clearError();
      try {
        const response = await login({ email, password });
        return response;
      } catch (error) {
        this.setError(error);
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
  },
});
