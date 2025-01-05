import { defineStore } from 'pinia';

export const useSpeakersStore = defineStore('speakers', {
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
    addSpeaker(speaker) {
      this.speakers.push(speaker);
    },
    removeSpeaker(id) {
      this.speakers = this.speakers.filter(speaker => speaker.id !== id);
    },
    updateSpeaker(updatedSpeaker) {
      const index = this.speakers.findIndex(speaker => speaker.id === updatedSpeaker.id);
      if (index !== -1) {
        this.speakers[index] = { ...this.speakers[index], ...updatedSpeaker };
      }
    },
    addConferenceToSpeaker(speakerId, conferenceId) {
      const speaker = this.speakers.find(speaker => speaker.id === speakerId);
      if (speaker && !speaker.conferences.includes(conferenceId)) {
        speaker.conferences.push(conferenceId);
      }
    },
  },
  getters: {
    getSpeakerById: (state) => (id) => {
      return state.speakers.find(speaker => speaker.id === id);
    },
  },
});
