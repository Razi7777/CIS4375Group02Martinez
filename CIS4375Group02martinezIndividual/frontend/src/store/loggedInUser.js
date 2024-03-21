// This pinia store contains state with respect to whether a user is logged in 
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { loginUser, logoutUser } from '../api/api' // import API calls
import jwt_decode from 'jwt-decode'; // import JSON Web Token decoder to decode the token into the user's information

//Notifications
const toast = useToast()

// Defining a store
export const useLoggedInUserStore = defineStore({
  id: 'loggedInUser',
  state: () => {
    return {
      //name: "",
      //role: "",
      //isLoggedIn: false
      username: "",
      password: "",
    }
  },
  actions: {
    async login(username, password) {
      try {
        const token = await loginUser(username, password);
        // Get the user's name and role from the JWT token
        const decodedToken = jwt_decode(token);
        this.$patch({
          isLoggedIn: true,
          role: decodedToken.role,
          name: decodedToken.name
        });
        this.$router.push("/home");
        toast.success("Login Sucessful!")

      } catch ( error ) {
        toast.error(error.message)
      }
    },
    logout() {
      logoutUser();
      // Reset value after user log out
      this.$patch({
        username: "",
        password: "",
      });
      this.$router.push("/login");
      toast.info("You have been logged out!")
    },
    async login2(username, password) {
      try {
        this.$patch({
          username: username,
          password: password
        });
        toast.success("Login Successful!");
      } catch (error) {
        toast.error(error.message);
      }
    }
  }
});
