<template>
  <main class="flex justify-center min-h-screen bg-white-100">
    <div class="flex-grow">
      <AppNavBar :userStore="userStore" />
      <header class="w-full">
        <section class="text-center py-6">
          <h1 class="text-2xl font-bold underline">Frequently Asked Questions</h1>
        </section>
        <div class="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
          <ul>
            <li v-for="(faq, index) in faqs" :key="index" class="mb-4">
              <h2 @click="toggleFAQ(index)" class="cursor-pointer font-semibold forced-colors:#F07F7F">
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
          answer: 'I carefully inspects each item for quality, cleanliness, and integrity. We tend to sell items that are in good condition and meet our standards for resale.',
          open: false
        },
        {
          question: 'Can I return items if they do not fit?',
          answer: 'Due to the unique nature of thrifted items, all sales are final. However, we provide detailed measurements and condition reports to help you make an informed decision before purchasing.',
          open: false
        },
        {
        question: 'What size do you carry?',
        answer: 'We carry a range of sizes from X-Small to 2X-Large to accommodate a variety of body types.',
        open: false
      },
      {
        question: 'How fast is shipping?',
        answer: 'Shipments are made on Saturdays and Mondays. If you purchase from Jamble Live, we ship the next day on Tuesdays and Thursdays.',
        open: false
      },
      {
        question: 'How often do you add new items?',
        answer: 'New items are added to our inventory weekly on Sundays. Stay tuned to our social media for the latest updates.',
        open: false
      },
      {
        question: 'Where can I shop?',
        answer: 'You can shop at multiple places. My third-party shops are Poshmark and Jamble. I post on Poshmark and go live on Jamble Mondays and Wednesdays at 6:55 PM. I also post on my Instagram, where I do story sales and weekly bidding on my feed.',
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

<style scoped>


h2 {
  color: #F07F7F; /* This is the hex color for a pinkish tone */
}

</style>

