<template>
  <!-- Só mostra o modal se estiver aberto -->
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg w-96">
      <h2 class="text-xl font-semibold mb-4">
        <!-- Título muda de acordo com a prop `mode` -->
        {{ mode === "edit" ? "Edit User" : "Add User" }}
      </h2>

      <form @submit.prevent="submitForm">
        <!-- Campo Nome -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter user name"
            required
          />
        </div>

        <!-- Campo Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter user email"
            required
          />
        </div>

        <!-- Campo Nome -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter user password"
            required
          />
        </div>

        <!-- Campo Nome -->
        <div class="mb-4">
          <label for="age" class="block text-sm font-medium text-gray-700 mb-2">Age</label>
          <input
            id="age"
            v-model="formData.age"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter user age"
            required
          />
        </div>

        <!-- Campo Role -->
        <div class="mb-4">
          <label for="role" class="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <select
            id="role"
            v-model="formData.role"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="" disabled>Select a role</option>
            <option value="voluntary">Voluntary</option>
            <option value="admin">Admin</option>
            <option value="participant">Participant</option>
          </select>
        </div>

        <!-- Botões -->
        <div class="flex justify-between">
          <button
            type="button"
            @click="onClose"
            class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium rounded-lg text-sm px-4 py-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm px-4 py-2"
          >
            {{ mode === "edit" ? "Update" : "Create" }} User
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserModal",
  props: {
    isOpen: {      // controla se o modal deve aparecer
      type: Boolean,
      default: false,
    },
    onClose: {     // função para fechar o modal
      type: Function,
      required: true,
    },
    onSave: {      // função chamada ao salvar
      type: Function,
      required: true,
    },
    user: {        // user a editar, se for o caso
      type: Object,
      default: null,
    },
    mode: {        // "create" ou "edit"
      type: String,
      default: "create",
    },
  },
  data() {
    return {
      // Dados locais do formulário
      formData: {
        name: "",
        email: "",
        password:"",
        age:"",
        role: "",
      },
    };
  },
  watch: {
    // Sempre que a prop `user` mudar (ou no load inicial com immediate: true),
    // atualizamos o formData para exibir os dados do user
    user: {
      immediate: true,
      handler(newUser) {
        if (newUser && this.mode === "edit") {
          // Se estamos em modo edição e recebemos um user, popular o form
          this.formData = {
            name: newUser.name || "",
            email: newUser.email || "",
            password: newUser.password || "",
            age: newUser.age || "",
            role: newUser.role || "",
          };
        } else {
          // Se não há user (ou é modo create), limpa os campos
          this.formData = {
            name: "",
            email: "",
            password: "",
            age: "",
            role: "",
          };
        }
      },
    },
  },
  methods: {
    submitForm() {
      // Passa os dados do formulário de volta para a função onSave
      this.onSave({
        ...this.user,   // se for edição, preserva ID e demais campos
        ...this.formData
      });
    },
  },
};
</script>
