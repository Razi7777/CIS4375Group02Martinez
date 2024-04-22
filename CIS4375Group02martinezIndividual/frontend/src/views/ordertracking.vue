<!-- This view displays a list of clients. The user can search for clients, and click on a client to redirect to another component to view that client's information -->
<template>
  <main class='client-details-container'>
    <!--Header-->
    <h1 class="font-bold text-4xl text-red-300 tracking-widest text-center mt-10">
        Sales Details
    </h1>




<div class="px-10 pt-20">
  <div class="grid flex flex-col md:flex-row gap-x-6 gap-y-10 items-center max-w-lg bg-gray-300 p-5 rounded-lg shadow-md"> <!-- Added items-center -->
        <!--Search Client By selection-->
        <div class=col-span-1>
        <h2 class="text-2xl font-bold">Search Sales</h2>
        </div>
            <!-- Search form -->
            <div class="col-span-1">
              <label for="toggleFormSelect1" class="block font-bold mb-2">Select Sale Category</label>
              <select id="toggleFormSelect1" v-model="searchByCategory" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                  <option value="1">Online Transaction</option>
                  <option value="2">Physical Transaction</option>
    
              </select>
          </div>
          
          <!-- Toggle form select -->
          <div class="col-span-1">
              <label for="toggleFormSelect2" class="block font-bold mb-2">Select Product</label>
              <select id="toggleFormSelect2" v-model="searchByProduct" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option v-for="Product in Products" :key="Product.Product_ID" :value="Product.Product_ID">{{ Product.Product_Name }}</option>
          </select>
          </div>

          <div class="col-span-1">
      <!-- State/Territory list box -->
      <label for="toggleFormSelect2" class="block font-bold mb-2">Select Customer</label>
          <select id="toggleFormSelect3" v-model="searchByCustomer" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option v-for="Customer in Customers" :key="Customer.Customer_ID" :value="Customer.Customer_ID">{{ Customer.Customer_Name }}</option>
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
            <button class="bg-red-300 text-white rounded px-4 pt-2 py-2 mr-4" @click="searchPurchaseOrders" type="submit">
                Search Sales
            </button>
          </div>
          </div>
        
    </div>
</div>




 <div class="px-10 pt-20">
    <hr class="mt-10 mb-10" />
    <div class="grid flex flex-col md:flex-row gap-x-6 gap-y-10 items-center bg-gray-300 p-5 rounded-lg shadow-md">

      <div>
        <h2 class="text-2xl font-bold">List of Sales</h2>
        <!--h3 class="italic">Click table row to view Order details</h3-->
      </div>
      <!--Table showing list of Clients-->
      <div class="overflow-x-auto overflow-y-auto w-100 h-64">
        <table class="w-full  shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left w-8">Sale ID</th>
              <th class="p-4 text-left w-8">Sale Date</th>
              <th class="p-4 text-left w-8">Sale Category</th>
              <th class="p-4 text-left w-8">Sale Status</th>
              <th class="p-4 text-left w-8">Customer</th>
              <th class="p-4 text-left w-8">Product Sold</th>
         
    
            </tr>
          </thead>
          <tbody  v-if="result && result.length > 0" class="divide-y divide-gray-300">
            <tr v-for="Purchase_Order in result" :key="Purchase_Order.Purchase_Order_ID">
              <td class="p-2 text-left w-8">{{ Purchase_Order.Purchase_Order_ID }}</td>
              <td class="p-2 text-left w-8">{{ Purchase_Order.Purchase_Order_Date }}</td>
              <td class="p-2 text-left w-8">
                {{ 
                  Purchase_Order.Purchase_Order_Category_ID === 1 ? 'Online Transaction' : 
                  (Purchase_Order.Purchase_Order_Category_ID === 2 ? 'Physical Transaction' : '')
                }}
              </td>
              <td class="p-2 text-left w-8">
                {{ 
                  Purchase_Order.Purchase_Order_Status_ID === 1 ? 'Shipping' : 
                  (Purchase_Order.Purchase_Order_Status_ID === 2 ? 'Recieved' : 
                  (Purchase_Order.Purchase_Order_Status_ID === 3 ? 'Initiating' : 
                  (Purchase_Order.Purchase_Order_Status_ID  === 4 ? 'Return Initiated' : 
                  (Purchase_Order.Purchase_Order_Status_ID === 5 ? 'Return Completed': ''))))
                }}
              </td>
              <td class="p-2 text-left w-8">{{ Purchase_Order.Customer_Name }}</td>
              <td class="p-2 text-left w-8">{{ Purchase_Order.Product_Name }}</td>
             
              
            </tr>
          </tbody>
          <tbody v-else class="divide-y divide-gray-300">
            <tr v-for="Purchase_Order in Purchase_Orders" :key="Purchase_Order.Purchase_Order_ID">
              <td class="p-2 text-left w-8">{{ Purchase_Order.Purchase_Order_ID }}</td>
              <td class="p-2 text-left w-8">{{ Purchase_Order.Purchase_Order_Date }}</td>
              <td class="p-2 text-left w-8">
                {{ 
                  Purchase_Order.Purchase_Order_Category_ID === 1 ? 'Online Transaction' : 
                  (Purchase_Order.Purchase_Order_Category_ID === 2 ? 'Physical Transaction' : '')
                }}
              </td>
              <td class="p-2 text-left w-8">
                {{ 
                  Purchase_Order.Purchase_Order_Status_ID === 1 ? 'Shipping' : 
                  (Purchase_Order.Purchase_Order_Status_ID === 2 ? 'Recieved' : 
                  (Purchase_Order.Purchase_Order_Status_ID === 3 ? 'Initiating' : 
                  (Purchase_Order.Purchase_Order_Status_ID  === 4 ? 'Return Initiated' : 
                  (Purchase_Order.Purchase_Order_Status_ID === 5 ? 'Return Completed': ''))))
                }}
              </td>
              <td class="p-2 text-left w-8">{{ Purchase_Order.Customer_Name }}</td>
              <td class="p-2 text-left w-8">{{ Purchase_Order.Product_Name }}</td>
      
       
            </tr>
          </tbody>
        </table>
        </div>
      </div>
      </div>
      
      <div></div>
      <div class="px-10 pt-20">
      <div class="ml-10">
        <h2 class="text-2xl font-bold">Add New Sale</h2>
      </div>
      <form @submit.prevent="addnewPurchase" class="grid flex grid-cols-2 max-w-lg flex-col md:flex-row gap-x-6 gap-y-10 bg-gray-300 p-5 rounded-lg shadow-md">
        <div class="col-span-1 ">
          <label for="datepicker">Select Date:</label>
          <vue-date-picker id="datepicker" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="newPurchase.Purchase_Order_Date"></vue-date-picker>
          <br>
          <label for="PurchaseCategory">Sale Category: </label><br>
          <select id="PurchaseCategory" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="newPurchase.Purchase_Order_Category_ID" required>
            <option value=1>Online Transaction</option>
            <option value=2>Physical Transaction</option>
          </select><br><br>

          <label for="PurchaseStatus">Sale Type: </label><br>
          <select id="CustomerStatus" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="newPurchase.Purchase_Order_Status_ID" required>
          <option value=1>Shipping</option>
          <option value=2>Recieved</option>
          <option value=3>Missing</option>
          <option value=4>Return Initiated</option>
          <option value=5>Return Completed</option>
          </select><br><br>

      

          
        </div>
        <div class="col-span-1">
        
          <label for="Product">Product: </label><br>
          <select class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="newPurchase.Product_ID">
            <option v-for="Product in Products" :key="Product.Product_ID" :value="Product.Product_ID">{{ Product.Product_Name }}</option>
          </select><br><br>

          <label for="Product">Customer: </label><br>
          <select class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="newPurchase.Customer_ID">
            <option v-for="Customer in Customers" :key="Customer.Customer_ID" :value="Customer.Customer_ID">{{ Customer.Customer_Name }}</option>
          </select><br><br>
      
          <button class="col-span-2 bg-red-300 text-white rounded" type="submit">Add Sale</button>
        </div>
        
      </form>
    </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
   
     <div class="px-10 pt-20">
      <div class="ml-10"> 
     <h2 class="text-2xl font-bold">Update Existing Sale</h2>
      </div> 
     <form @submit.prevent="updatePurchaseFunction" class="grid flex grid-cols-2 max-w-lg flex-col md:flex-row gap-x-6 gap-y-10 bg-gray-300 p-5 rounded-lg shadow-md">
      <div class="col-span-1 ">
          <label for="ID">ID:</label><br>
          <input type="text" id="ID" placeholder="Enter ID to Update"  class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="updatePurchase.Purchase_Order_ID" required><br><br>

          <label for="datepicker">Select Date:</label>
          <vue-date-picker id="datepicker" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="updatePurchase.Purchase_Order_Date"></vue-date-picker>
          <br>      
          <label for="PurchaseCategory">Sale Category: </label><br>
          <select id="PurchaseCategory" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="updatePurchase.Purchase_Order_Category_ID" required>
            <option value=1>Online Transaction</option>
            <option value=2>Physical Transaction</option>
          </select><br><br>

          <label for="PurchaseStatus">Sale Type: </label><br>
          <select id="CustomerStatus" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="updatePurchase.Purchase_Order_Status_ID" required>
          <option value=1>Shipping</option>
          <option value=2>Recieved</option>
          <option value=3>Missing</option>
          <option value=3>Return Initiated</option>
          <option value=4>Return Completed</option>
          </select>
        
          </div>
          <div class="col-span-1">
          
            <label for="Product">Product: </label><br>
          <select class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="updatePurchase.Product_ID">
            <option v-for="Product in Products" :key="Product.Product_ID" :value="Product.Product_ID">{{ Product.Product_Name }}</option>
          </select><br><br>

          <label for="Product">Customer: </label><br>
          <select class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="updatePurchase.Customer_ID">
            <option v-for="Customer in Customers" :key="Customer.Customer_ID" :value="Customer.Customer_ID">{{ Customer.Customer_Name }}</option>
          </select><br><br>
        
  

        
            <button class="col-span-2 bg-red-300 text-white rounded" type="submit">Update Sale</button>
           
          </div>
      
  </form>
</div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div class="px-10 pt-20 pb-20">
      <div class="ml-10"> 
      <h2 class="text-2xl font-bold">Delete Sale</h2>
      </div>
        <form @submit.prevent="deletePurchaseFunction" class="grid flex grid-cols-2 max-w-lg flex-col md:flex-row gap-x-6 gap-y-10 bg-gray-300 p-5 rounded-lg shadow-md">
        <div>
          <label for="ID">ID:</label><br>
          <input type="text" id="ID" placeholder="Enter ID to delete" class="max-w-xs md:max-w-lg w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="deletePurchase.Purchase_Order_ID" required>
          <div class="mt-4">
        </div>
        <div><button class="bg-red-300 text-white rounded" type="submit">Delete Sale</button></div>
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
    const searchByProduct = ref('');
    const searchByCategory = ref('');
    const searchByCustomer = ref('');
    const result = ref([]);
    const newPurchase = ref({
  
        Purchase_Order_Date: '',
        Purchase_Order_Category_ID: '',
        Purchase_Order_Status_ID: '',
        Purchase_Order_Category_ID: '',
        Customer_ID: '',
        Product_ID: '',
  

    });
    const updatePurchase = ref({
        Purchase_Order_ID: '',
        Purchase_Order_Date: '',
        Purchase_Order_Category_ID: '',
        Purchase_Order_Status_ID: '',
        Purchase_Order_Category_ID: '',
        Customer_ID: '',
        Product_ID: '',

    });
    const deletePurchase = ref({


    });

    //initializing an object vs an array? is this only because I need 1 instance of new client?

    const Products = ref([

      //this is the toggle for what to search by
    ]);

    const Customers = ref([

    ]);
    
    const Purchase_Orders = ref([]);


    const clearForm = () => {
    newPurchase.value = {
      Purchase_Order_Date: '',
      Purchase_Order_Category_ID: '',
      Purchase_Order_Status_ID: '',
      Customer_ID: '',
      Product_ID: ''
    };

    updatePurchase.value = {
      Purchase_Order_ID: '',
      Purchase_Order_Date: '',
      Purchase_Order_Category_ID: '',
      Purchase_Order_Status_ID: '',
      Customer_ID: '',
      Product_ID: ''
    };

    // No need to clear deletePurchase object if it doesn't have any properties
  };


    const toggleForm = () => {
        if (showFirstForm.value) {
            showFirstForm.value = false;
            showSecondForm.value = true;
            showThirdForm.value = false;
            
            searchByProduct.value ='';
            searchByCategory.value = '';
            searchByCustomer.value = '';
        } else if (showSecondForm.value) {
            showFirstForm.value = false;
            showSecondForm.value = false;
            showThirdForm.value = true;
          
            searchByProduct.value = '';
            searchByCategory.value = '';
            searchByCustomer.value = '';
        } else if (showThirdForm.value) {
            showFirstForm.value = true;
            showSecondForm.value = false;
            showThirdForm.value = false;
          
            searchByProduct.value = '';
            searchByCustomer.value = '';
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
  function searchPurchaseOrders() {
    let filteredProducts = Purchase_Orders.value.slice(); // Create a copy of the original Clients array to avoid mutating it
    if (searchByCategory.value) {
        filteredProducts = filteredProducts.filter(Purchase_Order => Purchase_Order.Purchase_Order_Category_ID == searchByCategory.value);
    }
    if (searchByProduct.value) {
        filteredProducts = filteredProducts.filter(Purchase_Order => Purchase_Order.Product_ID == searchByProduct.value);
    }
    if (searchByCustomer.value) {
        filteredProducts = filteredProducts.filter(Purchase_Order => Purchase_Order.Customer_ID == searchByCustomer.value);
    }
    Purchase_Orders.value = filteredProducts; // Update the Clients array with the filtered results
}
    
  async function loadPurchaseOrders() {
    const options = {
        method: 'GET',
        url: 'http://127.0.0.1:3000/purchaseorder/get',
        
  
    };

    try {
        const response = await axios.request(options);
        Purchase_Orders.value = response.data;
        Datetimechange();
    } catch (error) {
      toast.error()

    }
}

async function loadCustomers() {
    const options = {
        method: 'GET',
        url: 'http://127.0.0.1:3000/customername/get',
        
  
    };

    try {
        const response = await axios.request(options);
        Customers.value = response.data;
    } catch (error) {
        toast.error()
    }
}

async function loadProducts() {
    const options = {
        method: 'GET',
        url: 'http://127.0.0.1:3000/productname/get',
        
  
    };

    try {
        const response = await axios.request(options);
        Products.value = response.data;
    } catch (error) {
        toast.error()
    }
}








function Datetimechange() {
      Purchase_Orders.value.forEach(function(Purchase_Order) {
        Purchase_Order.Purchase_Order_Date = Purchase_Order.Purchase_Order_Date.split('T')[0];
      });
    }
    

  

    async function addnewPurchase() {
    const options = {
        method: 'POST',
        url: 'http://127.0.0.1:3000/purchaseorder/Post',
        data: newPurchase.value 
  
    };

    try {
        const response = await axios.request(options);
        toast.success('Product Successfully Added')

        loadPurchaseOrders();
        clearForm();
    } catch (error) {
       toast.error('Failed to Add Product')
    }
}


async function updatePurchaseFunction() {
  const ProductId = updatePurchase.value.Purchase_Order_ID;
  const options = {
    method: 'PUT',
    url: `http://127.0.0.1:3000/purchaseorder/Put/${ProductId}`,
    data: updatePurchase.value 
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    loadPurchaseOrders();
    clearForm();
    toast.success('Sale Successfully Updated')
  } catch (error) {
    toast.error('Could not update Product')
  }
}

async function deletePurchaseFunction() {
  const PurchaseId = deletePurchase.value.Purchase_Order_ID;
  const options = {
    method: 'DELETE', // Change method to DELETE
    url: `http://127.0.0.1:3000/purchaseorder/Delete/${PurchaseId}`, 
  };

  try {
    const response = await axios.request(options);
    toast.success('Sale Successfully Deleted')
    loadPurchaseOrders();
    clearForm();
  } catch (error) {
    toast.error('Could not delete Product')
  }
}





    function clearData() {
    loadPurchaseOrders(); 
    result.value = []; 
                     
}

    
 onMounted(() => {
      loadPurchaseOrders();
      loadCustomers();
      loadProducts();
    });




    return {
      Products,
      searchByCategory,
      searchByCustomer,
      searchByProduct,
      searchPurchaseOrders,
      clearData,
      result,
      VueDatePicker,
      showFirstForm,
      showSecondForm,
      showThirdForm,
      toggleForm,
      clearForm,
      newPurchase,
      addnewPurchase,
      updatePurchase,
      updatePurchaseFunction,
      Purchase_Orders,
      loadPurchaseOrders,
      loadProducts,
      Datetimechange,
      deletePurchase,
      deletePurchaseFunction,
      Customers,
      loadCustomers,

    }
  }
}

</script>

