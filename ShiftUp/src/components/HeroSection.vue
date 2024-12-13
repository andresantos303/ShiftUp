<template>
<section>
  <div class="py-32 bg-cover bg-center bg-no-repeat" :style="{ backgroundImage: 'url(' + heroImage + ')' }">
    <div class="max-w-screen-xl mx-auto px-8 py-32">
      <div class="max-w-sm">
        <h1 class="text-4xl font-bold mb-4 bg-gradient-to-b from-[#33DBF5] to-[#6A48E4] bg-clip-text text-transparent">
          Innovation, Technology, and the Future
        </h1>
        <p class="text-lg mb-8 text-white">
          Join Portugal's leading tech conference and transform your vision of the digital future.
        </p>
        <Button to="/tickets" label="Get my sit" />
      </div>
    </div>
  </div>
</section>
  <section class="bg-custom-gradient py-8 text-white flex justify-center">
    <div class="flex justify-between items-center max-w-screen-xl w-full text-center">
      <div class="flex flex-col items-center w-1/5">
        <h1 class="text-3xl font-bold mb-2">4</h1>
        <h5 class="text-lg uppercase">Months</h5>
      </div>
      <div class="flex flex-col items-center w-1/5">
        <h1 class="text-3xl font-bold mb-2">12</h1>
        <h5 class="text-lg uppercase">Days</h5>
      </div>
      <div class="flex flex-col items-center w-1/5">
        <h1 class="text-3xl font-bold mb-2">18</h1>
        <h5 class="text-lg uppercase">Hours</h5>
      </div>
      <div class="flex flex-col items-center w-1/5">
        <h1 class="text-3xl font-bold mb-2">30</h1>
        <h5 class="text-lg uppercase">Minutes</h5>
      </div>
      <div class="flex flex-col items-center w-1/5">
        <h1 class="text-3xl font-bold mb-2">21</h1>
        <h5 class="text-lg uppercase">seconds</h5>
      </div>
    </div>
  </section>


</template>

<script>
import heroImage from '@/assets/heroImage.png';
import Button from '@/components/ui/button.vue';
export default {
  name: "HeroSection",
  components: {
    Button,
  },
  data() {
    return {
      heroImage,
    };
  },
};
</script>
