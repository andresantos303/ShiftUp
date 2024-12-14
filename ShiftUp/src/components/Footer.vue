<template>
  <footer class="bg-gray-100 py-10 px-5 text-gray-700">
    <div class="container mx-auto flex flex-wrap justify-between gap-5">
      
      <!-- Logo and description -->
      <div class="flex flex-col max-w-xs">
        <div class="flex items-center mb-4">
          <img src="@/assets/logoGradient.png" alt="ShiftUp Logo" />
        </div>
        <p class="text-sm mb-3 leading-relaxed">
          Sed ut perspiciatis unde omnis is iste natus error sit amet voluptatem
          totam rem aperiam.
        </p>
        <p class="text-sm font-bold text-gray-800">📞 +351 999 999 999</p>
      </div>

      <!-- Resources -->
      <div class="flex flex-col max-w-xs">
        <h3 class="text-lg mb-3 text-gray-800">Quick Access</h3>
        <ul class="list-none p-0">
          <li class="mb-2"><RouterLink to="/" class="text-gray-700 hover:text-purple-500">Home</RouterLink></li>
          <li class="mb-2"><RouterLink to="/speakers" class="text-gray-700 hover:text-purple-500">Speakers</RouterLink></li>
          <li class="mb-2"><RouterLink to="/schedule" class="text-gray-700 hover:text-purple-500">Schedule</RouterLink></li>
          <li class="mb-2"><RouterLink to="/tickets" class="text-gray-700 hover:text-purple-500">Tickets</RouterLink></li>
        </ul>
      </div>

      <!-- Company -->
      <div class="flex flex-col max-w-xs">
        <h3 class="text-lg mb-3 text-gray-800">Event</h3>
        <ul class="list-none p-0">
          <li class="mb-2"><a href="#" class="text-gray-700 hover:text-purple-500">About Us</a></li>
          <li class="mb-2"><a href="#" class="text-gray-700 hover:text-purple-500">Contact & Support</a></li>
          <li class="mb-2"><a href="#" class="text-gray-700 hover:text-purple-500">Success History</a></li>
          <li class="mb-2"><a href="#" class="text-gray-700 hover:text-purple-500">Setting & Privacy</a></li>
        </ul>
      </div>

      <!-- Follow Us -->
      <div class="flex flex-col max-w-xs">
        <h3 class="text-lg mb-3 text-gray-800">Follow Us On</h3>
        <div class="flex gap-3 mt-2">
          <a href="#" class="w-8 h-8 bg-gray-300 text-gray-700 text-center leading-8 rounded-full hover:bg-custom-gradient hover:text-white">F</a>
          <a href="#" class="w-8 h-8 bg-gray-300 text-gray-700 text-center leading-8 rounded-full hover:bg-custom-gradient hover:text-white">T</a>
          <a href="#" class="w-8 h-8 bg-gray-300 text-gray-700 text-center leading-8 rounded-full hover:bg-custom-gradient hover:text-white">Y</a>
          <a href="#" class="w-8 h-8 bg-gray-300 text-gray-700 text-center leading-8 rounded-full hover:bg-custom-gradient hover:text-white">L</a>
        </div>
        <p class="text-sm mt-5 text-gray-400">© 2024 ShiftUp.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
</style>
