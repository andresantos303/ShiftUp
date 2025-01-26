<template>
  <HeaderP />
  <div class="container mx-auto pl-[232px] pt-8">
    <!-- Toggle para alternar entre "Eventos" e "Minha Agenda" -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex space-x-4">
        <button :class="toggleActive === 'events' ? 'font-bold text-blue-600' : 'text-gray-500'"
          @click="toggleActive = 'events'" class="py-2 px-4 rounded">
          Eventos
        </button>
        <button :class="toggleActive === 'myAgenda' ? 'font-bold text-blue-600' : 'text-gray-500'"
          @click="toggleActive = 'myAgenda'" class="py-2 px-4 rounded">
          Minha Agenda
        </button>
      </div>
    </div>

    <!-- Seção de "Eventos" -->
    <div v-if="toggleActive === 'events'">
      <h1 class="text-2xl font-bold mb-4">
        Total Conferences: {{ totalConferences }}
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <!-- Agora getConferences filtra apenas as confs que o user NÃO está participando -->
        <EventCard v-for="conference in getConferences" :key="conference.id" :location="conference.category"
          :title="conference.title" :date="conference.date" :time="conference.time" :locationDetail="conference.local"
          :speakers="conference.speakers" :hasParticipateButton="true" @click="participate(conference.id)" />
      </div>
    </div>

    <!-- Seção de "Minha Agenda" -->
    <div v-else>
      <div v-if="myAgenda.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <EventCard v-for="conference in myAgenda" :key="conference.id" :location="conference.category"
          :title="conference.title" :date="conference.date" :time="conference.time" :locationDetail="conference.local"
          :speakers="conference.speakers" :hasStopParticipationButton="true" @click="removeFromAgenda(conference.id)" />
      </div>
      <div v-else class="flex flex-col items-center justify-center mt-16">
        <p class="text-gray-500 text-lg">
          Você ainda não tem eventos na sua agenda.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
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
          // Busca no speakersStore
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

        return {
          ...conf,
          speakers: mappedSpeakers,
        };
      });
    });

    // Filtra as conferências para NÃO exibir as que o user já participa
    const getConferences = computed(() => {
      if (!currentUser.value) return [];
      return mergedConferences.value.filter(
        (conf) => !currentUser.value.conferences.includes(conf.id)
      );
    });

    // Minha Agenda: exibe as que o user participa
    const myAgenda = computed(() => {
      if (!currentUser.value) return [];
      return mergedConferences.value.filter((conf) =>
        currentUser.value.conferences.includes(conf.id)
      );
    });

    // Getter para total de conferências
    const totalConferences = computed(() => conferencesStore.totalConferences);

    // Ações
    const participate = (conferenceId) => {
      usersStore.addConferenceToUser(userId, conferenceId);
      alert("Conference added successfully")
    };

    const removeFromAgenda = (conferenceId) => {
      // Remove o ID da conf do array de conferences do user
      const user = currentUser.value;
      if (!user) return;
      user.conferences = user.conferences.filter((id) => id !== conferenceId);
      usersStore.updateUser({ ...user });
      alert("Conference removed successfully")

    };

    return {
      toggleActive,
      getConferences,
      myAgenda,
      totalConferences,
      participate,
      removeFromAgenda,
    };
  },
  async created() {
    const speakersStore = useSpeakersStore();
    try {
      await speakersStore.fetchTodos();
    } catch (error) {
      console.error("Error fetching speakers:", error.message);
    }
  },
};
</script>
