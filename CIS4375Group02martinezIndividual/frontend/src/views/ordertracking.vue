<!-- This view displays a list of clients. The user can search for clients, and click on a client to redirect to another component to view that client's information -->
<template>
  <main class="order-tracker-container">
    <div >
      <!--Header-->
      <h1 class="font-bold text-4xl text-orange-800 tracking-widest text-center mt-10">
        Order Tracking
      </h1>
    </div>
    <div class="px-10 pt-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <!--Search Client By selection-->
        <h2 class="text-2xl font-bold"></h2>
        <!-- Displays Client Name search field -->
        <div class="flex flex-col">
          <!--select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="searchBy">
            <option value="Order ID">Order ID</option>
            <option value="Order Date">Order Date</option>
          </select-->
        <button class="bg-orange-800 text-white rounded"  @click="toggleForm">{{ showFirstForm ? 'Search By ID' : 'Search By Date' }}</button>
        </div>
        <!--Input box for searching by Client First Name-->
        <div>
        <form v-if="showFirstForm">
        <div class="flex flex-col">
          <label class="block">
            <input type="date"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="searchBy" placeholder="Enter Date" />
          </label>
        </div>
      </form>
      <form v-else>
        <!--Input box for searching by Client Last Name-->
        <!-- Displays Client Number search field -->
        <div class="flex flex-col">
          <input
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text" v-model="searchBy" 
            placeholder="Enter ID" />
        </div>
       </form>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <div></div>
        <div></div>
        <!--Clear Search button-->
        <div class="mt-5 grid-cols-2">
          <button class="mr-10 bg-orange-800 text-white rounded" @click="clearData" type="submit">
            Clear Filter
          </button>
          <!--Search Client button-->
          <button class="bg-orange-800 text-white rounded" @click="searchOrders" type="submit">
            Search Orders
          </button>
        </div>
      </div>
    </div>

    <hr class="mt-10 mb-10" />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Orders</h2>
        <!--h3 class="italic">Click table row to view Order details</h3-->
      </div>
      <!--Table showing list of Clients-->
      <div class="flex flex-col col-span-2 max-h-[220px] overflow-y-auto">
        <table class="min-w-full shadow-md rounded ">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">ID</th>
              <th class="p-4 text-left">Order Date</th>
              <th class="p-4 text-left">Order Category</th>
              <th class="p-4 text-left">Order Status</th>
              <th class="p-4 text-left">Order Customer</th>
            </tr>
          </thead>
          <tbody  v-if="result && result.length > 0" class="divide-y divide-gray-300">
            <tr v-for="Order in result" :key="Order.Purchase_Order_ID">
              <td class="p-2 text-left">{{ Order.Purchase_Order_ID}}</td>
              <td class="p-2 text-left">{{ Order.Purchase_Order_Date }}</td>
              <td class="p-2 text-left">{{ Order.Purchase_Order_Category_ID }}</td>
              <td class="p-2 text-left">{{ Order.Purchase_Order_Status_ID }}</td>
              <td class="p-2 text-left">{{ Order.Customer_ID }}</td>
            </tr>
          </tbody>
          <tbody v-else class="divide-y divide-gray-300">
            <tr v-for="Order in Orders" :key="Order.Purchase_Order_ID">
              <td class="p-2 text-left">{{ Order.Purchase_Order_ID}}</td>
              <td class="p-2 text-left">{{ Order.Purchase_Order_Date }}</td>
              <td class="p-2 text-left">{{ Order.Purchase_Order_Category_ID }}</td>
              <td class="p-2 text-left">{{ Order.Purchase_Order_Status_ID }}</td>
              <td class="p-2 text-left">{{ Order.Customer_ID }}</td>
            </tr>
          </tbody>
        </table>
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
    const Orders = ref([
      /*{ OrderID: 1, OrderDate: '2024-03-24', OrderSender: 'Alice', OrderStatus: 'Pending' },
      { OrderID: 2, OrderDate: '2024-03-21', OrderSender: 'Bob', OrderStatus: 'Delivered' },
      { OrderID: 3, OrderDate: '2024-03-28', OrderSender: 'Jeff', OrderStatus: 'Pending' },
      { OrderID: 4, OrderDate: '2024-02-21', OrderSender: 'Daniel', OrderStatus: 'Pending' },
      { OrderID: 5, OrderDate: '2024-02-15', OrderSender: 'Bert', OrderStatus: 'Delivered' },
      { OrderID: 6, OrderDate: '2024-01-11', OrderSender: 'Pierre', OrderStatus: 'Pending' },
      { OrderID: 7, OrderDate: '2024-01-13', OrderSender: 'Frank', OrderStatus: 'Delivered' },
      // Add more order data objects as needed*/
    ]);
    const toggleForm = () => {
      showFirstForm.value = !showFirstForm.value;
    };


    function searchOrders() {
    result.value = []; // Initialize an array to store filtered orders
    for (let i = 0; i < Orders.value.length; i++) {
        if (Orders.value[i].Purchase_Order_Date == (searchBy.value)) {
            result.value.push(Orders.value[i]); // Push matching orders into the result array
        }
        else if (Orders.value[i].Purchase_Order_ID == (searchBy.value)) {
            result.value.push(Orders.value[i]); // Push matching orders into the result array
        }
    }
    result.forEach(order => {
        console.log(order.Purchase_Order_Date);
    });
  }


  async function loadOrders() {
    const options = {
        method: 'GET',
        url: 'http://127.0.0.1:3000/Trackorder/get',
        
  
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        Orders.value = response.data;
        Datetimechange();
    } catch (error) {
        console.error(error);
    }
}


function Datetimechange() {
      Orders.value.forEach(function(order) {
        order.Purchase_Order_Date = order.Purchase_Order_Date.split('T')[0];
      });
    }


//function allows for users to enter dates or id and search the table with them



 //need to use.value when referring to the value saved in a reactive variable, cannot for instance push into the original array structure
 //reactivity needs to be declared for us to trigger updates in the DOM based on changes we make on the variable, in order to keep the page structure in sync with our changes in the code
 //within the scope of a function, we can fill up an array by using the .push mutating method to update its values, here we utilize this to fill up the result of the search with the parts of the order array that fulfill the search condition
 //for a single entry in a reactive array, to access is arrayname.value[index of the entry]
    

 onMounted(() => {
      loadOrders();
    });

    


    function clearData() {
      result.value = [];
    };

    return {
      Orders,
      searchBy,
      searchOrders,
      clearData,
      result,
      VueDatePicker,
      showFirstForm,
      toggleForm,
      loadOrders
    }
  }
}
//todo: Make it so that clicking an item in the table allows the user to see a description of the item
//fix css and styling to be more pleasing to end users
</script>
