import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [
      {
        id: 1,
        name: "André Santos",
        email: "andrecostasantos2003@gmail.com",
        password: "A03042003",
        age: "",
        job: "",
        picture: "",
        role: "admin",
        conferences: [],
        ticket: null
      },
      {
        id: 2,
        name: "André Costa",
        email: "jehetrolha33@gmail.com",
        password: "A03042003",
        age: "",
        job: "",
        picture: "",
        role: "participant",
        conferences: [], 
        ticket: null
      },
    ],
  }),
  actions: {
    addUser(user) {
      this.users.push(user);
    },
    removeUser(id) {
      this.users = this.users.filter(user => user.id !== id);
    },
    updateUser(updatedUser) {
      const index = this.users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.users[index], ...updatedUser };
      }
    },
    changeRole(id, newRole) {
      const user = this.users.find(user => user.id === id);
      if (user) {
        user.role = newRole;
      }
    },
    addConferenceToUser(userId, conferenceId) {
      const user = this.users.find(user => user.id === userId);
      if (user && !user.conferences.includes(conferenceId)) {
        user.conferences.push(conferenceId);
      }
    },
    addTicketToUser(userId, ticketId) {
      const user = this.users.find(user => user.id === userId);
      if (user) {
        user.ticket = ticketId;
      }
    }
  },
  getters: {
    getUserById: (state) => (id) => {
      return state.users.find(user => user.id === id);
    },
    getVolunteers: (state) => (id) => {
      return state.users.find(user => user.role === voluntary);
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'users',
        storage: localStorage,
      },
    ],
  },
});
