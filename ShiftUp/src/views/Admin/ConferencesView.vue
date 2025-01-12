<template>
    <HeaderA />
    <!-- Page Content -->
    <main
      :class="{ 'ml-64': sidebarOpen, 'ml-0': !sidebarOpen }"
      class="flex-1 flex items-center justify-center mt-12 transition-all duration-300"
    >
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full mx-6 sm:ml-72 mr-12">
        <div
          class="flex items-center justify-between flex-col md:flex-row space-y-4 md:space-y-0 pb-4 bg-white"
        >
          <!-- Search Input -->
          <div class="relative">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            >
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
              v-model="searchQuery"
              type="text"
              id="table-search-conferences"
              class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by title"
            />
          </div>
  
          <!-- Add Conference Button -->
          <button
            @click="openModal"
            class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 mt-5 m-4"
          >
            Add Conference
          </button>
        </div>
  
        <!-- Tabela de Conferências -->
        <BaseTable :columns="columns" :rows="filteredConferences" />
      </div>
    </main>
  
    <!-- Modal para adicionar uma nova conferência -->
    <Modal :isOpen="modalOpen" :onClose="closeModal" :onSave="addConference" />
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { useConferencesStore } from "@/stores/conferences";
  import HeaderA from "@/components/HeaderA.vue";
  import BaseTable from "@/components/ui/baseTable.vue";
  import Modal from "@/components/ui/Modal.vue";
  
  // Sidebar de exemplo (se estiver usando no layout)
  const sidebarOpen = ref(false);
  
  // Instanciando a store de conferências
  const conferencesStore = useConferencesStore();
  
  // Controle do modal
  const modalOpen = ref(false);
  
  // Campo de busca
  const searchQuery = ref("");
  
  // Campos para a tabela
  // Você pode alterar, remover ou adicionar colunas conforme a necessidade
  const columns = [
    { label: "ID", field: "id" },
    { label: "Title", field: "title" },
    { label: "Local", field: "local" },
    { label: "Date", field: "date" },
    { label: "Time", field: "time" },
    { label: "Action", field: "action" },
  ];
  
  // Montamos a lista de conferências em um formato amigável à tabela
  const conferences = computed(() =>
    conferencesStore.conferences.map((conf) => ({
      id: conf.id,
      title: conf.title,
      local: conf.local,
      date: conf.date,
      time: conf.time,
      action: "Edit",
    }))
  );
  
  // Filtro por título
  const filteredConferences = computed(() => {
    if (!searchQuery.value) return conferences.value;
    return conferences.value.filter((c) =>
      c.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  // Abrir modal
  const openModal = () => {
    modalOpen.value = true;
  };
  
  // Fechar modal
  const closeModal = () => {
    modalOpen.value = false;
  };
  
  // Guarda uma nova conferência
  const addConference = (newConf) => {
    if (newConf.title && newConf.local && newConf.date && newConf.time) {
      const conferenceToAdd = {
        id: Date.now(),
        title: newConf.title,
        speakers: newConf.speakers || [],
        description: newConf.description || "",
        local: newConf.local,
        category: newConf.category || "Main Stage",
        date: newConf.date,
        time: newConf.time,
        participants: [],
      };
  
      conferencesStore.addConference(conferenceToAdd);
    }
    closeModal();
  };
  
  </script>
  