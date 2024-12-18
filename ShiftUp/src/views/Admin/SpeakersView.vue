<template>
  <HeaderA />
  <!-- Page Content -->
  <main :class="{'ml-64': sidebarOpen, 'ml-0': !sidebarOpen}" class="flex-1 flex items-center justify-center mt-12 transition-all duration-300">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full mx-6 sm:ml-72 mr-12">
      <div class="flex items-center justify-between flex-col md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
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
            id="table-search-speakers"
            class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for speakers"
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
      // Defining columns for the speakers table
      columns: [
        { label: 'ID', field: 'id' },
        { label: 'Speaker Name', field: 'name' },
        { label: 'Email', field: 'email' },
        { label: 'Topic', field: 'topic' },
        { label: 'Date', field: 'date' },
        { label: 'Status', field: 'status' },
        { label: 'Action', field: 'action' },
      ],
      // Defining rows for speakers
      rows: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', topic: 'Tech Innovations', date: '2024-12-15', status: 'Confirmed', action: 'Edit' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', topic: 'Future of AI', date: '2024-12-16', status: 'Pending', action: 'Edit' },
        { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', topic: 'Blockchain Technology', date: '2024-12-17', status: 'Confirmed', action: 'Edit' },
        { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com', topic: 'Cybersecurity Trends', date: '2024-12-18', status: 'Rejected', action: 'Edit' },
        { id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com', topic: 'Sustainable Technologies', date: '2024-12-19', status: 'Confirmed', action: 'Edit' },
        // Add more speakers as necessary
      ],
    };
  },
};
</script>

<style>
/* Add custom styles here if necessary */
</style>
