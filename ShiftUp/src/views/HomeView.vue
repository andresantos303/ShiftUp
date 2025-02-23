<template>
  <div id="app">
    <Header />
    <HeroSection />

    <InfoSection title="What is ShiftUp"
      description="ShiftUp 2025 is Portugal’s leading tech conference, happening in April at the iconic Coliseu do Porto. Over three days, participants will explore cutting-edge topics like AI, Blockchain, and Sustainability through talks, workshops, and networking with global innovators. Join renowned speakers, engage in hands-on sessions, and connect with like-minded professionals. With exclusive content, gamified activities, and premium merchandise, ShiftUp is more than an event - it’s a transformative tech experience."
      imageSrc="/images/logoIcon.png" imageAlt="ShiftUp Logo" />

    <section class="p-8">
      <div class="flex justify-center overflow-hidden">
        <p class="whitespace-nowrap text-gray-100 text-[148px] font-bold animate-marquee">
          SHIFTUP OPORTO 2025
        </p>
      </div>
    </section>

    <section class="p-8 bg-gray-100">
      <h1 class="text-2xl mb-8 font-bold bg-custom-gradient bg-clip-text text-transparent mx-auto max-w-[1200px] ">
        Meet our 2024 speakers
      </h1>
      <SpeakersSection />
    </section>


    <InfoSection title="Schedule"
      description="Get ready for an immersive journey into innovation, emerging tech trends, and groundbreaking insights. At ShiftUp, we bring together top experts to delve into topics like artificial intelligence, blockchain, cybersecurity, and the transformative impact of technology on our lives and businesses."
      imageSrc="/images/ctaSheduleImage.png" imageAlt="ShiftUp Schedule" :showButton="true" buttonLabel="See schedule"
      buttonLink="/schedule" />

    <!-- Google Maps -->
    <section class="mx-auto max-w-[1200px] p-8">
      <h1 class="text-2xl mb-8 font-bold bg-custom-gradient bg-clip-text text-transparent mx-auto max-w-[1200px] ">Meet us here</h1>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2949.6654344955223!2d-8.628478688456262!3d41.14688557121173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd24650536d7d431%3A0x41a4773f6d2fd2ff!2sSuper%20Bock%20Arena%20-%20Pavilh%C3%A3o%20Rosa%20Mota!5e1!3m2!1spt-PT!2spt!4v1736764543655!5m2!1spt-PT!2spt" width="900" height="320" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </section>

    <section>
      <div class="bg-custom-gradient mt-12 p-12 flex flex-row  items-center justify-center gap-16">
        <p class="text-white">Tickets:</p>
        <Button to="/tickets" label="Get my sit" bgColor="bg-white" textColor="text-blue-500" />
      </div>
    </section>

    <InfoSection title="Access in Style"
      description="Your ShiftUp badge is more than a pass—it’s a statement. Personalized with your name and a sleek design, it ensures seamless access to every corner of the event. Enjoy priority check-ins, exclusive sessions, and perks tailored to your experience level."
      imageSrc="/images/crachaImage.png" imageAlt="ShiftUp Badge" />

    <InfoSection title="Innovation You Can Wear"
      description="Take a piece of ShiftUp home with our exclusive merchandise. From branded apparel to sustainable accessories, each item reflects the spirit of innovation and technology. VIP attendees gain access to limited-edition collections and special discounts."
      imageSrc="/images/cracha2Image.png" imageAlt="ShiftUp Merchandise" />

    <section>
      <div class="bg-custom-gradient p-12 flex flex-col items-center justify-center gap-8 text-white">
        <p>Get a ticket Only at 29€</p>
        <h1 class="text-bold text-4xl">Innovation, Technology, and the Future</h1>
        <p>Join Portugal's leading tech conference and transform your vision of the digital future.</p>
        <Button to="/tickets" label="Get my sit" bg-color="bg-white" text-color="text-blue-500" />
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from '@/components/Footer.vue';
import HeroSection from "../components/HeroSection.vue";
import Button from '@/components/ui/button.vue';
import InfoSection from '@/components/ui/infoSection.vue';
import SpeakersSection from '@/components/ui/speakersSection.vue';

export default {
  components: {
    Header,
    Footer,
    HeroSection,
    Button,
    InfoSection,
    SpeakersSection,
  },
};
</script>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(100%);
    /* Start off the right side */
  }

  100% {
    transform: translateX(-100%);
    /* End off the left side */
  }
}

.animate-marquee {
  animation: marquee 10s linear infinite;
}
</style>
