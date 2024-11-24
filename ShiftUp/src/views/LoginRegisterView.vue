<template>
  <Header />
  <LoginRegister />
  <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "@/components/Footer.vue";
import LoginRegister from '@/components/LoginRegister.vue';

export default {
  components: {
    Header,
    Footer,
    LoginRegister,
  },
};
</script>


