<script>
import HeaderP from "../../components/HeaderP.vue";
import { useProductsStore } from "@/stores/products";
import { useOrdersStore } from "@/stores/orders";

export default {
  components: {
    HeaderP,
  },
  setup() {
    const productsStore = useProductsStore();
    const ordersStore = useOrdersStore();

    const buyProduct = (productId, quantity = 1) => {
      ordersStore.addOrder({
        productId,
        userId: 1, // Substitua com o ID do usuário logado
        quantity,
      });
      alert("Product added to your orders!");
    };

    return {
      products: productsStore.products,
      buyProduct,
    };
  },
};
</script>

<template>
  <HeaderP />
  <div class="container mx-auto pl-[232px] pt-8">
    <h1 class="text-2xl font-bold mb-6">Merchandising</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Exibe os produtos -->
      <div v-for="product in products" :key="product.id"
        class="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col">
        <!-- Imagem do Produto -->
        <img :src="product.image || 'https://placehold.co/400?text=No+Image'" alt="Product"
          class="w-full h-48 object-cover rounded-lg mb-4" />
        <!-- Informações do Produto -->
        <h2 class="text-lg font-semibold text-gray-800">{{ product.name }}</h2>
        <p class="text-sm text-gray-600 mt-2">{{ product.description }}</p>
        <div class="mt-4">
          <p class="text-lg font-bold text-blue-600">${{ product.price }}</p>
          <p class="text-sm text-gray-500">Category: {{ product.category }}</p>
          <p class="text-sm text-gray-500">Purchased: {{ product.purchased }}</p>
        </div>
        <!-- Botão de Compra -->
        <button @click="buyProduct(product.id)"
          class="mt-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg">
          Buy Now
        </button>
      </div>
    </div>
  </div>
</template>

<style>
/* Estilo para melhorar a aparência geral */
</style>
