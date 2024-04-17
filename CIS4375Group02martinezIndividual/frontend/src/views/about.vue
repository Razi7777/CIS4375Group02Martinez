<template>
  <main class="flex flex-col items-center min-h-screen bg-main-bg">
    <div class="w-full max-w-4xl px-4 py-8 text-center">
      <!-- Profile Picture -->
      <div class="profile-picture shadow-lg">
        <img src="@/assets/About.jpg" alt="Marisol - Owner of TrendiFindz" class="rounded-lg">
      </div>

      <!-- Company Introduction -->
      <h1 class="title-text">About TrendiFindz</h1>

      <!-- About Marisol -->
      <section class="about-marisol">
        <h2 class="subheading-text">Hey There!</h2>
        <p>
          I’m Marisol, the proud owner of TrendiFindz. Back in my college days, you might have known me as blumay15x. Like countless others, I kicked off my journey by selling items from my own closet, mostly through third-party apps. I understood the importance of building trust on Instagram and that was the easiest route to establishing credibility within the Instagram community. As demand for my inventory grew and my Instagram presence took off, I made the leap to turn this side hustle into a full-fledged passion project.
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
/* Custom color variables */
:root {
  --main-bg: #FFF0F5; /* Light pink background for a softer look */
  --title-color: #FF69B4; /* Hot pink for titles to pop */
  --subheading-color: #DB7093; /* Pale violet-red for subheadings */
  --text-color: #555; /* Softened text color for easy reading */
}

.main-bg {
  background-image: url('path-to-cute-background-image');
  background-size: cover;
}

.profile-picture img {
  width: 350px;
  height: auto;
  border-radius: 20%;
  display: block;
  margin: 20px auto; /* Increased margin for better spacing */
  border: 5px solid #FFC0CB; /* Light pink border */
}

.title-text {
  font-family: 'Pacifico', cursive;
  color: var(--title-color);
  margin-bottom: 1rem;
  font-size: 2.5rem;
}

.subheading-text {
  font-family: 'Quicksand', sans-serif;
  color: var(--subheading-color);
  margin-bottom: 0.5rem;
font-size: 1.75rem;
}

.about-marisol p {
font-family: 'Quicksand', sans-serif;
color: var(--text-color);
background-color: rgba(255, 192, 203, 0.3); /* Soft pink background for the paragraph */
border-radius: 15px;
padding: 20px;
line-height: 1.6;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Add a cute floral or similar pattern to the background */
.main-bg {
background: url('path-to-your-floral-pattern.png') no-repeat center center fixed;
background-size: cover;
}

/* Additional global style adjustments */
body {
font-family: 'Quicksand', sans-serif;
}


.title-text {
font-size: 2rem;
}

.subheading-text {
font-size: 1.5rem;
}

</style>