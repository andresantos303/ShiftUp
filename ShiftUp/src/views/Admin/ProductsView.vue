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
          <input v-model="searchQuery" type="text" id="table-search-products"
            class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for products" />
        </div>

        <!-- Botão para criar novo Produto -->
        <button @click="openCreateModal"
          class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 mt-5 m-4"
          role="button">
          New Product
        </button>
      </div>

      <!-- Tabela de Produtos -->
      <BaseTable :columns="columns" :rows="filteredProducts" @editItem="handleEditProduct"
        @deleteItem="handleDeleteProduct" />
    </div>
  </main>

  <!-- Modal de Criar/Editar Produto -->
  <Modal :isOpen="modalOpen" :onClose="closeModal" :onSave="saveProduct" :product="selectedProduct" :mode="modalMode" />
</template>

<script>
import HeaderA from "@/components/HeaderA.vue";
import BaseTable from "@/components/ui/baseTable.vue";
import Modal from "@/components/ui/ProductModal.vue"; // Certifique-se do caminho correto
import { useProductsStore } from "@/stores/products";
import { computed, ref, onMounted } from "vue";

export default {
  components: {
    HeaderA,
    BaseTable,
    Modal,
  },
  setup() {
    const productsStore = useProductsStore();

    // Controla o estado do modal
    const modalOpen = ref(false);
    const modalMode = ref("create"); // "create" ou "edit"
    const selectedProduct = ref(null);

    // Controle da pesquisa
    const searchQuery = ref("");


    // Lista de produtos formatada para a tabela
    const products = computed(() =>
      productsStore.products.map((product) => ({
        id: product.id,
        name: product.name,
        price: `${product.price}€`,
        category: product.category,
        purchased: product.purchased,
        image: product.image,
        action: "",
      }))
    );

    // Filtro para a busca
    const filteredProducts = computed(() => {
      if (!searchQuery.value) return products.value;
      return products.value.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    // Colunas da tabela
    const columns = [
      { label: "ID", field: "id" },
      { label: "Name", field: "name" },
      { label: "Price", field: "price" },
      { label: "Category", field: "category" },
      { label: "Purchased", field: "purchased" },
      { label: "Image", field: "image" },
      { label: "Action", field: "action" },
    ];

    // Abre modal para CRIAR
    const openCreateModal = () => {
      selectedProduct.value = null; // sem produto selecionado
      modalMode.value = "create";
      modalOpen.value = true;
    };

    // Fecha modal
    const closeModal = () => {
      modalOpen.value = false;
    };

    // Salva produto (criar ou editar)
    const saveProduct = async (productData) => {
      try {
        if (modalMode.value === "create") {
          // Criar novo produto
          await productsStore.addProduct(productData);
        } else {
          // Editar produto existente
          await productsStore.updateProduct(productData);
        }
      } catch (error) {
        console.error("Erro ao guardar produto:", error);
      }
      closeModal();
    };

    // Edit product
    const handleEditProduct = (row) => {
      const productFromStore = productsStore.products.find((p) => p.id === row.id);
      selectedProduct.value = { ...productFromStore };
      modalMode.value = "edit";
      modalOpen.value = true;
    };

    // Delete product
    const handleDeleteProduct = async (row) => {
      try {
        if (confirm(`Are you sure you want to delete: ${row.name}?`)) {
          await productsStore.removeProduct(row.id);
        }
      } catch (error) {
        console.error("Error to remove product:", error);
      }
    };

    return {
      sidebarOpen: false,
      columns,
      products,
      filteredProducts,
      searchQuery,
      modalOpen,
      modalMode,
      selectedProduct,
      openCreateModal,
      closeModal,
      saveProduct,
      handleEditProduct,
      handleDeleteProduct,
    };
  },
};
</script>
