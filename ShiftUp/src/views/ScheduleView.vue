<template>
  <Header />
  <div class="pt-32 pb-32">
    <div class="px-4 lg:px-16">
      <h1 class="text-2xl font-bold mb-8 text-center">Event Schedule</h1>

      <!-- Tag de datas -->

      <!-- nao esta a funcionar ainda -->
      <div class="flex justify-center mb-8">
        <div class="px-4 py-2 mx-2 rounded-full cursor-pointer"
          :class="{ 'bg-custom-gradient text-white': selectedDate === 'november11', 'bg-gray-200 text-gray-600': selectedDate !== 'november11' }"
          @click="selectDate('november11')">
          November 11
        </div>
        <div class="px-4 py-2 mx-2 rounded-full cursor-pointer"
          :class="{ 'bg-custom-gradient text-white': selectedDate === 'november12', 'bg-gray-200 text-gray-600': selectedDate !== 'november12' }"
          @click="selectDate('november12')">
          November 12
        </div>
        <div class="px-4 py-2 mx-2 rounded-full cursor-pointer"
          :class="{ 'bg-custom-gradient text-white': selectedDate === 'november13', 'bg-gray-200 text-gray-600': selectedDate !== 'november13' }"
          @click="selectDate('november13')">
          November 13
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <!-- aquii deve ser um v-for conforme as palestras que tivermos -->
        <EventCard location="Main Stage" title="Welcome to Shift Up" date="November 11" time="6.00PM - 6.20PM"
          locationDetail="Centre Stage MEO Arena" :speakers="[
            { image: 'https://placehold.co/400', name: 'Etosha Cave', title: 'Co-founder & Chief Science Officer' },
            { image: 'https://placehold.co/400', name: 'John Doe', title: 'CEO Example Corp' }
          ]" />

        <!-- Outro evento com apenas um palestrante -->
        <EventCard location="Innovation Hall" title="Future of Streaming" date="November 12" time="2.00PM - 3.00PM"
          locationDetail="Hall 3" :speakers="[
            { image: 'https://placehold.co/400', name: 'Jane Smith', title: 'VP of Engineering' }
          ]" />
        <EventCard location="Innovation Hall" title="Future of Streaming" date="November 12" time="2.00PM - 3.00PM"
          locationDetail="Hall 3" :speakers="[
            { image: 'https://placehold.co/400', name: 'Jane Smith', title: 'VP of Engineering' }
          ]" />
        <EventCard location="Innovation Hall" title="Future of Streaming" date="November 12" time="2.00PM - 3.00PM"
          locationDetail="Hall 3" :speakers="[
            { image: 'https://placehold.co/400', name: 'Jane Smith', title: 'VP of Engineering' }
          ]" />
        <EventCard location="Innovation Hall" title="Future of Streaming" date="November 12" time="2.00PM - 3.00PM"
          locationDetail="Hall 3" :speakers="[
            { image: 'https://placehold.co/400', name: 'Jane Smith', title: 'VP of Engineering' }
          ]" />
        <EventCard location="Innovation Hall" title="Future of Streaming" date="November 12" time="2.00PM - 3.00PM"
          locationDetail="Hall 3" :speakers="[
            { image: 'https://placehold.co/400', name: 'Jane Smith', title: 'VP of Engineering' }
          ]" />
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "@/components/Footer.vue";
import EventCard from "@/components/ui/EventCard.vue";

export default {
  components: {
    Header,
    Footer,
    EventCard,
  },
};
</script>
