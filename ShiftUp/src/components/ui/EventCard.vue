<template>
    <div class="p-4 border rounded-lg shadow-sm bg-white">
      <!-- Local e Data -->
      <div class="flex items-center justify-between">
        <div class="bg-custom-gradient text-white py-1 px-2 rounded-full text-sm font-medium">
          {{ location }}
        </div>
        <div class="text-gray-600 text-sm">
          {{ date }} | {{ time }}
        </div>
      </div>
  
      <!-- Título -->
      <h2 class="font-bold text-lg mt-4">{{ title }}</h2>
  
      <!-- Localização -->
      <div class="flex items-center mt-2 text-gray-600 text-sm">
        <i class="fas fa-map-marker-alt"></i>
        <span>{{ locationDetail }}</span>
      </div>
  
      <!-- Palestrantes -->
      <div class="flex items-center mt-4 gap-4 flex-wrap">
        <!-- Iterar sobre os palestrantes -->
        <div v-for="(speaker, index) in speakers" :key="index" class="flex items-center">
          <img :src="speaker.image" alt="Speaker" class="w-12 h-12 rounded-full"/>
          <div class="ml-2">
            <p class="font-medium">{{ speaker.name }}</p>
            <p class="text-sm text-gray-500">{{ speaker.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      location: String,
      title: String,
      date: String,
      time: String,
      locationDetail: String,
      speakers: {
        type: Array,
        required: true,
      },
    },
  };
  </script>