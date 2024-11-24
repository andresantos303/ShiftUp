<template>
  <header class="header">
    <div class="logo">
      <img alt="ShiftUp Logo" class="icon" src="@/assets/logo.png"/>
    </div>
    <nav class="navigation">
      <ul>
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/speakers">Speakers</RouterLink>
        </li>
        <li>
          <RouterLink to="/schedule">Schedule</RouterLink>
        </li>
        <li>
          <RouterLink to="/tickets">Tickets</RouterLink>
        </li>
      </ul>
    </nav>
    <div class="actions">
      <RouterLink to="/login" class="login-btn" tag="button">Login</RouterLink>
      <RouterLink to="/tickets" class="buy-ticket-btn" tag="button">Buy ticket</RouterLink>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: black;
  color: white;
}

.logo {
  display: flex;
  align-items: center;
}

.navigation ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navigation ul li {
  margin: 0 1rem;
}

.navigation ul li a {
  text-decoration: none;
  color: white;
  font-weight: 500;
}

.navigation ul li a.active {
  font-weight: bold;
}

.login-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 1rem;
}

.actions .buy-ticket-btn {
  background: linear-gradient(90deg, #6a00ff, #9400ff);
  border: none;
  color: white;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
}
</style>
