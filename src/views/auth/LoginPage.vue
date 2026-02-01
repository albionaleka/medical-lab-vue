<template>
  <div
    class="flex flex-col bg-white lg:flex-row w-full max-w-6xl shadow-lg rounded-lg overflow-hidden"
  >
    <div
      class="w-full lg:w-2/5 flex items-center justify-center px-8 sm:px-12 lg:px-16 py-12 bg-white"
    >
      <div class="w-full max-w-sm">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-10">
          Welcome to Medica
        </h1>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label
              for="username"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <div class="relative">
              <span
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                type="text"
                id="username"
                v-model="username"
                placeholder="your.name@mail.com"
                required
                autocomplete="username"
                class="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div class="relative">
              <span
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                type="password"
                id="password"
                v-model="password"
                placeholder="••••••••"
                required
                autocomplete="current-password"
                class="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm"
          >
            Log In
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-gray-600">
          Don't have an account?
          <a href="#" class="text-blue-600 hover:text-blue-700 font-semibold"
            >Sign Up!</a
          >
        </p>
      </div>
    </div>

    <div
      class="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-blue-200 via-blue-300 to-indigo-400 items-center justify-center rounded-l-full p-16 relative overflow-hidden"
    >
      <div
        class="relative z-10 flex items-center justify-center w-full h-full max-w-2xl"
      >
        <div class="text-center">
          <img
            src="/src/assets/chem-lab.svg"
            alt="Medica Logo"
            class="w-64 h-64 mx-auto mb-6"
          />
          <p class="text-white text-lg font-medium opacity-90">
            Medical records made easy and secure.
          </p>
        </div>
      </div>
      <div
        class="absolute top-20 right-20 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-20 left-20 w-80 h-80 bg-indigo-300 opacity-20 rounded-full blur-3xl"
      ></div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../../store/authStore";
import { useToast } from "vue-toastification";

export default {
  name: "LoginPage",
  setup() {
    const authStore = useAuthStore();
    const toast = useToast();
    return { authStore, toast, username: "", password: "" };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await this.authStore.login(
          this.username,
          this.password,
        );

        if (response && response.token) {
          localStorage.setItem("authToken", response.token);
          this.toast.success("Login successful!");
        }
      } catch (error) {
        const errorMessage = error.message || "An unexpected error occurred";
        this.toast.error(errorMessage);
      }
    },
  },
};
</script>
