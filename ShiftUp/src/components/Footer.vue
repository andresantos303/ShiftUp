<template>
    <footer class="footer">
      <div class="container">
        <!-- Logo and description -->
        <div class="footer-section">
          <div class="logo">
            <img src="@/assets/logo.png" alt="ShiftUp Logo" />
          </div>
          <p class="description">
            Sed ut perspiciatis unde omnis is iste natus error sit amet voluptatem
            totam rem aperiam.
          </p>
          <p class="phone">📞 +351 999 999 999</p>
        </div>
  
        <!-- Resources -->
        <div class="footer-section">
          <h3 class="footer-heading">Quick Acess</h3>
          <ul class="footer-list">
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/speakers">Speakers</RouterLink></li>
            <li><RouterLink to="/schedule">Schedule</RouterLink></li>
            <li><RouterLink to="/tickets">Tickets</RouterLink></li>
          </ul>
        </div>
  
        <!-- Company -->
        <div class="footer-section">
          <h3 class="footer-heading">Event</h3>
          <ul class="footer-list">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact & Support</a></li>
            <li><a href="#">Success History</a></li>
            <li><a href="#">Setting & Privacy</a></li>
          </ul>
        </div>
  
        <!-- Follow Us -->
        <div class="footer-section">
          <h3 class="footer-heading">Follow Us On</h3>
          <div class="social-icons">
            <a href="#" class="icon">F</a>
            <a href="#" class="icon">T</a>
            <a href="#" class="icon">Y</a>
            <a href="#" class="icon">L</a>
          </div>
          <p class="copy">© 2024 ShiftUp.</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "FooterComponent",
  };
  </script>
  
  <style scoped>
  /* General styles */
  .footer {
    background-color: #f9f9f9;
    padding: 40px 20px;
    font-family: Arial, sans-serif;
    color: #555;
  }
  
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
  }
  
  /* Footer section styles */
  .footer-section {
    flex: 1 1 200px;
    max-width: 250px;
  }
  
  .logo {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .brand {
    font-size: 18px;
    font-weight: bold;
    color: #222;
  }
  
  .description {
    font-size: 14px;
    margin-bottom: 10px;
    line-height: 1.5;
  }
  
  .phone {
    font-size: 14px;
    color: #222;
    font-weight: bold;
  }
  
  /* Footer headings */
  .footer-heading {
    font-size: 16px;
    margin-bottom: 10px;
    color: #222;
  }
  
  /* Footer links */
  .footer-list {
    list-style: none;
    padding: 0;
  }
  
  .footer-list li {
    margin-bottom: 8px;
  }
  
  .footer-list li a {
    color: #555;
    text-decoration: none;
  }
  
  .footer-list li a:hover {
    color: #007BFF;
  }
  
  /* Social icons */
  .social-icons {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  
  .icon {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: #ddd;
    color: #555;
    text-align: center;
    line-height: 30px;
    border-radius: 50%;
    text-decoration: none;
    font-weight: bold;
    font-size: 14px;
  }
  
  .icon:hover {
    background-color: #007BFF;
    color: #fff;
  }
  
  /* Copyright */
  .copy {
    font-size: 14px;
    margin-top: 20px;
    color: #999;
  }
  
  /* Responsive design */
  @media (max-width: 768px) {
    .footer-section {
      max-width: 100%;
    }
  }
  </style>
  