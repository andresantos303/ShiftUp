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
        <!-- aquii seria um v-for  -->
        <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          <TicketCard title="Starter" description="Best option for personal use & for your next project." price="$29"
            priceSuffix="/ticket" :benefits="['Access to keynotes', 'No setup, or hidden fees']" link="/login" />
          <TicketCard title="Company" description="Great for teams, extended support included." price="$99"
            priceSuffix="/ticket" :benefits="['Priority seating', 'No setup, or hidden fees']" link="/login" />
          <TicketCard title="Enterprise" description="For large teams, full access and premium support." price="$499"
            priceSuffix="/ticket" :benefits="['Exclusive sessions', 'No setup, or hidden fees']" link="/login" />
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

export default {
  components: {
    Header,
    Footer,
    TicketCard,
    button
  },
};
</script>
