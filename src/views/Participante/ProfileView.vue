<script>
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

    // Simulação: Pegando o ID do usuário logado
    const loggedUserId = 1; // Você pode dinamicamente obter isso da autenticação

    // Computed para obter o usuário logado
    const user = computed(() => usersStore.getUserById(loggedUserId));

    // Clonamos os dados do usuário para edição
    const editableUser = ref({ ...user.value });

    // Atualizar perfil
    const updateProfile = () => {
      if (editableUser.value.password !== editableUser.value.confirmPassword) {
        alert("As senhas não coincidem.");
        return;
      }

      // Atualizando o usuário na store
      usersStore.updateUser(editableUser.value);

      alert("Perfil atualizado com sucesso!");
    };

    // Atualizar a foto de perfil
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          editableUser.value.profilePicture = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    return {
      user,
      editableUser,
      updateProfile,
      handleFileChange,
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
          <img :src="editableUser.profilePicture || 'https://via.placeholder.com/150'" alt="Foto de perfil"
            class="w-24 h-24 rounded-full border-2 border-gray-300" />
          <label for="profilePictureInput" class="cursor-pointer text-sm font-medium text-blue-600 hover:underline">
            Alterar foto de perfil
          </label>
          <input type="file" id="profilePictureInput" @change="handleFileChange" accept="image/*" class="hidden" />
        </div>

        <!-- Nome -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Nome</label>
          <input v-model="editableUser.name" type="text" id="name" placeholder="Digite seu nome"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input v-model="editableUser.email" type="email" id="email" placeholder="Digite seu email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <!-- Nova Senha -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Nova Senha</label>
          <input v-model="editableUser.password" type="password" id="password" placeholder="Digite sua nova senha"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <!-- Confirmar Senha -->
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Confirmar Senha</label>
          <input v-model="editableUser.confirmPassword" type="password" id="confirmPassword"
            placeholder="Confirme sua nova senha"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <!-- Botão Save Changes -->
        <div class="text-right">
          <Button
            :label="'Salvar Alterações'"
            :to="'#'"
            :bgColor="'bg-custom-gradient'"
            :textColor="'text-white'"
            :additionalClasses="'hover:opacity-90 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'"
          />
        </div>
      </form>
    </div>
  </div>
</template>
