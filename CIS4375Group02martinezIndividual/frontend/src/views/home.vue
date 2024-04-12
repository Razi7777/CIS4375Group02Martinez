<template>
  <div class="page-container">

    <section class="hero">
      <h1 class="hero-title">Discover Style with a Story</h1>
      <p class="hero-subtitle">Every piece has a past. Make it part of your future.</p>
      <button class="hero-cta" @click="navigateToPoshmark">Explore Now</button>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works">
      <h2>How It Works</h2>
      <div class="steps">
        <div class="step">
          <h3>1. Find Your Gem</h3>
          <p>Browse our unique collection to find the perfect item for you.</p>
        </div>
        <div class="step">
          <h3>2. Make It Yours</h3>
          <p>Reserve your item and we’ll hold it for you to try and buy.</p>
        </div>
        <div class="step">
          <h3>3. Sustainable Style</h3>
          <p>Enjoy your thrift find while supporting sustainable fashion.</p>
        </div>
      </div>
    </section>

    <!-- Featured Items Section -->
    <section class="featured-items">
      <h2>Featured Items</h2>
      <div class="items-container">
        <!-- Dynamically render featured items here -->
      </div>
    </section>

    <!-- Blog Highlights Section -->
    <section class="blog-highlights">
      <h2>From Our Blog</h2>
      <div class="blog-posts">
        <!-- Dynamically render blog post previews here -->
      </div>
    </section>

    <!-- Event Calendar Section -->
    <section class="event-announcements">
      <h2><strong>Current and Upcoming Events</strong></h2>
      <div class="event-box">
        <div v-for="event in events" :key="event.Event_ID">
          <h3>{{ event.Event_Description }}</h3>
          <p><strong>Date:</strong> {{ formatDate(event.Event_Date) }}</p>
          <p><strong>Address:</strong> {{ event.Address }}, {{ event.City }}, {{ event.Zipcode }}</p>
          <hr v-if="event !== events[events.length - 1]">
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Add your data properties for featured items, blog posts, and events here
      events: [],
    };
  },
  methods: {
    navigateToPoshmark() {
      window.open('https://poshmark.com/closet/trenditower', '_blank');
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    // Define the fetchEvents method
    async fetchEvents() {
      try {
        const response = await fetch('http://localhost:3000/api/events'); // Adjust the URL to your needs
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.events = data.filter(event => event.Event_Status_ID === 1);
      } catch (error) {
        console.error('Error fetching events:', error);
        // Optionally handle the error in a user-friendly way, e.g., show a notification
      }
    },
  },
  mounted() {
    this.fetchEvents();
  },
};
</script>


<style scoped>
.page-container {
  font-family: 'Arial', sans-serif;
}

.hero {
  text-align: center;
  background-image: url('@/assets/Thrift2.webp'); /* Path to the image */
  background-size: cover; /* Make the image cover the entire element */
  background-repeat: no-repeat; /* The image will not repeat */
  background-position: center; /* Center the image within the element */
  padding-bottom: 40px; /* Add padding to raise the button up */
}

.hero-title {
  font-size: 3rem;
  color: #FFF8E7;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #FFF8E7;
  margin-bottom: 2rem;
}

.hero-cta {
  padding: 1rem 2rem;
  background-color: pink; /* Replace with your brand color */
  color: #fff;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin-bottom: 20px; /* Add or adjust margin to further move the button up if needed */
}

.how-it-works {
  background-color: #f9f9f9;
  padding: 2rem;
  text-align: center;
}

.steps .step {
  margin-bottom: 1rem;
}

.featured-items {
  padding: 2rem;
  text-align: center;
}

.items-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.blog-highlights {
  background-color: #f9f9f9;
  padding: 2rem;
  text-align: center;
}

.blog-posts {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.event-announcements {
  padding: 2rem;
  text-align: center;
}

.event-box {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.event-box h3 {
  margin-bottom: 0.5rem;
}

.event-box p {
  margin: 0;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .items-container,
  .blog-posts {
    flex-direction: column;
  }
}
</style>
