<template>
  <div class="flex items-center justify-center">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[1200px]">
      <!-- Renderiza as colunas dinâmicas -->
      <div v-for="(column, index) in formattedColumns" :key="index" class="grid gap-4">
        <!-- Renderiza os itens de cada coluna -->
        <div v-for="(speaker, imgIndex) in column" :key="imgIndex" class="relative cursor-pointer"
          @click="goToSpeakerDetails(speaker.id)">
          <!-- Imagem do Palestrante -->
          <img class="h-full max-w-full rounded-lg" :src="speaker.image" :alt="speaker.name" />
          <!-- Informações do Palestrante -->
          <div class="absolute bottom-0 left-0 right-0 bg-white p-4 rounded-b-lg text-left">
            <h3 class="text-lg font-semibold">{{ speaker.name }}</h3>
            <p class="text-sm text-gray-500">{{ speaker.job }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useSpeakersStore } from "@/stores/speakers";
import { useRouter } from "vue-router";

export default {
  name: "SpeakersGrid",
  props: {
    columns: {
      type: Number,
      default: 4, // Número de colunas ajustável
    },
  },
  computed: {
    formattedColumns() {
      // Obtém os dados da store Pinia
      const speakersStore = useSpeakersStore();
      const speakers = speakersStore.speakers;

      // Divide os palestrantes em "N" colunas (baseado no prop `columns`)
      const columns = Array.from({ length: this.columns }, () => []);
      speakers.forEach((speaker, index) => {
        columns[index % this.columns].push(speaker); // Adiciona cada palestrante na coluna correspondente
      });
      return columns;
    },
  },
  async created() {
    const speakersStore = useSpeakersStore();
    try {
      await speakersStore.fetchTodos(); // Chama a ação fetchTodos() para obter os dados
    } catch (error) {
      console.error("Error fetching speakers:", error.message);
    }
  },
  setup() {
    const router = useRouter();

    // Função para redirecionar para a página de detalhes do palestrante
    const goToSpeakerDetails = (id) => {
      router.push({ name: "SpeakerDetails", params: { id } });
    };

    return {
      goToSpeakerDetails,
    };
  },
};
</script>
