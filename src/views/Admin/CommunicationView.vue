<template>
  <div class="flex flex-col h-screen">
    <!-- Navbar e Sidebar -->
    <HeaderA />

    <!-- Main Content -->
    <main :class="{ 'ml-64': sidebarOpen, 'ml-0': !sidebarOpen }" 
          class="flex flex-1 mt-16 transition-all duration-300">
 
      

      <!-- Coluna da Direita -->
      <div class="flex-1 p-6 bg-white shadow-md rounded-lg ml-4">
        <h2 class="text-2xl font-bold mb-6">Send Notifications</h2>

        <!-- Formulário de Notificação -->
        <form @submit.prevent="sendNotification">
          <!-- Destinatários -->
          <div class="mb-4">
            <label class="block text-gray-600 mb-1">Recipient(s)</label>
            <select v-model="notificationForm.recipients" multiple
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-custom-gradient">
              <option v-for="participant in participants" :key="participant.id" :value="participant.id">
                {{ participant.name }}
              </option>
            </select>
          </div>

          <!-- Assunto -->
          <div class="mb-4">
            <label class="block text-gray-600 mb-1">Subject</label>
            <input v-model="notificationForm.subject" type="text" 
                   class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-custom-gradient" />
          </div>

          <!-- Mensagem -->
          <div class="mb-4">
            <label class="block text-gray-600 mb-1">Message</label>
            <textarea v-model="notificationForm.message" rows="4" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-custom-gradient"></textarea>
          </div>

          <!-- Botão de Envio -->
          <Button 
            label="Send Notification" 
            to="#" 
            additionalClasses="w-full py-3"
            @click.native="sendNotification" />
        </form>

        <!-- Tabela de Notificações Enviadas -->
        <div class="mt-8">
          <h3 class="text-xl font-bold mb-4">Notifications Sent</h3>
          <table class="table-auto w-full border border-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left text-sm text-gray-600">Recipient(s)</th>
                <th class="px-4 py-2 text-left text-sm text-gray-600">Subject</th>
                <th class="px-4 py-2 text-left text-sm text-gray-600">Message</th>
                <th class="px-4 py-2 text-left text-sm text-gray-600">Date Sent</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="notification in sentNotifications" :key="notification.id" class="border-t">
                <td class="px-4 py-2 text-sm text-gray-800">
                  {{ getRecipientNames(notification.recipients) }}
                </td>
                <td class="px-4 py-2 text-sm text-gray-800">{{ notification.subject }}</td>
                <td class="px-4 py-2 text-sm text-gray-800">{{ notification.message }}</td>
                <td class="px-4 py-2 text-sm text-gray-800">{{ notification.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import HeaderA from '@/components/HeaderA.vue';
import Button from '@/components/ui/button.vue';

export default {
  components: {
    HeaderA,
    Button,
  },
  data() {
    return {
      sidebarOpen: true,
      participants: [ // Lista de participantes
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Carlos Mendes" },
      ],
      sentNotifications: [], // Notificações enviadas
      notificationForm: { // Formulário de notificação
        recipients: [],
        subject: "",
        message: "",
      },
    };
  },
  methods: {
    sendNotification() {
      // Adicionar a notificação à lista de notificações enviadas
      const newNotification = {
        ...this.notificationForm,
        id: Date.now(),
        date: new Date().toLocaleString(),
      };
      this.sentNotifications.push(newNotification);

      // Resetar o formulário
      this.notificationForm = {
        recipients: [],
        subject: "",
        message: "",
      };
    },
    getRecipientNames(recipientIds) {
      return recipientIds
        .map((id) => this.participants.find((participant) => participant.id === id)?.name)
        .join(", ");
    },
  },
};
</script>
