<template>
  <div id="app">
    <Header />
    <HeroSection />
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from '@/components/Footer.vue';
import HeroSection from "../components/HeroSection.vue";

export default {
  components: {
    Header,
    Footer,
    HeroSection,
  },
};
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100%; /* Garante que o conteúdo ocupe toda a altura */
}
</style>
