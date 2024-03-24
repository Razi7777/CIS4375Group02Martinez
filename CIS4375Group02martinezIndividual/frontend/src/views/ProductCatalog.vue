<template>
    <main class="flex justify-center min-h-screen">
      <div class="flex-grow">
        <div class="product-catalog">
          <h1>Product Catalog - {{ category }}</h1>
          <div class="product-grid">
            <!-- Display products based on the selected category -->
            <div v-for="product in products" :key="product.id" class="product-item">
              <img :src="product.image" :alt="product.name" class="product-image" />
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-price">{{ product.price }}</p>
              <button class="add-to-cart-btn">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <BottomBar />
      </div>
    </main>
  </template>
  
  <script>
  import BottomBar from '../components/BottomBar.vue';
  
  export default {
    components: {
      BottomBar,
    },
    data() {
      return {
        category: '',
        products: [],
      };
    },
    created() {
      // Get the selected category from the route query parameter
      this.category = this.$route.query.category;
      // Fetch products based on the selected category
      this.fetchProducts();
    },
    methods: {
      fetchProducts() {
        // Make an API call or retrieve data from a store based on the selected category
        // Update the 'products' array with the fetched data
        // Example:
        // this.products = await fetchProductsByCategory(this.category);
        // For demonstration purposes, let's assume we have a static list of products
        this.products = [
          {
            id: 1,
            name: 'Product 1',
            price: '$19.99',
            image: 'path/to/image1.jpg',
          },
          {
            id: 2,
            name: 'Product 2',
            price: '$24.99',
            image: 'path/to/image2.jpg',
          },
          // Add more sample products as needed
        ];
      },
    },
  };
  </script>
  
  <style scoped>
  .product-catalog {
    padding: 20px;
  }
  
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 20px;
    margin-bottom: 80px; /* Add margin bottom to prevent content from being hidden by the bottom bar */
  }
  
  .product-item {
    border: 1px solid #ccc;
    padding: 20px;
    text-align: center;
  }
  
  .product-image {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    margin-bottom: 10px;
  }
  
  .product-name {
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  .product-price {
    font-size: 16px;
    color: #888;
    margin-bottom: 10px;
  }
  
  .add-to-cart-btn {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
  }
  </style>