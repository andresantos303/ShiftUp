<template>
  <div class="flex flex-col md:flex-row h-screen">
    <!-- Coluna Esquerda -->
    <div
      class="w-full md:w-1/2 flex mt-12 md:mt-0 flex-col justify-center items-center px-6 md:px-12"
    >
      <div class="max-w-xl mx-auto">
        <!-- Logo -->
        <img
          src="/public/images/logoGradient.png"
          alt="Logo"
          class="mb-6 w-32"
        />

        <!-- Título -->
        <h1 class="text-3xl md:text-4xl font-bold mb-2">Log in</h1>

        <!-- Descrição -->
        <p class="text-sm text-gray-500 mb-6">
          Access your account and explore all the features. Please enter your
          credentials below.
        </p>

        <!-- Email -->
        <div class="mb-4 text-left">
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mb-2"
            >Email</label
          >
          <input
            id="email"
            type="email"
            v-model="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Password -->
        <div class="mb-6 relative text-left">
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 mb-2"
            >Password</label
          >
          <div class="relative w-full">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />

            <span
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-indigo-500"
            >
              <svg
                v-if="showPassword"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.006.016-.011.033-.017.05a1.018 1.018 0 01-.926.7H3.5a1.018 1.018 0 01-.926-.7c-.006-.017-.011-.034-.017-.05z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3.98 8.223A10.477 10.477 0 012.458 12c1.274 4.057 5.064 7 9.542 7 1.863 0 3.605-.504 5.1-1.377M21.543 12a10.477 10.477 0 01-1.523 3.777M15 12a3 3 0 01-4.284-4.284M9.857 7.25A3 3 0 019 12c0 .866.354 1.645.929 2.207M15 12a3 3 0 01-3 3m7.071 4.071l-18-18"
                />
              </svg>
            </span>
          </div>
        </div>

        <!-- Btn Login -->
        <div class="mb-4">
          <Button
            :label="'Log in'"
            :to="''"
            bgColor="bg-custom-gradient"
            textColor="text-white"
            textSize="text-lg"
            additionalClasses="w-full py-3"
            @click="handleLogin"
          />
        </div>

        <!-- Create Account Link -->
        <p class="text-sm text-gray-600 text-center">
          Don't have an account yet?
          <router-link to="/tickets" class="text-indigo-600 cursor-pointer">
            <b>Create Account</b>
          </router-link>
        </p>
      </div>
    </div>

    <!-- Coluna Direita -->
    <div class="hidden md:block w-1/2 bg-gray-100">
      <img
        src="/public/images/loginImage.png"
        alt="Login Image"
        class="h-full w-full object-cover"
      />
    </div>
  </div>
</template>

<script>
import Button from "./ui/button.vue";
import { useUsersStore } from "@/stores/users";
import router from "@/router";
import { warn } from "vue";

export default {
  components: {
    Button,
  },
  data() {
    return {
      showPassword: false,
      email: "",
      password: "",
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    handleLogin() {
      const usersStore = useUsersStore();
      const user = usersStore.users.find(
        (usr) => usr.email === this.email && usr.password === this.password
      );

      if (user) {
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("user", JSON.stringify({ id: user.id, role: user.role }));

        if (user.role === "admin") {
          router.push("/admin/dashboard");
        } else if (user.role === "participant" || user.role === "voluntary") {
          router.push("/");
        }
      } else {
        alert("Invalid email or password");
      }
    },
  },
};
</script>