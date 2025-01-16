<template>
  <div
    class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8 hover:shadow-lg transition-shadow duration-300">
    <h3 class="mb-4 text-2xl font-semibold">{{ title }}</h3>
    <p class="font-light text-gray-500 sm:text-lg">{{ description }}</p>
    <div class="flex justify-center items-baseline my-8">
      <span class="mr-2 text-5xl font-extrabold">{{ price }}</span>
      <span class="text-gray-500">{{ priceSuffix }}</span>
    </div>
    <ul role="list" class="mb-8 space-y-4 text-left">
      <li v-for="(benefit, index) in benefits" :key="index" class="flex items-center space-x-3">
        <svg class="flex-shrink-0 w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"></path>
        </svg>
        <span>{{ benefit }}</span>
      </li>
    </ul>
    <button @click="buyTicket()" class="inline-flex items-center justify-center rounded-full px-8 py-3 bg-custom-gradient text-white">Buy ticket</button>
  </div>
</template>

<script>
import Button from "@/components/ui/button.vue";
import { useTicketsStore } from "@/stores/tickets";
import router from "@/router";

export default {
  name: "TicketCard",
  components: {
    Button
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    priceSuffix: {
      type: String,
      default: "/ticket"
    },
    benefits: {
      type: Array,
      required: true
    },
  },
  methods: {
    buyTicket() {
      const isAuthenticated = localStorage.getItem("isAuthenticated");

      if (isAuthenticated === "true") {
        const user = JSON.parse(localStorage.getItem("user"));
        const ticketName = this.title;
        if (user && user.id) {
          const ticketsStore = useTicketsStore();
          ticketsStore.purchaseTicket(ticketName, user.id);
          alert("Ticket purchased successfully!");
          router.push("/");
        } else {
          console.error("User data is missing from localStorage.");
        }
      } else {
        alert("You need to be logged in to purchase a ticket.");
        router.push("login");
      }
    }
  }
};
</script>