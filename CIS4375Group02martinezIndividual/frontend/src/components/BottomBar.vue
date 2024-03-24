<template>
  <div class="bottom-bar">
    <p class="bottomleft">© Copyright 2024, Trendi Finds, Houston, TX</p>
    <router-link to="/FAQ">FAQ</router-link>
    <router-link to="/terms-and-conditions">Terms and Conditions</router-link>
    <router-link to="/privacy-policy">Privacy Policy</router-link>
    <router-link to="/return-and-exchange">Return and Exchange</router-link>
    <router-link to="/Contact">Contact Us</router-link>
    <router-link to="/home">Home</router-link>
    <!-- Add more links/buttons as needed -->
  </div>
</template>


<script>
export default {
  // You can add component logic here if needed
};
</script>
  
  <style scoped>
  /* Add your CSS styles for the bottom bar component here */
  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #d2a679;
    color: #fff;
    padding: 10px;
    padding-bottom: 20px;
    text-align: right;
  }
  
  .bottom-bar a {
    background-color: #d2a679;
    color: #fff;
    margin-right: 10px;
  }
  .bottomleft {
    position: absolute;
    bottom: 20px;
    left: 16px;
  }

/* Add a bottom margin to the main content to prevent overlap */
main {
  margin-bottom: 80px; /* Adjust the value based on the height of your bottom bar */
}
</style>