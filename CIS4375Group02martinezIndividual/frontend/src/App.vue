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
                Client Intake Form
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
              <router-link to="/findclient">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Client
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
        <h1 class="mx-auto text-4xl text-white">Trendi Finds</h1>
      </section>
      <!--Page Content-->
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
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
</style>
