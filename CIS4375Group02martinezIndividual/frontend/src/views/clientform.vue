<!-- This view displays a list of clients. The user can search for clients, and click on a client to redirect to another component to view that client's information -->
<template>
  <main>
    <!--Header-->
    <h1 class="font-bold text-4xl text-orange-800 tracking-widest text-center mt-10">
        Client Details
    </h1>




<div class="px-10 pt-20">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-10 items-center"> <!-- Added items-center -->
        <!--Search Client By selection-->
        <h2 class="text-2xl font-bold">Search Clients</h2>
        <div class="col-span-1 md:col-span-2">
            <!-- Search form -->
            <form>
                <div class="flex flex-col mt-5">
                    <label class="block">
                        <input type="text"
                               class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                               v-model="searchBy" :placeholder="showFirstForm ? 'Enter Last Name' : 'Enter Client ID'"/>
                    </label>
                </div>
            </form>

            <!-- Toggle form button -->
            <div class="mt-5">
                <button class="bg-orange-800 text-white rounded px-4 py-2 mr-4" @click="toggleForm">
                    {{ showFirstForm ? 'Search By Client ID' : 'Search Last Name' }}
                </button>
                <button class="bg-orange-800 text-white rounded px-4 py-2 mr-4" @click="clearData" type="submit">
                Clear Filter
            </button>
            <button class="bg-orange-800 text-white rounded px-4 py-2 mr-4" @click="searchClients" type="submit">
                Search Clients
            </button>
            </div>
        </div>
    </div>
</div>





    <hr class="mt-10 mb-10" />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Clients</h2>
        <!--h3 class="italic">Click table row to view Order details</h3-->
      </div>
      <!--Table showing list of Clients-->
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
        
              <th class="p-4 text-left">Client ID</th>
              <th class="p-4 text-left">Last Name</th>
              <th class="p-4 text-left">First Name</th>
              <th class="p-4 text-left">Address</th>
              <th class="p-4 text-left">Phone Number</th>
            </tr>
          </thead>
          <tbody  v-if="result && result.length > 0" class="divide-y divide-gray-300">
            <tr v-for="Client in result" :key="Client.ClientID">
              <td class="p-2 text-left">{{ Client.ClientID }}</td>
              <td class="p-2 text-left">{{ Client.ClientLastName }}</td>
              <td class="p-2 text-left">{{ Client.ClientFirstName }}</td>
              <td class="p-2 text-left">{{ Client.ClientAddress }}</td>
              <td class="p-2 text-left">{{ Client.PhoneNumber }}</td>
            </tr>
          </tbody>
          <tbody v-else class="divide-y divide-gray-300">
            <tr v-for="Client in Clients" :key="Client.ClientID">
              <td class="p-2 text-left">{{ Client.ClientID }}</td>
              <td class="p-2 text-left">{{ Client.ClientLastName }}</td>
              <td class="p-2 text-left">{{ Client.ClientFirstName }}</td>
              <td class="p-2 text-left">{{ Client.ClientAddress }}</td>
              <td class="p-2 text-left">{{ Client.PhoneNumber }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div></div>
      <div class="ml-10">
        <h2 class="text-2xl font-bold">Add New Client</h2>
        <!--h3 class="italic">Click table row to view Order details</h3-->
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 min-w-full shadow-md rounded"> 
        <form @submit.prevent="addnewClient"><br>
        
              <label for="lastName">Last Name:</label>
              <input type="text" id="lastName" v-model="newClient.ClientLastName" required>
        
              <label for="firstName">First Name:</label>
              <input type="text" id="firstName" v-model="newClient.ClientFirstName" required>
        
              <label for="address">Address:</label>
              <input type="text" id="address" v-model="newClient.ClientAddress" required>
        
              <label for="phoneNumber">Phone Number:</label>
              <input type="text" id="phoneNumber" v-model="newClient.PhoneNumber" required>
              <button class="bg-orange-800 text-white rounded" type="submit">Add Client</button>
        </form>
      </div>
      <div class="ml-10">
        <h2 class="text-2xl font-bold">Update Existing Client</h2>
        <!--h3 class="italic">Click table row to view Order details</h3-->
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 min-w-full shadow-md rounded"> 
        <form @submit.prevent="addnewClient"><br>
        
              <label for="lastName">Last Name:</label>
              <input type="text" id="lastName" v-model="newClient.ClientLastName" required>
        
              <label for="firstName">First Name:</label>
              <input type="text" id="firstName" v-model="newClient.ClientFirstName" required>
        
              <label for="address">Address:</label>
              <input type="text" id="address" v-model="newClient.ClientAddress" required>
        
              <label for="phoneNumber">Phone Number:</label>
              <input type="text" id="phoneNumber" v-model="newClient.PhoneNumber" required>
              <button class="bg-orange-800 text-white rounded" type="submit">Add Client</button>
        </form>
      </div>
    </div>
  </main>
</template>

<!-- Composition API -->
<script>
import { useToast } from 'vue-toastification'
import { ref } from 'vue'
import { onMounted } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'



export default {
  components: {
    VueDatePicker
  },
  setup() {
    const showFirstForm = ref(true);
    const toast = useToast()
    const searchBy = ref('');
    const result = ref([]);
    const newClient = ref([{
        ClientID: '',
        ClientLastName: '',
        ClientFirstName: '',
        ClientAddress: '',
        PhoneNumber: ''
    }]);
    //initializing an object vs an array? is this only because I need 1 instance of new client?

    const Clients = ref([
    { ClientID: 0, ClientLastName: 'Martin', ClientFirstName: 'Jacob', ClientAddress: '123 Main St, City, Country', PhoneNumber: '123-456-7890' },
    { ClientID: 1, ClientLastName: 'Allen', ClientFirstName: 'Jane', ClientAddress: '456 Elm St, Town, Country', PhoneNumber: '234-567-8901' },
    { ClientID: 2, ClientLastName: 'Johnson', ClientFirstName: 'Michael', ClientAddress: '789 Oak St, Village, Country', PhoneNumber: '345-678-9012' },
    { ClientID: 3, ClientLastName: 'Williams', ClientFirstName: 'Emily', ClientAddress: '987 Pine St, Hamlet, Country', PhoneNumber: '456-789-0123' },
    { ClientID: 4, ClientLastName: 'Brown', ClientFirstName: 'David', ClientAddress: '654 Maple St, Suburb, Country', PhoneNumber: '567-890-1234' },
    { ClientID: 5, ClientLastName: 'Jones', ClientFirstName: 'Sarah', ClientAddress: '321 Birch St, Rural, Country', PhoneNumber: '678-901-2345' },
    { ClientID: 6, ClientLastName: 'Davis', ClientFirstName: 'Matthew', ClientAddress: '876 Cedar St, County, Country', PhoneNumber: '789-012-3456' }

      //this is the toggle for what to search by
    ]);
    const toggleForm = () => {
      showFirstForm.value = !showFirstForm.value;
    };
    function searchClients() {
    result.value = []; // Initialize an array to store filtered orders
    for (let i = 0; i < Clients.value.length; i++) {
        if (Clients.value[i].ClientLastName == (searchBy.value)) {
            result.value.push(Clients.value[i]); // Push matching orders into the result array from the first type of query
        }
        else if (Clients.value[i].ClientID == (searchBy.value)) {
            result.value.push(Clients.value[i]); // Push matching orders into the result array from the second type of query
        }
    }
    result.forEach(Client => {
        console.log(Client.ClientLastName);
    });
    }

//function allows for users to enter last names or id and search the table with them



 //need to use.value when referring to the value saved in a reactive variable, cannot for instance push into the original array structure
 //reactivity needs to be declared for us to trigger updates in the DOM based on changes we make on the variable, in order to keep the page structure in sync with our changes in the code
 //within the scope of a function, we can fill up an array by using the .push mutating method to update its values, here we utilize this to fill up the result of the search with the parts of the order array that fulfill the search condition
 //for a single entry in a reactive array, to access is arrayname.value[index of the entry]
    

function addnewClient(){
if (newClient.value.ClientLastName !== null && newClient.value.ClientFirstName !== null  && newClient.value.ClientAddress !== null  && newClient.value.PhoneNumber !== null){
    newClient.value.ClientID = (Clients.value.length);
    Clients.value.push(newClient.value);
    newClient.value = [];

}
}



//}

    


    function clearData() {
      result.value = [];
    };

    return {
      Clients,
      searchBy,
      searchClients,
      clearData,
      result,
      VueDatePicker,
      showFirstForm,
      toggleForm,
      newClient,
      addnewClient
    }
  }
}
//todo: Make it so that clicking an item in the table allows the user to see a description of the item
//fix css and styling to be more pleasing to end users
</script>


<!-- Options API -->
<!-- <script>
//import functionalities for validation
import useVuelidate from '@vuelidate/core'
import { required, email, numeric, minLength, maxLength } from '@vuelidate/validators'
import { createClient } from '../api/api'
import { useToast } from 'vue-toastification'

//Notifications
const toast = useToast()

export default {
  data() {
    return {
      //client variable to hold new client information
      client: {
        firstName: null,
        middleName: null,
        lastName: null,
        email: null,
        phoneNumber: {
          primary: null,
          alternate: null
        },
        address: {
          line1: null,
          line2: null,
          city: null,
          county: null,
          zip: null
        },
      }
    }
  },
  setup() {
    // Register Vuelidate
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    // validations for client
    return {
      client: {
        firstName: { required },
        lastName: { required },
        email: { required, email },
        phoneNumber: {
          primary: {
            required,
            numeric,
            minLength: minLength(10),
            maxLength: maxLength(10),
          },
        },
        address: {
          city: { required },
        },
      },
    };
  },
  methods: {
    // method called when user submits the form
    async submitForm() {
      // Trigger validation
      this.v$.$validate();

      if (this.v$.$error) {
        // Form is invalid, do not proceed
        return;
      }

      try {
        const response = await createClient(this.client);
        this.$router.push('/findclient')
        toast.success(response)
      } catch (error) {
        toast.error(error)
      }
    },
  }
}
</script> -->
