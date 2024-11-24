<template>
  <header class="header">
    <div class="container">
      <!-- Logo e título -->
      <div class="logo">
        <img
          alt="ShiftUp Participante Logo"
          class="icon"
          src="@/assets/logoP.jpg"
        />
      </div>

      <!-- Navegação -->
      <nav class="nav">
        <RouterLink :to="`/participante/${id}/events`" class="nav-link">Events</RouterLink>
        <RouterLink :to="`/participante/${id}/communication`" class="nav-link">Communication</RouterLink>
        <RouterLink :to="`/participante/${id}/merchandising`" class="nav-link">Merchandising</RouterLink>
        <RouterLink :to="`/participante/${id}/volunteering`" class="nav-link">Volunteering</RouterLink>
      </nav>

      <!-- Ícones de notificações e perfil -->
      <div class="icons">
        <div class="icon notification">
          <span class="dot"></span>
          <img src="@/assets/notification-icon.png" alt="Notification Icon" />
        </div>
        <RouterLink :to="`/profile/${id}`" class="icon profile" tag="div">
          <img src="@/assets/profile-icon.png" alt="Profile Icon" />
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script>
import { RouterLink, useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute(); // Acessa os parâmetros da URL
    const id = route.params.id; // Obtém o ID da URL
  },
};
</script>

<style scoped>
/* Estilo geral do cabeçalho */
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

/* Container para centralizar o conteúdo */
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
}

/* Navegação */
.nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  font-size: 14px;
  color: gray;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-link:hover {
  color: navy;
  font-weight: bold;
}

/* Ícones */
.icons {
  display: flex;
  align-items: center;
  gap: 15px;
}

.icon {
  position: relative;
  width: 24px;
  height: 24px;
}

.icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.notification .dot {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
}
</style>
