const config = {
  "/api": {
    target: `http://localhost:8080`,
    secure: false,
    logLevel: "debug",
    changeOrigin: true,
  },
};

console.log(`Using ${config["/api"].target} as proxy destination. \n`);

module.exports = config;
