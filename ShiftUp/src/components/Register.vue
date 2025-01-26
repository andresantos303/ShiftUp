<template>
  <div class="w-full h-screen mx-auto flex flex-col lg:flex-row">
    <!-- Coluna Esquerda -->
    <div class="hidden lg:flex lg:w-1/2 bg-gray-100 justify-center items-center">
      <img src="/public/images/cracha.png" alt="Cracha" class="h-full object-contain" />
    </div>

    <!-- Coluna Direita -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 md:px-12 py-6">
      <div class="max-w-lg w-full">
        <!-- Título -->
        <h1 class="text-3xl md:text-4xl font-bold mb-6 text-center">Fill in your Details</h1>

        <!-- Formulário -->
        <form @submit.prevent="handleCreateAccount" class="space-y-4">
          <!-- Seu Nome -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input id="name" type="text" v-model="name" required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your name" />
          </div>

          <!-- Sua Idade -->
          <div>
            <label for="age" class="block text-sm font-medium text-gray-700 mb-2">
              Your Age
            </label>
            <input id="age" type="number" v-model="age" required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your age" />
          </div>

          <!-- Seu Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Your Email
            </label>
            <input id="email" type="email" v-model="email" required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email" />
          </div>

          <!-- Sua Senha -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div class="relative w-full">
              <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password" required />

              <span @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-indigo-500">
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.006.016-.011.033-.017.05a1.018 1.018 0 01-.926.7H3.5a1.018 1.018 0 01-.926-.7c-.006-.017-.011-.034-.017-.05z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3.98 8.223A10.477 10.477 0 012.458 12c1.274 4.057 5.064 7 9.542 7 1.863 0 3.605-.504 5.1-1.377M21.543 12a10.477 10.477 0 01-1.523 3.777M15 12a3 3 0 01-4.284-4.284M9.857 7.25A3 3 0 019 12c0 .866.354 1.645.929 2.207M15 12a3 3 0 01-3 3m7.071 4.071l-18-18" />
                </svg>
              </span>
            </div>
          </div>

          <!-- Confirmar Senha -->
          <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <div class="relative w-full">
              <input :type="showPassword ? 'text' : 'password'" id="confirm-password" v-model="confirmPassword"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Confirm your password" required />

              <span @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-indigo-500">
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.006.016-.011.033-.017.05a1.018 1.018 0 01-.926.7H3.5a1.018 1.018 0 01-.926-.7c-.006-.017-.011-.034-.017-.05z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3.98 8.223A10.477 10.477 0 012.458 12c1.274 4.057 5.064 7 9.542 7 1.863 0 3.605-.504 5.1-1.377M21.543 12a10.477 10.477 0 01-1.523 3.777M15 12a3 3 0 01-4.284-4.284M9.857 7.25A3 3 0 019 12c0 .866.354 1.645.929 2.207M15 12a3 3 0 01-3 3m7.071 4.071l-18-18" />
                </svg>
              </span>
            </div>
          </div>

          <!-- Tipo (role) -->
          <div>
            <span class="block text-sm font-medium text-gray-700 mb-2">Do you want to volunteer?</span>
            <div class="flex space-x-4">
              <label class="flex items-center">
                <input type="radio" value="voluntary" v-model="role" required
                  class="focus:ring-indigo-500 focus:ring-2 text-indigo-600 border-gray-300" />
                <span class="ml-2 text-sm text-gray-700">Yes</span>
              </label>
              <label class="flex items-center">
                <input type="radio" value="participant" v-model="role" required
                  class="focus:ring-indigo-500 focus:ring-2 text-indigo-600 border-gray-300" />
                <span class="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>

          <!-- Botão Criar Conta (submit) -->
          <div>
            <button type="submit"
              class="inline-flex items-center justify-center rounded-full px-8 py-3 bg-custom-gradient text-white text-lg w-full py-3">Create
              Account</button>
          </div>

          <!-- Link para Login -->
          <p class="text-sm text-gray-600 text-center">
            If you already have an account
            <router-link to="/login" class="text-indigo-600 cursor-pointer">
              <b>Login</b>
            </router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useUsersStore } from "@/stores/users";

export default {
  data() {
    return {
      showPassword: false,
      name: "",
      age: "",
      email: "",
      password: "",
      photo: "",
      confirmPassword: "",
      role: "",
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    handleCreateAccount() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const usersStore = useUsersStore();

      // Verifica se o e-mail já existe
      const existingUser = usersStore.users.find(
        (user) => user.email === this.email
      );
      if (existingUser) {
        alert("Email is already registered!");
        return;
      }

      // Cria novo user
      const newUser = {
        id: Date.now(),
        name: this.name,
        age: String(this.age), // Convertendo para string
        email: this.email,
        photo: this.photo,
        password: this.password,
        role: this.role,
        conferences: [],
        ticket: null,
      };

      // Adiciona na store
      usersStore.addUser(newUser);

      alert("Account created successfully!");
      this.$router.push("/login");
    },
  },
};
</script>
