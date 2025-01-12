<template>
  <div class="flex flex-col h-screen">
    <HeaderA />

    <!-- Main Content -->
    <main :class="{ 'ml-64': sidebarOpen, 'ml-0': !sidebarOpen }" class="flex flex-1 mt-16 transition-all duration-300">
      <!-- Coluna da Esquerda -->
      <div class="w-64 p-4 bg-gray-50 shadow-md flex-shrink-0">

        <!--  Criar Novo Evento -->
        <Button label="+ Add New Event" to="#" :bgColor="'bg-custom-gradient'" :textColor="'text-white'"
          additionalClasses="w-full py-2 mb-4 text-center" @click.native="createNewEvent" />

        <p class="text-lg font-bold mb-4">Conferences</p>

        <!-- Lista de Cards de Conferências -->
        <div v-for="conference in conferences" :key="conference.id" @click="selectConference(conference)"
          class="card p-4 mb-4 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-100">
          <!-- Tag -->
          <div class="bg-custom-gradient text-white text-sm px-3 py-1 rounded-full mb-2">
            {{ conference.stage }}
          </div>

          <!-- Título -->
          <p class="font-bold text-gray-800">{{ conference.title }}</p>

          <!-- Horário -->
          <p class="text-sm text-gray-500">{{ conference.date }} • {{ conference.time }}</p>

          <!-- Localização -->
          <p class="text-sm text-gray-600 flex items-center mt-2">
            <svg class="w-4 h-4 text-gray-400 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16.5 9.4a6.7 6.7 0 11-9.5 0 6.7 6.7 0 019.5 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12v6m0-3h6m-6-3H6" />
            </svg>
            {{ conference.location }}
          </p>

          <!-- Row de Speakers -->
          <div class="flex mt-4 space-x-2">
            <img v-for="speaker in conference.speakers" :key="speaker.id" :src="speaker.image" alt="Speaker"
              class="w-8 h-8 rounded-full border border-gray-300">
          </div>
        </div>
      </div>

      <!-- Coluna da Direita -->
      <div class="flex-1 p-6 bg-white shadow-md rounded-lg ml-4">
        <h2 class="text-2xl font-bold mb-6">
          {{ selectedConference ? 'Edit Conference' : 'Create New Conference' }}
        </h2>

        <!-- Formulário -->
        <form @submit.prevent="handleSubmit">
          <!-- Nome da Conferência -->
          <div class="mb-4">
            <label class="block text-gray-600 mb-1">Name of Event</label>
            <input v-model="form.title" type="text"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-custom-gradient" />
          </div>

          <!-- Lugar -->
          <div class="mb-4">
            <label class="block text-gray-600 mb-1">Place</label>
            <select v-model="form.stage"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-custom-gradient">
              <option>Main Stage</option>
              <option>Centre Stage</option>
              <option>Workshop Room</option>
            </select>
          </div>

          <!-- Data -->
          <div class="mb-4">
            <label class="block text-gray-600 mb-1">Date</label>
            <input v-model="form.date" type="date"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-custom-gradient" />
          </div>

          <!-- Horário -->
          <div class="mb-4">
            <label class="block text-gray-600 mb-1">Time</label>
            <input v-model="form.time" type="time"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-custom-gradient" />
          </div>

          <!-- Adicionar Speakers -->
          <div class="mb-6">
            <label class="block text-gray-600 mb-2">Speakers</label>
            <div class="flex items-center space-x-4">
              <select v-model="selectedSpeaker"
                class="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-custom-gradient">
                <option v-for="speaker in allSpeakers" :key="speaker.id" :value="speaker">
                  {{ speaker.name }}
                </option>
              </select>
              <Button label="Add Speaker" to="#" :bgColor="'bg-custom-gradient'" :textColor="'text-white'"
                additionalClasses="py-2 px-4" @click.native="addSpeaker" />
            </div>
            <!-- Lista de Speakers Selecionados -->
            <div class="flex mt-4 space-x-2">
              <div v-for="speaker in form.speakers" :key="speaker.id" class="relative">
                <img :src="speaker.image" alt="Speaker" class="w-10 h-10 rounded-full border border-gray-300" />
                <button @click="removeSpeaker(speaker)" type="button"
                  class="absolute top-0 right-0 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  ×
                </button>
              </div>
            </div>
          </div>

          <!-- Botão Salvar -->
          <Button label="Save Conference" to="#" :bgColor="'bg-custom-gradient'" :textColor="'text-white'"
            additionalClasses="w-full py-3" @click.native="handleSubmit" />
        </form>
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
      conferences: [], // Lista de conferências
      selectedConference: null, // Conferência selecionada para edição
      allSpeakers: [ // Lista de speakers disponíveis
        { id: 1, name: "John Doe", image: "https://via.placeholder.com/50" },
        { id: 2, name: "Jane Smith", image: "https://via.placeholder.com/50" },
      ],
      selectedSpeaker: null, // Speaker selecionado para adicionar
      form: {
        title: "",
        stage: "",
        date: "",
        time: "",
        speakers: [],
        location: "",
      },
    };
  },
  methods: {
    createNewEvent() {
      this.selectedConference = null;
      this.resetForm();
    },
    selectConference(conference) {
      this.selectedConference = conference;
      this.form = { ...conference }; // Preenche o formulário com os dados do card
    },
    addSpeaker() {
      if (this.selectedSpeaker && !this.form.speakers.includes(this.selectedSpeaker)) {
        this.form.speakers.push(this.selectedSpeaker);
        this.selectedSpeaker = null;
      }
    },
    removeSpeaker(speaker) {
      this.form.speakers = this.form.speakers.filter((s) => s.id !== speaker.id);
    },
    handleSubmit() {
      if (this.selectedConference) {
        // Atualizar conferência existente
        Object.assign(this.selectedConference, this.form);
      } else {
        // Criar nova conferência
        this.conferences.push({ ...this.form, id: Date.now() });
      }
      this.resetForm();
    },
    resetForm() {
      this.form = {
        title: "",
        stage: "",
        date: "",
        time: "",
        speakers: [],
        location: "",
      };
    },
  },
};
</script>