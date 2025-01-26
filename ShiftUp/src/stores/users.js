import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [
      {
        id: 1,
        name: "André Santos",
        email: "andrecostasantos2003@gmail.com",
        password: "And123",
        age: "20",
        role: "admin",
        conferences: [],
        ticket: null
      },
      {
        id: 2,
        name: "André Costa",
        email: "jehetrolha33@gmail.com",
        password: "And123",
        age: "20",
        role: "participant",
        photo: "/images/speaker3.png",
        conferences: [], 
        ticket: null
      },
      {
        id: 3,
        name: "Little John",
        email: "littlejohn@gmail.com",
        password: "And123",
        age: "25",
        role: "voluntary",
        photo: "/images/speaker5.png",
        conferences: [], 
        ticket: null
      },
    ],
  }),
  actions: {
    addUser(user) {
      try {
        this.users.push(user);
      } catch (error) {
        console.error('Error adding user:', error);
      }
    },
    removeUser(id) {
      try {
        this.users = this.users.filter(user => user.id !== id);
      } catch (error) {
        console.error('Error removing user:', error);
      }
    },
    updateUser(updatedUser) {
      try {
        const index = this.users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = { ...this.users[index], ...updatedUser };
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    changeRole(id, newRole) {
      try {
        const user = this.users.find(user => user.id === id);
        if (user) {
          user.role = newRole;
        }
      } catch (error) {
        console.error('Error changing user role:', error);
      }
    },
    addConferenceToUser(userId, conferenceId) {
      try {
        const user = this.users.find(user => user.id === userId);
        if (user && !user.conferences.includes(conferenceId)) {
          user.conferences.push(conferenceId);
        }
      } catch (error) {
        console.error('Error adding conference to user:', error);
      }
    },
    addTicketToUser(userId, ticketName) {
      try {
        const user = this.users.find(user => user.id === userId);
        if (user) {
          user.ticket = ticketName;
        }
      } catch (error) {
        console.error('Error adding ticket to user:', error);
      }
    }
  },
  getters: {
    getUserById: (state) => (id) => {
      return state.users.find(user => user.id === id);
    },
    getVolunteers: (state) => {
      return state.users.filter((user) => user.role === "voluntary");
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
