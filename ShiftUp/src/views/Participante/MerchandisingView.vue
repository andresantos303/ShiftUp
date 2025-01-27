<script>
import { useRoute } from "vue-router";
import HeaderP from "../../components/HeaderP.vue";
import { useProductsStore } from "@/stores/products";
import { useOrdersStore } from "@/stores/orders";
import { useUsersStore } from "@/stores/users";
import Button from "../../components/ui/button.vue";
import { ref, computed } from "vue";

export default {
  components: {
    HeaderP,
    Button,
  },
  setup() {
    const productsStore = useProductsStore();
    const ordersStore = useOrdersStore();
    const usersStore = useUsersStore();
    const route = useRoute();
    const id = route.params.id;

    const badgeName = ref("");

    const filteredProducts = computed(() =>
      productsStore.products.filter((p) => p.category !== "badge")
    );

    const badgeProduct = computed(() =>
      productsStore.products.find((p) => p.category === "badge")
    );

    const user = computed(() =>
      usersStore.getUserById(parseInt(id))
    );

    const buyProduct = (productId, quantity = 1) => {
      ordersStore.addOrder({
        productId,
        userId: id,
        quantity,
      });
      alert("Product added to your orders!");
    };

    return {
      filteredProducts,
      badgeProduct,
      badgeName,
      user,
      buyProduct,
    };
  },
};
</script>

<template>
  <HeaderP />
  <div class="container mx-auto pl-[232px] pt-8">
    <h1 class="text-2xl font-bold mb-6">Merchandising</h1>

    <!-- Listagem de produtos (excluindo categoria "badge") -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="product in filteredProducts" :key="product.id"
        class="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col">
        <!-- Imagem do Produto -->
        <img :src="product.image || 'https://placehold.co/400?text=No+Image'" alt="Product"
          class="w-full h-48 object-cover rounded-lg mb-4" />
        <!-- Informações do Produto -->
        <h2 class="text-lg font-semibold text-gray-800">{{ product.name }}</h2>
        <p class="text-sm text-gray-600 mt-2">{{ product.description }}</p>
        <div class="mt-4">
          <p class="text-lg font-bold text-blue-600">{{ product.price }}€</p>
          <p class="text-sm text-gray-500">Category: {{ product.category }}</p>
          <p class="text-sm text-gray-500">Purchased: {{ product.purchased }}</p>
        </div>
        <!-- Botão de Compra -->
        <button @click="buyProduct(product.id)"
          class="mt-5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg">
          Buy Now
        </button>
      </div>
    </div>

    <!-- Crachá Personalizado (produto de categoria "badge") -->
    <div class="my-12">
      <h2 class="text-2xl font-bold mb-6">Personalized Badge</h2>
      <div class="flex flex-col md:flex-row items-start md:items-center gap-8">
        <!-- Crachá -->
        <div
          class="relative w-[300px] h-[450px] bg-[#020756] text-white rounded-lg shadow-lg flex flex-col justify-between px-6 pt-6">
          <!-- Topo -->
          <div class="flex justify-between items-center">
            <h1>Shift Up</h1>
            <span class="text-sm uppercase bg-white text-[#020756] px-2 py-1 rounded-full">{{ user.role }}</span>
          </div>

          <!-- Nome Personalizado -->
          <div class="flex-grow flex items-center justify-center">
            <h1 class="text-2xl font-bold text-center break-words" :style="{ wordBreak: 'break-word' }">
              {{ badgeName || 'Seu Nome Aqui' }}
            </h1>
          </div>

          <!-- Logo Grande -->
          <div class="flex justify-center">
            <img src="/public/images/logoC.png" alt="" class="w-32 opacity-75" />
          </div>
        </div>

        <!-- Input para Personalização -->
        <div class="flex flex-col w-full max-w-sm">
          <label for="badge-name" class="text-gray-700 font-medium mb-2">
            Name for Badge:
          </label>
          <input id="badge-name" type="text" v-model="badgeName" placeholder="Type your name"
            class="border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <!-- Botão de Compra do Badge -->
          <button v-if="badgeProduct" @click="buyProduct(badgeProduct.id)"
            class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg mt-5">
            Buy Now
          </button>
        </div>


      </div>
    </div>
  </div>
</template>
