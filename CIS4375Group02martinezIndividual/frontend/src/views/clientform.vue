<!-- This view displays a list of clients. The user can search for clients, and click on a client to redirect to another component to view that client's information -->
<template>
  <main class='client-details-container'>
    <!--Header-->
    <h1 class="font-bold text-4xl text-orange-800 tracking-widest text-center mt-10">
        Client Details
    </h1>




<div class="px-10 pt-20">
  <div class="grid flex flex-col md:flex-row gap-x-6 gap-y-10 items-center bg-gray-300 p-5 rounded-lg shadow-md"> <!-- Added items-center -->
        <!--Search Client By selection-->
        <div class=col-span-1>
        <h2 class="text-2xl font-bold">Search Clients</h2>
        </div>
            <!-- Search form -->
            <form>
              
                    <label class="block">
                        <input type="text"
                               class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                               v-model="searchBy" :placeholder="showFirstForm ? 'Enter Client City' : 'Enter Client ID'"/>
                    </label>

            </form>

            <!-- Toggle form button -->
            <div class=col-span-1>
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




 <div class="px-10 pt-20"></div>
    <hr class="mt-10 mb-10" />
    <div class="grid flex flex-col md:flex-row gap-x-6 gap-y-10 items-center bg-gray-300 p-5 rounded-lg shadow-md">

      <div>
        <h2 class="text-2xl font-bold">List of Clients</h2>
        <!--h3 class="italic">Click table row to view Order details</h3-->
      </div>
      <!--Table showing list of Clients-->
      <div class="overflow-x-auto overflow-y-auto w-100 h-64">
        <table class="w-full  shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left w-8">Client ID</th>
              <th class="p-4 text-left w-8">Client Name</th>
              <th class="p-4 text-left w-8">Address</th>
              <th class="p-4 text-left w-8">City</th>
              <th class="p-4 text-left w-8">Zipcode</th>
              <th class="p-4 text-left w-20">Email</th>
              <th class="p-4 text-left w-8">Phone Number</th>
              <th class="p-4 text-left w-8">Customer Category</th>
              <th class="p-4 text-left w-8">Customer Status</th>
            </tr>
          </thead>
          <tbody  v-if="result && result.length > 0" class="divide-y divide-gray-300">
            <tr v-for="Client in result" :key="Client.ClientID">
              <td class="p-2 text-left w-8">{{ Client.Customer_ID }}</td>
              <td class="p-2 text-left w-8">{{ Client.Customer_Name }}</td>
              <td class="p-2 text-left w-8">{{ Client.Address }}</td>
              <td class="p-2 text-left w-8">{{ Client.City }}</td>
              <td class="p-2 text-left w-8">{{ Client.Zipcode }}</td>
              <td class="p-2 text-left w-17">{{ Client.Email }}</td>
              <td class="p-2 text-left w-8">{{ Client.Phone_Number }}</td>
              
            </tr>
          </tbody>
          <tbody v-else class="divide-y divide-gray-300">
            <tr v-for="Client in Clients" :key="Client.ClientID">
              <td class="p-2 text-left w-8">{{ Client.Customer_ID }}</td>
              <td class="p-2 text-left w-8">{{ Client.Customer_Name }}</td>
              <td class="p-2 text-left w-8">{{ Client.Address }}</td>
              <td class="p-2 text-left w-8">{{ Client.City }}</td>
              <td class="p-2 text-left w-8">{{ Client.Zipcode }}</td>
              <td class="p-2 text-left w-17">{{ Client.Email }}</td>
              <td class="p-2 text-left w-8">{{ Client.Phone_Number }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      
      <div></div>
      <div class="ml-10">
        <h2 class="text-2xl font-bold">Add New Client</h2>
      </div>
      <form @submit.prevent="addnewClient" class="grid flex flex-col md:flex-row gap-x-6 gap-y-10 items-center bg-gray-300 p-5 rounded-lg shadow-md">
        <div>
          <label for="Name">Name:</label>
          <input type="text" id="Name" v-model="newClient.Customer_Name" required><br><br>
      
          <label for="Address">Address:</label>
          <input type="text" id="Address" v-model="newClient.Address" required><br><br>
      
          <label for="City">City:</label>
          <input type="text" id="City" v-model="newClient.City" required><br><br>
      
          <label for="Zipcode">Zipcode:</label>
          <input type="text" id="Zipcode" v-model="newClient.Zipcode" required><br><br>
      
          <label for="email">Email:</label>
          <input type="text" id="email" v-model="newClient.Email" required><br><br>
          <button class="col-span-2 bg-orange-800 text-white rounded" type="submit">Add Client</button>
        </div>
        <div>
          <label for="PhoneNumber">Phone Number:</label>
          <input type="text" id="PhoneNumber" v-model="newClient.Phone_Number" required><br><br>
      
          <label for="Birthday">Birthday:</label>
          <input type="text" id="Birthday" v-model="newClient.Birthday" required><br><br>
      
          <label for="CustomerCategory">CustomerCategory:</label>
          <input type="text" id="CustomerCategory" v-model="newClient.Customer_Category_ID" required><br><br>
      
          <label for="CustomerCategory">Customer Category:</label>
          <select id="CustomerCategory" v-model="newClient.Customer_Category_ID" required>
          <option value="1">Active</option>
          <option value="2">Inactive</option>
          <option value="3">Suspended</option>
          </select><br><br>
      
          <label for="StateProvinceTerritory">State/Province/Territory:</label>
          <input type="text" id="StateProvinceTerritory" v-model="newClient.State_Province_Territory_ID" required><br><br>
        </div>
        
      </form>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
   
     
      <div class="ml-10"> 
     <h2 class="text-2xl font-bold">Update Existing Client</h2>
      </div> 
     <form @submit.prevent="updateClientFunction" class="grid grid-cols-2 gap-x-40 gap-y-15">
      <div>
          <label for="ID">Enter ID to update:</label>
          <input type="text" id="ID" v-model="updateClient.Customer_ID" required><br><br>
  
          <label for="Name">Name:</label>
          <input type="text" id="Name" v-model="updateClient.Customer_Name" required><br><br>
  
          <label for="Address">Address:</label>
          <input type="text" id="Address" v-model="updateClient.Address" required><br><br>
  
          <label for="City">City:</label>
          <input type="text" id="City" v-model="updateClient.City" required><br><br>
  
          <label for="Zipcode">Zipcode:</label>
          <input type="text" id="Zipcode" v-model="updateClient.Zipcode" required><br><br>
  
          <label for="email">Email:</label>
          <input type="text" id="email" v-model="updateClient.Email" required><br><br>
          <button class="col-span-2 bg-orange-800 text-white rounded" type="submit">Update Client</button>
      </div>
      <div>
          <label for="PhoneNumber">Phone Number:</label>
          <input type="text" id="PhoneNumber" v-model="updateClient.Phone_Number" required><br><br>
  
          <label for="Birthday">Birthday:</label>
          <input type="text" id="Birthday" v-model="updateClient.Birthday" required><br><br>
  
  
                  <label for="CustomerCategory">CustomerCategory:</label>
                  <input type="text" id="CustomerCategory" v-model="updateClient.Customer_Category_ID" required><br><br>
             
          
                  <label for="CustomerStatus">CustomerStatus:</label>
                  <input type="text" id="CustomerStatus" v-model="updateClient.Customer_Status_ID" required><br><br>
         
          
  
          <label for="StateProvinceTerritory">State/Province/Territory:</label>
          <input type="text" id="StateProvinceTerritory" v-model="updateClient.State_Province_Territory_ID" required><br><br>
      </div>
      
  </form>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div class="ml-10"> 
      <h2 class="text-2xl font-bold">Delete Client</h2>
      </div>
        <form @submit.prevent="deleteClientFunction" class="grid grid-cols-2 gap-x-40 gap-y-15">
        <div>
          <label for="ID">Enter ID to Delete: </label>
          <input type="text" id="ID" v-model="deleteClient.Customer_ID" required>
        
        <button class="bg-orange-800 text-white rounded" type="submit">Delete Client</button>
      </div>
        </form>


 
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
<style scoped>

.event-calendar-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  flex-grow: 1;
}

.event-calendar {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  flex-grow: 1;
}

.event-list-form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.event-list-container,
.event-form-container,
.event-update-form-container {
  display: flex;
  flex-direction: column;
  margin-top: 0;
}

.event-update-form-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.event-form,
.event-update-form {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  align-items: start;
}

.event-update-form-header h3 {
  margin: 0;
}

.event-update-form h3 {
  margin-bottom: 10px;
}

.event-form h3,
.event-update-form h3 {
  margin-bottom: 10px;
  text-align: left;
}

.fancy-container {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.fancy-button {
  background-color: #ff6347;
  color: #fff;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.fancy-button[type="submit"] {
  grid-column: span 2;
  justify-self: center;
  width: 50%;
  padding: 8px 16px;
  font-size: 14px;
}

.fancy-button:hover {
  background-color: #e65c47;
}

.fancy-form {
  display: grid;
  grid-gap: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #fff;
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: auto 50%;
  padding-right: 28px;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}
.announcement {
  background-color: #f5f5f5;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}
.announcement-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.announcement-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}
.ribbon {
  background-color: #ff6347;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}
.event-description {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 10px;
}
.event-details {
  display: flex;
  justify-content: space-between;
}
.event-details p {
  margin: 0;
  color: #777;
}
.event-details strong {
  color: #333;
}
.calendar {
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.calendar-header {
  background-color: #333;
  color: #fff;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.calendar-header h2 {
  margin: 0;
  font-size: 1.2rem;
}
.month-switcher {
  display: flex;
  align-items: center;
}
.month-switcher button {
  background-color: #ff6347;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px;
}
.month-switcher .current-month {
  margin: 0 8px;
  font-size: 1rem;
}
table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}
th,
td {
  padding: 12px;
  text-align: center;
  position: relative;
}
.weekdays th {
  background-color: #f5f5f5;
  font-weight: bold;
  color: #333;
}
.event-day {
  background-color: #e0f0ff;
  cursor: pointer;
}
.today {
  background-color: #ffd699;
}
.day-number {
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  border-radius: 50%;
  font-size: 0.9rem;
  color: #333;
}
.event-details-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.event-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #ff6347;
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
}
.popup-content {
  background-color: #fff;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.popup-header {
  background-color: #333;
  color: #fff;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.popup-header h4 {
  margin: 0;
  font-size: 1.2rem;
}
.close-btn {
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
}
.popup-body {
  padding: 16px;
}
.popup-body p {
  margin: 8px 0;
}
.popup-body strong {
  color: #333;
}

.success-notice {
  color: green;
}

.error-notice {
  color: red;
}
</style>
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


