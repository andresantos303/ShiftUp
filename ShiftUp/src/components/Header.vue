<template>
  <nav class="bg-black fixed w-full z-20 top-0 left-0 ">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <!-- Logo Section -->
      <RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/public/images/logo.png" class="h-8" alt="ShiftUp Logo">
      </RouterLink>

      <!-- Actions and Hamburger Button -->
      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <RouterLink to="/login" class="hidden md:block text-white text-base px-8 py-3">
          Log In
        </RouterLink>
        <RouterLink to="/tickets" class="hidden md:block  bg-custom-gradient text-white text-base px-8 py-3 rounded-full">
          Buy Ticket
        </RouterLink>
        <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false" @click="toggleMenu">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14" aria-hidden="true">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>

      <!-- Navbar Links -->
      <div :class="['items-center justify-between w-full md:flex md:w-auto md:order-1', { hidden: !isMenuOpen }]" id="navbar-sticky">
        <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-700 rounded-lg bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-black">
          <li>
            <RouterLink to="/" class="block py-2 px-3 text-[#9A9A9A] rounded md:bg-transparent md:p-0 hover:text-white">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/speakers" class="block py-2 px-3 text-[#9A9A9A] rounded md:bg-transparent md:p-0 hover:text-white">Speakers</RouterLink>
          </li>
          <li>
            <RouterLink to="/schedule" class="block py-2 px-3 text-[#9A9A9A] rounded md:bg-transparent md:p-0 hover:text-white">Schedule</RouterLink>
          </li>
          <li>
            <RouterLink to="/tickets" class="block py-2 px-3 text-[#9A9A9A] rounded md:bg-transparent md:p-0 hover:text-white">Tickets</RouterLink>
          </li>
          <li class="md:hidden">
            <RouterLink to="/login" class="block py-2 px-3 text-white  hover:text-purple-500">Login</RouterLink>
          </li>
          <li class="md:hidden">
            <RouterLink to="/tickets" class="mt-8 inline-block bg-custom-gradient text-white text-base px-8 py-3 rounded-full">Buy Ticket</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>


