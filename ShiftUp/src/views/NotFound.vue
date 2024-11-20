<template>
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <RouterLink to="/">Go back to Home</RouterLink>
    </div>
  </template>
  
  <script>
  export default {
    name: "NotFound",
  };
  </script>
  
  <style scoped>
  .not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
  }
  
  .not-found h1 {
    font-size: 3rem;
    color: #ff0000;
  }
  
  .not-found p {
    font-size: 1.2rem;
    margin: 1rem 0;
  }
  
  .not-found a {
    text-decoration: none;
    color: #6a00ff;
    font-weight: bold;
  }
  </style>
  