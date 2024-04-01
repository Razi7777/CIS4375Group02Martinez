<template>
    <main>
        <div class="newsletter-signup">
        <h1 class="text-3xl font-bold mb-4">Only Trendi Fiz offers you the best offer fashion exclusives, and the trendy style buzz in the business.</h1>
        <div class="form-container">
            <div class="form-group">
            <label for="email" class="block font-bold mb-2">Email</label>
            <input
                id="email"
                v-model="email"
                type="email"
                class="border border-gray-400 rounded w-full py-2 px-3 mb-4"
                placeholder="Email"
                required
            >
            </div>
            
            <div class="form-group">
            <label class="block font-bold mb-2">Which type of content would you like to receive?</label>
            <div class="flex items-center mb-4">
                <input
                id="new-items"
                v-model="contentType"
                type="radio"
                value="new-items"
                class="mr-2"
                required
                >
                <label for="new-items" class="mr-4">New Items</label>
                <input
                id="events"
                v-model="contentType"
                type="radio"
                value="events"
                class="mr-2"
                required
                >
                <label for="events">Events</label>
            </div>
            </div>
            <div class="form-group">
            <label class="block font-bold mb-2">Get new items, events, and promotions by text. (Optional)</label>
            <input
                v-model="mobileNumber"
                type="tel"
                class="border border-gray-400 rounded w-full py-2 px-3 mb-4"
                placeholder="Mobile Number"
            >
            </div>
            <button
            type="submit"
            class="bg-black text-white font-bold py-2 px-4 rounded"
            @click.prevent="submitForm"
            >
            SIGN ME UP
            </button>
        </div>
        </div>
        <div>
            <BottomBar />
        </div>
    </main>
  </template>
  
  <script>
  import BottomBar from '../components/BottomBar.vue';
  export default {
    components: {
    BottomBar
    },
    data() {
      return {
        email: '',
        contentType: 'new-items',
        mobileNumber: '',
      };
    },
    methods: {
      submitForm() {
        // Handle form submission logic here
        console.log('Email:', this.email);
        console.log('Confirm Email:', this.confirmEmail);
        console.log('Content Type:', this.contentType);
        console.log('Mobile Number:', this.mobileNumber);
        // Reset form fields if needed
      },
    },
  };
  </script>
  
  <style scoped>
  .newsletter-signup {
    @apply max-w-3xl mx-auto py-16 px-4;
  }
  
  .form-container {
    @apply bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4;
  }
  
  .form-group {
    @apply mb-4;
  }
  </style>