<template>
  <HeaderA />
  <!-- Page Content -->
  <main :class="{ 'ml-64': sidebarOpen, 'ml-0': !sidebarOpen }"
    class="flex-1 flex items-center justify-center mt-12 transition-all duration-300">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full mx-6 sm:ml-72 mr-12">
      <div class="flex items-center justify-between flex-col md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
        <!-- Search Input -->
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input v-model="searchQuery" type="text" id="table-search-users"
            class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for users" />
        </div>

        <!-- Add User Button -->
        <button @click="openAddModal"
          class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 mt-5 m-4">
          Add User
        </button>
      </div>

      <!-- Tabela -->
      <BaseTable :columns="columns" :rows="filteredUsers" @editItem="handleEditUser" @deleteItem="handleDeleteUser" />
    </div>
  </main>

  <!-- Modal para criar ou editar user -->
  <Modal :isOpen="modalOpen" :onClose="closeModal" :onSave="saveUser" :user="selectedUser" :mode="modalMode" />
</template>

<script>
import { ref, computed, onMounted } from "vue";
import HeaderA from "@/components/HeaderA.vue";
import BaseTable from "@/components/ui/baseTable.vue";
import Modal from "@/components/ui/UserModal.vue";
import { useUsersStore } from "@/stores/users";

export default {
  components: {
    HeaderA,
    BaseTable,
    Modal,
  },
  setup() {
    const usersStore = useUsersStore();

    // Controles do modal
    const modalOpen = ref(false);
    const modalMode = ref("create"); // "create" ou "edit"
    const selectedUser = ref(null);

    // Controle da pesquisa
    const searchQuery = ref("");

    // Computed para lista de users formatada
    const users = computed(() =>
      usersStore.users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        age: user.age,
        role: user.role,
        ticket: user.ticket || "No Ticket",
        action: "",
      }))
    );

    // Computed para filtro
    const filteredUsers = computed(() => {
      if (!searchQuery.value) return users.value;
      return users.value.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    // Carregar users ao montar
    onMounted(async () => {
      if (!usersStore.users.length) {
        await usersStore.fetchUsers();
      }
    });

    // Abrir modal para CRIAR
    const openAddModal = () => {
      selectedUser.value = null;
      modalMode.value = "create";
      modalOpen.value = true;
    };

    // Fechar modal
    const closeModal = () => {
      modalOpen.value = false;
    };

    // Salvar user (tanto create quanto edit)
    const saveUser = async (userData) => {
      try {
        if (modalMode.value === "create") {
          // Criando novo user
          await usersStore.addUser(userData);
        } else {
          // Editando user existente
          await usersStore.updateUser(userData);
        }
      } catch (error) {
        console.error("Erro ao salvar utilizador:", error);
      }
      closeModal();
    };

    // Editar user (acionado pelo botão Edit na tabela)
    const handleEditUser = (row) => {
      selectedUser.value = { ...row }; // faz uma cópia para edição
      modalMode.value = "edit";
      modalOpen.value = true;
    };

    // Excluir user (acionado pelo botão Delete na tabela)
    const handleDeleteUser = async (row) => {
      try {
        // Exemplo de confirmação
        if (confirm(`Are you sure you want to delete ${row.name}?`)) {
          await usersStore.removeUser(row.id);
        }
      } catch (error) {
        console.error("Erro ao excluir utilizador:", error);
      }
    };

    // Definição das colunas da tabela
    const columns = [
      { label: "ID", field: "id" },
      { label: "Name", field: "name" },
      { label: "Email", field: "email" },
      { label: "Password", field: "password" },
      { label: "age", field: "age" },
      { label: "User role", field: "role" },
      { label: "Ticket", field: "ticket" },
      { label: "Action", field: "action" },
    ];

    return {
      columns,
      users,
      filteredUsers,
      searchQuery,
      modalOpen,
      modalMode,
      selectedUser,
      openAddModal,
      closeModal,
      saveUser,
      handleEditUser,
      handleDeleteUser,
    };
  },
};
</script>
