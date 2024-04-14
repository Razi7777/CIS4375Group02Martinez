<template>
  <main class="flex flex-col items-center min-h-screen">
    <div class="w-full max-w-4xl px-4 py-8">
  <!-- Profile Picture -->
  <div class="profile-picture">
    <img src="@/assets/About.jpg" alt="Marisol - Owner of TrendiFindz" class="rounded-full mx-auto">
  </div>

      <!-- Company Introduction -->
      <section class="text-center mb-8">
        <h1 class="text-3xl font-bold underline" style="color: var(--secondary-clr);">About TrendiFindz</h1>
      </section>

      <!-- About Marisol -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4" style="color: var(--secondary-clr);">Hey There!</h2>
        <p class="text-base" style="color: var(--accent-clr);">
          I’m Marisol, the proud owner of TrendiFindz. Back in my college days, you might have known me as blumay15x. Like countless others, I kicked off my journey by selling items from my own closet, mostly through third-party apps. I understood the importance of building trust on Instagram and that was the easiest route to establishing credibility within the Instagram community. As demand for my inventory grew and my Instagram presence took off, I made the leap to turn this side hustle into a full-fledged passion project.
        </p>
      </section>

      <!-- The rest of your sections go here -->

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
/* Custom color variables */
:root {
--main-clr: #EBEAEA; /* Main background color */
--secondary-clr: #F07F7F; /* Secondary color for headings and highlights */
--accent-clr: #EA4848; /* Accent color for important elements */
}

.profile-picture img {
  /* Sets the width of the image, and height will scale proportionally */
  width: 350px; /* Adjust this value to the size you prefer */
  height: auto;
  border-radius: 20%; /* Makes the image circular */
  display: block; /* Ensures the image is block-level for margin auto to work */
  margin: 0 auto; /* Centers the image horizontally */
}

/* Style adjustments for the 'About' section */
h1 {
color: var(--main-clr);
}

h2 {
color: var(--secondary-clr);
}

p {
color: var(--accent-clr);
}
</style>
