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
          <input v-model="searchQuery" type="text"
            class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for tickets" />
        </div>

        <!-- Botão para criar novo Ticket -->
        <button @click="openCreateModal"
          class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 mt-5 m-4"
          role="button">
          New Ticket
        </button>
      </div>

      <!-- Tabela de Tickets -->
      <BaseTable :columns="columns" :rows="filteredTickets" @editItem="handleEditTicket"
        @deleteItem="handleDeleteTicket" />
    </div>
  </main>

  <!-- Modal de Criar/Editar Ticket -->
  <TicketForm :isOpen="modalOpen" :onClose="closeModal" :onSave="saveTicket" :ticket="selectedTicket"
    :mode="modalMode" />
</template>

<script>
import { ref, computed } from "vue";
import HeaderA from "@/components/HeaderA.vue";
import BaseTable from "@/components/ui/baseTable.vue";

// Importe o TicketForm (adaptado do seu ProductModal)
import TicketForm from "@/components/ui/TicketModal.vue";
// Importe a store de tickets
import { useTicketsStore } from "@/stores/tickets";

export default {
  name: "TicketView",
  components: {
    HeaderA,
    BaseTable,
    TicketForm,
  },
  setup() {
    // Acesse a store de tickets
    const ticketsStore = useTicketsStore();

    // Controle de Sidebar (se houver)
    const sidebarOpen = false;

    // Controle do Modal
    const modalOpen = ref(false);
    const modalMode = ref("create"); // "create" ou "edit"
    const selectedTicket = ref(null);

    // Campo de busca
    const searchQuery = ref("");

    // Prepara dados para a tabela (podemos formatar se quisermos)
    const tickets = computed(() =>
      ticketsStore.tickets.map((ticket) => ({
        id: ticket.id,
        name: ticket.name,
        description: ticket.description,
        price: `${ticket.price}€`,
        benefits: ticket.benefits.join(", "),
        purchased: ticket.purchased.length,
        action: "",
      }))
    );

    // Filtro de busca no campo "name"
    const filteredTickets = computed(() => {
      if (!searchQuery.value) return tickets.value;
      return tickets.value.filter((ticket) =>
        ticket.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    // Define as colunas da tabela
    const columns = [
      { label: "ID", field: "id" },
      { label: "Name", field: "name" },
      { label: "Description", field: "description" },
      { label: "Price", field: "price" },
      { label: "Benefits", field: "benefits" },
      { label: "Purchased", field: "purchased" },
      { label: "Action", field: "action" },
    ];

    // Abre modal para criar
    const openCreateModal = () => {
      selectedTicket.value = null;
      modalMode.value = "create";
      modalOpen.value = true;
    };

    // Fecha modal
    const closeModal = () => {
      modalOpen.value = false;
    };

    // Salva ticket (criar ou editar)
    const saveTicket = (ticketData) => {
      if (modalMode.value === "create") {
        ticketsStore.addItem(ticketData);
      } else {
        ticketsStore.updateItem(ticketData);
      }
      closeModal();
    };

    // Edita um ticket
    const handleEditTicket = (row) => {
      const ticketFromStore = ticketsStore.tickets.find((t) => t.id === row.id);
      selectedTicket.value = { ...ticketFromStore };
      modalMode.value = "edit";
      modalOpen.value = true;
    };

    // Deleta um ticket
    const handleDeleteTicket = (row) => {
      if (confirm(`Are you sure you want to delete: ${row.name}?`)) {
        ticketsStore.removeItem(row.id);
      }
    };

    return {
      sidebarOpen,
      columns,
      tickets,
      filteredTickets,
      searchQuery,
      modalOpen,
      modalMode,
      selectedTicket,
      openCreateModal,
      closeModal,
      saveTicket,
      handleEditTicket,
      handleDeleteTicket,
    };
  },
};
</script>
