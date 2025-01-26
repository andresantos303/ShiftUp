<script>
import { useRoute } from "vue-router";
import HeaderP from "../../components/HeaderP.vue";
import Button from "../../components/ui/button.vue";
import { useUsersStore } from "@/stores/users";
import { computed, ref } from "vue";

export default {
  components: {
    HeaderP,
    Button,
  },
  setup() {
    const usersStore = useUsersStore();
    const route = useRoute();
    const id = parseInt(route.params.id);

    // Computed para obter o user da store
    const user = computed(() => usersStore.getUserById(id));

    // Clonamos os dados do user para edição (incluindo 'photo')
    const editableUser = ref({
      ...user.value,
      confirmPassword: "",
    });

    // Atualizar perfil
    const updateProfile = () => {
      if (editableUser.value.password !== editableUser.value.confirmPassword) {
        alert("As senhas não coincidem.");
        return;
      }

      usersStore.updateUser(editableUser.value);

      alert("Perfil atualizado com sucesso!");
    };

    // Atualizar a foto de perfil
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          editableUser.value.photo = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    // Mock para conquistas (com status para diferenciar)
    const achievements = ref([
      { description: "Participou da Maratona Tech 2023", completed: true },
      { description: "Concluiu o Workshop de Inteligência Artificial", completed: true },
      { description: "Ganhou o Hackathon de Inovação 2022", completed: true },
      { description: "", completed: false }, // Conquista ainda não alcançada
    ]);


    return {
      user,
      editableUser,
      updateProfile,
      handleFileChange,
      achievements,
    };
  },
};
</script>

<template>
  <div>
    <HeaderP />
    <div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <form @submit.prevent="updateProfile" class="space-y-6">
        <!-- Foto de Perfil -->
        <div class="flex flex-col items-center space-y-4">
          <img :src="editableUser.photo || '/images/profile-icon.png'" alt="Foto de perfil"
            class="w-24 h-24 rounded-full border-2 border-gray-300" />
          <label for="profilePictureInput" class="cursor-pointer text-sm font-medium text-blue-600 hover:underline">
            Alterar foto de perfil
          </label>
          <input type="file" id="profilePictureInput" @change="handleFileChange" accept="image/*" class="hidden" />
        </div>

        <!-- Nome -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
            Nome
          </label>
          <input v-model="editableUser.name" type="text" id="name" placeholder="Digite seu nome"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input v-model="editableUser.email" type="email" id="email" placeholder="Digite seu email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <!-- Nova Senha -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Nova Senha
          </label>
          <input v-model="editableUser.password" type="password" id="password" placeholder="Digite sua nova senha"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <!-- Confirmar Senha -->
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
            Confirmar Senha
          </label>
          <input v-model="editableUser.confirmPassword" type="password" id="confirmPassword"
            placeholder="Confirme sua nova senha"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <!-- Botão Save Changes -->
        <div class="text-right">
          <Button :label="'Salvar Alterações'" :to="'#'" :bgColor="'bg-custom-gradient'" :textColor="'text-white'"
            :additionalClasses="'hover:opacity-90 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'" />
        </div>
      </form>

      <!-- Conquistas (Linha do Tempo) -->
      <div class="mt-10">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Conquistas</h2>
        <div class="relative border-l border-gray-300">
          <div v-for="(achievement, index) in achievements" :key="index" class="mb-6 ml-4">
            <div :class="[
              'absolute -left-2.5 w-5 h-5 rounded-full border-2',
              achievement.completed ? 'bg-blue-500 border-white' : 'bg-gray-300 border-gray-200',
            ]"></div>
            <div :class="[
              'mt-1 text-base font-medium',
              achievement.completed ? 'text-gray-700' : 'text-gray-400',
            ]">
              {{ achievement.description || 'Conquista ainda não desbloqueada' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
