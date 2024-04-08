<template>
  <main class="flex justify-center min-h-screen bg-gray-100">
    <div class="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div class="privacy-policy py-6">
        <h1 class="text-2xl font-bold text-center underline mb-4">Privacy Policy</h1>
        <p class="text-gray-700 mb-4">
          At Trendi Finds, we value your privacy and are committed to protecting your personal information. This privacy policy outlines how we collect, use, and safeguard your information when you visit our website.
        </p>
        <h2 class="text-xl font-semibold text-purple-600 mb-2">1. Information Collection</h2>
        <p class="text-gray-700 mb-4">
          We may collect personal information from you, such as your name, email address, and shipping address when you place an order. We also collect non-personal information, such as your browser type, IP address, and referring pages.
        </p>
        <h2 class="text-xl font-semibold text-purple-600 mb-2">2. Information Use</h2>
        <p class="text-gray-700 mb-4">
          We use the information we collect to:
        </p>
        <ul class="list-disc pl-6 mb-4">
          <li class="text-gray-700 mb-2">Process and fulfill your orders</li>
          <li class="text-gray-700 mb-2">Send you order confirmations and updates</li>
          <li class="text-gray-700 mb-2">Respond to your inquiries and provide customer support</li>
          <li class="text-gray-700 mb-2">Improve our website and services</li>
          <li class="text-gray-700 mb-4">Send you promotional emails about new products, special offers, or other information which we think you may find interesting (you may opt-out of these emails at any time)</li>
        </ul>
        <!-- Add more content as needed -->
      </div>
    </div>
    <BottomBar />
  </main>
</template>

<style scoped>
  .privacy-policy h1 {
    /* Heading 1 styles */
    color: #333;
  }
  
  .privacy-policy h2 {
    /* Heading 2 styles */
    color: #5f27cd;
  }

  .privacy-policy p {
    /* Paragraph text styles */
    line-height: 1.6;
  }

  .privacy-policy ul {
    /* Unordered list styles */
    line-height: 1.6;
  }
</style>

