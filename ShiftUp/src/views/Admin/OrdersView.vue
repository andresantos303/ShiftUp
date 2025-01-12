<template>
  <HeaderA />
  <!-- Page Content -->
  <main :class="{'ml-64': sidebarOpen, 'ml-0': !sidebarOpen}" class="flex-1 flex items-center justify-center mt-12 transition-all duration-300">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full mx-6 sm:ml-72 mr-12">
      <div class="flex items-center justify-between flex-col md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
        <!-- Search Input -->
        <div class="relative">
          <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
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
            id="table-search-orders"
            class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for orders"
          />
        </div>
        <!-- Add Order Button -->
        <button
          @click="openModal"
          class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 mt-5 m-4"
        >
          Add Order
        </button>
      </div>

      <!-- BaseTable Component -->
      <BaseTable :columns="columns" :rows="filteredOrders" />
    </div>
  </main>

  <!-- Modal Component for Adding Order -->
  <Modal :isOpen="modalOpen" :onClose="closeModal" :onSave="addOrder" />
</template>

<script>
import HeaderA from "@/components/HeaderA.vue";
import BaseTable from "@/components/ui/baseTable.vue";
import Modal from "@/components/ui/Modal.vue";
import { useOrdersStore } from "@/stores/orders";
import { computed, ref, onMounted } from "vue";

export default {
  components: {
    HeaderA,
    BaseTable,
    Modal,
  },
  setup() {
    const ordersStore = useOrdersStore();
    const modalOpen = ref(false);
    const searchQuery = ref("");

    // Computed para pegar os pedidos da store
    const orders = computed(() =>
      ordersStore.orders.map((order) => ({
        id: order.id,
        name: order.product.name,
        userId: order.user.id,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        action: "Edit",
      }))
    );

    // Computed para filtrar pedidos com base na busca
    const filteredOrders = computed(() => {
      if (!searchQuery.value) return orders.value;
      return orders.value.filter((order) =>
        order.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    // Carregar os dados da store ao montar o componente
    onMounted(async () => {
      if (!ordersStore.orders.length) {
        await ordersStore.fetchOrders();
      }
    });

    // Função para abrir o modal
    const openModal = () => {
      modalOpen.value = true;
    };

    // Função para fechar o modal
    const closeModal = () => {
      modalOpen.value = false;
    };

    // Função para adicionar um novo pedido
    const addOrder = async (newOrder) => {
      if (newOrder.productName && newOrder.userId && newOrder.quantity) {
        try {
          await ordersStore.addOrder({
            product: { name: newOrder.productName },
            user: { id: newOrder.userId },
            quantity: newOrder.quantity,
            totalPrice: newOrder.totalPrice,
          });
        } catch (error) {
          console.error("Erro ao adicionar pedido:", error);
        }
      }
      closeModal();
    };

    return {
      columns: [
        { label: "ID", field: "id" },
        { label: "Product Name", field: "name" },
        { label: "User Id", field: "userId" },
        { label: "Quantity", field: "quantity" },
        { label: "Total", field: "totalPrice" },
        { label: "Action", field: "action" },
      ],
      orders,
      filteredOrders,
      searchQuery,
      modalOpen,
      openModal,
      closeModal,
      addOrder,
    };
  },
};
</script>
