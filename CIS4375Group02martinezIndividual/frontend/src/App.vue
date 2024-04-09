<template>
  <main class="flex flex-row">    
    <div class="grow w-5/5">
      <div class="nav-container">
        <img src="@/assets/Marisol.svg" alt="Logo" class="logo-svg"/>
        <div class="navbar container">
          <div class="mobile-container nav-container-mobile">
            <input class="checkbox" type="checkbox" v-model="isMenuOpen" />
            <div class="hamburger-lines" @click="toggleMenu">
              <span class="line line1"></span>
              <span class="line line2"></span>
              <span class="line line3"></span>
            </div>
            <div class="menu-items">
              <router-link to="/home" @click.native="closeMenu">Home</router-link>
              <router-link to="/event-calendar" @click.native="closeMenu">Events</router-link>
              <router-link to="/login" v-if="user.username !== 'username1' && user.username !== 'username2'" @click.native="closeMenu">Login</router-link>
            
              <li v-if="user.username === 'username1'">
                <router-link to="/clientform" @click.native="closeMenu">Clients</router-link>
              </li>
              <li v-if="user.username === 'username1'">
                <router-link to="/serviceform" @click.native="closeMenu">Services</router-link>
              </li>
              <li v-if="user.username === 'username1' || user.username === 'username2'">
                <router-link to="/order-tracking" @click.native="closeMenu">Orders</router-link>
              </li>
              <li v-if="user.username === 'username1' || user.username === 'username2'">
                <router-link to="/home" @click.native="logout">Logout</router-link>
              </li>
            </div> 
        </div>
        </div>
        <section class="justify-end items-center h-24 flex">
          <h1 class="Title"><a href="/home"></a></h1>
        </section>
        <div class="links">
          <ul>
            <li>
              <router-link to="/home">Dashboard</router-link>
            </li>
            <li>
              <router-link to="/event-calendar">Event Calendar</router-link>
            </li>
            <li v-if="user.username !== 'username1' && user.username !== 'username2'">
              <router-link to="/login">Login</router-link>
            </li>
            <li v-if="user.username === 'username1'">
              <router-link to="/clientform">Clients</router-link>
            </li>
            <li v-if="user.username === 'username1'">
              <router-link to="/eventform">Events</router-link>
            </li>
            <li v-if="user.username === 'username1'">
              <router-link to="/serviceform">Services</router-link>
            </li>
            <li v-if="user.username === 'username1' || user.username === 'username2'">
              <router-link to="/order-tracking">Orders</router-link>
            </li>
            <li v-if="user.username === 'username1' || user.username === 'username2'">
              <router-link to="/home" @click="logout">Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
      
      <!--Page Content-->
      <div>

        <router-view :upcoming-events="upcomingEvents"></router-view>
      </div>
    </div>
  </main>
    <!-- Footer starts here -->
    <footer class="footer-container">
    <!-- Customer Service Column -->
    <div class="footer-column">
      <h5>Customer Service</h5>
      <ul>
        <li><router-link to="/contact">Contact Us</router-link></li>
        <li><router-link to="/shipping">Shipping</router-link></li>
        <li><router-link to="/track-order">Track Your Order</router-link></li>
      </ul>
    </div>

    <!-- Helpful Links Column -->
    <div class="footer-column">
      <h5>Helpful Links</h5>
      <ul>
        <li><router-link to="/FAQ">FAQ</router-link></li>
        <li><router-link to="/terms-and-conditions">Terms and Conditions</router-link></li>
        <li><router-link to="/privacy-policy">Privacy Policy</router-link></li>
      </ul>
    </div>

    <!-- About Column and Social Links-->
    <div class="footer-column">
      <h5>About TrendiFindz</h5>
      <ul>
        <li><router-link to="/about">Company Info</router-link></li>

      </ul>

      <div class="social-icons ">
        <h5>Follow Us</h5>
        <a href="https://www.instagram.com/trendifindz/" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 48 48">
<radialGradient id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd5"></stop><stop offset=".328" stop-color="#ff543f"></stop><stop offset=".348" stop-color="#fc5245"></stop><stop offset=".504" stop-color="#e64771"></stop><stop offset=".643" stop-color="#d53e91"></stop><stop offset=".761" stop-color="#cc39a4"></stop><stop offset=".841" stop-color="#c837ab"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><radialGradient id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4168c9"></stop><stop offset=".999" stop-color="#4168c9" stop-opacity="0"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
</svg></a>
        <a href="https://curtsyapp.com/search?q=trendifindz" target=""><svg x="0px" y="0px" width="35" height="35" viewBox="0 0 " fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27.7309 27.0462L26.2793 25.4117C23.7564 22.5735 20.5202 18.9006 18.8618 17.0107L18.2899 16.388L17.7853 15.7819C17.7702 15.7636 17.39 15.3345 16.8232 14.6867C16.5474 14.3729 16.2278 14.0072 15.8847 13.6116C15.481 13.1474 15.0437 12.6416 14.6064 12.1307C14.4382 11.9437 14.2834 11.7534 14.1236 11.5664L14.1034 11.543L14.095 11.533L13.9067 11.3126C13.4021 10.7183 12.9227 10.144 12.5173 9.64313C11.34 8.19733 10.4468 6.71647 10.4468 5.24061C10.4458 4.50102 10.6089 3.77029 10.9245 3.10029C12.4198 0.31387 15.9301 0.712884 17.2757 2.94336C17.641 3.65481 17.8312 4.44208 17.8307 5.24061C17.8307 6.82165 16.8064 8.41269 15.5029 9.95365H20.3907C23.3544 3.68462 18.5136 0 14.3187 0H13.9823C8.98012 0 3.04944 5.23894 10.5511 13.857C10.6486 13.9588 10.7479 14.0573 10.8454 14.1558L11.3097 14.6884L11.3416 14.7251L10.9918 15.1125L1.99652 25.0361L1.75598 25.3082L0 27.2498L0.0353151 27.2766H0.0471005C2.21182 28.9461 13.942 36.9714 28 27.35L27.7309 27.0462ZM7.833 28.5337L8.93134 26.7072L10.6823 24.0076L12.3845 21.3815L13.6661 19.4048L14.0681 18.7854L14.6736 19.6452L15.3262 20.5701L16.475 22.1996L18.1924 24.6354L20.8633 28.4235C15.9049 30.3234 11.3988 29.7959 7.82797 28.5337H7.833Z" fill="black"/>
</svg></a>
        <a href="https://poshmark.com/closet/trenditower" target="_blank">
            <img src="@/assets/posh.png" alt="Poshmark" style="inline-size:35px; block-size:35px;"/>
        </a>
        <!-- More social links -->
      </div>
    </div>

    <!-- Newsletter-->
    <div class="footer-column newsletter-social">
      <h5>TrendiFindz Insider Club</h5>
      <form @submit.prevent="subscribeToNewsletter">
        <input type="email" placeholder="Email Address" />
        <button type="submit">
          <p>Sign Up</p>
        </button>
      </form>
    
    </div>
  </footer>
</template>

<!-- Composition API -->
<script>
import { useLoggedInUserStore } from './store/loggedInUser'
import { getOrgName } from './api/api'
import { useToast } from 'vue-toastification'
import { ref } from 'vue'
import EventCalendar from './views/EventCalendar.vue';

export default {
  components: {
    EventCalendar,
  },
  setup() {
    const user = useLoggedInUserStore();
    const orgName = ref('Dataplatform');
    // Notifications
    const toast = useToast();

    const fetchOrgName = async () => {
      try {
        orgName.value = await getOrgName();
      } catch (error) {
        throw error;
      }
    }

    fetchOrgName();
    return { user, orgName, toast };
  },
  data() {
    return {
      isMenuOpen: false,
      upcomingEvents: [],
    };
  },
  methods: {
    setUpcomingEvents(events) {
      this.upcomingEvents = events;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      if (this.isMenuOpen) {
        this.isMenuOpen = false;
      }
    },
    logout() {
      this.closeMenu();
      // Add your logout logic here
      this.user.logout();
    },
  },
  props: {
    userStore: {
      type: Object,
      required: true,
    },
  },
};


// reference:
// https://vuejs.org/api/composition-api-setup
</script>

<!-- Options API -->
<!-- <script>
import { useLoggedInUserStore } from './store/loggedInUser'
import { getOrgName } from './api/api'
import { useToast } from 'vue-toastification'
//Notifications
const toast = useToast()

export default {
  setup() {
    const user = useLoggedInUserStore();
    return { user };
  },
  data() {
    return {
      orgName: "Dataplatform",
    };
  },
  async created() {
    try {
      this.orgName = await getOrgName();
    } catch {
      throw (error)
    }
  },
  methods: {
    logout() {
      try {
        this.$store.dispatch('clearSessionData');
        this.$router.push('/')
      } catch (error) {
        toast.error('logout error', error)
      }
    },
  }
}
</script> -->
