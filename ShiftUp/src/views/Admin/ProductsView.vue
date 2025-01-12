<template>
  <HeaderA />
  <!-- Page Content -->
  <main :class="{ 'ml-64': sidebarOpen, 'ml-0': !sidebarOpen }"
    class="flex-1 flex items-center justify-center mt-12 transition-all duration-300">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full mx-6 sm:ml-72 mr-12">
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
          <input
            v-model="searchQuery"
            type="text"
            id="table-search-products"
            class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for products"
          />
        </div>
      </div>

      <!-- BaseTable Component -->
      <BaseTable :columns="columns" :rows="filteredProducts" />

      <button @click="openModal"
        class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 mt-5 m-4"
        role="button">New Product</button>
    </div>
  </main>

  <!-- Modal Component -->
  <Modal :isOpen="modalOpen" :onClose="closeModal" :onSave="addProduct" />
</template>

<script>
import HeaderA from "@/components/HeaderA.vue";
import BaseTable from "@/components/ui/baseTable.vue";
import Modal from "@/components/ui/Modal.vue";
import { useProductsStore } from "@/stores/products";
import { computed, ref, onMounted } from "vue";

export default {
  components: {
    HeaderA,
    BaseTable,
    Modal, // Registrando o componente Modal
  },
  setup() {
    const productsStore = useProductsStore();
    const modalOpen = ref(false); // Controla a visibilidade do modal
    const searchQuery = ref(""); // Controla o campo de busca

    // Computed para buscar produtos da store
    const products = computed(() =>
      productsStore.products.map((product) => ({
        id: product.id,
        name: product.name,
        price: `${product.price}€`,
        category: product.category,
        purchased: product.purchased,
        image: product.image,
        action: "Edit",
      }))
    );

    // Computed para filtrar produtos com base na busca
    const filteredProducts = computed(() => {
      if (!searchQuery.value) return products.value;
      return products.value.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    // Carrega os dados da store ao montar o componente
    onMounted(async () => {
      if (!productsStore.products.length) {
        await productsStore.fetchProducts();
      }
    });

    const openModal = () => {
      modalOpen.value = true;
    };

    const closeModal = () => {
      modalOpen.value = false;
    };

    const addProduct = async (newProduct) => {
      if (newProduct.name && newProduct.price && newProduct.category && newProduct.purchased && newProduct.image) {
        try {
          await productsStore.addProduct(newProduct); // Adiciona o produto na store
        } catch (error) {
          console.error("Erro ao adicionar produto:", error);
        }
      }
      closeModal(); // Fecha o modal após adicionar
    };

    return {
      columns: [
        { label: "ID", field: "id" },
        { label: "Name", field: "name" },
        { label: "Price", field: "price" },
        { label: "Category", field: "category" },
        { label: "Purchased", field: "purchased" },
        { label: "Image", field: "image" },
        { label: "Action", field: "action" },
      ],
      products,
      filteredProducts,
      searchQuery,
      modalOpen,
      openModal,
      closeModal,
      addProduct,
    };
  },
};
</script>
