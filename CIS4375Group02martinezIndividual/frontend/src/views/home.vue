<template>
  <div class="page-container">
    <main>
      <h1 class="title">Welcome to Our Thrift Site!</h1>
      <!-- Additional content can be placed here -->
      <div v-if="recentEvents.length > 0">
        <h2>Recent Events</h2>
        <ul>
          <li v-for="event in recentEvents" :key="event.id">
            {{ event.name }} - {{ event.date }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No recent events to display.</p>
      </div>
      <!-- Placeholder for the logged in user store content -->
      <p>User Status: {{ loggedInUserStore.isLoggedIn ? 'Logged In' : 'Logged Out' }}</p>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
// Assuming you're using Pinia for state management
// import { useLoggedInUserStore } from '@/stores/loggedInUserStore'; // Adjust the path as necessary

export default {
  setup() {
    const recentEvents = ref([
      // Placeholder events data
      { id: 1, name: 'Event 1', date: '2024-01-01' },
      { id: 2, name: 'Event 2', date: '2024-02-02' },
    ]);
    // Placeholder for loggedInUserStore if you're using a state management library
    // const loggedInUserStore = useLoggedInUserStore();

    // Placeholder loggedInUserStore object for illustration purposes
    const loggedInUserStore = ref({ isLoggedIn: false });

    return {
      recentEvents,
      loggedInUserStore,
    };
  },
};
</script>

<style>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
  text-align: center;
}

.title {
  font-size: 2rem;
  color: #333;
  margin: 1rem 0;
}
</style>
