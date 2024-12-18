import { defineStore } from 'pinia';
import { useUsersStore } from './users';


export const useTicketsStore = defineStore('ticket', {
  state: () => ({
    tickets: [
      {
        id: 1,
        name: "Starter",
        description: "Best option for personal use & for your next project.",
        price: 29,
        benefits: ["Access to keynotes", "No setup, or hidden fees"],
        purchased: []
      },
      {
        id: 2,
        name: "Company",
        description: "Great for teams, extended support included.",
        price: 99,
        benefits: ["Priority seating", "No setup, or hidden fees"],
        purchased: []
      },
      {
        id: 3,
        name: "Enterprise",
        description: "For large teams, full access and premium support.",
        price: 499,
        benefits: ["Exclusive sessions", "No setup, or hidden fees"],
        purchased: []
      }
    ],
  }),
  actions: {
    addItem(item) {
      this.tickets.push(item);
    },
    removeItem(id) {
      this.tickets = this.tickets.filter(item => item.id !== id);
    },
    updateItem(updatedTicket) {
      const index = this.tickets.findIndex(item => item.id === updatedTicket.id);
      if (index !== -1) {
        this.tickets[index] = { ...this.tickets[index], ...updatedTicket };
      }
    },
    purchaseTicket({ ticketName, userId }) {
      const usersStore = useUsersStore();
      const ticket = this.tickets.find(item => item.name === ticketName);
      if (ticket && !ticket.purchased.includes(userId)) {
        ticket.purchased.push(userId);
        usersStore.addTicketToUser(userId,ticketName);
      }
    }
  },
  getters: {
    purchasersCount: (state) => {
      return (ticketId) => {
        const ticket = state.tickets.find(item => item.id === ticketId);
        return ticket ? ticket.purchased.length : 0;
      };
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'tickets',
        storage: localStorage,
      },
    ],
  },
});
