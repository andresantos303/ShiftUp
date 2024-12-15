<template>
  <section class="p-8 flex justify-center items-center mx-auto max-w-[1200px]">
    <div class="flex flex-col md:flex-row gap-8 w-full max-w-screen-xl">
      <!-- Coluna de Texto -->
      <div class="flex-1 flex flex-col">
        <h1
          class="text-3xl md:text-4xl font-bold bg-custom-gradient bg-clip-text text-transparent mb-4 md:mb-8"
        >
          {{ title }}
        </h1>
        <p class="text-base text-gray-600 leading-relaxed mb-4">
          {{ description }}
        </p>

        <!-- Botão opcional -->
        <!-- <div v-if="showButton" class="mt-4 md:mt-8">
          <Button :to="buttonLink" :label="buttonLabel" bg-color="white" />
        </div> -->
      </div>

      <!-- Coluna de Imagem -->
      <div class="flex-1 flex justify-center items-center">
      <img
          :src="imageSrc"
          :alt="imageAlt"
          class="max-w-full max-h-80 object-contain rounded-lg"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "InfoSection",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
      required: true,
    },
    /* showButton: {
        type: Boolean,
        default: false, 
      },
      buttonLabel: {
        type: String,
        default: "Buy Ticket", 
      },
      buttonLink: {
        type: String,
        default: "/tickets", 
      } */
  },
};
</script>
