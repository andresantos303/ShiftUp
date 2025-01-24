<template>
  <HeaderP />
  <div class="container mx-auto pl-[232px]">
    <h1 class="text-2xl font-bold mb-4">Total Conferences: {{ totalConferences }}</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">

      <!-- se o id da pessoa tiver no array participants a label do tbn fica partipating -->
      <EventCard v-for="conference in getConferences" :key="conference.id" :location="conference.category"
        :title="conference.title" :date="conference.date" :time="conference.time" :locationDetail="conference.local"
        :speakers="conference.speakers.map(speaker => ({ image: 'https://placehold.co/400', name: speaker, title: 'Speaker' }))"
        :hasParticipateButton="true" @participate="() => participate(conference.id)">
      </EventCard>
    </div>
  </div>
</template>

<script>
import HeaderP from "../../components/HeaderP.vue";
import Button from "../../components/ui/button.vue";
import EventCard from "@/components/ui/EventCard.vue";
import { useConferencesStore } from "@/stores/conferences";

export default {
  components: {
    HeaderP,
    Button,
    EventCard,
  },
  setup() {
    const store = useConferencesStore();
    const { totalConferences, conferencesByLocal } = store;

    const participate = (conferenceId) => {
      console.log("Participating in conference with ID:", conferenceId);
      // Add participation logic
    };

    return {
      totalConferences,
      conferencesByLocal,
      getConferences: store.conferences,
      participate,
    };
  },
};
</script>
