import { defineStore } from "pinia";
import { useConferencesStore } from './conferences';
import * as api from "../api/api";

const API_BASE_URL = "http://localhost:3000";

export const useSpeakersStore = defineStore("speakers", {
  state: () => ({
    speakers: [
      {
        id: 1,
        name: "John Doe",
        job: "Software Engineer",
        description: "John Doe is a software engineer specializing in web development, focusing on creating seamless and scalable web applications.",
        image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
        conferences: [],
      },
      {
        id: 2,
        name: "Jane Smith",
        job: "Product Manager",
        description: "Jane Smith is a product manager with expertise in leading cross-functional teams to deliver innovative technology solutions.",
        image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
        conferences: [],
      },
      {
        id: 3,
        name: "Mark Johnson",
        job: "UX/UI Designer",
        description: "Mark Johnson is a UX/UI designer known for his creative solutions that enhance user experiences and drive product success.",
        image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
        conferences: [],
      },
      {
        id: 1,
        name: "John Doe",
        job: "Software Engineer",
        description: "John Doe is a software engineer specializing in web development, focusing on creating seamless and scalable web applications.",
        image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
        conferences: [],
      },
      {
        id: 2,
        name: "Jane Smith",
        job: "Product Manager",
        description: "Jane Smith is a product manager with expertise in leading cross-functional teams to deliver innovative technology solutions.",
        image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
        conferences: [],
      },
      {
        id: 3,
        name: "Mark Johnson",
        job: "UX/UI Designer",
        description: "Mark Johnson is a UX/UI designer known for his creative solutions that enhance user experiences and drive product success.",
        image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
        conferences: [],
      },
      {
        id: 1,
        name: "John Doe",
        job: "Software Engineer",
        description: "John Doe is a software engineer specializing in web development, focusing on creating seamless and scalable web applications.",
        image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
        conferences: [],
      },
      {
        id: 2,
        name: "Jane Smith",
        job: "Product Manager",
        description: "Jane Smith is a product manager with expertise in leading cross-functional teams to deliver innovative technology solutions.",
        image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
        conferences: [],
      },
      {
        id: 3,
        name: "Mark Johnson",
        job: "UX/UI Designer",
        description: "Mark Johnson is a UX/UI designer known for his creative solutions that enhance user experiences and drive product success.",
        image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
        conferences: [],
      },
      {
        id: 1,
        name: "John Doe",
        job: "Software Engineer",
        description: "John Doe is a software engineer specializing in web development, focusing on creating seamless and scalable web applications.",
        image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
        conferences: [],
      },
      {
        id: 2,
        name: "Jane Smith",
        job: "Product Manager",
        description: "Jane Smith is a product manager with expertise in leading cross-functional teams to deliver innovative technology solutions.",
        image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
        conferences: [],
      },
      {
        id: 3,
        name: "Mark Johnson",
        job: "UX/UI Designer",
        description: "Mark Johnson is a UX/UI designer known for his creative solutions that enhance user experiences and drive product success.",
        image: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
        conferences: [],
      }
    ],
  }),
  actions: {
    async fetchTodos() {
      try {
        this.speakers = await api.get(API_BASE_URL, "speakers");
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
          conferencesStore.addConferenceTospeaker(conferenceId,speakerId)
          await api.put(API_BASE_URL, `speakers/${speakerId}`, speaker);
        }
      } catch (error) {
        throw new Error(`Erro ao atualizar o speaker: ${error}`);
      }
    },
  },
  getters: {
    getSpeakerById: (state) => (id) => {
      return state.speakers.find((speaker) => speaker.id === id);
    },
  },
});
