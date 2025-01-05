<template>
  <div class="flex items-center justify-center">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[1200px]">
      <div v-for="speaker in speakers" :key="speaker.id" class="grid gap-4">
        <div class="relative">
          <img
            class="h-auto max-w-full rounded-lg"
            :src="speaker.photo"
            :alt="speaker.name"
          />
          <div class="absolute bottom-0 left-0 right-0 bg-white p-4 rounded-b-lg text-left">
            <h3 class="text-lg font-semibold">{{ speaker.name }}</h3>
            <p class="text-sm text-gray-500">{{ speaker.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useSpeakersStore } from "@/stores/speakers";

export default {
  name: "SpeakersSection",
  data() {
    return {
      speakers: [],
    };
  },
  async created() {
    const speakersStore = useSpeakersStore();
    try {
      await speakersStore.fetchTodos();
      this.speakers = speakersStore.speakers;
    } catch (error) {
      console.error("Error fetching speakers:", error.message);
    }
  },
};
</script>


