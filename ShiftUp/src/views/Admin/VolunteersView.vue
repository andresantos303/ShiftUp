<template>
  <HeaderA />
  <!-- Page Content -->
  <main :class="{'ml-64': sidebarOpen, 'ml-0': !sidebarOpen}" class="flex-1 flex items-center justify-center mt-12 transition-all duration-300">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full mx-6 sm:ml-72 mr-12">
      <div class="flex items-center justify-between flex-col md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
        <!-- Dropdown Button -->
        <div>
          <button
            id="dropdownActionButton"
            data-dropdown-toggle="dropdownAction"
            class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
            type="button">
            <span class="sr-only">Action button</span> Action
            <svg
              class="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6" >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <!-- Dropdown menu -->
          <div
            id="dropdownAction"
            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
          >
            <ul class="py-1 text-sm text-gray-700">
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100"
                  >Reward</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100"
                  >Promote</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100"
                  >Activate account</a
                >
              </li>
            </ul>
            <div class="py-1">
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >Delete Volunteer</a
              >
            </div>
          </div>
        </div>

        <!-- Search Input -->
        <div class="relative">
          <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-volunteers"
            class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for volunteers"
          />
        </div>
      </div>

      <!-- BaseTable Component -->
      <BaseTable :columns="columns" :rows="rows" />
    </div>
  </main>
</template>

<script>
import HeaderA from "@/components/HeaderA.vue";
import BaseTable from "@/components/ui/baseTable.vue";

export default {
  components: {
    HeaderA,
    BaseTable,
  },
  data() {
    return {
      // Definindo as colunas da tabela para voluntários
      columns: [
        { label: 'ID', field: 'id' },
        { label: 'Name', field: 'name' },
        { label: 'Email', field: 'email' },
        { label: 'Sign-up Date', field: 'signupDate' },
        { label: 'Role', field: 'role' },
        { label: 'Status', field: 'status' },
        { label: 'Action', field: 'action' },
      ],
      // Definindo as linhas de dados para voluntários
      rows: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', signupDate: '2024-11-10', role: 'Event Organizer', status: 'Active', action: 'Edit' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', signupDate: '2024-11-12', role: 'Helper', status: 'Pending', action: 'Edit' },
        { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', signupDate: '2024-11-14', role: 'Logistics', status: 'Inactive', action: 'Edit' },
        { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com', signupDate: '2024-11-15', role: 'Volunteer', status: 'Active', action: 'Edit' },
        { id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com', signupDate: '2024-11-18', role: 'Helper', status: 'Pending', action: 'Edit' },
        // Adicione mais voluntários conforme necessário
      ],
    };
  },
};
</script>

<style>
/* Você pode adicionar estilos personalizados aqui, se necessário */
</style>
