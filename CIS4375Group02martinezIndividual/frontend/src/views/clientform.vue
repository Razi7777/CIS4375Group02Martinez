<!-- This view displays a list of clients. The user can search for clients, and click on a client to redirect to another component to view that client's information -->
<template>
  <main class='client-details-container'>
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
                               v-model="searchBy" :placeholder="showFirstForm ? 'Enter Client City' : 'Enter Client ID'"/>
                    </label>
                </div>
            </form>

            <!-- Toggle form button -->
            <div class="mt-5">
                <button class="bg-orange-800 text-white rounded px-4 py-2 mr-4" @click="toggleForm">
                    {{ showFirstForm ? 'Search By Client ID' : 'Search By Client City' }}
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
      <div class="flex flex-col col-span-3 max-h-[220px] max-w-[3000] overflow-y-auto">
        <table class="w-full  shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Client ID</th>
              <th class="p-4 text-left">Client Name</th>
              <th class="p-4 text-left">Address</th>
              <th class="p-4 text-left">City</th>
              <th class="p-4 text-left">Zipcode</th>
              <th class="p-4 text-left">Email</th>
              <th class="p-4 text-left">Phone Number</th>
              <th class="p-4 text-left">Birthday</th>
            </tr>
          </thead>
          <tbody  v-if="result && result.length > 0" class="divide-y divide-gray-300">
            <tr v-for="Client in result" :key="Client.ClientID">
              <td class="p-2 text-left">{{ Client.Customer_ID }}</td>
              <td class="p-2 text-left">{{ Client.Customer_Name }}</td>
              <td class="p-2 text-left">{{ Client.Address }}</td>
              <td class="p-2 text-left">{{ Client.City }}</td>
              <td class="p-2 text-left">{{ Client.Zipcode }}</td>
              <td class="p-2 text-left">{{ Client.Email }}</td>
              <td class="p-2 text-left">{{ Client.Phone_Number }}</td>
              <td class="p-2 text-left">{{ Client.Birthday }}</td>
            </tr>
          </tbody>
          <tbody v-else class="divide-y divide-gray-300">
            <tr v-for="Client in Clients" :key="Client.ClientID">
              <td class="p-2 text-left">{{ Client.Customer_ID }}</td>
              <td class="p-2 text-left">{{ Client.Customer_Name }}</td>
              <td class="p-2 text-left">{{ Client.Address }}</td>
              <td class="p-2 text-left">{{ Client.City }}</td>
              <td class="p-2 text-left">{{ Client.Zipcode }}</td>
              <td class="p-2 text-left">{{ Client.Email }}</td>
              <td class="p-2 text-left">{{ Client.Phone_Number }}</td>
              <td class="p-2 text-left">{{ Client.Birthday }}</td>
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
        
        
              <label for="Name">Name:</label>
              <input type="text" id="Name" v-model="newClient.Customer_Name" required>
        
              <label for="Address">Address:</label>
              <input type="text" id="Address" v-model="newClient.Address" required>
        
              <label for="City">City:</label>
              <input type="text" id="City" v-model="newClient.City" required>

              <label for="Zipcode">Zipcode:</label>
              <input type="text" id="Zipcode" v-model="newClient.Zipcode" required>

              <label for="email">Email:</label>
              <input type="text" id="email" v-model="newClient.Email" required>

              <label for="PhoneNumber">Phone Number:</label>
              <input type="text" id="PhoneNumber" v-model="newClient.Phone_Number" required>

              <label for="Birthday">Birthday:</label>
              <input type="text" id="Birthday" v-model="newClient.Birthday" required>

              <label for="CustomerCategory">Customer Category:</label>
              <input type="text" id="CustomerCategory" v-model="newClient.Customer_Category_ID" required>

              <label for="CustomerStatus">Customer Status:</label>
              <input type="text" id="CustomerStatus" v-model="newClient.Customer_Status_ID" required>

              <label for="StateProvinceTerritory">State/Province/Territory:</label>
              <input type="text" id="StateProvinceTerritory" v-model="newClient.State_Province_Territory_ID" required>

              <button class="bg-orange-800 text-white rounded" type="submit">Add Client</button>
        </form>
        
      </div>
      <div></div>
      <div></div>
      <div class="ml-10"><h2 class="text-2xl font-bold">Update Existing Client</h2></div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 min-w-full shadow-md rounded"> 
        <form @submit.prevent="updateClientFunction"><br>

          <label for="ID">Enter ID to update:</label>
          <input type="text" id="ID" v-model="updateClient.Customer_ID" required>

          <label for="Name">Name:</label>
          <input type="text" id="Name" v-model="updateClient.Customer_Name" required>
    
          <label for="Address">Address:</label>
          <input type="text" id="Address" v-model="updateClient.Address" required>
    
          <label for="City">City:</label>
          <input type="text" id="City" v-model="updateClient.City" required>

          <label for="Zipcode">Zipcode:</label>
          <input type="text" id="Zipcode" v-model="updateClient.Zipcode" required>

          <label for="email">Email:</label>
          <input type="text" id="email" v-model="updateClient.Email" required>

          <label for="PhoneNumber">Phone Number:</label>
          <input type="text" id="PhoneNumber" v-model="updateClient.Phone_Number" required>

          <label for="Birthday">Birthday:</label>
          <input type="text" id="Birthday" v-model="updateClient.Birthday" required>

          <label for="CustomerCategory">Customer Category:</label>
          <input type="text" id="CustomerCategory" v-model="updateClient.Customer_Category_ID" required>

          <label for="CustomerStatus">Customer Status:</label>
          <input type="text" id="CustomerStatus" v-model="updateClient.Customer_Status_ID" required>

          <label for="StateProvinceTerritory">State/Province/Territory:</label>
          <input type="text" id="StateProvinceTerritory" v-model="updateClient.State_Province_Territory_ID" required>

        <button class="bg-orange-800 text-white rounded" type="submit">Update Client</button>
        </form>
      </div>
      <div></div>
      <div></div>
      <div class="ml-10"><h2 class="text-2xl font-bold">Delete Client</h2></div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 min-w-full shadow-md rounded"> 
        <form @submit.prevent="deleteClientFunction"><br>

          <label for="ID">Enter ID to Delete:</label>
          <input type="text" id="ID" v-model="deleteClient.Customer_ID" required>

        <button class="bg-orange-800 text-white rounded" type="submit">Delete Client</button>
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
import axios from 'axios'


export default {
  components: {
    VueDatePicker
  },
  setup() {
    const showFirstForm = ref(true);
    const toast = useToast()
    const searchBy = ref('');
    const result = ref([]);
    const newClient = ref({
        Customer_Name: '',
        Address: '',
        City: '',
        Zipcode: '',
        Email: '',
        Phone_Number: '',
        Birthday: '',
        Customer_Category_ID: '',
        Customer_Status_ID: '',
        State_Province_Territory_ID: '',

    });
    const updateClient = ref({
        Customer_Name: '',
        Address: '',
        City: '',
        Zipcode: '',
        Email: '',
        Phone_Number: '',
        Birthday: '',
        Customer_Category_ID: '',
        Customer_Status_ID: '',
        State_Province_Territory_ID: '',


    });
    const deleteClient = ref({


    });

    //initializing an object vs an array? is this only because I need 1 instance of new client?

    const Clients = ref([

      //this is the toggle for what to search by
    ]);
    const toggleForm = () => {
      showFirstForm.value = !showFirstForm.value;
    };

    function searchClients() {
    result.value = []; // Initialize an array to store filtered orders
    for (let i = 0; i < Clients.value.length; i++) {
        if (Clients.value[i].City == (searchBy.value)) {
            result.value.push(Clients.value[i]); // Push matching orders into the result array from the first type of query
        }
        else if (Clients.value[i].Customer_ID == (searchBy.value)) {
            result.value.push(Clients.value[i]); // Push matching orders into the result array from the second type of query
        }
    }
    client.value = result.value;
    result.value = [];
  }
    
  async function loadClients() {
    const options = {
        method: 'GET',
        url: 'http://127.0.0.1:3000/Customer/get',
        
  
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        Clients.value = response.data;
        Datetimechange();
    } catch (error) {
        console.error(error);
    }
}

function Datetimechange() {
      Clients.value.forEach(function(Client) {
        Client.Birthday = Client.Birthday.split('T')[0];
      });
    }
    

  

    async function addnewClient() {
    const options = {
        method: 'POST',
        url: 'http://127.0.0.1:3000/Customer/post',
        data: newClient.value 
  
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        loadClients();
    } catch (error) {
        console.error(error);
    }
}


async function updateClientFunction() {
  const customerId = updateClient.value.Customer_ID;
  const options = {
    method: 'PUT',
    url: `http://127.0.0.1:3000/Customer/Put/${customerId}`,
    data: updateClient.value 
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    loadClients();
  } catch (error) {
    console.error(error);
  }
}

async function deleteClientFunction() {
  const customerId = deleteClient.value.Customer_ID;
  const options = {
    method: 'DELETE', // Change method to DELETE
    url: `http://127.0.0.1:3000/Customer/Delete/${customerId}`, // Include the Customer_ID in the URL
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    loadClients(); 
  } catch (error) {
    console.error(error);
  }
}




//function allows for users to enter last names or id and search the table with them



 //need to use.value when referring to the value saved in a reactive variable, cannot for instance push into the original array structure
 //reactivity needs to be declared for us to trigger updates in the DOM based on changes we make on the variable, in order to keep the page structure in sync with our changes in the code
 //within the scope of a function, we can fill up an array by using the .push mutating method to update its values, here we utilize this to fill up the result of the search with the parts of the order array that fulfill the search condition
 //for a single entry in a reactive array, to access is arrayname.value[index of the entry]
    

/*function addnewClient(){
if (newClient.value.ClientLastName !== null && newClient.value.ClientFirstName !== null  && newClient.value.ClientAddress !== null  && newClient.value.PhoneNumber !== null){
    newClient.value.ClientID = (Clients.value.length);
    Clients.value.push(newClient.value);
    newClient.value = [];

}
}*/



//}
/*function updateClientFunction() {
      result.value = [];
        for (let i = 0; i < Clients.value.length; i++) {
          if (Clients.value[i].ClientID == updateClient.value.ClientID){
            result.value.push(updateClient.value)
            
          }
          else if (Clients.value[i].ClientID !== updateClient.value.ClientID){
            result.value.push(Clients.value[i])

          }


        }

    }*/
    


    function clearData() {
      result.value = [];
    };

    
 onMounted(() => {
      loadClients();
    });




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
      addnewClient,
      updateClient,
      updateClientFunction,
      loadClients,
      Datetimechange,
      deleteClient,
      deleteClientFunction

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


