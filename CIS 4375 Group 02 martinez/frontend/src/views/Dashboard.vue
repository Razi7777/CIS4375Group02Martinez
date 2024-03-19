<!-- This view allows a user to view a pie chart based on zipcodes. -->
<template>
  <main>
    <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
      Dashboard
    </h1>
    <div class="px-10 py-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <!-- Display the Pie Chart -->
        <div class="col-span-2">
          <h2 class="text-2xl font-bold">Clients by Zip Code</h2>
          <div class="mt-4">
            <canvas id="zipCodeChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { Pie } from 'vue-chartjs'

export default {
 //Pie chart extension
  extends: Pie,
  mounted() {
    //Pie chart is rendered
    this.renderChart({
      //Hard coded zipcodes
      labels: [' ', ' ', ' ', ' ', ' '],
      datasets: [
        {
          label: 'Clients by Zip Code',
          //colors
          backgroundColor: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6'],
          //number of clients
          data: [10, 20, 30, 40, 50],
        },
      ],
    },
    { responsive: true, maintainAspectRatio: false })
  }
}
</script>
