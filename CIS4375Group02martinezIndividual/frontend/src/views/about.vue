<template>
    <main class="flex flex-col items-center min-h-screen">
      <div class="w-full max-w-4xl px-4 py-8">
        <!-- Company Introduction -->
        <section class="text-center mb-8">
          <h1 class="text-3xl font-bold underline">About TrendiFindz</h1>
        </section>
  
        <!-- Company History -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold mb-4">Our History</h2>
          <p class="text-base">
            TrendiFindz was founded in [Year] with a mission to [briefly describe mission]. 
            Since then, we've [mention any significant achievements, growth, etc.].
          </p>
        </section>
  
        <!-- Our Mission -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold mb-4">Our Mission</h2>
          <p class="text-base">
            Our mission is to [describe your company's mission]. We believe in [mention core values or beliefs].
          </p>
        </section>
  
        <!-- Meet the Team -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold mb-4">Meet the Team</h2>
          <p class="text-base">
            Our team consists of [briefly describe your team, any notable members, founders, etc.].
          </p>
        </section>
  

      </div>
    </main>
  </template>
  
  <script>
  export default {
    name: "AboutCompany",
    components: {
     
    },
    props: {
      userStore: Object,
    },
  }
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  