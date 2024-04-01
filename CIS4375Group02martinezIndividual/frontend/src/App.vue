<!-- This is the main frontend file. It displays a navigation bar and rendered components. -->

<template>
  <main class="flex flex-row">
    <div id="_container" class="min-h-screen">
    <!-- using prop -->
    <AppNavBar :userStore="userStore" />
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
        </section>
        <!--Navigation bar-->
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            <!-- Dashboard link -->
            <li>
              <router-link to="/home">
                <span style="position: relative; top: 6px" class="material-icons">dashboard</span>
                Dashboard
              </router-link>

            </li>
            <!--Login link - Link only shows is user is logged out-->
            <li v-if="user.username !== 'username1' && user.username !== 'username2'">
              <router-link to="/login">
                <span style="position:relative; top: 6px" class="material-icons">login</span>
                Login
              </router-link>
            </li>
            <!--Logout link - Link only shows is user is logged in-->
            <li v-if="user.username === 'username1' || user.username === 'username2'">
            <button @click="logout">
            <span style="position:relative; top: 6px" class="material-icons">logout</span>
            Logout
            </button>
            </li>
            <!--Client Intake Form link - only shows if user is an editor-->
            <li v-if="user.username === 'username1'">
              <router-link to="/clientform">
                <span style="position: relative; top: 6px" class="material-icons">people</span>
                Manage Clients
              </router-link>
            </li>
            <!--Create Event link - only shows if user is an editor-->
            <li v-if="user.username === 'username1'">
              <router-link to="/eventform">
                <span style="position: relative; top: 6px" class="material-icons">event</span>
                Create Event
              </router-link>
            </li>
            <!--Create Service link - only shows if user is an editor-->
            <li v-if="user.username === 'username1'">
              <router-link to="/serviceform">
                <span style="position: relative; top: 6px" class="material-icons">volunteer_activism</span>
                Create Service
              </router-link>
            </li>
            <!--Find Client link - only shows if user is logged in-->
            <li v-if="user.username === 'username1' || user.username === 'username2'">
              <router-link to="/ordertracking">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Track Orders
              </router-link>
            </li>
            <!--Find Event link - only shows if user is logged in-->
            <li v-if="user.username === 'username1' || user.username === 'username2'">
              <router-link to="/findevents">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Event
              </router-link>
            </li>
            <!--Find Service link - only shows if user is logged in-->
            <li v-if="user.username === 'username1' || user.username === 'username2'">
              <router-link to="/findservice">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Service
              </router-link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <!--Organization Name Header-->
      <section class="justify-end items-center h-24 flex"
        style="background: linear-gradient(250deg, #854d0e 70%, #d2a679 50.6%)">
        <h1 class="mx-auto text-4xl text-white">TrendiFindz</h1>
      </section>
      <!--Page Content-->
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
    <!-- Footer starts here -->
    <footer class="footer-container">
    <!-- Customer Service Column -->
    <div class="footer-column">
      <h5>Customer Service</h5>
      <ul>
        <li><router-link to="/contact-us">Contact Us</router-link></li>
        <li><router-link to="/returns">Returns</router-link></li>
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

    <!-- About Column -->
    <div class="footer-column">
      <h5>About TrendiFindz</h5>
      <ul>
        <li><router-link to="/about-us">Company Info</router-link></li>
        <li><router-link to="/careers">Careers</router-link></li>
      </ul>
    </div>

    <!-- Newsletter and Social Links Column -->
    <div class="footer-column newsletter-social">
      <h5>Stay Connected</h5>
      <form @submit.prevent="subscribeToNewsletter">
        <input type="email" placeholder="Email Address" />
        <button type="submit">Sign Up</button>
      </form>
      <div class="social-icons">
        <a href="https://www.instagram.com/trendifindz/" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 48 48">
<radialGradient id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd5"></stop><stop offset=".328" stop-color="#ff543f"></stop><stop offset=".348" stop-color="#fc5245"></stop><stop offset=".504" stop-color="#e64771"></stop><stop offset=".643" stop-color="#d53e91"></stop><stop offset=".761" stop-color="#cc39a4"></stop><stop offset=".841" stop-color="#c837ab"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><radialGradient id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4168c9"></stop><stop offset=".999" stop-color="#4168c9" stop-opacity="0"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
</svg></a>
        <a href="https://curtsyapp.com/search?q=trendifindz" target="">Curtsy</a>
        <a href="https://twitter.com" target="_blank">Twitter</a>
        <!-- More social links -->

      </div>
    </div>
  </footer>
</template>

<!-- Composition API -->
<script>
import { useLoggedInUserStore } from './store/loggedInUser'
import { getOrgName } from './api/api'
import { useToast } from 'vue-toastification'
import { ref } from 'vue'

export default {

  setup() {
    const user = useLoggedInUserStore();
    const orgName = ref('Dataplatform');
    //Notifications
    const toast = useToast();
    const username = user.username;
    const password = user.password;
    const logout = user.logout;


    const fetchOrgName = async () => {
      try {
        orgName.value = await getOrgName();
      } catch (error) {
        throw error;
      }
    }
    //getting prop from our pages to update the nav bar based on page
    console.log(username, password);
    fetchOrgName();
    return { user, orgName, username, password, toast, logout };
  },
      props: {
    userStore: {
      type: Object,
      required: true,
    },
      }
}
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

<style scoped>
#_container {
  background-color: #693802;
  color: white;
  padding: 19px;
}

.footer-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  background-color: #333;
  color: white;
  padding: 20px;
}

.footer-column h5 {
  font-size: 1.2em;
  margin-bottom: 0.5em;
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.footer-column li + li {
  margin-top: 0.25em;
}

.footer-column a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-column a:hover {
  color: #aaa;
}

.newsletter-social form {
  display: flex;
  margin-bottom: 1em;
}

.newsletter-social input[type="email"] {
  flex-grow: 1;
  padding: 0.5em;
  margin-right: 0.5em;
  border: none;
  border-radius: 4px;
  color: #000;
}

.newsletter-social button {
  padding: 0.5em 1em;
  background-color: #f90;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.social-icons a {
  display: inline-block;
  margin-right: 10px;
  padding: 0.5em;
  background-color: #333;
  border-radius: 20%;
}

.social-icons a:hover {
  background-color: #777;
}

@media (max-width: 768px) {
  .footer-container {
    text-align: center;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .footer-container {
    grid-template-columns: 1fr;
  }
}
</style>