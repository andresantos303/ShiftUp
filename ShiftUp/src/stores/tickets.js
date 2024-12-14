import { defineStore } from 'pinia'

export const useTicketsStore = defineStore('ticket', {

  state: () => {
    return {
      tickets:[]
    }
  },
  getters: {
    completetickets: (state) => state.tickets.filter(ticket=>ticket.completed),
    pendingtickets: (state) => state.tickets.filter(ticket=>ticket.completed == false),
    totaltickets: (state) => state.tickets.length,
  },

  actions: {
    addticket(text) {
      const newticket = {
        id: Date.now(),
        text: text,
        completed: false
      }
      this.tickets.push(newticket)
    },
    toggleticket(id) {
      const ticket = this.tickets.find(ticket => ticket.id == id)
      if (ticket) {
        ticket.completed = !ticket.completed
      }
    },
    removeticket(id) {
      this.tickets = this.tickets.filter(ticket => ticket.id != id)
    }
  }

})
