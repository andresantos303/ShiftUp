<template>
  <HeaderA />
  <!-- Page Content -->
  <main :class="{ 'ml-64': sidebarOpen, 'ml-0': !sidebarOpen }"
    class="flex-1 flex items-center justify-center mt-12 transition-all duration-300">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full mx-6 sm:ml-72 mr-12 mb-12">
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
          <input v-model="searchQuery" type="text" id="table-search-speakers"
            class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for speakers" />
        </div>
        <!-- Add Speaker Button -->
        <button @click="openModal"
          class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 mt-5 m-4">
          Add Speaker
        </button>
      </div>

      <!-- BaseTable Component -->
      <BaseTable :columns="columns" :rows="filteredRows" @editItem="handleEditSpeaker"
        @deleteItem="handleDeleteSpeaker" />
    </div>
  </main>

  <!-- Modal Component for Adding/Editing Speaker -->
  <SpeakerModal :isOpen="modalOpen" :onClose="closeModal" :onSave="saveSpeaker" :speaker="selectedSpeaker"
    :mode="modalMode" />
</template>

<script>
import { ref, computed, onMounted } from "vue";
import HeaderA from "@/components/HeaderA.vue";
import BaseTable from "@/components/ui/baseTable.vue";
import SpeakerModal from "@/components/ui/SpeakerModal.vue";
import { useSpeakersStore } from "@/stores/speakers";

export default {
  name: "SpeakersView",
  components: {
    HeaderA,
    BaseTable,
    SpeakerModal,
  },
  setup() {
    const speakersStore = useSpeakersStore();

    // Controla o estado do sidebar (caso exista)
    const sidebarOpen = false;

    // Controla a visibilidade do modal
    const modalOpen = ref(false);
    // Controla se estamos criando ou editando
    const modalMode = ref("create"); // "create" ou "edit"
    // Armazena o palestrante selecionado para edição
    const selectedSpeaker = ref(null);

    // Campo de busca
    const searchQuery = ref("");

    // Ao montar, carregamos os speakers caso ainda não tenhamos nada na store
    onMounted(async () => {
      if (!speakersStore.speakers.length) {
        await speakersStore.fetchTodos();
      }
    });

    // Gera as linhas (rows) da tabela a partir da store
    const rows = computed(() =>
      speakersStore.speakers.map((speaker) => ({
        id: speaker.id,
        name: speaker.name,
        job: speaker.job,
        description: speaker.description,
      }))
    );

    // Filtra as linhas de acordo com a busca por nome
    const filteredRows = computed(() => {
      if (!searchQuery.value) return rows.value;
      return rows.value.filter((row) =>
        row.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    // Colunas da tabela
    const columns = [
      { label: "ID", field: "id" },
      { label: "Name", field: "name" },
      { label: "Job", field: "job" },
      { label: "Description", field: "description" },
      { label: "Action", field: "action" },
    ];

    // Abre o modal para criar
    const openModal = () => {
      selectedSpeaker.value = null;
      modalMode.value = "create";
      modalOpen.value = true;
    };

    // Fecha o modal
    const closeModal = () => {
      modalOpen.value = false;
    };

    // Salva speaker (criar ou editar)
    const saveSpeaker = async (speakerData) => {
      // Checa se estamos criando ou editando
      if (modalMode.value === "create") {
        await speakersStore.addSpeaker(speakerData);
      } else {
        await speakersStore.updateSpeaker(speakerData);
      }
      closeModal();
    };

    // Editar speaker: recebe a linha clicada no BaseTable
    const handleEditSpeaker = (row) => {
      // Busca o registro completo na store
      const speakerFromStore = speakersStore.speakers.find(
        (s) => s.id === row.id
      );
      // Seta o palestrante selecionado e muda o modo para edit
      selectedSpeaker.value = { ...speakerFromStore };
      modalMode.value = "edit";
      modalOpen.value = true;
    };

    // Deletar speaker: recebe a linha clicada no BaseTable
    const handleDeleteSpeaker = async (row) => {
      if (confirm(`Are you sure you want to delete ${row.name}?`)) {
        try {
          await speakersStore.removeSpeaker(row.id);
        } catch (error) {
          console.error("Erro ao remover palestrante:", error);
        }
      }
    };

    return {
      sidebarOpen,
      columns,
      rows,
      filteredRows,
      searchQuery,
      modalOpen,
      modalMode,
      selectedSpeaker,
      openModal,
      closeModal,
      saveSpeaker,
      handleEditSpeaker,
      handleDeleteSpeaker,
    };
  },
};
</script>
