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
      try {
        this.tickets.push(item);
      } catch (error) {
        console.error('Error adding item:', error);
      }
    },
    removeItem(id) {
      try {
        this.tickets = this.tickets.filter(item => item.id !== id);
      } catch (error) {
        console.error('Error removing item:', error);
      }
    },
    updateItem(updatedTicket) {
      try {
        const index = this.tickets.findIndex(item => item.id === updatedTicket.id);
        if (index !== -1) {
          this.tickets[index] = { ...this.tickets[index], ...updatedTicket };
        }
      } catch (error) {
        console.error('Error updating item:', error);
      }
    },
    purchaseTicket(ticketName, userId) {
      try {
        const usersStore = useUsersStore();
        const ticket = this.tickets.find(item => item.name === ticketName);
        if (ticket && !ticket.purchased.includes(userId)) {
          ticket.purchased.push(userId);
          usersStore.addTicketToUser(userId, ticketName);
        }
      } catch (error) {
        console.error('Error purchasing ticket:', error);
      }
    }
  },
  getters: {
    totalTicketsPurchased: (state) => {
      return state.tickets.reduce((acc, ticket) => acc + ticket.purchased.length, 0);
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
