<template>
  <header class="header">
    <div class="logo">
      <img alt="Logo" class="icon" src="@/assets/logo.png"/>
    </div>
    <nav class="navigation">
      <ul>
        <li>
          <a><RouterLink to="/">Home</RouterLink></a>
        </li>
        <li>
          <a><RouterLink to="/speakers">Speakers</RouterLink></a>
        </li>
        <li>
          <a><RouterLink to="/schedule">Schedule</RouterLink></a>
        </li>
        <li>
          <a><RouterLink to="/ticket">Tickets</RouterLink></a>
        </li>
      </ul>
    </nav>
    <div class="actions">
      <button class="login-btn">Login</button>
      <button class="buy-ticket-btn">Buy ticket</button>
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
  font-size: 1.2rem;
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
