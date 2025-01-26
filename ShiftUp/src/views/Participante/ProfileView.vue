<script>
import { useRoute } from "vue-router";
import HeaderP from "../../components/HeaderP.vue";
import Button from "../../components/ui/button.vue";
import { useUsersStore } from "@/stores/users";
import { useConferencesStore } from "@/stores/conferences";
import { computed, ref } from "vue";

export default {
  components: {
    HeaderP,
    Button,
  },
  setup() {
    const route = useRoute();
    const id = parseInt(route.params.id);

    const usersStore = useUsersStore();
    const conferencesStore = useConferencesStore();

    // Usuário atual
    const user = computed(() => usersStore.getUserById(id));

    // Clonagem para edição de perfil
    const editableUser = ref({
      ...user.value,
      confirmPassword: "",
    });

    // Atualizar Perfil
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

    /**
     * Conquistas dinâmicas baseadas nas conferências do usuário.
     * 1) Se o user participa de pelo menos 1 conferência, adicionamos "Participou no evento ShiftUp"
     * 2) Para cada conferência, inserimos "Participou da {conference.title}"
     */
    const dynamicAchievements = computed(() => {
      if (!user.value) return [];

      const userConfIds = user.value.conferences;
      if (!userConfIds || userConfIds.length === 0) {
        // Se o usuário não participa de nenhuma conferência, retorna vazio
        return [];
      }

      // Monta o array de conquistas
      const achievements = [];
      // Primeira conquista quando existe pelo menos 1 conferência
      achievements.push({
        description: "Participou no evento ShiftUp",
        completed: true,
      });

      // Para cada conferência do user, cria uma conquista
      const userConferences = conferencesStore.conferences.filter((c) =>
        userConfIds.includes(c.id)
      );
      userConferences.forEach((conf) => {
        achievements.push({
          description: `Participou da ${conf.title}`,
          completed: true,
        });
      });

      return achievements;
    });

    return {
      user,
      editableUser,
      updateProfile,
      handleFileChange,
      dynamicAchievements,
    };
  },
};
</script>

<template>
  <div>
    <HeaderP />
    <div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <!-- Formulário do Perfil -->
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

        <!-- Botão "Guardar Alterações" -->
        <div class="text-right">
          <Button :label="'Guardar Alterações'" @click="updateProfile" :to="''" :bgColor="'bg-custom-gradient'"
            :textColor="'text-white'"
            :additionalClasses="'hover:opacity-90 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'" />
        </div>
      </form>

      <!-- Conquistas (Linha do Tempo) -->
      <div class="mt-10">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Conquistas</h2>

        <div class="relative border-l border-gray-300" v-if="dynamicAchievements.length > 0">
          <div v-for="(achievement, index) in dynamicAchievements" :key="index" class="mb-6 ml-4">
            <div :class="[
              'absolute -left-2.5 w-5 h-5 rounded-full border-2',
              achievement.completed ? 'bg-blue-500 border-white' : 'bg-gray-300 border-gray-200',
            ]"></div>
            <div :class="[
              'mt-1 text-base font-medium',
              achievement.completed ? 'text-gray-700' : 'text-gray-400',
            ]">
              {{ achievement.description }}
            </div>
          </div>
        </div>

        <!-- Caso o usuário não participe de nenhuma conferência -->
        <div v-else class="mt-2 text-gray-500 text-sm italic">
          Nenhuma conquista registrada.
        </div>
      </div>
    </div>
  </div>
</template>
