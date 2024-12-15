<template>
  <section>
    <div
      class="py-32 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: 'url(' + heroImage + ')' }"
    >
      <div class="max-w-screen-xl mx-auto px-8 py-32">
        <div class="max-w-sm">
          <h1
            class="text-4xl font-bold mb-4 bg-gradient-to-b from-[#33DBF5] to-[#6A48E4] bg-clip-text text-transparent"
          >
            Innovation, Technology, and the Future
          </h1>
          <p class="text-lg mb-8 text-white">
            Join Portugal's leading tech conference and transform your vision of
            the digital future.
          </p>
          <Button to="/tickets" label="Get my sit" />
        </div>
      </div>
    </div>
  </section>
  <section class="bg-custom-gradient py-8 text-white flex justify-center">
    <div
      class="flex justify-between items-center max-w-screen-xl w-full text-center"
    >
      <div class="flex flex-col items-center w-1/5">
        <h1 class="text-3xl font-bold mb-2">{{ countdown.months }}</h1>
        <h5 class="text-lg uppercase">Months</h5>
      </div>
      <div class="flex flex-col items-center w-1/5">
        <h1 class="text-3xl font-bold mb-2">{{ countdown.days }}</h1>
        <h5 class="text-lg uppercase">Days</h5>
      </div>
      <div class="flex flex-col items-center w-1/5">
        <h1 class="text-3xl font-bold mb-2">{{ countdown.hours }}</h1>
        <h5 class="text-lg uppercase">Hours</h5>
      </div>
      <div class="flex flex-col items-center w-1/5">
        <h1 class="text-3xl font-bold mb-2">{{ countdown.minutes }}</h1>
        <h5 class="text-lg uppercase">Minutes</h5>
      </div>
      <div class="flex flex-col items-center w-1/5">
        <h1 class="text-3xl font-bold mb-2">{{ countdown.seconds }}</h1>
        <h5 class="text-lg uppercase">Seconds</h5>
      </div>
    </div>
  </section>
</template>

<script>
import heroImage from "@/assets/heroImage.png";
import Button from "@/components/ui/button.vue";

export default {
  name: "HeroSection",
  components: {
    Button,
  },
  data() {
    return {
      heroImage,
      targetDate: new Date("2025-11-11T18:00:00"), // Data de destino
      countdown: {
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    };
  },
  mounted() {
    this.updateCountdown(); // Inicia a contagem imediatamente
    setInterval(this.updateCountdown, 1000); // Atualiza a cada segundo
  },
  methods: {
    updateCountdown() {
      const now = new Date();
      const diffInMs = this.targetDate - now;

      if (diffInMs <= 0) {
        // Se a contagem terminar
        this.countdown = { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
        return;
      }

      const totalSeconds = Math.floor(diffInMs / 1000);
      const months = Math.floor(totalSeconds / (30 * 24 * 3600)); // Aproximação de meses
      const days = Math.floor((totalSeconds % (30 * 24 * 3600)) / (24 * 3600));
      const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      this.countdown = { months, days, hours, minutes, seconds };
    },
  },
};
</script>

