<template>
  <main class="flex justify-center items-center  bg-main-bg p-4 md:p-10">
    <div class="privacy-policy rounded-lg md:p-10 max-w-4xl bg-white shadow-xl">
      <h1 class="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
      <p class="mb-5">
        At Trendi Finds, we deeply value your privacy. This policy outlines our practices regarding the collection, use, and protection of your personal information.
      </p>
      <h2 class="section-heading">Information Collection</h2>
      <p class="mb-5">
        We collect personal details such as your name, email, and shipping address upon order placement, along with non-personal information like browser type and IP address.
      </p>
      <h2 class="section-heading">Use of Information</h2>
      <p class="mb-5">
        The information we gather is used for:
      </p>
      <ul class="list-inside mb-5">
        <li>Processing and fulfilling orders</li>
        <li>Providing order confirmations and updates</li>
        <li>Offering customer support and responding to inquiries</li>
        <li>Improving our website and services</li>
        <li>Sending you promotional material about new products and special offers with the ability to unsubscribe at any time</li>
      </ul>
      <!-- Insert additional sections here if needed -->
    </div>
    <BottomBar />
  </main>
</template>

<style scoped>
.privacy-policy {
  /* Add a nice background color with subtle patterns if available */
  background-color: var(--main-clr); /* Use a pleasant off-white color */
  border-radius: 15px; /* Rounded corners for a softer look */
  color: #444; /* Darker text color for better readability */
  height: fit-content;
}

/* Background color */
.bg-main-bg {
  background-color: transparent; /* Soft background color to give a cozy feeling */
}

/* Heading styles */
.privacy-policy h1 {
  color: var(--secondary-clr);
  margin-bottom: 1em;
}

/* Section heading styles */
.section-heading {
  color: var(--accent-clr);
  font-size: 1.5em; /* Slightly larger for better readability */
  margin-bottom: 0.75em; /* Uniform margin for a neat look */
}

/* Paragraph styles */
.privacy-policy p {
  margin-bottom: 1em; /* More space after paragraphs for a cleaner look */
}

/* List styles */
.privacy-policy ul {
  list-style-type: disc; /* Traditional bullet points for clarity */
  padding-left: 4.5em; /* Sufficient padding for bullet points */
}

.privacy-policy li {
  margin-bottom: 0.75em; /* Consistent spacing between list items */
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .privacy-policy {
    padding: 2em; /* More padding on larger screens */
  }
}
</style>
