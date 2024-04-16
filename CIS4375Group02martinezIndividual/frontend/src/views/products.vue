<!-- This view displays a list of clients. The user can search for clients, and click on a client to redirect to another component to view that client's information -->
<template>
    <main class='client-details-container'>
      <!--Header-->
      <h1 class="font-bold text-4xl text-red-300 tracking-widest text-center mt-10">
          Customer Details
      </h1>
  
  
  
  
  <div class="px-10 pt-20">
    <div class="grid flex flex-col md:flex-row gap-x-6 gap-y-10 items-center max-w-lg bg-gray-300 p-5 rounded-lg shadow-md"> <!-- Added items-center -->
          <!--Search Client By selection-->
          <div class=col-span-1>
          <h2 class="text-2xl font-bold">Search Customers</h2>
          </div>
              <!-- Search form -->
              <div class="col-span-1">
                <label for="toggleFormSelect1" class="block font-bold mb-2">Select Customer Status</label>
                <select id="toggleFormSelect1" v-model="searchByStatus" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option value="1">Active</option>
                    <option value="2">Inactive</option>
                    <option value="3">Suspended</option>
                </select>
            </div>
            
            <!-- Toggle form select -->
            <div class="col-span-1">
                <label for="toggleFormSelect2" class="block font-bold mb-2">Select Customer Category</label>
                <select id="toggleFormSelect2" v-model="searchByCategory" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option value="1">Subscribed</option>
                    <option value="2">Guest</option>
                </select>
            </div>
  
            <div class="col-span-1">
        <!-- State/Territory list box -->
        <label for="toggleFormSelect2" class="block font-bold mb-2">Select Customer Region</label>
            <select id="toggleFormSelect3" v-model="searchByTerritory" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option v-for="territory in Territories" :key="territory.State_Province_Territory_ID" :value="territory.State_Province_Territory_ID">{{ territory.State_Province_Territory }}</option>
            </select>
            </div>
              <!-- Toggle form button -->
              <div class=col-span-1>
                  <button class="bg-red-300 text-white rounded px-4 py-2 mr-4" @click="toggleForm">
                    Clear Search Criteria
                  </button>
  
                  <button class="bg-red-300 text-white rounded px-4 py-2 mr-4" @click="clearData" type="submit">
                  Clear Current Filter
                  </button>
              <div class="pt-6">
              <button class="bg-red-300 text-white rounded px-4 pt-2 py-2 mr-4" @click="searchClients" type="submit">
                  Search Customers
              </button>
            </div>
            </div>
          
      </div>
  </div>
  
  
  
  
   <div class="px-10 pt-20">
      <hr class="mt-10 mb-10" />
      <div class="grid flex flex-col md:flex-row gap-x-6 gap-y-10 items-center bg-gray-300 p-5 rounded-lg shadow-md">
  
        <div>
          <h2 class="text-2xl font-bold">List of Customers</h2>
          <!--h3 class="italic">Click table row to view Order details</h3-->
        </div>
        <!--Table showing list of Clients-->
        <div class="overflow-x-auto overflow-y-auto w-100 h-64">
          <table class="w-full  shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr>
                <th class="p-4 text-left w-8">Customer ID</th>
                <th class="p-4 text-left w-8">Customer Name</th>
                <th class="p-4 text-left w-8">Address</th>
                <th class="p-4 text-left w-8">City</th>
                <th class="p-4 text-left w-20">Email</th>
                <th class="p-4 text-left w-8">Phone Number</th>
                <th class="p-4 text-left w-8">Customer Category</th>
                <th class="p-4 text-left w-8">Customer Status</th>
                <th class="p-4 text-left w-8">Customer Region</th>
              </tr>
            </thead>
            <tbody  v-if="result && result.length > 0" class="divide-y divide-gray-300">
              <tr v-for="Client in result" :key="Client.ClientID">
                <td class="p-2 text-left w-8">{{ Client.Customer_ID }}</td>
                <td class="p-2 text-left w-8">{{ Client.Customer_Name }}</td>
                <td class="p-2 text-left w-8">{{ Client.Address }}</td>
                <td class="p-2 text-left w-8">{{ Client.City }}</td>
                <td class="p-2 text-left w-17">{{ Client.Email }}</td>
                <td class="p-2 text-left w-8">{{ Client.Phone_Number }}</td>
                <td class="p-2 text-left w-8">
                  {{ Client.Customer_Category_ID === 1 ? 'Subscribed' : (Client.Customer_Category_ID === 2 ? 'Guest' : '') }}
                </td>
                <td class="p-2 text-left w-8">
                  {{ 
                    Client.Customer_Status_ID === 1 ? 'Active' : 
                    (Client.Customer_Status_ID === 2 ? 'Inactive' : 
                    (Client.Customer_Status_ID === 3 ? 'Suspended' : '')) 
                  }}
                </td>
                <td class="p-2 text-left w-8">
                  <td class="p-2 text-left w-8">{{ Client.State_Province_Territory }}</td>
                </td>
              </tr>
            </tbody>
            <tbody v-else class="divide-y divide-gray-300">
              <tr v-for="Client in Clients" :key="Client.ClientID">
                <td class="p-2 text-left w-8">{{ Client.Customer_ID }}</td>
                <td class="p-2 text-left w-8">{{ Client.Customer_Name }}</td>
                <td class="p-2 text-left w-8">{{ Client.Address }}</td>
                <td class="p-2 text-left w-8">{{ Client.City }}</td>
                <td class="p-2 text-left w-17">{{ Client.Email }}</td>
                <td class="p-2 text-left w-8">{{ Client.Phone_Number }}</td>
                <td class="p-2 text-left w-8">
                  {{ Client.Customer_Category_ID === 1 ? 'Subscribed' : (Client.Customer_Category_ID === 2 ? 'Guest' : '') }}
                </td>
                <td class="p-2 text-left w-8">
                  {{ 
                    Client.Customer_Status_ID === 1 ? 'Active' : 
                    (Client.Customer_Status_ID === 2 ? 'Inactive' : 
                    (Client.Customer_Status_ID === 3 ? 'Suspended' : '')) 
                  }}
                </td>
                <td class="p-2 text-left w-8">
                  <td class="p-2 text-left w-8">{{ Client.State_Province_Territory }}</td>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
        </div>
        
        <div></div>
        <div class="px-10 pt-20">
        <div class="ml-10">
          <h2 class="text-2xl font-bold">Add New Customer</h2>
        </div>
        <form @submit.prevent="addnewClient" class="grid flex grid-cols-2 max-w-lg flex-col md:flex-row gap-x-6 gap-y-10 bg-gray-300 p-5 rounded-lg shadow-md">
          <div class="col-span-1 ">
            <label for="Name"></label>
            <input type="text" id="Name" placeholder="Enter name" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="newClient.Customer_Name" required><br><br>
        
            <label for="Address"></label>
            <input type="text" id="Address" placeholder="Address"  class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="newClient.Address" required><br><br>
            
  
            <label for="City"></label>
            <input type="text" id="City" placeholder="City" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="newClient.City" required><br><br>
        
            <label for="Zipcode"></label>
            <input type="text" id="Zipcode" placeholder="Zipcode" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="newClient.Zipcode" required><br><br>
        
            <label for="email"></label>
            <input type="text"  placeholder="Email"  class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"  id="email" v-model="newClient.Email" required><br><br>
  
            <button class="col-span-2 bg-red-300 text-white rounded" type="submit">Add Customer</button>
          </div>
          <div class="col-span-1">
            <label for="PhoneNumber"></label>
            <input type="text" id="PhoneNumber" placeholder="Phone Number xxx-xxx-xxxx"  class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="newClient.Phone_Number" required><br><br>
        
            <label for="Birthday"></label>
            <input type="text" id="Birthday" placeholder="Birthday yyyy/mm/dd"  class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="newClient.Birthday" ><br><br>
        
            <label for="CustomerCategory">Customer Category: </label><br>
            <select id="CustomerCategory" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="newClient.Customer_Category_ID" required>
            <option value="1">Subscribed</option>
            <option value="2">Guest</option>
            </select><br><br>
  
            <label for="CustomerStatus">Customer Status: </label><br>
            <select id="CustomerStatus" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="newClient.Customer_Status_ID" required>
            <option value="1">Active</option>
            <option value="2">Inactive</option>
            <option value="3">Suspended</option>
            </select><br><br>
        
            <label for="CustomerStatus">State/Province/Territory: </label><br>
            <select class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="newClient.State_Province_Territory_ID">
              <option v-for="Territory in Territories" :key="Territory.State_Province_Territory_ID" :value="Territory.State_Province_Territory_ID">{{ Territory.State_Province_Territory }}</option>
            </select>
          </div>
          
        </form>
      </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
     
       <div class="px-10 pt-20">
        <div class="ml-10"> 
       <h2 class="text-2xl font-bold">Update Existing Customer</h2>
        </div> 
       <form @submit.prevent="updateClientFunction" class="grid flex grid-cols-2 max-w-lg flex-col md:flex-row gap-x-6 gap-y-10 bg-gray-300 p-5 rounded-lg shadow-md">
        <div>
            <label for="ID"></label>
            <input type="text" id="ID" placeholder="Enter ID to update"  class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="updateClient.Customer_ID" required><br><br>
    
            <label for="Name"></label>
            <input type="text" id="Name" placeholder="Enter name"  class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="updateClient.Customer_Name" required><br><br>
    
            <label for="Address"></label>
            <input type="text" id="Address"  placeholder="Address" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="updateClient.Address" required><br><br>
    
            <label for="City"></label>
            <input type="text" id="City" placeholder="City"  class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"  v-model="updateClient.City" required><br><br>
    
            <label for="Zipcode"></label>
            <input type="text" id="Zipcode" placeholder="Zipcode"  class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"  v-model="updateClient.Zipcode" required><br><br>
    
            <label for="email"></label>
            <input type="text" id="email" placeholder="email"  class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"  v-model="updateClient.Email" required><br><br>
            <button class="col-span-2 bg-red-300 text-white rounded" type="submit">Update Customer</button>
        </div>
        <div>
            <label for="PhoneNumber"></label>
            <input type="text"  placeholder="Phone Number xxx-xxx-xxxx"   class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id="PhoneNumber" v-model="updateClient.Phone_Number" required><br><br>
    
            <label for="Birthday"></label>
            <input type="text" placeholder="Birthday xx/xx/xxxx" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id="Birthday" v-model="updateClient.Birthday" ><br><br>
    
    
                     
            <label for="CustomerCategory">Customer Category: </label><br>
            <select id="CustomerCategory" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="updateClient.Customer_Category_ID" required>
            <option value="1">Subscribed</option>
            <option value="2">Guest</option>
            </select><br><br>
               
            
            <label for="CustomerStatus">Customer Status: </label><br>
            <select id="CustomerStatus" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="updateClient.Customer_Status_ID" required>
            <option value="1">Active</option>
            <option value="2">Inactive</option>
            <option value="3">Suspended</option>
            </select><br><br>
    
            <label for="CustomerStatus">State/Province/Territory: </label><br>
            <select class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="updateClient.State_Province_Territory_ID">
              <option v-for="Territory in Territories" :key="Territory.State_Province_Territory_ID" :value="Territory.State_Province_Territory_ID">{{ Territory.State_Province_Territory }}</option>
            </select>
        </div>
        
    </form>
  </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div class="px-10 pt-20 pb-20">
        <div class="ml-10"> 
        <h2 class="text-2xl font-bold">Delete Customer</h2>
        </div>
          <form @submit.prevent="deleteClientFunction" class="grid flex grid-cols-2 max-w-lg flex-col md:flex-row gap-x-6 gap-y-10 bg-gray-300 p-5 rounded-lg shadow-md">
          <div>
            <label for="ID"></label>
            <input type="text" id="ID" placeholder="Enter ID to delete" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="deleteClient.Customer_ID" required>
            <div class="mt-4">
            <button class="bg-red-300 text-white rounded" type="submit">Delete Customer</button>
          </div>
          </div>
          
       
        
          </form>
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
      const showSecondForm = ref(false);
      const showThirdForm = ref(false);
      const toast = useToast()
      const searchByStatus = ref('');
      const searchByCategory = ref('');
      const searchByTerritory = ref('');
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
  
      const Territories = ref([
  
      ]);
  
  
  
      const toggleForm = () => {
          if (showFirstForm.value) {
              showFirstForm.value = false;
              showSecondForm.value = true;
              showThirdForm.value = false;
              
              searchByStatus.value ='';
              searchByCategory.value = '';
              searchByTerritory.value = '';
          } else if (showSecondForm.value) {
              showFirstForm.value = false;
              showSecondForm.value = false;
              showThirdForm.value = true;
            
              searchByCategory.value = '';
              searchByStatus.value = '';
              searchByTerritory.value = '';
          } else if (showThirdForm.value) {
              showFirstForm.value = true;
              showSecondForm.value = false;
              showThirdForm.value = false;
            
              searchByTerritory.value = '';
              searchByStatus.value = '';
              searchByCategory.value = '';
          }
          // Clear search result when toggling forms
          result.value = [];
      };
      /*function searchClients() {
      result.value = []; // Initialize an array to store filtered orders
      for (let i = 0; i < Clients.value.length; i++) {
        if (Clients.value[i].Customer_Category_ID == (searchByCategory.value)) {
              result.value.push(Clients.value[i]); // Push matching clients into the result array from the first type of query
          }
          else if (Clients.value[i].Customer_Status_ID == (searchByStatus.value)) {
              result.value.push(Clients.value[i]); // Push matching orders into the result array from the second type of query
          }
          else if (Clients.value[i].State_Province_Territory_ID == (searchByTerritory.value)) {
              result.value.push(Clients.value[i]); // Push matching orders into the result array from the second type of query
          }
      }
      Clients.value = result.value;
    }*/
    function searchClients() {
      let filteredClients = Clients.value.slice(); // Create a copy of the original Clients array to avoid mutating it
      if (searchByCategory.value) {
          filteredClients = filteredClients.filter(client => client.Customer_Category_ID == searchByCategory.value);
      }
      if (searchByStatus.value) {
          filteredClients = filteredClients.filter(client => client.Customer_Status_ID == searchByStatus.value);
      }
      if (searchByTerritory.value) {
          filteredClients = filteredClients.filter(client => client.State_Province_Territory_ID == searchByTerritory.value);
      }
      Clients.value = filteredClients; // Update the Clients array with the filtered results
  }
      
    async function loadClients() {
      const options = {
          method: 'GET',
          url: 'http://127.0.0.1:3000/Customer/get',
          
    
      };
  
      try {
          const response = await axios.request(options);
          Clients.value = response.data;
          Datetimechange();
      } catch (error) {
        toast.error()
  
      }
  }
  
  async function loadTerritories() {
      const options = {
          method: 'GET',
          url: 'http://127.0.0.1:3000/Territory/get',
          
    
      };
  
      try {
          const response = await axios.request(options);
          Territories.value = response.data;
          console.log(Territories.value);
      } catch (error) {
          toast.error()
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
          toast.success('Customer Successfully added')
          loadClients();
      } catch (error) {
         toast.error('Failed to Add Customer')
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
      toast.success('Customer Successfully Updated')
    } catch (error) {
      toast.error('Could not update Customer')
    }
  }
  
  async function deleteClientFunction() {
    const customerId = deleteClient.value.Customer_ID;
    const options = {
      method: 'DELETE', // Change method to DELETE
      url: `http://127.0.0.1:3000/Customer/Delete/${customerId}`, 
    };
  
    try {
      const response = await axios.request(options);
      toast.success('Customer Successfully Deleted')
      loadClients(); 
    } catch (error) {
      toast.error('Could not delete Customer')
    }
  }
  
  
  
  
  
      function clearData() {
      loadClients(); 
      result.value = []; 
                       
  }
  
      
   onMounted(() => {
        loadClients();
        loadTerritories();
      });
  
  
  
  
      return {
        Clients,
        searchByCategory,
        searchByStatus,
        searchByTerritory,
        searchClients,
        clearData,
        result,
        VueDatePicker,
        showFirstForm,
        showSecondForm,
        showThirdForm,
        toggleForm,
        newClient,
        addnewClient,
        updateClient,
        updateClientFunction,
        loadClients,
        Datetimechange,
        deleteClient,
        deleteClientFunction,
        Territories,
        loadTerritories
  
      }
    }
  }
  
  </script>
  
  