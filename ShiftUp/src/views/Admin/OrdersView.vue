<template>
  <HeaderA />
  <main :class="{ '': sidebarOpen, 'ml-0': !sidebarOpen }"
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
          <input v-model="searchQuery" type="text" id="table-search-orders"
            class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for orders" />
        </div>
      </div>
      <!-- BaseTable Component -->
      <BaseTable :columns="columns" :rows="filteredOrders" />
    </div>
  </main>
</template>

<script>
import HeaderA from "@/components/HeaderA.vue";
import BaseTable from "@/components/ui/baseTable.vue";
import { useOrdersStore } from "@/stores/orders";
import { useUsersStore } from "@/stores/users";
import { useProductsStore } from "@/stores/products";
import { computed, ref } from "vue";

export default {
  components: {
    HeaderA,
    BaseTable,
  },
  setup() {
    const sidebarOpen = ref(true);

    // Stores
    const ordersStore = useOrdersStore();
    const usersStore = useUsersStore();
    const productsStore = useProductsStore();

    const searchQuery = ref("");

    /**
     * Mapeamos cada pedido buscando o nome do user e o nome do produto
     * a partir de suas respectivas stores.
     */
    const orders = computed(() =>
      ordersStore.orders.map((order) => {
        // Buscar o user completo pela store
        const userData = usersStore.getUserById(Number(order.userId));
        // Buscar o produto completo pela store
        const productData = productsStore.getProductById(Number(order.productId));

        return {
          id: order.id,
          userName: userData ? userData.name : "Unknown User",
          productName: productData ? productData.name : "Unknown Product",
          quantity: order.quantity,
          totalPrice: order.totalPrice,
          date: order.date,
          action: "Edit",
        };
      })
    );

    // Filtrar usando nome do produto, nome do user etc.
    const filteredOrders = computed(() => {
      if (!searchQuery.value) return orders.value;
      const query = searchQuery.value.toLowerCase();

      return orders.value.filter((order) => {
        const userName = order.userName.toLowerCase();
        const productName = order.productName.toLowerCase();
        return (
          userName.includes(query) ||
          productName.includes(query)
        );
      });
    });

    const columns = [
      { label: "ID", field: "id" },
      { label: "User Name", field: "userName" },
      { label: "Product Name", field: "productName" },
      { label: "Quantity", field: "quantity" },
      { label: "Total Price", field: "totalPrice" },
      { label: "Date", field: "date" },
    ];

    return {
      sidebarOpen,
      columns,
      filteredOrders,
      searchQuery,
    };
  },
};
</script>
