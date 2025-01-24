<template>
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
        <!-- Título dinâmico: "Add New Product" ou "Edit Product" -->
        <h2 class="text-xl font-semibold mb-4">
          {{ mode === "create" ? "Add New Product" : "Edit Product" }}
        </h2>
  
        <form @submit.prevent="submitForm">
          <!-- Nome do Produto -->
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2"
              >Product Name</label
            >
            <input
              id="name"
              v-model="newProduct.name"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter product name"
              required
            />
          </div>
  
          <!-- Preço do Produto -->
          <div class="mb-4">
            <label for="price" class="block text-sm font-medium text-gray-700 mb-2"
              >Price</label
            >
            <input
              id="price"
              v-model="newProduct.price"
              type="number"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter product price"
              required
            />
          </div>
  
          <!-- Categoria do Produto -->
          <div class="mb-4">
            <label for="category" class="block text-sm font-medium text-gray-700 mb-2"
              >Category</label
            >
            <input
              id="category"
              v-model="newProduct.category"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter product category"
              required
            />
          </div>
  
          <!-- Quantidade Comprada -->
          <div class="mb-4">
            <label for="purchased" class="block text-sm font-medium text-gray-700 mb-2"
              >Purchased Quantity</label
            >
            <input
              id="purchased"
              v-model="newProduct.purchased"
              type="number"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter purchased quantity"
              required
            />
          </div>
  
          <!-- Imagem do Produto -->
          <div class="mb-4">
            <label for="image" class="block text-sm font-medium text-gray-700 mb-2"
              >Product Image</label
            >
            <input
              id="image"
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <!-- Exibe a imagem após o upload ou do produto já existente -->
            <div v-if="imagePreview" class="mt-4">
              <img
                :src="imagePreview"
                alt="Image Preview"
                class="w-32 h-32 object-cover rounded-md"
              />
            </div>
          </div>
  
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
              {{ mode === "create" ? "Save Product" : "Update Product" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProductForm",
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
      // Função chamada ao salvar ou atualizar o produto
      onSave: {
        type: Function,
        required: true,
      },
      // Produto que pode ser passado para edição
      product: {
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
        newProduct: {
          id: null,
          name: "",
          price: "",
          category: "",
          purchased: 0,
          image: null,
        },
        imagePreview: null,
      };
    },
    watch: {
      // Sempre que 'product' mudar, ou ao montar (immediate: true),
      // carregamos os dados de produto, caso estejamos em modo edição.
      product: {
        immediate: true,
        handler(newVal) {
          if (newVal && this.mode === "edit") {
            // Popular 'newProduct' com os dados existentes
            this.newProduct = {
              id: newVal.id ?? null,
              name: newVal.name ?? "",
              price: newVal.price ?? "",
              category: newVal.category ?? "",
              purchased: newVal.purchased ?? 0,
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
            // Se não há produto ou estamos criando, reseta o formulário
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
        if (this.newProduct.name && this.newProduct.price && this.newProduct.category && this.newProduct.purchased !== null) 
        {
          // Se estamos criando e não foi atribuído um id, cria um
          if (this.mode === "create" && !this.newProduct.id) {
            this.newProduct.id = Date.now();
          }
  
          // Chama a função onSave, enviando o produto atualizado/criado
          this.onSave(this.newProduct);
  
          // Reseta o formulário e fecha
          this.resetForm();
          this.closeModal();
        }
      },
      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
          this.newProduct.image = file;
          this.imagePreview = URL.createObjectURL(file);
        }
      },
      resetForm() {
        this.newProduct = {
          id: null,
          name: "",
          price: "",
          category: "",
          purchased: 0,
          image: null,
        };
        this.imagePreview = null;
      },
    },
  };
  </script>
  