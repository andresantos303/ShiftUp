<template>
  <Header />
  <div class="pt-32 pb-32">
    <div class="px-4 lg:px-16">
      <h1 class="text-2xl font-bold mb-8 text-center">Event Schedule</h1>

      <div class="flex justify-center mb-8">
        <div
          class="px-4 py-2 mx-2 rounded-full cursor-pointer"
          :class="{ 'bg-custom-gradient text-white': selectedDate === 'November 11', 'bg-gray-200 text-gray-600': selectedDate !== 'November 11' }"
          @click="selectDate('November 11')">
          November 11
        </div>
        <div
          class="px-4 py-2 mx-2 rounded-full cursor-pointer"
          :class="{ 'bg-custom-gradient text-white': selectedDate === 'November 12', 'bg-gray-200 text-gray-600': selectedDate !== 'November 12' }"
          @click="selectDate('November 12')">
          November 12
        </div>
        <div
          class="px-4 py-2 mx-2 rounded-full cursor-pointer"
          :class="{ 'bg-custom-gradient text-white': selectedDate === 'November 13', 'bg-gray-200 text-gray-600': selectedDate !== 'November 13' }"
          @click="selectDate('November 13')">
          November 13
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <EventCard
          v-for="conference in filteredConferences"
          :key="conference.id"
          :location="conference.category"
          :title="conference.title"
          :date="conference.date"
          :time="conference.time"
          :locationDetail="conference.local"
          :speakers="conference.speakers.map(speaker => ({ image: 'https://placehold.co/400', name: speaker, title: 'Speaker' }))"
        />
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import { ref, computed } from "vue";
import Header from "../components/Header.vue";
import Footer from "@/components/Footer.vue";
import EventCard from "@/components/ui/EventCard.vue";
import { useConferencesStore } from "@/stores/conferences";

export default {
  components: {
    Header,
    Footer,
    EventCard,
  },
  setup() {
    const conferencesStore = useConferencesStore();

    const selectedDate = ref("November 11");

    const filteredConferences = computed(() =>
      conferencesStore.conferences.filter(
        (conference) => conference.date === selectedDate.value
      )
    );

    const selectDate = (date) => {
      selectedDate.value = date;
    };

    return {
      selectedDate,
      filteredConferences,
      selectDate,
    };
  },
};
</script>
