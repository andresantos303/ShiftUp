<script>
import HeaderP from "../../components/HeaderP.vue";

export default {
  components: {
    HeaderP,
  },
};
</script>

<template>
  <HeaderP/>
  <div>
    <h1>This is an Profile page</h1>
    <RouterLink to="/" tag="button">Log Out</RouterLink>
  </div>
</template>

<style></style>
