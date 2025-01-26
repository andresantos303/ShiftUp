<script setup>
import { ref, computed } from "vue";
import HeaderP from "../../components/HeaderP.vue";
import { useNotificationsStore } from "@/stores/notifications";
import { useUsersStore } from "@/stores/users";
import { useRoute } from "vue-router";

const notificationsStore = useNotificationsStore();

// Recupera o userRole a partir de um store de users e do ID na rota
const usersStore = useUsersStore();
const route = useRoute();
const userId = parseInt(route.params.id);
const currentUser = computed(() => usersStore.getUserById(userId));

// Filtra as notificações de acordo com o role do user
const filteredNotifications = computed(() => {
  // Garante que currentUser.value exista
  if (!currentUser.value) return [];

  return notificationsStore.notifications.filter((notification) => {
    // O 'recipient' é um array (ex: ["participant", "voluntary"])
    // Vamos exibir a notificação apenas se o 'role' do user estiver incluso em 'recipient'.
    return notification.recipient.includes(currentUser.value.role);
  });
});

// Notificação selecionada
const selectedNotification = ref(null);

// Função para selecionar uma notificação
function selectNotification(notification) {
  selectedNotification.value = notification;
}
</script>

<template>
  <HeaderP />
  <div class="flex h-screen pl-[248px] pt-4">
    <!-- Sidebar: Lista de Notificações -->
    <div class="w-1/4 bg-gray-100 border-r border-gray-200 overflow-y-auto p-4">
      <h2 class="text-lg font-semibold mb-4">Notificações</h2>
      <div
        v-for="notification in filteredNotifications"
        :key="notification.id"
        @click="selectNotification(notification)"
        :class="[
          'p-4 mb-2 rounded-lg cursor-pointer border',
          selectedNotification && selectedNotification.id === notification.id
            ? 'bg-[#cdcfeb] border-[#4B58FD]'
            : 'bg-white border-gray-200 hover:bg-gray-50',
        ]"
      >
        <h3 class="font-medium text-gray-800">{{ notification.subject }}</h3>
        <p class="text-sm text-gray-600 mt-1">{{ notification.preview }}</p>
      </div>
    </div>

    <!-- Main Content: Detalhes da Notificação Selecionada -->
    <div class="flex-1 p-6">
      <div
        v-if="selectedNotification"
        class="bg-white shadow-md rounded-lg p-6"
      >
        <h1 class="text-2xl font-bold mb-4">
          {{ selectedNotification.subject }}
        </h1>
        <p class="text-gray-700">{{ selectedNotification.content }}</p>
        <p class="text-sm text-gray-500 mt-4">
          Data: {{ selectedNotification.date }}
        </p>
        <div class="text-sm text-gray-500">
          <strong>Destinatários: </strong>
          <span v-if="selectedNotification.recipient && selectedNotification.recipient.length">
            {{ selectedNotification.recipient.join(", ") }}
          </span>
        </div>
      </div>
      <div v-else class="flex items-center justify-center h-full text-gray-500">
        <p>Selecione uma notificação para ver detalhes.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}
</style>
