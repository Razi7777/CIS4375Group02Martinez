<template>
  <main class="bg-main-clr min-h-screen">
    <div class="terms-and-conditions max-w-4xl mx-auto p-8">
      <h1 class="text-secondary-clr font-bold text-3xl underline mb-4">Terms and Conditions</h1>
      <p class="text-accent-clr mb-4">Welcome to Trendi Finds! These terms and conditions outline the rules and regulations for the use of our website.</p>
      
      <h2 class="text-secondary-clr font-semibold text-2xl mb-2">1. Introduction</h2>
      <p class="text-accent-clr mb-4">By accessing this website, you agree to be bound by these terms and conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
      
      <h2 class="text-secondary-clr font-semibold text-2xl mb-2">2. Use License</h2>
      <p class="text-accent-clr mb-4">Permission is granted to temporarily download one copy of the materials on Trendi Finds' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:</p>
      <ul class="list-disc list-inside mb-8">
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
:root {
  --main-clr: #EBEAEA; /* Main background color */
  --secondary-clr: #F07F7F; /* Secondary color for headings and highlights */
  --accent-clr: #EA4848; /* Accent color for text */
}

.terms-and-conditions h1,
.terms-and-conditions h2 {
  color: var(--secondary-clr);
}

.terms-and-conditions p,
.terms-and-conditions li {
  color: var(--accent-clr);
}

.terms-and-conditions ul {
  padding-left: 1rem;
}

/* Ensure the BottomBar component inherits the main color */
BottomBar {
  background-color: var(--main-clr);
}
</style>

 