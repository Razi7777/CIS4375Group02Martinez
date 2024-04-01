<template>
  <div class="page-container">
    <main>
      <div>
        <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
          Dashboard
        </h1>
        <br />
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <div class="ml-10"></div>
          <div class="flex flex-col col-span-2">
            <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
                Events Attendance
            </h1>
        
            <div v-if="!recentEvents.length" class="flex justify-center mt-10">No events found.</div>
            <table v-if="recentEvents.length" class="min-w-full shadow-md rounded">
              <thead class="bg-gray-50 text-xl">
                <tr class="p-4 text-left">
                  <th class="p-4 text-left">Event Name</th>
                  <th class="p-4 text-left">Event Date</th>
                  <th class="p-4 text-left">Number of Attendees</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-300"> 
                <tr
                  @click="editEvent(event._id)"
                  v-for="event in recentEvents"
                  :key="event._id"
                >
                  <td class="p-2 text-left">{{ event.name }}</td>
                  <td class="p-2 text-left">{{ formatDate(event.date) }}</td>
                  <td class="p-2 text-left">{{ event.attendees.length }}</td>
                </tr>
              </tbody>
            </table>
            
            <div v-if="recentEvents.length">
              <AttendanceChart
                v-if="!loading && !error"
                :labels="labels"
                :chart-data="chartData"
              />
            </div>
            
            <div class="mt-40" v-if="loading">
              <p class="text-6xl font-bold text-center text-gray-500 animate-pulse">
                Loading...
              </p>
            </div>
            
            <div class="mt-12 bg-red-50" v-if="error">
              <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
                {{ error.title }}
              </h3>
              <p class="p-4 text-lg font-bold text-red-900">
                {{ error.message }}
              </p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <div class="ml-10"></div>
          <div class="flex flex-col col-span-2">
            <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
                Clients by Zip Code
            </h1>
            
            <div v-if="!zips.length" class="flex justify-center mt-10">No clients found.</div>
            <table v-if="zips.length" class="min-w-full shadow-md rounded">
              <thead class="bg-gray-50 text-xl">
                <tr class="p-4 text-left">
                  <th class="p-4 text-left">Zip Number</th>
                  <th class="p-4 text-left">Client Count</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-300">
                <tr
                  v-for="zip in zips"
                  :key="zip._id"
                >
                  <td class="p-2 text-left">{{ zip._id }}</td>
                  <td class="p-2 text-left">{{ zip.count }}</td>
                </tr>
              </tbody>
            </table>
            <div v-if="zips.length" class="flex justify-center mt-10">
              <ZipChart
                v-if="!zipLoading && !zipError"
                :labels="zipLabels"
                :chart-data="zipChartData"
              />
            </div>
            
            <div class="mt-40" v-if="zipLoading">
              <p class="text-6xl font-bold text-center text-gray-500 animate-pulse">
                Loading...
              </p>
            </div>
            
            <div class="mt-12 bg-red-50" v-if="zipError">
              <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
                {{ zipError.title }}
              </h3>
              <p class="p-4 text-lg font-bold text-red-900">
                {{ zipError.message }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="footer-section">
          <div class="app-store-buttons-container">
            <a href="https://apps.apple.com/us/app/your-app-name/app-id" target="_blank" class="app-store-button">
              <img src="../assets/app-store.png" alt="App Store">
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.example.yourapp" target="_blank" class="app-store-button">
              <img src="../assets/google-play.png" alt="Google Play">
            </a>
          </div>
          <div class="social-media-buttons-container">
            <a href="https://www.facebook.com/yourpage" target="_blank" class="social-media-button">
              <img src="../assets/facebook.png" alt="Like us on Facebook">
            </a>
            <a href="https://www.instagram.com/yourpage" target="_blank" class="social-media-button">
              <img src="../assets/instagram.png" alt="Follow us on Instagram">
            </a>
          </div>
          <router-link to="/newsletter" class="footer-link newsletter-link">SIGN UP FOR NEWSLETTER</router-link>
        </div>
        <div class="footer-section">
          <h3 class="footer-header">Trendi Findz Insider</h3>
          <router-link to="/FAQ" class="footer-link">Frequently Asked Questions</router-link>
          <router-link to="/terms-and-conditions" class="footer-link">Terms and Conditions</router-link>
        </div>
        <div class="footer-section">
          <h3 class="footer-header">Customer Service</h3>
          <router-link to="/Contact" class="footer-link">Contact Us</router-link>
          <router-link to="/return-and-exchange" class="footer-link">Return & Exchange Policy</router-link>
        </div>
      </footer>
    </main>
  </div>
</template>

<script>
import AttendanceChart from '../components/barChart.vue';
import ZipChart from '../components/donutZipChart.vue';
// import { getAttendance, getClientsByZipCode } from '../api/api';
import { ref, onMounted } from 'vue';
import { useLoggedInUserStore } from '@/store/loggedInUser';

export default {
  components: {
    AttendanceChart,
    ZipChart,
  },
  setup() {
    const recentEvents = ref([]);
    const zips = ref([]);
    const labels = ref([]);
    const chartData = ref([]);
    const zipLabels = ref([]);
    const zipChartData = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const zipLoading = ref(false);
    const zipError = ref(null);
    const loggedInUserStore = useLoggedInUserStore();

     // const getAttendanceData = async () => {
    //   try {
    //     error.value = null;
    //     loading.value = true;
        
    //     const attendance = await getAttendance();
    //     recentEvents.value = attendance;
        // labels.value = attendance.map(
        //   (item) => `${item.name} (${this.formatDate(item.date)})`
        // );
        // chartData.value = attendance.map((item) => item.attendees.length);
    //   } catch (err) {
    //     if (err.response) {
    //     // client received an error response (5xx, 4xx)
    //       error.value = {
    //         title: 'Server Response',
    //         message: err.message
    //       }
    //   } else if (err.request) {
    //     // client never received a response, or request never left
    //       error.value = {
    //         title: 'Unable to Reach Server',
    //         message: err.message
    //       }
    //   } else {
    //   // There's probably an error in your code
    //       error.value = {
    //         title: 'Application Error',
    //         message: err.message
    //       }
    //     }
    // }
    //   loading.value = false;
    // };

    // const getZipData = async () => {
    //   try {
    //     zipError.value = null;
    //     zipLoading.value = true;
        
    //     const zipdata = await getClientsByZipCode();
    //     zips.value = zipdata;
    //     zipLabels.value = zipdata.map((item) => item._id);
    //     zipChartData.value = zipdata.map((item) => item.count);
    //   } catch (err) {
    //     if (err.response) {
    //     // client received an error response (5xx, 4xx)
    //       zipError.value = {
    //         title: 'Server Response',
    //         message: err.message
    //       }
    //     } else if (err.request) {
    //       // client never received a response, or request never left
    //       zipError.value = {
    //         title: 'Unable to Reach Server',
    //         message: err.message
    //       }
    //     } else {
    //       // There's probably an error in your code
    //       zipError.value = {
    //         title: 'Application Error',
    //         message: err.message
    //       }
    //     }
    //   }
    //   zipLoading.value = false;
    // };
   


    const formatDate = (date) => {
      const isoDate = new Date(date);
      const year = isoDate.getUTCFullYear();
      const month = String(isoDate.getUTCMonth() + 1).padStart(2, '0');
      const day = String(isoDate.getUTCDate()).padStart(2, '0');
      return `${month}/${day}/${year}`;
    };

    const hardcodedData = () => {
      zips.value = [
        { _id: '77401', count: 23,},
        { _id: '77562', count: 17,},
        { _id: '77083', count: 26,},
      ];
      zipLabels.value = zips.value.map((item) => item._id);
      zipChartData.value = zips.value.map((item) => item.count);

      recentEvents.value = [
        { name: 'Event 1', date: '2024-03-11', attendees: ['Sheldon', 'Peter', 'Tekk'] },
        { name: 'Event 2', date: '2024-03-12', attendees: ['Bryce', 'Noah'] },
        { name: 'Event 3', date: '2024-03-13', attendees: ['Jonah', 'Mazin', 'Joe', 'Dog'] }
      ];
      labels.value = recentEvents.value.map((item) => `${item.name} (${formatDate(item.date)})`);
      chartData.value = recentEvents.value.map((item) => item.attendees.length);
    };

    onMounted(() => {
      hardcodedData();
    });

    return {
      recentEvents,
      zips,
      labels,
      chartData,
      zipLabels,
      zipChartData,
      loading,
      error,
      zipLoading,
      zipError,
      formatDate,
      hardcodedData,
      loggedInUserStore,
    }
  }
}
</script>

<style scoped>
/* ... your existing styles ... */
</style>

<style scoped>
body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.footer {
  background-color: #f8f8f8;
  padding: 80px 0;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  text-align: left;
  position: relative;
  z-index: 1;
}

.footer-section {
  flex: 1;
  max-width: 300px;
}

.app-store-buttons-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.app-store-button {
  margin-right: 10px;
}

.app-store-button img {
  width: 30px;
  height: 30px;
}

.social-media-buttons-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.social-media-button {
  display: inline-block;
  margin-right: 10px;
}

.social-media-button img {
  width: 30px;
  height: 30px;
}

.newsletter-link {
  display: block;
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 10px;
}

.footer-header {
  font-weight: bold;
  margin-bottom: 15px;
  font-size: 18px;
}

.footer-link {
  display: block;
  color: #333;
  text-decoration: none;
  margin-bottom: 5px;
}
</style>