<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md">
      <div class="flex m-8 h-16 border-b">
        <img alt="ShiftUp Participante Logo" class="h-10" src="@/assets/LogoP.png" />
      </div>
      <nav class="mt-6">
        <RouterLink :to="`/participante/${id}/events`"
          class="block px-6 py-2.5 text-gray-700 hover:bg-custom-gradient hover:text-white">
          Events
        </RouterLink>
        <RouterLink :to="`/participante/${id}/communication`"
          class="block px-6 py-2.5 text-gray-700 hover:bg-custom-gradient hover:text-white">
          Communication
        </RouterLink>
        <RouterLink :to="`/participante/${id}/merchandising`"
          class="block px-6 py-2.5 text-gray-700 hover:bg-custom-gradient hover:text-white">
          Merchandising
        </RouterLink>
        <RouterLink :to="`/participante/${id}/volunteering`"
          class="block px-6 py-2.5 text-gray-700 hover:bg-custom-gradient hover:text-white">
          Volunteering
        </RouterLink>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1">
      <div class="flex items-center justify-end space-x-4 bg-white p-4">
        <!-- Notification Icon -->
        <div class="relative">
          <p>notification</p>
        </div>

        <!-- Participant Image -->
        <div class="relative">
          <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
            @click="toggleDropdown">
            <span class="sr-only">Open user menu</span>
            <img class="w-8 h-8 rounded-full" src="@/assets/profile-icon.png" alt="Participant Icon" />
          </button>
          <!-- Dropdown Menu -->
          <div v-if="dropdownOpen"
            class="z-50 absolute right-0 mt-2 w-48 bg-gray-50 border border-gray-200 divide-y divide-gray-200 rounded-lg shadow">
            <div class="px-4 py-3">
              <span class="block text-sm text-gray-900">Bonnie Green</span>
              <span class="block text-sm text-gray-500 truncate">name@flowbite.com</span>
            </div>
            <ul class="py-2">
            
              <li>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">Settings</a>
              </li>
            
              <li>
                <button @click="logout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Page Content -->
      <div class="mt-4">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script>
import { RouterLink, useRoute } from "vue-router";
import router from '@/router';
import { ref } from "vue";

export default {
  setup() {
    const route = useRoute();
    const id = route.params.id;
    const dropdownOpen = ref(false);

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    const logout = () => {
      localStorage.removeItem("isAuthenticated")
      router.push("/")
    };

    return { id, dropdownOpen, toggleDropdown, logout };
  },
};
</script>

<style scoped>
/* Custom hover for dropdown */
button:focus {
  outline: none;
}
</style>
