<!-- This is the main frontend file. It displays a navigation bar and rendered components. -->

<template>
  <main class="flex flex-row">
    <div id="_container" class="min-h-screen">
    <!-- using prop -->
    <AppNavBar :userStore="userStore" />
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\Marisol.svg" />
        </section>
        <!--Navigation bar-->
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            <!-- Dashboard link -->
            <li>
              <router-link to="/home">
                <span style="position: relative; inset-block-start: 6px" class="material-icons">dashboard</span>
                Dashboard
              </router-link>

            </li>
            <!--Login link - Link only shows is user is logged out-->
            <li v-if="user.username !== 'username1' && user.username !== 'username2'">
              <router-link to="/login">
                <span style="position:relative; inset-block-start: 6px" class="material-icons">login</span>
                Login
              </router-link>
            </li>
            <!--Logout link - Link only shows is user is logged in-->
            <li v-if="user.username === 'username1' || user.username === 'username2'">
            <button @click="logout">
            <span style="position:relative; inset-block-start: 6px" class="material-icons">logout</span>
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
                <span style="position: relative; inset-block-start: 6px" class="material-icons">event</span>
                Create Event
              </router-link>
            </li>
            <!--Create Service link - only shows if user is an editor-->
            <li v-if="user.username === 'username1'">
              <router-link to="/serviceform">
                <span style="position: relative; inset-block-start: 6px" class="material-icons">volunteer_activism</span>
                Create Service
              </router-link>
            </li>
            <!--Find Client link - only shows if user is logged in-->
            <li v-if="user.username === 'username1' || user.username === 'username2'">
              <router-link to="/ordertracking">
                <span style="position: relative; inset-block-start: 6px" class="material-icons">search</span>
                Track Orders
              </router-link>
            </li>
            <!--Find Event link - only shows if user is logged in-->
            <li v-if="user.username === 'username1' || user.username === 'username2'">
              <router-link to="/findevents">
                <span style="position: relative; inset-block-start: 6px" class="material-icons">search</span>
                Find Event
              </router-link>
            </li>
            <!--Find Service link - only shows if user is logged in-->
            <li v-if="user.username === 'username1' || user.username === 'username2'">
              <router-link to="/findservice">
                <span style="position: relative; inset-block-start: 6px" class="material-icons">search</span>
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
        <li><router-link to="/about-us">Company Info</router-link></li>

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
        <button type="submit">Sign Up</button>
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
  background-color: #fbc4ab;
  color: white;
  padding: 19px;
}

.footer-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  background-color: #fbc4ab;
  color: white;
  padding: 20px;
}

.footer-column h5 {
  font-size: 1.2em;
  margin-block-end: .5em;
  font-weight: bold;
  margin-block-start: .5em;
}

.footer-column ul {
  list-style: none;
  padding: 1px;
}

.footer-column li + li {
  margin-block-start: 0.25em;
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
  margin-block-end: 1em;
}

.newsletter-social input[type="email"] {
  flex-grow: 1;
  padding: 0.5em;
  margin-inline-end: 0.5em;
  border: none;
  border-radius: 4px;
  color: #000;
}

.newsletter-social button {
  padding: 0.5em 1em;
  background-color: #f08080;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.social-icons a {
  display: inline-block;
  margin-inline-end: 10px;
  padding: 0.5em;
  background-color: #fbc4ab;
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