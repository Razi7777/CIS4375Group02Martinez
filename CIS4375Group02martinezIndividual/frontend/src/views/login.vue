<!-- This is the login view. Users can login by entering a correct username and password -->
<template> 

  <div class="login-container ">
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




<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLoggedInUserStore } from '@/store/loggedInUser';
import { useToast } from 'vue-toastification';

export default {
  setup() {
    const router = useRouter();
    const loggedInUserStore = useLoggedInUserStore();
    const toast = useToast();
    
    const form_input = ref({
      user_name: "",
      pass_word: ""
    });
    const error = ref("");

    const login = async () => {
      if (!form_input.value.user_name || !form_input.value.pass_word) {
        toast.error('Username and password are required');
        return;
      }

      try {
        // Use login action from the loggedInUser store
        await loggedInUserStore.login(form_input.value.user_name, form_input.value.pass_word);
      } catch (err) {
        console.error("Login failed:", err);
        error.value = err.message || 'Failed to login';
        toast.error(error.value);
      }
    };

    return {
      form_input,
      error,
      login
    };
  }
}
</script>