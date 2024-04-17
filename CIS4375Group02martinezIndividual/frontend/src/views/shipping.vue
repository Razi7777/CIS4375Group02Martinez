<template>
  <main class="  flex flex-col items-center justify-center py-4">
    <div class="container mx-auto p-4 bg-white rounded-xl shadow-lg max-w-lg text-center">
      <h1 class="text-cute-title mb-4">Welcome to Trendi Finds!</h1>
  
      <section class="tracking-form mt-8 mb-4">
        <h2 class="text-cute-subtitle mb-2">Track Your Order</h2>
        <form @submit.prevent="fetchTrackingInfo" class="flex flex-col items-center">
          <label for="orderNumber" class="mb-2 text-left self-start">Enter your order number:</label>
          <input type="text" id="orderNumber" v-model="orderNumber" class="tracking-input mb-4" required>
          <button type="submit" class="tracking-button">Track Order</button>
        </form>
      </section>

      <div v-if="trackingInfo" class="tracking-info">
        <h3 class="text-cute-info">Tracking Information:</h3>
        <p>{{ trackingInfo }}</p>
      </div>
    </div>
    <BottomBar />
  </main>
</template>


  
  <script>
  export default {
    data() {
      return {
        orderNumber: '',
        trackingInfo: null,
      };
    },
    methods: {
      async fetchTrackingInfo() {
        // Placeholder for fetching tracking information
        // You would replace this with a call to your backend or tracking API
        try {
          const response = await this.fetchTrackingApi(this.orderNumber);
          this.trackingInfo = response.data; // Adjust according to the actual response structure
        } catch (error) {
          console.error("Failed to fetch tracking information:", error);
          this.trackingInfo = "We're unable to track your order at this time. Please try again later.";
        }
      },
      fetchTrackingApi(orderNumber) {
        // This function should return a promise that resolves with the tracking information
        // For demonstration, this is a mock function. Replace it with your actual API call.
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: `Tracking information for order ${orderNumber}. Your order is on the way!` });
          }, 1000);
        });
      },
    },
  };
  </script>
  
  <style scoped>

.container{
size: auto;
}


  .text-cute-title {
    font-family: 'Comic Neue', cursive;
    color: #ff79c6; /* A soft pink for titles */
    font-size: 2rem; /* Larger size for the title */
  }
  
  .text-cute-subtitle {
    font-family: 'Comic Neue', cursive;
    color: #ff79c6; /* Consistent color for subtitles */
    font-size: 1.5rem; /* Smaller than the title but still noticeable */
  }
  
  .tracking-form {
    /* Styling specific to the tracking form */
  }
  
  .tracking-input {
    border: 2px solid #ffadcd; /* Light pink border */
    border-radius: 15px;
    padding: 0.5rem 1rem;
  }
  
  .tracking-button {
    background-color: #ffadcd; /* Light pink background */
    border: none;
    border-radius: 15px;
    padding: 0.5rem 1rem;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .tracking-button:hover {
    background-color: #ff92b4; /* A slightly darker pink for hover effect */
  }
  
  .tracking-info {
    background-color: #ffeff7; /* Even lighter pink for the tracking info box */
    border-radius: 10px;
    padding: 1rem;
    margin-top: 1rem;
  }
  
  .text-cute-info {
    font-family: 'Comic Neue', cursive;
    color: #ff79c6; /* Consistent color for information headers */
  }
  

  /* Add responsiveness */
  @media (max-width: 768px) {
    .text-cute-title, .text-cute-subtitle {
      font-size: 1.25rem;
    }
  }
  
  </style>
  