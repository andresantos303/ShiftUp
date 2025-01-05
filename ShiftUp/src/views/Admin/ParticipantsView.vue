<template>
  <HeaderA />
  <!-- Page Content -->
  <main :class="{ 'ml-64': sidebarOpen, 'ml-0': !sidebarOpen }"
    class="flex-1 flex items-center justify-center mt-12 transition-all duration-300">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full mx-6 sm:ml-72 mr-12">
      <div class="flex items-center justify-between flex-col md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
        <!-- Search Input -->
        <div class="relative">
          <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input role="text" id="table-search-users"
            class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for users" />
        </div>
      </div>

      <BaseTable :columns="columns" :rows="users" />
    </div>
  </main>
</template>

<script>
import HeaderA from "@/components/HeaderA.vue";
import BaseTable from "@/components/ui/baseTable.vue";
import { useUsersStore } from "@/stores/users";
import { computed } from "vue";

export default {
  components: {
    HeaderA,
    BaseTable,
  },
  setup() {
    const usersStore = useUsersStore();

    const users = computed(() =>
      usersStore.users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        ticket: user.ticket || "No Ticket",
        action: "Edit",
      }))
    );

    return {
      columns: [
        { label: "ID", field: "id" },
        { label: "Name", field: "name" },
        { label: "Email", field: "email" },
        { label: "User role", field: "role" },
        { label: "Ticket", field: "ticket" },
        { label: "Action", field: "action" },
      ],
      users,
    };
  },
};
</script>
