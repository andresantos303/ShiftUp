<template>
  <HeaderA />
  <!-- Page Content -->
  <main :class="{'ml-64': sidebarOpen, 'ml-0': !sidebarOpen}" class="flex-1 flex items-center justify-center mt-12 transition-all duration-300">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full mx-6 sm:ml-72 mr-12 mb-12">
      <div class="flex items-center justify-between flex-col md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
        <!-- Search Input -->
        <div class="relative">
          <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="text" id="table-search-speakers" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for speakers" />
        </div>
        <!-- Add Speaker Button -->
        <button @click="openModal" class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 mt-5 m-4">Add Speaker</button>
      </div>

      <!-- BaseTable Component -->
      <BaseTable :columns="columns" :rows="rows" />
    </div>
  </main>

  <!-- Modal Component for Adding Speaker -->
  <Modal :isOpen="modalOpen" :onClose="closeModal" :onSave="addSpeaker" />
</template>

<script>
import HeaderA from "@/components/HeaderA.vue";
import BaseTable from "@/components/ui/baseTable.vue";
import Modal from "@/components/ui/Modal.vue";
import { useSpeakersStore } from "@/stores/speakers"; // Store para palestrantes
import { computed, ref } from "vue";

export default {
  components: {
    HeaderA,
    BaseTable,
    Modal, // Modal para adicionar palestrantes
  },
  setup() {
    const speakersStore = useSpeakersStore();
    const modalOpen = ref(false); // Controla a visibilidade do modal

    // Computed para pegar os palestrantes da store
    const rows = computed(() => 
      speakersStore.speakers.map((speaker) => ({
        id: speaker.id,
        name: speaker.name,
        email: speaker.email,
        topic: speaker.topic,
        date: speaker.date,
        status: speaker.status,
        action: "Edit",
      }))
    );

    // Função para abrir o modal
    const openModal = () => {
      modalOpen.value = true;
    };

    // Função para fechar o modal
    const closeModal = () => {
      modalOpen.value = false;
    };

    // Função para adicionar um novo palestrante
    const addSpeaker = (newSpeaker) => {
      if (newSpeaker.name && newSpeaker.email && newSpeaker.topic && newSpeaker.date && newSpeaker.status) {
        // Adiciona o palestrante à store
        speakersStore.addSpeaker(newSpeaker);
      }
      closeModal(); // Fecha o modal após adicionar
    };

    return {
      columns: [
        { label: "ID", field: "id" },
        { label: "Name", field: "name" },
        { label: "Email", field: "email" },
        { label: "Topic", field: "topic" },
        { label: "Date", field: "date" },
        { label: "Status", field: "status" },
        { label: "Action", field: "action" },
      ],
      rows,
      modalOpen,
      openModal,
      closeModal,
      addSpeaker,
    };
  },
};
</script>

<style scoped>
/* Custom styles here */
</style>
