<template>
  <main class="contact-page h-screen">
    <header class="contact-header">
      <h1>Contact Us</h1>
      <section class="social-media-links">
        <h2>Follow us:</h2>
        <p class="instagram-link">
          <strong>Instagram:</strong> 
          <a href="https://www.instagram.com/trendifindz/">@trendifindz</a>
        </p>
      </section>
    </header>
    <BottomBar />
  </main>
</template>

<style scoped>
.contact-page {
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  background: var(--background-color);
  font-family: 'Helvetica', 'Arial', sans-serif;
}

.contact-header {
  text-align: center;
  margin-bottom: 2rem;
}

.contact-header h1 {
  font-size: 2rem; /* 24px */
  font-weight: bold;
  text-decoration: underline;
  color: var(--header-color);
  margin-bottom: 1.5rem;
}

.social-media-links h2 {
  font-size: 1.5rem; /* 24px */
  font-weight: bold;
  text-decoration: underline;
  color: var(--header-color);
  margin-bottom: 1rem;
}

.instagram-link {
  font-size: 1rem; /* 16px */
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.instagram-link a {
  color: var(--accent-color);
  text-decoration: none;
}

.instagram-link a:hover {
  text-decoration: underline;
}

/* Global variable definitions */
:root {
  --background-color: #f8f9fa; /* A light grey background */
  --header-color: #333333; /* A darker shade for headers */
  --text-color: #555555; /* A medium shade for regular text */
  --accent-color: #007bff; /* A bright blue for links */
}


/* Add responsiveness */
@media (max-width: 768px) {
  .contact-header h1,
  .social-media-links h2 {
    font-size: 1.5rem;
  }

  .instagram-link {
    font-size: 0.875rem; /* 14px */
  }
}
</style>

