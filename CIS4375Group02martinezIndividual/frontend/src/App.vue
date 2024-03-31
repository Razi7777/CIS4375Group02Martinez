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
             <!--Product Catalog dropdown - only shows if user is username1-->
             <li v-if="user.username === 'username1'">
              <div class="dropdown">
                <button class="dropbtn">
                  <span style="position: relative; top: 6px" class="material-icons">category</span>
                  Product Catalog
                </button>
                <div class="dropdown-content">
                  <router-link :to="{ name: 'productcatalog', query: { category: 'Tops' } }">Tops</router-link>
            <router-link :to="{ name: 'productcatalog', query: { category: 'Bottoms' } }">Bottoms</router-link>
            <router-link :to="{ name: 'productcatalog', query: { category: 'Shoes' } }">Shoes</router-link>
            <router-link :to="{ name: 'productcatalog', query: { category: 'Accessories' } }">Accessories</router-link>
            <router-link :to="{ name: 'productcatalog', query: { category: 'Jewelry' } }">Jewelry</router-link>
            <router-link :to="{ name: 'productcatalog', query: { category: 'Miscellaneous' } }">Miscellaneous</router-link>
                </div>
              </div>
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
        <h1 class="mx-auto text-4xl text-white"><a href="/home">TrendiFindz</a></h1>
      </section>
      <!--Page Content-->
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
  <footer class="bottom-bar">
    <!-- Quick Links -->
<div class="quick-links">
  <ul>
    <li><router-link to="/faq">FAQ</router-link></li>
    <li><router-link to="/terms-and-conditions">Terms and Conditions</router-link></li>
    <li><router-link to="/privacy-policy">Privacy Policy</router-link></li>
    <li><router-link to="/return-and-exchange">Return and Exchange</router-link></li>
    <li><router-link to="/contact">Contact Us</router-link></li>
    <li><router-link to="/admin-login">Admin Login</router-link></li>
  </ul>
</div>


    <!-- Newsletter and Social Links -->
    <div class="newsletter-social">
      <form class="newsletter-form">
        <input type="email" placeholder="Email Adress" />
        <button type="submit">Subscribe</button>
      </form>
      <div class="social-links">
        <a href="https://instagram.com" target="IG.svg">Instagram</a>
        <a href="https://poshmark.com" target="_blank">Poshmark</a>
        <a href="https://curtsy.com" target="Curtsy.svg">Curtsy</a>
        <!-- Add more social links as needed -->
      </div>
    </div>

    <!-- Copyright Notice -->
    <div class="copyright">
      © 2024, TrendiFindz, Houston, TX
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

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}
* {
  box-sizing: border-box;
}
/* Bottom bar styles */
.bottom-bar {
  position: static;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #d2a679; /* Your color here */
  color: white;
  display: flex;
  flex-wrap: wrap; /* Allow the content to wrap */
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px; /* Adjusted padding */
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

/* Quick links styles */
.quick-links {
  display: flex;
  flex-direction: column; /* Change to row if you want horizontal links */
  align-items: center;
}

/* Newsletter and social links container */
.newsletter-social {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  margin: rem; /* Add space between elements */
}

/* Newsletter form styles */
.newsletter-form {
  display: flex;
  padding: 5px;
   /* Add space between input and button */
}

.newsletter-form input[type=email] {
  padding: 10px; /* Comfortable padding inside the input */
  border: 1px solid #ccc; /* Subtle border for the input */
  border-radius: 10px; /* Rounded corners for the input */
  background-color: white; /* Ensure the background is white for visibility */
  color: #333; /* Dark text for contrast against the background */
  cursor: text;
  padding: 5px;
  margin: 0 1rem 0 0; /* Shows the text cursor when hovering over the input */
}

.newsletter-form input[type=email]::placeholder {
  color: #888; /* Lighter text color for placeholder */
}


.newsletter-form button {
  padding: 10px 10px; /* Increased padding for better touch area */
  background-color: #333;
  color: white;
  border: none;
  border-radius: 10px; /* Slightly rounded corners for the button */
  cursor: pointer;
  white-space: nowrap; /* Prevents text inside button from wrapping */

}

/* Social links styles */
.social-links {
  display: flex; /* Align social links horizontally */
  gap: 5px; /* Add space between links */
}

.social-links a {
  color: white;
  text-decoration: none;
  background: #333; /* Give a background to make it look like buttons */
  padding: 10px 10px; /* Padding inside the links */
  border-radius: 10px; 
  margin-left: 10px;/* Slightly rounded corners for the links */
}

/* Copyright text */
.bottom-bar a,
.bottom-bar a:visited {
  color: white;
  padding: 0 10px;
  text-decoration: none;
}

.bottom-bar a:hover {
  text-decoration: underline;
}

@media screen and (max-width: 800px) {

  
  #_container {
    display: none;
  }

  .quick-links,
  .newsletter-social {
    align-items: center;

    margin-bottom: 1px;
  }
  
  .social-links a {
    margin: 5px 0;
  }

  .bottom-bar {
    flex-direction: column;
    position: static;

  }

  .newsletter-social {
    flex-direction: column;
    width: 100%; /* Take full width */
  }

  .newsletter-form,
  .social-links {
    width: 100%; /* Take full width */
    margin-bottom: 10px; /* Add space below each section */
  }

  .newsletter-form input[type=email],
  .newsletter-form button,
  .social-links a {
    width: 90%; /* Take 90% of the width, leaving some margin on the sides */
    text-align: center; /* Center the text inside the elements */
  }
}
</style>