module.exports = {
  apps : [{
    name: "app",
    script: "./app.js",
    // Optional configuration settings
    watch: true
  },{
    name: "DbConnection",
    script: "./DbConnection.js",
    // Optional configuration settings
    watch: true
  },{
    name: "server",
    script: "./server.js",
    // Optional configuration settings
    watch: true
  }]
};
