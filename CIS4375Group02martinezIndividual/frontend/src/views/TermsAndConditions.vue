<template>
  <main class="bg-main-bg  py-8">
    <div class="terms-and-conditions-container bg-white shadow-lg rounded-lg max-w-4xl mx-auto p-8 md:p-12">
      <h1 class="title-font text-secondary-clr text-3xl mb-6">Terms and Conditions</h1>
      <p class="mb-6">Welcome to Trendi Finds! These terms and conditions outline the rules and regulations for the use of our website.</p>
      
      <h2 class="subheading-font text-secondary-clr text-2xl mb-4">1. Introduction</h2>
      <p class="mb-6">By accessing this website, you agree to be bound by these terms and conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
      
      <h2 class="subheading-font text-secondary-clr text-2xl mb-4">2. Use License</h2>
      <p class="mb-6">Permission is granted to temporarily download one copy of the materials on Trendi Finds' website for personal, non-commercial transitory viewing only...</p>
      
      <ul class="list-disc pl-5 mb-8">
        <li class="text-accent-clr">Modify or copy the materials;</li>
        <li class="text-accent-clr">Utilize the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
        <li class="text-accent-clr">Attempt to decompile or reverse engineer any software contained on TrendiFindz' website;</li>
        <li class="text-accent-clr">Remove any copyright or other proprietary notations from the materials; or</li>
        <li class="text-accent-clr">Transfer the materials to another person or "mirror" the materials on any other server.</li>
      </ul>
      <!-- Add more dummy content as needed -->
    </div>
    <BottomBar />
  </main>
</template>

<style scoped>
/* Main background of the page */


/* Container for the terms and conditions */
.terms-and-conditions-container {
  background-color: var(--main-clr); /* Light background for the content */
  border-radius: 16px; /* Rounded borders for a soft appearance */
}

/* General font styles */
.title-font {
  font-family: 'Poppins', sans-serif; /* Clean and modern font */
  color: var(--secondary-clr);
  margin-bottom: 0.5em;
  text-align: center; /* Centered titles */
}

.subheading-font {
  font-family: 'Poppins', sans-serif; /* Consistent font with the title */
  color: var(--secondary-clr);
  margin-bottom: 0.25em;
}

/* Text color for paragraphs and list items */
.terms-and-conditions-container p,
.terms-and-conditions-container li {
  color: #333; /* Darker color for better readability */
  font-size: 1rem; /* Standard font size for readability */
  line-height: 1.75; /* Enhanced line height for easy reading */
  margin-bottom: 1em; /* Added space after paragraphs for a clean layout */
}

/* Styling for unordered lists */
.terms-and-conditions-container ul {
  list-style-type: disc; /* Classic bullet points */
  padding-left: 2em; /* Proper indentation for list items */
}

/* Style adjustments for the BottomBar component */



/* Add responsiveness to the design */
@media (min-width: 768px) {
  .terms-and-conditions-container {
    padding: 2em; /* More padding on larger screens for better spacing */
  }
}
</style>

 