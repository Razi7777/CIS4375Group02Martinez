<template>
  <main class="flex justify-center min-h-screen bg-gray-100">
    <div class="flex-grow">
      <AppNavBar :userStore="userStore" />
      <header class="w-full">
        <section class="text-center py-6">
          <h1 class="text-2xl font-bold underline">Frequently Asked Questions</h1>
        </section>
        <div class="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
          <ul>
            <li v-for="(faq, index) in faqs" :key="index" class="mb-4">
              <h2 @click="toggleFAQ(index)" class="cursor-pointer font-semibold text-pink-400">
                <span class="material-icons" :class="{ 'transform rotate-180': faq.open }">
                  expand_more
                </span>
                {{ faq.question }}
              </h2>
              <transition name="fade">
                <p v-show="faq.open" class="mt-2 text-gray-700">
                  {{ faq.answer }}
                </p>
              </transition>
            </li>
          </ul>
        </div>
      </header>
    </div>
  </main>
  <BottomBar />
</template>

<script>
export default {
  data() {
    return {
      faqs: [
        {
          question: 'What is thrifting?',
          answer: 'Thrifting refers to the act of shopping at a thrift store, garage sale, or flea market where you can find a variety of items, including vintage clothing, often at a lower price than new items.',
          open: false
        },
        {
          question: 'How does your thrift store ensure the quality of the clothes?',
          answer: 'Our team carefully inspects each item for quality, cleanliness, and integrity. We only sell items that are in good condition and meet our standards for resale.',
          open: false
        },
        {
          question: 'Can I return items if they do not fit?',
          answer: 'Due to the unique nature of thrifted items, all sales are final. However, we provide detailed measurements and condition reports to help you make an informed decision before purchasing.',
          open: false
        },
        {
          question: 'How often do you restock items?',
          answer: 'We add new items to our inventory weekly. Follow us on social media or subscribe to our newsletter to get updates on our latest stock.',
          open: false
        },
        {
          question: 'Do you clean the clothes before selling them?',
          answer: 'Yes, all clothing is laundered or steamed before being put out for sale. We strive to ensure that you receive your items clean and ready to wear.',
          open: false
        },
        // ... other FAQs
      ],
    };
  },
  methods: {
    toggleFAQ(index) {
      this.faqs[index].open = !this.faqs[index].open;
    },
  },
};
</script>


