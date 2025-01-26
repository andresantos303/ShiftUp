<template>
  <HeaderP />
  <div class="container mx-auto pl-[232px] pt-8">
    <!-- Toggle para alternar entre "Eventos" e "Minha Agenda" -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex space-x-4">
        <button :class="toggleActive === 'events' ? 'font-bold text-blue-600' : 'text-gray-500'"
          @click="toggleActive = 'events'" class="py-2 px-4 rounded">
          Schedule
        </button>
        <button :class="toggleActive === 'myAgenda' ? 'font-bold text-blue-600' : 'text-gray-500'"
          @click="toggleActive = 'myAgenda'" class="py-2 px-4 rounded">
          My schedule
        </button>
      </div>
    </div>

    <!-- Secção de "Eventos" -->
    <div v-if="toggleActive === 'events'">
      <!-- Agora exibimos o length do array filtrado -->
      <h1 class="text-2xl font-bold mb-4">
        Total Conferences: {{ getConferences.length }}
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <EventCard v-for="conference in getConferences" :key="conference.id" :location="conference.category"
          :title="conference.title" :date="conference.date" :time="conference.time" :locationDetail="conference.local"
          :speakers="conference.speakers" :hasParticipateButton="true" @click="participate(conference.id)" />
      </div>
    </div>

    <!-- Seção de "My schedule" -->
    <div v-else>
      <!-- Mostramos o length do array myAgenda -->
      <h1 class="text-2xl font-bold mb-4">
        Total Conferences: {{ myAgenda.length }}
      </h1>

      <div v-if="myAgenda.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <EventCard v-for="conference in myAgenda" :key="conference.id" :location="conference.category"
          :title="conference.title" :date="conference.date" :time="conference.time" :locationDetail="conference.local"
          :speakers="conference.speakers" :hasStopParticipationButton="true" @click="removeFromAgenda(conference.id)" />
      </div>
      <div v-else class="flex flex-col items-center justify-center mt-16">
        <p class="text-gray-500 text-lg">
          You don't have any events in your calendar yet.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import HeaderP from "../../components/HeaderP.vue";
import Button from "../../components/ui/button.vue";
import EventCard from "@/components/ui/EventCard.vue";

import { useConferencesStore } from "@/stores/conferences";
import { useUsersStore } from "@/stores/users";
import { useSpeakersStore } from "@/stores/speakers";

export default {
  components: {
    HeaderP,
    Button,
    EventCard,
  },
  setup() {
    // Identifica o user atual via rota
    const route = useRoute();
    const userId = parseInt(route.params.id);

    // Stores
    const conferencesStore = useConferencesStore();
    const usersStore = useUsersStore();
    const speakersStore = useSpeakersStore();

    const toggleActive = ref("myAgenda");

    // Usuário atual
    const currentUser = computed(() => usersStore.getUserById(userId));

    // Mapeia conferências substituindo `speakers: ["Jane Smith", ...]` por objetos
    const mergedConferences = computed(() => {
      return conferencesStore.conferences.map((conf) => {
        const mappedSpeakers = conf.speakers.map((speakerName) => {
          const foundSpeaker = speakersStore.speakers.find(
            (sp) => sp.name === speakerName
          );
          if (foundSpeaker) {
            return {
              image: foundSpeaker.image,
              name: foundSpeaker.name,
              title: foundSpeaker.title || "Speaker",
            };
          }
          return {
            image: "https://placehold.co/400",
            name: speakerName,
            title: "Speaker",
          };
        });
        return { ...conf, speakers: mappedSpeakers };
      });
    });

    // Filtra as conferências para NÃO exibir as que o user já participa
    const getConferences = computed(() => {
      if (!currentUser.value) return [];
      return mergedConferences.value.filter(
        (conf) =>
          conf.type === currentUser.value.ticket &&
          !currentUser.value.conferences.includes(conf.id)
      );
    });

    // "My schedule": exibe as que o user participa
    const myAgenda = computed(() => {
      if (!currentUser.value) return [];
      return mergedConferences.value.filter(
        (conf) =>
          conf.type === currentUser.value.ticket &&
          currentUser.value.conferences.includes(conf.id)
      );
    });

    // Ações
    const participate = (conferenceId) => {
      usersStore.addConferenceToUser(userId, conferenceId);
      alert("Conference added successfully");
    };

    const removeFromAgenda = (conferenceId) => {
      const user = currentUser.value;
      if (!user) return;
      user.conferences = user.conferences.filter((id) => id !== conferenceId);
      usersStore.updateUser({ ...user });
      alert("Conference removed successfully");
    };

    // Buscar lista de speakers ao montar
    onMounted(async () => {
      try {
        await speakersStore.fetchTodos();
      } catch (error) {
        console.error("Error fetching speakers:", error.message);
      }
    });

    return {
      toggleActive,
      getConferences,
      myAgenda,
      participate,
      removeFromAgenda,
    };
  },
};
</script>
