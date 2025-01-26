<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
      <!-- Título dinâmico: "Add New Ticket" ou "Edit Ticket" -->
      <h2 class="text-xl font-semibold mb-4">
        {{ mode === "create" ? "Add New Ticket" : "Edit Ticket" }}
      </h2>

      <form @submit.prevent="submitForm">
        <!-- Nome do Ticket -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2"
            >Ticket Name</label
          >
          <input
            id="name"
            v-model="newTicket.name"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter ticket name"
            required
          />
        </div>

        <!-- Descrição do Ticket -->
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-2"
            >Description</label
          >
          <textarea
            id="description"
            v-model="newTicket.description"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter ticket description"
            rows="3"
            required
          ></textarea>
        </div>

        <!-- Preço do Ticket -->
        <div class="mb-4">
          <label for="price" class="block text-sm font-medium text-gray-700 mb-2"
            >Price</label
          >
          <input
            id="price"
            v-model="newTicket.price"
            type="number"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter ticket price"
            required
          />
        </div>

        <!-- Benefícios do Ticket -->
        <div class="mb-4">
          <label for="benefits" class="block text-sm font-medium text-gray-700 mb-2"
            >Benefits (comma-separated)</label
          >
          <input
            id="benefits"
            v-model="benefitsInput"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter benefits separated by commas"
          />
          <p class="text-sm text-gray-500 mt-1">
            Exemplo: "Priority seating,No setup fees,Exclusive sessions"
          </p>
        </div>

        <div class="flex justify-between mt-6">
          <button
            type="button"
            @click="closeModal"
            class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium rounded-lg text-sm px-4 py-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm px-4 py-2"
          >
            {{ mode === "create" ? "Save Ticket" : "Update Ticket" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "TicketForm",
  props: {
    // Controla se o modal está aberto
    isOpen: {
      type: Boolean,
      default: false,
    },
    // Função para fechar o modal (passada pelo componente pai)
    onClose: {
      type: Function,
      required: true,
    },
    // Função chamada ao guardar ou atualizar o ticket
    onSave: {
      type: Function,
      required: true,
    },
    // Ticket que pode ser passado para edição
    ticket: {
      type: Object,
      default: null,
    },
    // "create" ou "edit"
    mode: {
      type: String,
      default: "create",
    },
  },
  data() {
    return {
      newTicket: {
        id: null,
        name: "",
        description: "",
        price: "",
        benefits: [],
        purchased: []
      },
      // Usamos benefitsInput como string auxiliar para manipular
      // benefícios via campo de texto (separados por vírgula).
      benefitsInput: "",
    };
  },
  watch: {
    // Quando 'ticket' mudar ou ao montar (immediate: true), carregar dados se for edição
    ticket: {
      immediate: true,
      handler(newVal) {
        if (newVal && this.mode === "edit") {
          this.newTicket = {
            id: newVal.id ?? null,
            name: newVal.name ?? "",
            description: newVal.description ?? "",
            price: newVal.price ?? "",
            benefits: newVal.benefits ?? [],
            purchased: newVal.purchased ?? []
          };
          // Passa o array de benefícios para a string separada por vírgula
          this.benefitsInput = this.newTicket.benefits.join(",");
        } else {
          // Se não há ticket ou estamos criando, reseta o formulário
          this.resetForm();
        }
      },
    },
  },
  methods: {
    closeModal() {
      this.onClose();
    },
    submitForm() {
      // Validação simples: checa se os campos obrigatórios estão preenchidos
      if (this.newTicket.name && this.newTicket.description && this.newTicket.price !== "") 
      {
        // Se estamos criando e não foi atribuído um id, cria um
        if (this.mode === "create" && !this.newTicket.id) {
          this.newTicket.id = Date.now();
        }

        // Atualiza o array de benefícios com base no campo de texto
        this.newTicket.benefits = this.benefitsInput
          ? this.benefitsInput.split(",").map((benefit) => benefit.trim())
          : [];

        // Chama a função onSave, enviando o ticket atualizado/criado
        this.onSave(this.newTicket);

        // Reseta o formulário e fecha
        this.resetForm();
        this.closeModal();
      }
    },
    resetForm() {
      this.newTicket = {
        id: null,
        name: "",
        description: "",
        price: "",
        benefits: [],
        purchased: []
      };
      this.benefitsInput = "";
    },
  },
};
</script>
