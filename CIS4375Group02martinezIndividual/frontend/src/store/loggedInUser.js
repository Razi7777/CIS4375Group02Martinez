import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { loginUser, logoutUser } from '../api/api'
import jwt_decode from 'jwt-decode';
import router from '../router' // Ensure your router is correctly imported

const toast = useToast()

export const useLoggedInUserStore = defineStore({
  id: 'loggedInUser',
  state: () => ({
    isLoggedIn: false,
    name: "",
    role: "",
    token: localStorage.getItem('token') || "", // Initialize token from localStorage
  }),
  actions: {
    async login(username, password) {
      try {
        const token = await loginUser(username, password);
        localStorage.setItem('token', token); // Save token to localStorage
        const decodedToken = jwt_decode(token);
        this.$patch({
          isLoggedIn: true,
          role: decodedToken.role,
          name: decodedToken.name,
          token: token
        });
        router.push("/home");
        toast.success("Login Successful!");
      } catch (error) {
        toast.error(error.message);
      }
    },
    logout() {
      logoutUser(); // Ideally, this should also make an API call to invalidate the token
      localStorage.removeItem('token'); // Remove token from localStorage
      this.$reset(); // Reset store state
      router.push("/login");
      toast.info("You have been logged out!");
    },
    checkLogin() {
      if (this.token) {
        try {
          const decodedToken = jwt_decode(this.token);
          this.$patch({
            isLoggedIn: true,
            role: decodedToken.role,
            name: decodedToken.name
          });
        } catch (error) {
          // Handle error if token is not valid or expired
          this.logout();
        }
      }
    }
  }
});

// Call checkLogin in your main.js or App.vue to initialize the store state based on existing localStorage
