<template>
  <div class="page-container">

    <section class="hero">
      <h1 class="hero-title">Discover Style with a Story</h1>
      <p class="hero-subtitle">Every piece has a past. Make it part of your future.</p>
      <button class="hero-cta">Explore Now</button>
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
    <section class="event-calendar">
      <h2>Upcoming Events</h2>
      <EventCalendar @upcoming-events="setUpcomingEvents" />
      <ul class="events-list">
        <li v-for="event in upcomingEvents" :key="event.Event_ID" class="event-item">
          <strong>{{ event.Event_Description }}</strong>
          <p>Date: {{ formatDate(event.Event_Date) }}</p>
          <p>Address: {{ event.Address }}, {{ event.City }}, {{ event.Zipcode }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Add your data properties for featured items, blog posts, and events here
    };
  },
  props: {
    upcomingEvents: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<style>
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

.event-calendar {
  padding: 2rem;
  text-align: center;
}

.events-list {
  list-style-type: none;
  padding: 0;
}

.events-list .event-item {
  background-color: #eee;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
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
