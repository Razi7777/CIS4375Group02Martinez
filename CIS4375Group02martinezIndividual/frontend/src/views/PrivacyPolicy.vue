<template>
  <main class="flex justify-center items-center min-h-screen white">

      <div class="privacy-policy">
        <h1 class="text-3xl font-bold text-center mb-6" style="color: var(--secondary-clr);">Privacy Policy</h1>
        <p class="text-gray-600 mb-5">
          At Trendi Finds, we deeply value your privacy. This policy outlines our practices regarding the collection, use, and protection of your personal information.
        </p>
        <h2 class="text-xl font-semibold mb-4" style="color: var(--accent-clr);">Information Collection</h2>
        <p class="text-gray-600 mb-5">
          We collect personal details such as your name, email, and shipping address upon order placement, along with non-personal information like browser type and IP address.
        </p>
        <h2 class="text-xl font-semibold mb-4" style="color: var(--accent-clr);">Use of Information</h2>
        <p class="text-gray-600 mb-5">
          The information we gather is used for:
        </p>
        <ul class="list-disc pl-8 mb-5 text-white-600">
          <li class="mb-2">Processing and fulfilling orders</li>
          <li class="mb-2">Providing order confirmations and updates</li>
          <li class="mb-2">Offering customer support and responding to inquiries</li>
          <li class="mb-2">Improving our website and services</li>
          <li class="mb-5">Sending you promotional material about new products and special offers with the ability to unsubscribe at any time</li>
        </ul>
        <!-- Insert additional sections here if needed -->
      </div>

    <BottomBar />
  </main>
</template>

<style scoped>
:root {
  --main-clr: #EBEAEA; /* Light grey background color */
  --secondary-clr: #F07F7F; /* Soft pink for headings */
  --accent-clr: #EA4848; /* Slightly bolder red for sub-headings */
}

.privacy-policy h1 {
  color: var(--secondary-clr);
  margin-bottom: 0.5em;
}

.privacy-policy h2 {
  color: var(--accent-clr);
  margin-bottom: 0.25em;
}

.privacy-policy p,
.privacy-policy li {
  color: var(--secondary-clr);
  line-height: 1.75; /* Slightly more space between lines for readability */
  margin-bottom: 0.5em; /* Space after paragraphs and list items */
}

.privacy-policy ul {
  margin-left: 2em; /* More space for bullet points to stand out */
  color: var(--secondary-clr); /* Consistent text color for list */
}
</style>
