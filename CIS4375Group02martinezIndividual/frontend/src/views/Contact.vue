<template>
  <main class="contact-page h-screen">
    <header class="contact-header">
      <h1>Contact Us</h1>
      <section class="contact-info">
        <h2>Follow us on Instagram</h2>
        <p class="instagram-link">
          <a href="https://www.instagram.com/trendifindz/">@trendifindz</a>
        </p>
        <h2>Email Us</h2>
        <p class="email-link">
          <a href="mailto:trenditower@gmail.com">trenditower@gmail.com</a>
        </p>
      </section>
    </header>
    <!-- BottomBar component will be rendered here -->
    <BottomBar />
  </main>
</template>

<style scoped>
.contact-page {
  display: flex;
  flex-direction: column;
  justify-content: Top; /* Vertically center the content on the page */
  align-items: center; /* Horizontally center the content on the page */
  background: var(--background-color);
  font-family: var(--font-family);
  height: 100vh;
  padding: 4rem 1rem;
}

.contact-header {
  text-align: center;
  margin-bottom: 2rem;
}

.contact-header h1 {
  font-family: 'Great Vibes', cursive;
  font-size: 3rem; /* Larger font size for the main heading */
  color: var(--header-color);
  margin-bottom: 1.5rem;
}

.social-media-links h2 {
  font-family: 'Quicksand', sans-serif;
  font-size: 2rem;
  color: var(--subheader-color);
  margin: 1rem 0; /* Add top margin to space out from the heading */
}

.instagram-link,
.email-link {
  font-family: 'Quicksand', sans-serif;
  font-size: 1.25rem; /* Slightly larger for better readability */
  color: var(--text-color);
  margin: 0.5rem 0; /* Add some vertical spacing */
}

.instagram-link a,
.email-link a {
  color: var(--accent-color);
  text-decoration: none;
  transition: color 0.3s ease; /* Smooth color transition for hover effect */
}

.instagram-link a:hover,
.email-link a:hover {
  color: var(--hover-color); /* Define a hover color variable or use a specific color */
  text-decoration: underline; /* Underline on hover for better interactivity */
}

/* Global variable definitions */
:root {
  --background-color: #FFF0F5; /* Assuming this matches the "About Me" page */
  --header-color: #FF69B4;
  --subheader-color: #DB7093;
  --text-color: #555;
  --accent-color: #e91e63; /* Link color */
  --hover-color: #c2185b; /* Hover state color for links */
  --font-family: 'Quicksand', sans-serif; /* This should match the "About Me" page */
}

@media (max-width: 768px) {
  .contact-header h1 {
    font-size: 2rem;
  }

  .social-media-links h2,
  .instagram-link,
  .email-link {
    font-size: 1rem;
  }
}

</style>
