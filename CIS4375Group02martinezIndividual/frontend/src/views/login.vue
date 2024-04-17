<!-- This is the login view. Users can login by entering a correct username and password -->
<template>
  <div class="login-container">
    <!--Header-->
    <h1 class="login-header">Welcome Marisol</h1>
      <!--Form-->
      <form @submit.prevent="login">
        <div class="input-group">
          <label>
            <span class="label-text">Username</span>
            <span class="required-marker">*</span>
            <input type="text"
              class="input-field"
              placeholder="Enter your username"
              v-model="form_input.user_name" />
          </label>
        </div>
        <div class="input-group">
          <label>
            <span class="label-text">Password</span>
            <span class="required-marker">*</span>
            <input type="password"
              class="input-field"
              placeholder="Enter your password"
              v-model="form_input.pass_word" />
          </label>
        </div>
        <!--Login button-->
        <div class="button-container">
          <button class="login-button" type="submit">Login</button>
        </div>
        <p v-if="error" class="error-text">{{ error }}</p>
      </form>
    </div>
</template>




 <!-- Composition API -->
<script>
 //original script code to be used for sprint 3
 // import { useLoggedInUserStore } from "../store/loggedInUser";

 // export default {
   // data() {
    //  return {
      //  username: "",
     //   password: "",
   //   }
  //  },
   // setup() {
    //  const store = useLoggedInUserStore();
    //  return {
   //     store
   //   }
  //  }
 // }
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoggedInUserStore} from '@/store/loggedInUser'
import { useToast } from 'vue-toastification'

export default {
  setup() {
    const router = useRouter()
    const loggedInUserStore = useLoggedInUserStore()
    const toast = useToast()


    const goToHome = () => {
      router.push('/home') 
    }

   
    const form_input = ref({
      user_name: "",
      pass_word: ""
    });

  const error = ref(""); 
//hardcoded login info
    async function login() {
      const hardcoded_username = "Admin"; 
      //const hardcoded_username2 = "username2"
      const hardcoded_password = "password"; 
      
      if (form_input.value.user_name === hardcoded_username && form_input.value.pass_word === hardcoded_password) {
        await loggedInUserStore.login2(form_input.value.user_name, form_input.value.pass_word)
        goToHome();

        }//else if (form_input.value.user_name === hardcoded_username2 && form_input.value.pass_word === hardcoded_password) {
        //await loggedInUserStore.login2(form_input.value.user_name, form_input.value.pass_word)
        //goToHome();
        //}     
        else {
        console.log("login failed")
        toast.error('Error Logging in: Please Check Username and Password')
      }
    }


  return {
    form_input,
    error,
    login,
    goToHome,
  };
  

  }
}
</script>


<style>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: #f7ecf5; /* Light pink background */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 20px;
  max-height: 350px;
}

.login-header {
  color: #ea4848; /* Soft red color */
  text-align: center;
  margin-bottom: 30px;
  font-family: cursive;
  font-weight: bold;
  
}

.input-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.label-text {
  color: #9c27b0; /* Deep purple for contrast */
  font-size: 16px;
  font-family: cursive;
}

.required-marker {
  color: #f07f7f;
}

.input-field {
  width: 100%;
  padding: 12px;
  border: 2px solid #ffb6c1; /* Light pink border */
  border-radius: 15px;
  margin-top: 5px;
}

.login-button {
  background-color: #ffb6c1; /* Light pink button */
  color: white;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #f78da7; /* Darker shade when hovered */
}

.button-container {
  display: flex;
  justify-content: center;
}

.error-text {
  color: #e57373; /* Soft red for errors */
  text-align: center;
  font-size: 16px;
}
</style>