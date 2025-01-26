<template>
  <div class="flex flex-col h-screen">
    <HeaderA />

    <!-- Main Content -->
    <main :class="{ 'ml-64': sidebarOpen, 'ml-0': !sidebarOpen }" class="flex flex-1 mt-16 transition-all duration-300">
      <!-- Coluna da Esquerda -->
      <div class="w-64 p-4 bg-gray-50 shadow-md flex-shrink-0">
        <!-- Criar Novo Evento -->
        <Button label="+ Add New Event" to="#" :bgColor="'bg-custom-gradient'" :textColor="'text-white'"
          additionalClasses="w-full py-2 mb-4 text-center" @click.native="createNewEvent" />

        <p class="text-lg font-bold mb-4">Conferences</p>

        <!-- Lista de Cards de Conferências -->
        <!-- Repare que usamos 'conferencesList' (computed) para garantir que speakers sejam objetos -->
        <div v-for="conference in conferencesList" :key="conference.id" @click="selectConference(conference)"
          class="card p-4 mb-4 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-100">
          <!-- Tag (category) -->
          <div class="bg-custom-gradient text-white text-sm px-3 py-1 rounded-full mb-2">
            {{ conference.category }} - {{ conference.type }}
          </div>

          <!-- Título -->
          <p class="font-bold text-gray-800">{{ conference.title }}</p>

          <!-- Data e Hora -->
          <p class="text-sm text-gray-500">
            {{ conference.date }} • {{ conference.time }}
          </p>

          <!-- Local (local) -->
          <p class="text-sm text-gray-600 flex items-center mt-2">
            <svg class="w-4 h-4 text-gray-400 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16.5 9.4a6.7 6.7 0 11-9.5 0 6.7 6.7 0 019.5 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12v6m0-3h6m-6-3H6" />
            </svg>
            {{ conference.local }}
          </p>

          <!-- Row de Speakers (já como objetos) -->
          <div class="flex mt-4 space-x-2">
            <img v-for="speakerObj in conference.speakers" :key="speakerObj.id || speakerObj.name"
              :src="speakerObj.image" alt="Speaker" class="w-8 h-8 rounded-full border border-gray-300" />
          </div>
        </div>
      </div>

      <!-- Coluna da Direita -->
      <div class="flex-1 p-6 bg-white shadow-md rounded-lg ml-4">
        <h2 class="text-2xl font-bold mb-6">
          {{ selectedConference ? "Edit Conference" : "Create New Conference" }}
        </h2>

        <!-- Formulário -->
        <form @submit.prevent="handleSubmit">
          <!-- Nome da Conferência -->
          <div class="mb-4">
            <label class="block text-gray-600 mb-1">Name of Event</label>
            <input v-model="form.title" type="text"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-custom-gradient" />
          </div>

          <!-- Lugar (stage → category) -->
          <div class="mb-4">
            <label class="block text-gray-600 mb-1">Place</label>
            <select v-model="form.stage"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-custom-gradient">
              <option>Main Stage</option>
              <option>Centre Stage</option>
              <option>Workshop Room</option>
            </select>
          </div>

          <!-- Ticket Type -->
          <div class="mb-4">
            <label class="block text-gray-600 mb-1">Type</label>
            <select v-model="form.type"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-custom-gradient">
              <option>Starter</option>
              <option>Company</option>
              <option>Enterprise</option>
            </select>
          </div>

          <!-- Date -->
          <div class="mb-4">
            <label class="block text-gray-600 mb-1">Date</label>
            <select v-model="form.date"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-custom-gradient">
              <option>November 11</option>
              <option>November 12</option>
              <option>November 13</option>
            </select>
          </div>

          <!-- Horário -->
          <div class="mb-4">
            <label class="block text-gray-600 mb-1">Time</label>
            <input v-model="form.time" type="time"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-custom-gradient" />
          </div>

          <!-- Localização (location → local) -->
          <div class="mb-4">
            <label class="block text-gray-600 mb-1">Location</label>
            <input v-model="form.location" type="text"
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
                additionalClasses="py-2 px-4" @click="addSpeaker" />
            </div>

            <!-- Lista de Speakers Selecionados (objetos) -->
            <div class="flex mt-4 space-x-2">
              <div v-for="speaker in form.speakers" :key="speaker.id || speaker.name" class="relative">
                <img :src="speaker.image" alt="Speaker" class="w-10 h-10 rounded-full border border-gray-300" />
                <button @click="removeSpeaker(speaker)" type="button"
                  class="absolute top-0 right-0 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  ×
                </button>
              </div>
            </div>
          </div>

          <!-- Botão guardar -->
          <Button label="Save Conference" to="#" :bgColor="'bg-custom-gradient'" :textColor="'text-white'"
            additionalClasses="w-full py-3" @click="handleSubmit" />
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import HeaderA from "@/components/HeaderA.vue";
import Button from "@/components/ui/button.vue";

// Importando as stores
import { useConferencesStore } from "@/stores/conferences";
import { useSpeakersStore } from "@/stores/speakers";

export default {
  components: {
    HeaderA,
    Button,
  },
  data() {
    return {
      sidebarOpen: true,
      selectedConference: null,
      selectedSpeaker: null,

      // Formulário local
      form: {
        title: "",
        stage: "",
        type: "",
        date: "",
        time: "",
        location: "",
        speakers: [],
      },
    };
  },

  computed: {
    // Acessa a store de conferências
    conferencesStore() {
      return useConferencesStore();
    },
    // Acessa a store de speakers
    speakersStore() {
      return useSpeakersStore();
    },

    // Retorna a lista de speakers disponíveis na store de speakers
    allSpeakers() {
      return this.speakersStore.speakers;
    },

    /*
      Retorna a lista de conferências fazendo a conversão
      de cada item de conf.speakers (strings) para objetos
      da speakersStore (para exibir imagem).
    */
    conferencesList() {
      return this.conferencesStore.conferences.map((conf) => {
        const speakerObjects = conf.speakers.map((speakerName) => {
          const found = this.allSpeakers.find((sp) => sp.name === speakerName);
          return (
            found || {
              // fallback, caso não encontre
              name: speakerName,
              image: "https://via.placeholder.com/50",
            }
          );
        });

        return {
          ...conf,
          speakers: speakerObjects,
        };
      });
    },
  },

  methods: {
    createNewEvent() {
      this.selectedConference = null;
      this.resetForm();
    },

    selectConference(conference) {
      this.selectedConference = conference;

      this.form.title = conference.title;
      this.form.stage = conference.category;
      this.form.type = conference.type;
      this.form.date = conference.date;
      this.form.time = conference.time;
      this.form.location = conference.local;

      /*
       Verifica se conference.speakers são strings ou objetos.
       Se forem objetos (já convertidos no computed), basta
       copiar direto. Se forem strings, convertemos.
      */
      this.form.speakers = conference.speakers.map((item) => {
        if (typeof item === "string") {
          const found = this.allSpeakers.find((sp) => sp.name === item);
          return found || { name: item, image: "https://via.placeholder.com/50" };
        } else {
          return item;
        }
      });
    },

    // Adiciona o speaker selecionado ao form
    addSpeaker() {
      if (
        this.selectedSpeaker &&
        !this.form.speakers.includes(this.selectedSpeaker)
      ) {
        this.form.speakers.push(this.selectedSpeaker);
        this.selectedSpeaker = null;
      }
    },

    removeSpeaker(speaker) {
      this.form.speakers = this.form.speakers.filter(
        (s) => s.id !== speaker.id
      );
    },

    handleSubmit() {
      // Se já existe selectedConference, é edição
      if (this.selectedConference) {
        this.conferencesStore.updateConference({
          id: this.selectedConference.id,
          title: this.form.title,
          type: this.form.type,
          category: this.form.stage,
          local: this.form.location,
          date: this.form.date,
          time: this.form.time,
          // Grava apenas os nomes na store
          speakers: this.form.speakers.map((sp) => sp.name),
          // Se tiver 'description' ou 'participants', pode reaproveitar:
          description: this.selectedConference.description || "",
          participants: this.selectedConference.participants || [],
        });
      } else {
        // Senão, criar nova
        this.conferencesStore.addConference({
          id: Date.now(),
          title: this.form.title,
          category: this.form.stage,
          type: this.form.type,
          local: this.form.location,
          date: this.form.date,
          time: this.form.time,
          speakers: this.form.speakers.map((sp) => sp.name),
          description: "",
          participants: [],
        });
      }
      this.resetForm();
      this.selectedConference = null;
    },

    resetForm() {
      this.form = {
        title: "",
        stage: "",
        type: "",
        date: "",
        time: "",
        location: "",
        speakers: [],
      };
      this.selectedSpeaker = null;
    },
  },

  mounted() {
    this.speakersStore.fetchTodos();
  },
};
</script>
