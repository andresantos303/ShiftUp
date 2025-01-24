<template>
  <div class="bg-custom-gradient h-screen flex items-center justify-center">
    <div class="text-center text-white px-6">
      <!-- Título em negrito -->
      <h1 class="text-6xl font-bold">404</h1>
      
      <!-- Subtítulo OOPS -->
      <p class="text-xl font-semibold mt-4">Oops, Nothing Here...</p>

      <!-- Descrição -->
      <p class="text-lg mt-4 mb-6 mx-auto max-w-[1200px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>

      <!-- Botão -->
      <Button to="/" label="Back to home page" bgColor="bg-white" textColor="text-blue-500" />
    </div>
  </div>
</template>

<script>
// Corrigindo a importação do botão para garantir que o Vue encontre o componente corretamente.
import Button from '@/components/ui/button.vue'; 

export default {
  components: {
    Button, // Usando o nome correto do componente com a primeira letra maiúscula
  },
  name: "NotFound",
};
</script>
