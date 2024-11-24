<template>
    <section class="hero">
      <div class="hero-content">
        <h1>Innovation, Technology, and the Future</h1>
        <p>
          Join Portugal's leading tech conference and transform your vision of the
          digital future.
        </p>
        <RouterLink to="/tickets" class="cta-btn" tag="button">Secure my place</RouterLink>
      </div>
      <div class="hero-bg"></div>
    </section>
  </template>
  
  <script>
  export default {
    name: "HeroSection",
  };
  </script>
  
  <style scoped>
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%; /* Garante 100% da largura */
  height: calc(100vh - 80px); /* Subtraia a altura do header */
  padding: 2rem;
  background: url('@/assets/heroImage.jpg') no-repeat center center/cover;
  color: white;
  position: relative;
}

.hero-content {
  z-index: 2;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #6a00ff, #9400ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.cta-btn {
  background: linear-gradient(90deg, #6a00ff, #9400ff);
  border: none;
  color: white;
  font-size: 1rem;
  padding: 0.75rem 2rem;
  border-radius: 20px;
  cursor: pointer;
}
</style>
  