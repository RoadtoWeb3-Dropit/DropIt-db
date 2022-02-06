/**
 * This is our actual server file. This server is where we connect the MongoDB database and define the routes that we would use.
 *
 * Setup required frameworks.
 * We will be building an Express Web Application using Node.js
 *
 * We wil require the following:
 * express: node.js web app framework
 * cors: middleware for Express
 * mongoose: used for MongoDB and helps connect to mongodb database
 * dotenv: allows you to separate secrets from your source code - important for .ENV file.
 *
 * To run the server, first we need to install the dependencies. In step 1, you must (in your command terminal) navigate into the backend folder. (cd backend)
 * Next, with npm install you can easily install all the dependencies required as we have written a script in the package.json to help simplify this process.
 * Finally, to run the server, simply type nodemon server in the backend folder.
 *
 * How to run the server:
 * 1. cd backend
 * 2. npm install
 * 3. nodemon server
 *  */

/** How to start?
 *
 *  Initial Express Server Setup.
 * 1. Dependencies
 * 2. Set up express function (app and port)
 * 3. Set up middleware and use express.json method
 *    Pass in our defined port variable so our server can accept a parameter from the environment and what port to listen to.  (app.listen)
 *    Confirm server is running.
 *    Run server to confirm.
 *
 * 4. (TODO #1): Create .env file for MongoDB credentials
 * 5. (TODO #2): Variable to store the info in the .env var. -> const uri = process.env.ATLAS_URI
 * 6. (TODO #3): Connect to MongoDB Database
 * 7. Set a variable so we can check that we are connected to the database  -> const connection = mongoose.connection;
 * 8. (TODO #4): Confirm the connection and output a success message if connected successfully via a function.
 * 9. Define our user route -> const userRouter = require("./routes/users");
 * 10. (TODO #5) Mount the middleware for the routes served by the userRouter -> app.use("/users", userRouter);
 */

//Define our Route

// Call the express function, express() and puts the new Express application inside the app variable
// We also define the port we will be using for our web server to listen on. In this case either a currently in use port or port 5000.

/**
 * cors is our middleware for Express.
 * express.json is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
 */

// TODO #1 - Create a .env file to store MongoDB credentials
//uri holds our credentials to access the MongoDB Database. You obtain this from the MongoDB Dashboard.
// The actual credentials are stored in a .env file which you will have to create yourself within the backend directory (.\nwPlus Backend Workshop\backend ).

// TODO #2 - Create a a variable to access that information in the .env variable

// TODO #3 Connect to your MongoDB Database

// TODO #4 Confirm the connection and output a success message if connected successfully.

// TODO #5 Mount the middleware for the routes served by the userRouter
// For all routes using the user schema, need append /users to the url.
// ie. http://localhost:5000/users/

// Pass in our defined port variable so our server can accept a parameter from the environment and what port to listen to
// Log to console to confirm it is running.
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
let cors = require("cors");
const port = process.env.PORT || 5000;

function startKeepAlive() {
  setInterval(function () {
    var options = {
      host: "backendforweb3.herokuapp.com",
      port: 80,
      path: "/",
    };
    http
      .get(options, function (res) {
        res.on("data", function (chunk) {
          try {
            // optional logging... disable after it's working
            console.log("HEROKU RESPONSE: " + chunk);
          } catch (err) {
            console.log(err.message);
          }
        });
      })
      .on("error", function (err) {
        console.log("Error: " + err.message);
      });
  }, 20 * 60 * 1000); // load every 20 minutes
}

startKeepAlive();

require("dotenv/config");

app.use(cors());
app.use(bodyParser.json());

const dropRoute = require("./routes/drop");

app.use("/drop", dropRoute);

mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("connected to db");
});

app.listen(port);
