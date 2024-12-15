import { defineStore } from 'pinia';

export const useSpeakersStore = defineStore('speakers', {
  state: () => ({
    speakers: [],
  }),
  actions: {
    addSpeaker(speaker) {
      this.speakers.push(speaker);
    },
    removeSpeaker(id) {
      this.speakers = this.speakers.filter(speaker => speaker.id !== id);
    },
    updateSpeaker(updatedspeaker) {
      const index = this.speakers.findIndex(speaker => speaker.id === updatedspeaker.id);
      if (index !== -1) {
        this.speakers[index] = { ...this.speakers[index], ...updatedspeaker };
      }
    },
    addConferenceTospeaker(speakerId, conferenceId) {
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
