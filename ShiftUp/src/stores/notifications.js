import { defineStore } from 'pinia';

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [
      {
        id: 1,
        subject: "Event Reminder",
        recipient: ["participant", "voluntary"],
        preview: "Don't forget about the conference tomorrow...",
        content: "This is a detailed email about the conference tomorrow. Here are all the details...",
        date: "21/01/2025, 18:34:27"
      },
      {
        id: 2,
        subject: "Welcome Email",
        recipient: ["participant", "voluntary"],
        preview: "Welcome to the event!",
        content: "Thank you for signing up for the event. We are excited to have you...",
        date: "22/01/2025, 18:34:27"
      },
      {
        id: 3,
        subject: "Thank You Email",
        recipient: ["voluntary"],
        preview: "Thank you for attending...",
        content: "We appreciate your participation in the event. Here's a summary of the conference...",
        date: "23/01/2025, 18:34:27"
      },
    ],
  }),
  actions: {
    addNotification(notification) {
      try {
        this.notifications.push(notification);
      } catch (error) {
        console.error('Error adding notification:', error);
      }
    },
    removeNotification(id) {
      try {
        this.notifications = this.notifications.filter((n) => n.id !== id);
      } catch (error) {
        console.error('Error removing notification:', error);
      }
    },
  },
  getters: {
    totalConferences: (state) => {
      return state.conferences.length;
    },
    notificationsByRole: (state) => {
      return (role) => state.notifications.filter(notification => notification.role === role);
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'notifications',
        storage: localStorage,
      },
    ],
  },
});
