<template>
    <div>
      <Header />
  
      <div class="pt-24 flex justify-center items-center">
        <div class="max-w-4xl w-full p-6 bg-white rounded-lg flex my-12">
          <!-- Coluna Esquerda: Imagem do Palestrante -->
          <div class="w-1/2 flex justify-center">
            <img
              :src="speaker.image"
              :alt="speaker.name"
              class="w-72 h-[420px] object-cover rounded-lg shadow-md"
            />
          </div>
  
          <!-- Coluna Direita: Informações do Palestrante -->
          <div class="w-1/2 pl-6">
            <!-- Nome com Gradiente -->
            <h1
              class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 mb-4"
            >
              {{ speaker.name }}
            </h1>
  
            <!-- Job do Palestrante -->
            <p class="text-xl text-gray-600 mb-4">{{ speaker.job }}</p>
  
            <!-- Descrição do Palestrante -->
            <p class="text-base text-gray-700">
              {{ speaker.description }}
            </p>
          </div>
        </div>
      </div>
  
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";
  import { useSpeakersStore } from "@/stores/speakers"; // Importa a store Pinia
  import { computed } from "vue";
  import { useRoute } from "vue-router"; // Importa para acessar a rota atual
  
  export default {
    components: {
      Header,
      Footer,
    },
    setup() {
      const speakersStore = useSpeakersStore(); // Instância da store Pinia
      const route = useRoute(); // Obtém a rota atual
  
      // Computed para buscar o palestrante pelo ID da rota
      const speaker = computed(() => {
        const id = parseInt(route.params.id); // Converte o ID da rota para inteiro
        return speakersStore.getSpeakerById(id); // Busca o palestrante na store
      });
  
      return {
        speaker,
      };
    },
  };
  </script>
  