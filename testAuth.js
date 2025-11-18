// testAuth.js (Place this file in your project root for easy execution)

// Import the authentication function (adjust path as needed if not in root)
// NOTE: Since this is a simple JS test file, we use dynamic import for TypeScript files
// or assume this file is in the root and AuthHelper is in app/login
const { authenticateUser } = require('./app/login/AuthHelper'); 

async function runTest() {
    console.log("--- Starting Authentication Test ---");

    // This call will execute authenticateUser and print the 'authData' log
    const result = await authenticateUser("testuser", "password123"); 
    
    console.log("--- Test Complete ---");
    console.log(`Authentication Result for 'testuser': ${result}`);
}

runTest();