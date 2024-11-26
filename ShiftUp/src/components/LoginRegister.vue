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

      <!-- Username / Email -->
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
import router from '@/router';
export default {
  data() {
    return {
      isLogin: true, // Toggle between Login and Register
      formData: {
        email: "",
        password: "",
        confirmPassword: "", // Used only for registration
      },
    };
  },
  methods: {
    toggleForm(isLogin) {
      this.isLogin = isLogin;
      this.formData = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }; // Clear form data when toggling
    },
    handleSubmit() {
      if (this.isLogin) {
        // Handle login
        console.log("Login:", this.formData.email, this.formData.password);
        alert("Login successful");
      } else {
        // Handle registration
        if (this.formData.password !== this.formData.confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        console.log("Register:", this.formData.name, this.formData.email, this.formData.password);
        alert("Registration successful");
        if(this.formData.name == "admin123"){
          localStorage.setItem("isAuthenticated", true)
          router.push({path:`/admin/${this.formData.name}`})
        }else{
          localStorage.setItem("isAuthenticated", true)
          router.push({path:`/participante/${this.formData.name}/profile`})
        }
        
      }
    },
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