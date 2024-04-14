<!-- This is the login view. Users can login by entering a correct username and password -->
<template>
  <div class="login-container">
    <!--Header-->
    <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome</h1>
      <!--Form-->
      <!-- form @submit.prevent="store.login(username, password)" novalidate="true" -->
      <form @submit.prevent="login">
        <div class="flex justify-center mt-10">
          <label>
            <span class="text-gray-700">Username</span>
            <span style="color: #F07F7F">*</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="form_input.user_name" />
          </label>
        </div>
        <div class="flex justify-center mt-10">
          <label>
            <span class="text-gray-700">Password</span>
            <span style="color: #F07F7F">*</span>
            <input type="password"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="form_input.pass_word" />
          </label>
        </div>
        <!--Login button-->
        <div class="flex justify-center mt-10">
          <button class="bg-orange-900 text-white rounded" type="submit">Login</button>

        </div>
        <p v-if="error">{{ error }}</p>
      </form>
    </div>
    <div>
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
      const hardcoded_username = "username1"; 
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


