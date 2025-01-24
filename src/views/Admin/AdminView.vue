<template>
  <HeaderA />
  <div class="admin-dashboard">
    <h2 class="title">Dashboard Information</h2>

    <div class="cards-container">
      <div class="card" v-for="(item, index) in stats" :key="index">
        <div class="card-value">{{ item.value }}</div>
        <div class="card-label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderA from "@/components/HeaderA.vue";
import { computed } from "vue";

// Importa as stores
import { useUsersStore } from "@/stores/users";
import { useSpeakersStore } from "@/stores/speakers";
import { useProductsStore } from "@/stores/products";
import { useOrdersStore } from "@/stores/orders";
import { useConferencesStore } from "@/stores/conferences";
import { useTicketsStore } from "@/stores/tickets";

// Instancia as stores
const usersStore = useUsersStore();
const productsStore = useProductsStore();
const ordersStore = useOrdersStore();
const conferencesStore = useConferencesStore();
const ticketsStore = useTicketsStore();

const speakersStore = useSpeakersStore();
try {
  speakersStore.fetchTodos(); // Chama a ação fetchTodos() para obter os dados
} catch (error) {
  console.error("Error fetching speakers:", error.message);
}

// Computed para obter valores de cada store
const totalUsers = computed(() => usersStore.users.length);
const totalSpeakers = computed(() => speakersStore.totalSpeakers);
const totalVolunteers = computed(() => usersStore.getVolunteers.length);
const totalOrders = computed(() => ordersStore.orders.length);
const totalProducts = computed(() => productsStore.products.length);
const totalConferences = computed(() => conferencesStore.conferences.length);
const totalTicketsPurchased = computed(() => ticketsStore.totalTicketsPurchased);

// Monta um array de dados para renderizar facilmente
const stats = computed(() => [
  { label: "Participantes", value: totalUsers.value },
  { label: "Speakers", value: totalSpeakers.value },
  { label: "Volunteers", value: totalVolunteers.value },
  { label: "Orders", value: totalOrders.value },
  { label: "Products", value: totalProducts.value },
  { label: "Conferences", value: totalConferences.value },
  { label: "Tickets Purchased", value: totalTicketsPurchased.value },
]);
</script>

<style scoped>
.admin-dashboard {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: "Helvetica Neue", Arial, sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}

.card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  text-align: center;
  padding: 1rem;
}

.card-value {
  font-size: 1.6rem;
  font-weight: bold;
  color: #1f2937; /* Cinzento escuro */
  margin-bottom: 0.5rem;
}

.card-label {
  font-size: 0.9rem;
  color: #4b5563; /* Cinzento */
}
</style>
