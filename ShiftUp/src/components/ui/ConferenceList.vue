<template>
    <div>
      <Button label="+ Add New Event" 
              to="#" 
              :bgColor="'bg-custom-gradient'" 
              :textColor="'text-white'"
              additionalClasses="w-full py-2 mb-4 text-center" 
              @click.native="$emit('create-new-event')" />
  
      <p class="text-lg font-bold mb-4">Conferences</p>
  
      <!-- Lista de Cards -->
      <ConferenceCard 
        v-for="conference in conferences" 
        :key="conference.id" 
        :conference="conference" 
        @select-conference="$emit('select-conference', conference)" />
    </div>
  </template>
  
  <script>
  import ConferenceCard from './ConferenceCard.vue';
  import Button from '@/components/ui/button.vue';
  
  export default {
    components: {
      ConferenceCard,
      Button,
    },
    props: {
      conferences: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  