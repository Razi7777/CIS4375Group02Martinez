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
  <div class="carousel-container">
    <div v-for="item in featuredItems" :key="item.id" class="carousel-slide">
      <img :src="item.imageUrl" :alt="item.description">

    </div>
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
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import $ from 'jquery';

// Importing images at the top level of your script
import T1Image from '@/assets/T1.jpeg';
import T2Image from '@/assets/T2.jpeg';
import T3Image from '@/assets/T3.jpeg';
import T4Image from '@/assets/T4.jpeg';
import T5Image from '@/assets/T5.jpeg';
import T6Image from '@/assets/T6.jpeg';

export default {
  data() {
    return {
      events: [],
      featuredItems: [
        { id: 1, imageUrl: T1Image, description: 'Item 1 Description' },
        { id: 2, imageUrl: T2Image, description: 'Item 2 Description' },
        { id: 3, imageUrl: T3Image, description: 'Item 3 Description' },
        { id: 4, imageUrl: T4Image, description: 'Item 4 Description' },
        { id: 5, imageUrl: T5Image, description: 'Item 5 Description' },
        { id: 6, imageUrl: T6Image, description: 'Item 6 Description' },
      ]
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
    async fetchEvents() {
      try {
        const response = await fetch('http://localhost:3000/api/events');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.events = await response.json();
        this.events = this.events.filter(event => event.Event_Status_ID === 1);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
  },
  mounted() {
    this.fetchEvents();
    this.$nextTick(() => {
      $('.carousel-container').slick({
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay:true,
        autoplaySpeed: 6000,
        cssEase: 'ease-in-out', 
      });
    });
  }
};
</script>




<style scoped>
.page-container {
  font-family: 'Arial', sans-serif;
}

.hero {
  text-align: center;
  background-image: url('@/assets/Thrift2.webp'); /* Background image path */
  background-size: cover; /* Cover the entire element */
  background-repeat: no-repeat; /* No repeating of the background */
  background-position: center; /* Center the background */
  padding-bottom: 40px; /* Bottom padding */
}

.hero-title {
  font-size: 3rem; /* 48px */
  color: #FFF8E7; /* Off-white text color */
  margin-bottom: 1rem; /* 16px bottom margin */
}

.hero-subtitle {
  font-size: 1.5rem; /* 24px */
  color: #FFF8E7; /* Off-white text color */
  margin-bottom: 2rem; /* 32px bottom margin */
}

.hero-cta {
  padding: 1rem 2rem; /* Padding around the text */
  background-color: pink; /* Background color */
  color: #fff; /* White text */
  border: none; /* No border */
  border-radius: 2rem; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  font-size: 1rem; /* Font size */
  transition: background-color 0.3s ease; /* Smooth transition for background color */
  margin-bottom: 20px; /* Bottom margin */
}

.how-it-works,
.blog-highlights,
.event-announcements {
  background-color: transparent; /* Light gray background */
  padding: 2rem; /* Padding */
  text-align: center; /* Centered text */
}

.steps .step,
.blog-posts,
.items-container {
  display: flex; /* Flexbox for layout */
  justify-content: center; /* Center horizontally */
  gap: 1rem; /* Space between items */
  margin-bottom: 1rem; /* Bottom margin */
}

.event-box {
  background-color: transparent; /* Light gray background */
  border: 1px solid #ddd; /* Gray border */
  border-radius: 4px; /* Rounded corners */
  padding: 1rem; /* Padding */
  margin-bottom: 1rem; /* Bottom margin */
}

.event-box h3 {
  margin-bottom: 0.5rem; /* Half rem bottom margin */
}

.event-box p {
  margin: 0; /* No margin */
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem; /* 32px on mobile */
  }

  .hero-subtitle {
    font-size: 1rem; /* 16px on mobile */
  }

  .items-container,
  .blog-posts {
    flex-direction: column; /* Stack vertically on mobile */
  }

  ::v-deep .slick-slide img {
    max-height: 300px; /* Adjust height for mobile */
  }
}

::v-deep .slick-slide img {
  max-width: 100%; /* Full width */
  max-height: 500px; /* Max height */
  margin: auto; /* Center horizontally */
  display: block; /* Block display */
}

/* Cursive and bold styling for h2 */
::v-deep h2 {
  font-family: 'Great Vibes', cursive; /* Cursive font */
  font-weight: bold; /* Bold text */
  color: #333; /* Dark text for visibility */
  font-size: 24px;
  text-align: center;

}

::v-deep .carousel-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px; /* Adjust the height as needed */
}

::v-deep .bold-text {
  font-weight: bold;
  font-size: larger; /* This keyword will make the text larger relative to its surroundings */
}

.carousel-container {
  margin: 0 auto; /* This centers the carousel horizontally */
  max-width: 600px; /* Adjust max-width as needed */
}
</style>

