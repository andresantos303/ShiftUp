<template>
  <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <!-- Menu Hamburger and Logo -->
        <div class="flex items-center justify-start rtl:justify-end">
          <button
            @click="toggleSidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="logo-sidebar">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
          </button>
          <a href="#" class="flex ms-2 md:me-24">
            <img src="/public/images/LogoA.png" class="h-8 me-3" alt="Logo Admin" /> <!-- aqui tem que ir para admin view -->
          </a>
        </div>

        <!-- User Menu -->
        <div class="flex items-center">
          <div class="flex items-center ms-3 relative">
            <img
              class="w-8 h-8 rounded-full cursor-pointer"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="user photo"
              @click="toggleDropdown"
            />
            <!-- Dropdown Menu -->
            <div
              v-if="dropdownOpen"
              class="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              <ul class="py-2">
                <li>
                  <button
                    @click="profile"
                    class="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    @click="logout()"
                    class="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Sidebar -->
  <aside
    :class="{'-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen}"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto">
      <ul class="space-y-2 font-medium">
        <li><RouterLink :to="`/admin/${id}/participants`" class="nav-link block px-6 py-2.5 text-gray-700 hover:bg-custom-gradient hover:text-white">Participants</RouterLink></li>
        <li><RouterLink :to="`/admin/${id}/orders`" class="nav-link block px-6 py-2.5 text-gray-700 hover:bg-custom-gradient hover:text-white">Orders</RouterLink></li>
        <li><RouterLink :to="`/admin/${id}/products`" class="nav-link block px-6 py-2.5 text-gray-700 hover:bg-custom-gradient hover:text-white">Products</RouterLink></li>
        <li><RouterLink :to="`/admin/${id}/volunteers`" class="nav-link block px-6 py-2.5 text-gray-700 hover:bg-custom-gradient hover:text-white">Volunteers</RouterLink></li>
        <li><RouterLink :to="`/admin/${id}/speakers`" class="nav-link block px-6 py-2.5 text-gray-700 hover:bg-custom-gradient hover:text-white">Speakers</RouterLink></li>
        <li><RouterLink :to="`/admin/${id}/communication`" class="nav-link block px-6 py-2.5 text-gray-700 hover:bg-custom-gradient hover:text-white">Communication</RouterLink></li>
      </ul>
    </div>
  </aside>

  <div class="p-4 sm:ml-64">
    <!-- Page content goes here -->
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
    const sidebarOpen = ref(false);
    const dropdownOpen = ref(false);

    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value;
    };

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    const logout = () => {
      localStorage.removeItem("isAuthenticated")
      localStorage.removeItem("user")
      router.push("/")
    };

    const profile = () => {
      console.log("User profile");
    };

    return { id, sidebarOpen, dropdownOpen, toggleSidebar, toggleDropdown, logout, profile };
  },
};
</script>
