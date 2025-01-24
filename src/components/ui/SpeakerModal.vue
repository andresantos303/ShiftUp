<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
      <!-- Título dinâmico: "Add New Speaker" ou "Edit Speaker" -->
      <h2 class="text-xl font-semibold mb-4">
        {{ mode === "create" ? "Add New Speaker" : "Edit Speaker" }}
      </h2>

      <form @submit.prevent="submitForm">
        <!-- Nome do Speaker -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2"
            >Name</label
          >
          <input
            id="name"
            v-model="newSpeaker.name"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter speaker name"
            required
          />
        </div>

        <!-- Bio do Speaker -->
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-2"
            >Description</label
          >
          <textarea
            id="description"
            v-model="newSpeaker.description"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter speaker description"
            rows="3"
            required
          ></textarea>
        </div>

        <!-- Empresa ou Organização do Speaker (opcional) -->
        <div class="mb-4">
          <label for="job" class="block text-sm font-medium text-gray-700 mb-2"
            >Job</label
          >
          <input
            id="job"
            v-model="newSpeaker.job"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter Job"
          />
        </div>

        <!-- Imagem do Speaker (opcional) -->
        <div class="mb-4">
          <label for="image" class="block text-sm font-medium text-gray-700 mb-2"
            >Speaker Image</label
          >
          <input
            id="image"
            type="file"
            accept="image/*"
            @change="handleImageUpload"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <!-- Exibe a imagem após o upload ou do speaker já existente -->
          <div v-if="imagePreview" class="mt-4">
            <img
              :src="imagePreview"
              alt="Image Preview"
              class="w-32 h-32 object-cover rounded-md"
            />
          </div>
        </div>

        <!-- Botões de ação -->
        <div class="flex justify-between">
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
            {{ mode === "create" ? "Save Speaker" : "Update Speaker" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpeakerModal",
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
    // Função chamada ao salvar ou atualizar o speaker
    onSave: {
      type: Function,
      required: true,
    },
    // Speaker que pode ser passado para edição
    speaker: {
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
      newSpeaker: {
        id: null,
        name: "",
        description: "",
        job: "",
        image: null, // se quiser armazenar a referência do arquivo
      },
      imagePreview: null,
    };
  },
  watch: {
    // Sempre que 'speaker' mudar, ou ao montar (immediate: true),
    // carregamos os dados caso seja edição
    speaker: {
      immediate: true,
      handler(newVal) {
        if (newVal && this.mode === "edit") {
          // Popular 'newSpeaker' com os dados existentes
          this.newSpeaker = {
            id: newVal.id ?? null,
            name: newVal.name ?? "",
            description: newVal.description ?? "",
            job: newVal.job ?? "",
            image: newVal.image || null,
          };

          // Se 'newVal.image' for string (URL), exibe na preview
          if (typeof newVal.image === "string") {
            this.imagePreview = newVal.image;
          } else if (newVal.image instanceof File) {
            this.imagePreview = URL.createObjectURL(newVal.image);
          } else {
            this.imagePreview = null;
          }
        } else {
          // Se não há speaker ou estamos criando, reseta o formulário
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
      // Verificação simples: campos obrigatórios preenchidos
      if (this.newSpeaker.name && this.newSpeaker.bio) {
        // Se estamos criando e não foi atribuído um id, cria um
        if (this.mode === "create" && !this.newSpeaker.id) {
          this.newSpeaker.id = Date.now();
        }

        // Chama a função onSave, enviando o speaker atualizado/criado
        this.onSave(this.newSpeaker);

        // Reseta o formulário e fecha
        this.resetForm();
        this.closeModal();
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.newSpeaker.image = file;
        this.imagePreview = URL.createObjectURL(file);
      }
    },
    resetForm() {
      this.newSpeaker = {
        id: null,
        name: "",
        description: "",
        job: "",
        image: null,
      };
      this.imagePreview = null;
    },
  },
};
</script>
