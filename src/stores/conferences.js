import { defineStore } from 'pinia';

export const useConferencesStore = defineStore('conferences', {
  state: () => ({
    conferences: [
      {
        id: 1,
        title: "Welcome to Shift Up",
        speakers: ["André Santos"],
        description: "An exciting introduction to the Shift Up event, highlighting the schedule, speakers, and goals for the conference. Join us to kick off this inspiring journey together!",
        local: "Centre Stage MEO Arena",
        category: "Main Stage",
        date: "November 11",
        time: "6.00PM - 6.20PM",
        participants: []
      },
      {
        id: 2,
        title: "Welcome to Shift Up xxx",
        speakers: ["Joana"],
        description: "An exciting introduction to the Shift Up event, highlighting the schedule, speakers, and goals for the conference. Join us to kick off this inspiring journey together!",
        local: "Centre Stage MEO Arena",
        category: "Main Stage",
        date: "November 13",
        time: "6.00PM - 6.20PM",
        participants: []
      }
    ],
  }),
  actions: {
    addConference(conference) {
      try {
        this.conferences.push(conference);
      } catch (error) {
        console.error('Error adding conference:', error);
      }
    },
    removeConference(id) {
      try {
        this.conferences = this.conferences.filter(conference => conference.id !== id);
      } catch (error) {
        console.error('Error removing conference:', error);
      }
    },
    updateConference(updatedConference) {
      try {
        const index = this.conferences.findIndex(conference => conference.id === updatedConference.id);
        if (index !== -1) {
          this.conferences[index] = { ...this.conferences[index], ...updatedConference };
        }
      } catch (error) {
        console.error('Error updating conference:', error);
      }
    },
    addParticipantToConference(conferenceId, participantId) {
      try {
        const conference = this.conferences.find(conference => conference.id === conferenceId);
        if (conference && !conference.participants.includes(participantId)) {
          conference.participants.push(participantId);
        }
      } catch (error) {
        console.error('Error adding participant to conference:', error);
      }
    },
    addSpeakerToConference(conferenceId, speakerId) {
      try {
        const conference = this.conferences.find(conference => conference.id === conferenceId);
        if (conference && !conference.speakers.includes(speakerId)) {
          conference.speakers.push(speakerId);
        }
      } catch (error) {
        console.error('Error adding speaker to conference:', error);
      }
    }
  },
  getters: {
    totalConferences: (state) => {
      return state.conferences.length;
    },
    conferencesByLocal: (state) => {
      return (local) => state.conferences.filter(conference => conference.local === local).length;
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'conferences',
        storage: localStorage,
      },
    ],
  },
});
