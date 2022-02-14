// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

const bodyParser=require('body-parser');
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors= require('cors');
const req = require('express/lib/request');
const res = require('express/lib/response');

app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));



// Setup Server
// Initiating the port that the server will run on (5500 as it is the same port used by live server extension)
const port = 5500;

const server= app.listen(port,listening);

function listening(){
  console.log(`Good job me, the server is running on port ${port}`);
}

//Get function 

app.get('/getdata',function(request,response){
  response.send(projectData);
});

// POST function to get the API response and the feeling to post it to the server
app.post('/postdata', function (request, response) {
  //response.send('POST ed  Successfully!');
  //const data = request.body;
   // projectData={
   //   temp:data.temp,
   // }
    //response.send(projectData);
    const data=request.body;
    projectData={
      temp:data.temp,
      feelings:data.feelings,
      newDate:data.newDate,
    }
  });



