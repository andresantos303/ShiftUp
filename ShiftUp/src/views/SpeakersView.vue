<template>
  <Header/>
  <div class="pt-24 bg-gray-50">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-800">Our Speakers</h2>
    </div>
    <SpeakersSection/>
  </div>
  <Footer/>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from '@/components/Footer.vue';
import SpeakersSection from "@/components/ui/speakersSection.vue";

export default {
  components: {
    Header,
    Footer,
    SpeakersSection
  },
};
</script>
