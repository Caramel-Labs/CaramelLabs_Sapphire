module.exports = {
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/"],
  testMatch: [
    "**/tests/unit/**/*.test.js",
    "**/tests/integration/**/*.test.js",
  ],
  collectCoverageFrom: ["src/**/*.js"], // Adjust this according to your source files
};
