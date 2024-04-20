<template>
    <div class="not-found-container">
      <div class="not-found-content">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't seem to exist.</p>
        <router-link to="/home">
          <button class="home-button">Return Home</button>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound'
  };
  </script>
  
  <style scoped>
  .not-found-container {
    display: flex;
    align-items: top;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  
  .not-found-content {
    max-width: 600px;
    padding: 20px;
  }
  
  h1 {
    font-size: 5em;
    margin-bottom: 0.5em;
  }
  
  p {
    font-size: 1.5em;
    margin-bottom: 1em;
  }
  
  .home-button {
    padding: 10px 20px;
    font-size: 1em;
    cursor: pointer;
    background-color: #f09;
    color: white;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .home-button:hover {
    background-color: #d06;
  }
  </style>
  