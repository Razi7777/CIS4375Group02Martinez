<template>
  <div class="page-container">
    <!-- Hero Section -->
    <section class="hero">
      <h1 class="hero-title">Discover Style with a Story</h1>
      <p class="hero-subtitle">Every piece has a past. Make it part of your future.</p>
      <button class="hero-cta" @click="navigateToPoshmark">Explore Now</button>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works">
  <h2>How It Works</h2>
  <ol class="steps-list">
    <li class="step-item">
      <img src="@/assets/search.png" class="step-icon" alt="Find Your Gem Icon">
      <h3>Find Your Gem</h3>
      <p>Browse our unique collection to find the perfect item for you.</p>
    </li>
    <li class="step-item">
      <img src="@/assets/reserved.png" class="step-icon" alt="Make It Yours Icon">
      <h3>Make It Yours</h3>
      <p>Place a bid on any item or buy it now.</p>
    </li>
    <li class="step-item">
      <img src="@/assets/excited.png" class="step-icon" alt="Sustainable Style Icon">
      <h3>Sustainable Style</h3>
      <p>Enjoy your thrift find while supporting sustainable fashion.</p>
    </li>
  </ol>
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

    <!-- Event Calendar Section -->
    <section class="event-announcements">
      <h2><strong>Current and Upcoming Events</strong></h2>
      <div class="event-box" v-if="events.length > 0">
        <div v-for="event in events" :key="event.Event_ID">
          <h3>{{ event.Event_Description }}</h3>
          <p><strong>Date:</strong> {{ formatDate(event.Event_Date) }}</p>
          <p><strong>Address:</strong> {{ event.Address }}, {{ event.City }}, {{ event.Zipcode }}</p>
          <hr v-if="events.indexOf(event) < events.length - 1">
        </div>
        <span class="star" v-for="n in 40" :key="n" :style="{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }">★</span>
      </div>
      <p v-else>No upcoming events.</p>
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
  background: transparent;
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

.hero-title, .hero-subtitle {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-cta:hover {
  background-color: #e91e63; /* Adjust the color to fit your branding */
  transform: scale(1.05);
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

  padding: 2rem; /* Padding */
  text-align: center; /* Centered text */
}

.event-announcements h2 {
  margin-bottom: 20px; /* Adjust the value as needed to get the desired space */
}

.event-box {
  background-color: transparent;
  padding: 20px;
  margin: 20px auto; /* Centered horizontally */
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  animation: bling-bling 2s linear infinite;
  max-width: 600px; /* Centered and constrained width */
  box-shadow: 0 15px 15px -15px rgba(255, 192, 203, 1) inset, 0 -15px 15px -15px rgba(255, 192, 203, 1) inset;
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 5%, black 95%, transparent);
  mask-image: linear-gradient(to bottom, transparent, black 5%, black 95%, transparent);
}

.steps .step {
  /* Adjust the .step class based on the image/icon size and alignment issues */
  flex: 1; /* Equal flex grow to distribute space evenly */
  align-items: center; /* Center-align the content */
  text-align: center; /* Center text */
  /* Other styles... */
}

.steps .step,
.blog-posts,
.items-container {
  display: flex; /* Flexbox for layout */
  justify-content: center; /* Center horizontally */
  gap: 1rem; /* Space between items */
  margin-bottom: 1rem; /* Bottom margin */
  width: fit-content;
}

.event-box {
  background-color: rgba(255, 192, 203, 0.3);
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  animation: bling-bling 2s linear infinite;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.event-box::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(20deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3));
  transform: rotate(45deg);
  pointer-events: none;
  animation: glow 5s linear infinite;
}
.event-box {
  box-shadow: 0 15px 15px -15px rgba(255, 192, 203, 1) inset, 0 -15px 15px -15px rgba(255, 192, 203, 1) inset;
}

.event-box {
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 5%, black 95%, transparent);
  mask-image: linear-gradient(to bottom, transparent, black 5%, black 95%, transparent);
}



.event-box::after {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px dashed rgba(240, 127, 127, 0.8);
  border-radius: 12px;
  pointer-events: none;
  z-index: -1;
}

.event-box .star {
  position: absolute;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
  animation: twinkle 2s linear infinite;
}

@keyframes bling-bling {
  0%, 100% {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 10px rgba(240, 127, 127, 0.8);
  }
  50% {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 20px rgba(240, 127, 127, 0.8);
  }
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.2;
  }
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

.carousel-slide > img{
  border-radius: 10px;
}

::v-deep .bold-text {
  font-weight: bold;
  font-size: larger; /* This keyword will make the text larger relative to its surroundings */
}

.carousel-container {
  margin: 0 auto; /* This centers the carousel horizontally */
  max-width: 600px; /* Adjust max-width as needed */
}

::v-deep .carousel-slide img:hover {
  opacity: 0.9;
  transition: opacity 0.5s ease;
}

/* ... other styles ... */

.how-it-works {
  background-color: rgba(255, 192, 203, 0.3); /* Light pastel pink background for soft look */
  padding: 3rem 2rem; /* More padding for a spacious layout */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  margin: 2rem auto; /* Vertical spacing and centering */
  max-width: 800px; /* Maximum width for the content area */
  display: flex;
  flex-direction: column;
  align-items: center;

}

.how-it-works h2 {
  font-family: 'Great Vibes', cursive; /* Cursive font for the section title */
  color: #DB7093; /* Soft pink color */
  margin-bottom: 1.5rem; /* Space below the section title */
  text-align: center;
}

.steps {
  display: flex; /* Flexbox layout for the steps */
  flex-direction: row; /* Align steps in a row */
  justify-content: space-around; /* Evenly space the steps */
  align-items: flex-start; /* Align items to the start of the flex container */
  width: fit-content;
}

.step h3 {
  font-size: 1.2rem; /* Larger font size for step titles */
  color: #A52A2A; /* Darker shade for better readability */
  margin-bottom: 0.5rem; /* Space below the step title */
}

.step p {
  color: #333; /* Dark grey color for readability */
}

/* Responsive design for smaller screens */
@media (max-width: 768px) {
  .steps {
    flex-direction: column; /* Stack steps vertically on smaller screens */
  }

  .step {
    margin-bottom: 1rem; /* Space between stacked steps */
  }
}

.steps-list {
  list-style: none; /* Remove default list styling */
  padding: 0; /* Remove default padding */
  width: 100%; /* Full width to contain list items */
}

.step-icon {
  flex-shrink: 0; /* Prevent the icon from shrinking */
  max-width: 70px; /* Set maximum width for the icon to be smaller */
  height: auto; /* Maintain aspect ratio */
  margin-right: 20px; /* Space after the icon */
}

.step-item {
  display: flex; /* Use flex to align icon and text */
  align-items: center; /* Align items vertically */
  justify-content: flex-start; /* Align items to the start of the container */
  gap: 20px; /* Space between icon and text */
  margin-bottom: 1rem; /* Space between each list item */
  padding: 1rem; /* Padding inside each list item */
}
.step-item h3 {
  font-size: 1.4em; /* Increase the size for headings */
  margin: 0 0 5px 0; /* Adjust margins as needed */
  color: #A52A2A; /* Choose a color that fits the design */
}

.step-item p {
  margin: 0; /* Remove default margin */
  font-size: 1rem; /* Size of the step description */
  color: #333; /* Description color */
  flex-grow: 2; /* Allow the description to fill the space */
}


/* Adding cute icons to each step */
.step-item h3 {
  margin: 0; /* Remove default margin */
  font-size: 1.25rem; /* Size of the step title */
  color: #A52A2A; /* Title color */
  flex-grow: 1; /* Allow the title to fill the space */
}
/* Hover effects for interaction */
.step:hover {
  transform: translateY(-5px); /* Slight move up */
  transition: transform 0.3s ease-in-out;
}

@media (max-width: 768px) {
  .step-item {
    flex-direction: column; /* Stack icon and text vertically on smaller screens */
    align-items: center; /* Center-align items */
    text-align: center; /* Center-align text */
  }

  .step-icon {
    margin-bottom: 10px; /* Space below the icon */
    
  }
}


body {
font-family: 'Open Sans', sans-serif; 
}


h2 {
font-family: 'Open Sans', sans-serif; 
font-size: 2.2em; 
color: #DB7093; 
text-align: center; 
margin-bottom: 1em; 
}
</style>

