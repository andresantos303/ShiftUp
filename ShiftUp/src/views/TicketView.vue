<template>
  <Header />
  <div class="pt-24">
    <section>
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 class="mb-4 text-4xl tracking-tight font-bold bg-custom-gradient bg-clip-text text-transparent">
            OUR TICKETS
          </h2>
          <p class="mb-5 font-light text-gray-500 sm:text-xl">
            Here at our event, we bring the latest in technology and innovation
            to your team. Don't miss out!
          </p>
        </div>
        <!-- Utilizando v-for para exibir os tickets da store -->
        <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          <TicketCard v-for="ticket in tickets" :key="ticket.id" :title="ticket.name" :description="ticket.description" :price="`$${ticket.price}`" priceSuffix="/ticket" :benefits="ticket.benefits" link="/login"/>
        </div>
      </div>
    </section>
  </div>
  <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from '@/components/Footer.vue';
import button from "@/components/ui/button.vue";
import TicketCard from "@/components/ui/ticketCard.vue";
import { useTicketsStore } from "@/stores/tickets"; // Importando a store

export default {
  components: {
    Header,
    Footer,
    TicketCard,
    button,
  },
  setup() {
    // Acessando a store
    const ticketsStore = useTicketsStore();
    const tickets = ticketsStore.tickets; // Dados da store

    return {
      tickets,
    };
  },
};
</script>
