import { defineStore } from "pinia";
import { useConferencesStore } from './conferences';
import * as api from "../api/api";

const API_BASE_URL = "http://localhost:3000";

export const useSpeakersStore = defineStore("speakers", {
  state: () => ({
    speakers: [],
  }),
  actions: {
    async fetchTodos() {
      try {
        const response = await api.get(API_BASE_URL, "speakers");
        this.speakers = response;
      } catch (error) {
        throw new Error(`Erro ao obter os speakers: ${error}`);
      }
    },
    async addSpeaker(speaker) {
      try {
        const createdSpeaker = await api.post(
          API_BASE_URL,
          "speakers",
          speaker
        );
        this.speakers.push(createdSpeaker);
      } catch (error) {
        throw new Error(`Erro ao adicionar um speaker: ${error}`);
      }
    },
    async removeSpeaker(id) {
      try {
        await api.del(API_BASE_URL, `speakers/${id}`);
        this.speakers = this.speakers.filter((speaker) => speaker.id !== id);
      } catch (error) {
        throw new Error(`Erro ao remover o speaker: ${error}`);
      }
    },
    async updateSpeaker(updatedspeaker) {
      try {
        const index = this.speakers.findIndex(
          (speaker) => speaker.id === updatedspeaker.id
        );
        if (index !== -1) {
          this.speakers[index] = { ...this.speakers[index], ...updatedspeaker };
          await api.put(API_BASE_URL, `todos/${index}`, updatedspeaker);
        }
      } catch (error) {
        throw new Error(`Erro ao atualizar o speaker: ${error}`);
      }
    },
    async addConferenceTospeaker(speakerId, conferenceId) {
      try {
        const conferencesStore = useConferencesStore();
        const speaker = this.speakers.find((t) => t.id === speakerId);
        if (speaker) {
          speaker.conferences.push(conferenceId);
          conferencesStore.addConferenceTospeaker(conferenceId,speakerId);
          await api.put(API_BASE_URL, `speakers/${speakerId}`, speaker);
        }
      } catch (error) {
        throw new Error(`Erro ao atualizar o speaker: ${error}`);
      }
    },
  },
  getters: {
    getSpeakerById: (state) => (id) => {
      return state.speakers.find((speaker) => speaker.id === id.toString());
    },
    // NOVO GETTER PARA FACILITAR O CÁLCULO DO TOTAL DE SPEAKERS
    totalSpeakers: (state) => {
      return state.speakers.length;
    },
  },
});
