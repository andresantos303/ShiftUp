<template>
  <div class="auth-container">
    <div class="form-toggle">
      <button :class="{ active: isLogin }" @click="toggleForm(true)">
        Login
      </button>
      <button :class="{ active: !isLogin }" @click="toggleForm(false)">
        Register
      </button>
    </div>

    <form @submit.prevent="handleSubmit">
      <h2>{{ isLogin ? "Login" : "Register" }}</h2>

      <!-- Name (Register only) -->
      <div v-if="!isLogin" class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="formData.name" required />
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" required />
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          required
        />
      </div>

      <!-- Confirm Password (Register only) -->
      <div v-if="!isLogin" class="form-group">
        <label for="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          v-model="formData.confirmPassword"
          required
        />
      </div>

      <button type="submit">{{ isLogin ? "Login" : "Register" }}</button>
    </form>
  </div>
</template>

<script>
import { useUsersStore } from "@/stores/users";
import router from "@/router";
import { ref } from "vue";

export default {
  setup() {
    const usersStore = useUsersStore();
    const isLogin = ref(true);
    const formData = ref({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const toggleForm = (isLoginMode) => {
      isLogin.value = isLoginMode;
      formData.value = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
    };

    const handleSubmit = () => {
      if (isLogin.value) {
        // Handle login
        const user = usersStore.users.find(
          (usr) =>
            usr.email === formData.value.email &&
            usr.password === formData.value.password
        );

        if (user) {
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("user", [user.id, user.role]);

          if (user.role === "admin") {
            router.push("/admin/dashboard");
            router.push({ path: `/admin/${user.id}` });
          } else if (user.role === "participant") {
            router.push({path: `/participante/${user.id}/profile`});
            /* if (user.ticket === null) {
              router.push("/tickets");
            } else {
              router.push({path: `/participante/${user.id}/profile`});
            } */
          }
        } else {
          alert("Invalid email or password");
        }
      } else {
        // Handle registration
        if (formData.value.password !== formData.value.confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        // Verify if email already exists
        const existingUser = usersStore.users.find(
          (u) => u.email === formData.value.email
        );

        if (existingUser) {
          alert("Email is already registered");
          return;
        }

        const newUser = {
          id: Date.now(),
          name: formData.value.name,
          email: formData.value.email,
          password: formData.value.password,
          age: "",
          job: "",
          picture: "",
          role: "participant",
          conferences: [],
          ticket: null,
        };

        usersStore.addUser(newUser);

        // Login após o registro
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("userId", [newUser.id, newUser.role]);
        alert("Account registed");
        router.push("/tickets");
      }
    };

    return {
      isLogin,
      formData,
      toggleForm,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.auth-container {
  width: 300px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.form-toggle {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.form-toggle button {
  flex: 1;
  padding: 10px;
  background-color: #f5f5f5;
  border: none;
  cursor: pointer;
  border-radius: 8px 8px 0 0;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.form-toggle button.active {
  background-color: #007bff;
  color: white;
}

form {
  display: flex;
  flex-direction: column;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
  font-size: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

button[type="submit"] {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
