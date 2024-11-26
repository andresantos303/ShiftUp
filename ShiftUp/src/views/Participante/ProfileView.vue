<script>
import HeaderP from "../../components/HeaderP.vue";
import router from '@/router';

export default {
  components: {
    HeaderP,
  },
  methods: {
    logout() {
      localStorage.removeItem("isAuthenticated")
      router.push("home")
    }
  },
};
</script>

<template>
  <HeaderP/>
  <div>
    <h1>This is an Profile page</h1>
    <button @click="logout">Log Out</button>
  </div>
</template>

<style></style>
