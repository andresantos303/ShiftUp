<script>
import HeaderP from "../../components/HeaderP.vue";

export default {
  components: {
    HeaderP,
  },
  data() {
    return {
      communications: [
        {
          id: 1,
          title: "Event Reminder",
          preview: "Don't forget about the conference tomorrow...",
          content: "This is a detailed email about the conference tomorrow. Here are all the details...",
        },
        {
          id: 2,
          title: "Welcome Email",
          preview: "Welcome to the event!",
          content: "Thank you for signing up for the event. We are excited to have you...",
        },
        {
          id: 3,
          title: "Thank You Email",
          preview: "Thank you for attending...",
          content: "We appreciate your participation in the event. Here's a summary of the conference...",
        },
      ],
      selectedCommunication: null,
    };
  },
  methods: {
    selectCommunication(communication) {
      this.selectedCommunication = communication;
    },
  },
};
</script>

<template>
  <HeaderP />
  <div class="flex h-screen pl-[248px] pt-4">
    <!-- Sidebar: List of Communications -->
    <div class="w-1/4 bg-gray-100 border-r border-gray-200 overflow-y-auto p-4">
      <h2 class="text-lg font-semibold mb-4">Communications</h2>
      <div v-for="communication in communications" :key="communication.id" @click="selectCommunication(communication)"
        :class="[
          'p-4 mb-2 rounded-lg cursor-pointer border',
          selectedCommunication && selectedCommunication.id === communication.id
            ? 'bg-[#cdcfeb] border-[#4B58FD]'
            : 'bg-white border-gray-200 hover:bg-gray-50',
        ]">
        <h3 class="font-medium text-gray-800">{{ communication.title }}</h3>
        <p class="text-sm text-gray-600 mt-1">{{ communication.preview }}</p>
      </div>
    </div>

    <!-- Main Content: Selected Communication -->
    <div class="flex-1 p-6">
      <div v-if="selectedCommunication" class="bg-white shadow-md rounded-lg p-6">
        <h1 class="text-2xl font-bold mb-4">{{ selectedCommunication.title }}</h1>
        <p class="text-gray-700">{{ selectedCommunication.content }}</p>
      </div>
      <div v-else class="flex items-center justify-center h-full text-gray-500">
        <p>Select a communication to view details.</p>
      </div>
    </div>
  </div>
</template>

<style>
/* Optional: Smooth hover effects for the sidebar cards */
.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}
</style>
