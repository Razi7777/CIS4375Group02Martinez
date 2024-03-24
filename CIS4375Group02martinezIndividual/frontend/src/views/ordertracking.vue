<!-- This view displays a list of clients. The user can search for clients, and click on a client to redirect to another component to view that client's information -->
<template>
  <main>
    <div>
      <!--Header-->
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
        Order Tracking
      </h1>
    </div>
    <div class="px-10 pt-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <!--Search Client By selection-->
        <h2 class="text-2xl font-bold">Search Order By</h2>
        <!-- Displays Client Name search field -->
        <div class="flex flex-col">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="searchBy">
            <option value="Order ID">Order ID</option>
            <option value="Order Date">Order Date</option>
          </select>
        </div>
        <!--Input box for searching by Client First Name-->
        <div class="flex flex-col" v-if="searchBy === 'Order ID'">
          <label class="block">
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="SearchBy" placeholder="Enter Order ID" />
          </label>
        </div>
        <!--Input box for searching by Client Last Name-->
        <!-- Displays Client Number search field -->
        <div class="flex flex-col" v-if="searchBy === 'Order Date'">
          <input
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text" v-model="SearchBy" 
            placeholder="Enter Order Date" />
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <div></div>
        <div></div>
        <!--Clear Search button-->
        <div class="mt-5 grid-cols-2">
          <button class="mr-10 border border-red-700 bg-white text-red-700 rounded" @click="loadData" type="submit">
            Clear Order
          </button>
          <!--Search Client button-->
          <button class="bg-red-700 text-white rounded" @click="SearchOrders" type="submit">
            Search Order
          </button>
        </div>
      </div>
    </div>

    <hr class="mt-10 mb-10" />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Orders</h2>
        <h3 class="italic">Click table row to view Order details</h3>
      </div>
      <!--Table showing list of Clients-->
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
        >
              <th class="p-4 text-left">ID</th>
              <th class="p-4 text-left">Order Date</th>
              <th class="p-4 text-left">Sender</th>
              <th class="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr v-for="Order in Orders" :key="Order._id">
              <td class="p-2 text-left">{{ Order.OrderID }}</td>
              <td class="p-2 text-left">{{ Order.OrderDate }}</td>
              <td class="p-2 text-left">{{ Order.OrderSender }}</td>
              <td class="p-2 text-left">{{ Order.OrderStatus }}</td>
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

export default {
  setup() {
    const toast = useToast()

    const searchBy = ref('');
    const OrderID = ref('');
    const OrderDate = ref('');
    const Orders = ref([
      { OrderID: 1, OrderDate: '2024-03-24', OrderSender: 'Alice', OrderStatus: 'Pending' },
      { OrderID: 2, OrderDate: '2024-03-23', OrderSender: 'Bob', OrderStatus: 'Delivered' },
      // Add more order data objects as needed
    ]);

    const searchOrders = () => {
  const filteredOrders = Orders.value.filter(order => {
    if (searchBy.value === 'Order ID') {
      return order.OrderID == OrderID.value;
    } else if (searchBy.value === 'Order Date') {
      return order.OrderDate === OrderDate.value;
    }
    // Add more search criteria if needed
    return true; // Default behavior: keep all orders if no search criteria specified
  });
  Orders.value = filteredOrders;
}

    const loadData = async () => {
      // Implement data loading logic if required
    }

    return {
      Orders,
      searchBy,
      OrderID,
      OrderDate,
      searchOrders,
      loadData
    }
  }
}
</script>