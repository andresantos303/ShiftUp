<template>
    <form @submit.prevent="submitForm">
      <!-- Título -->
      <div class="mb-4">
        <label class="block text-gray-600 mb-1">{{ labels.title }}</label>
        <input v-model="form.title" type="text"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-custom-gradient" />
      </div>
  
      <!-- where (só aparece para conferências) -->
      <div v-if="isConference" class="mb-4">
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
        <label class="block text-gray-600 mb-1">{{ labels.date }}</label>
        <input v-model="form.date" type="date"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-custom-gradient" />
      </div>
  
      <!-- Horário -->
      <div class="mb-4">
        <label class="block text-gray-600 mb-1">{{ labels.time }}</label>
        <input v-model="form.time" type="time"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-custom-gradient" />
      </div>
  
      <!-- Comunicação específica -->
      <div v-if="!isConference" class="mb-4">
        <label class="block text-gray-600 mb-1">Audience</label>
        <select v-model="form.audience"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-custom-gradient">
          <option>Internal</option>
          <option>External</option>
        </select>
      </div>
  
      <!-- Adicionar Speakers -->
      <div class="mb-6">
        <label class="block text-gray-600 mb-2">{{ labels.speakers }}</label>
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
      <Button label="Save {{ formTypeLabel }}" to="#" :bgColor="'bg-custom-gradient'" :textColor="'text-white'"
        additionalClasses="w-full py-3" @click.native="submitForm" />
    </form>
  </template>
  
  <script>
  import Button from '@/components/ui/button.vue';
  
  export default {
    components: {
      Button,
    },
    props: {
      form: {
        type: Object,
        required: true,
      },
      allSpeakers: {
        type: Array,
        required: true,
      },
      formType: {
        type: String,
        default: "conference", // "conference" ou "communication"
      },
    },
    data() {
      return {
        selectedSpeaker: null,
      };
    },
    computed: {
      isConference() {
        return this.formType === "conference";
      },
      formTypeLabel() {
        return this.isConference ? "Conference" : "Communication";
      },
      labels() {
        return this.isConference
          ? {
              title: "Name of Event",
              date: "Date",
              time: "Time",
              speakers: "Speakers",
            }
          : {
              title: "Name of Communication",
              date: "Date",
              time: "Time",
              speakers: "Participants",
            };
      },
    },
    methods: {
      addSpeaker() {
        if (this.selectedSpeaker && !this.form.speakers.includes(this.selectedSpeaker)) {
          this.form.speakers.push(this.selectedSpeaker);
          this.selectedSpeaker = null;
        }
      },
      removeSpeaker(speaker) {
        this.form.speakers = this.form.speakers.filter((s) => s.id !== speaker.id);
      },
      submitForm() {
        this.$emit("submit-form");
      },
    },
  };
  </script>
  