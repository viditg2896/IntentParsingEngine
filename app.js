 /*-------------------RIGHTSTAY INTENT PARSING ENGINE-----------------------*/
 /*
  IMPORTANT PREREQUISITES-
     
     BEFORE RUNNING THIS APP VIA NODE, MAKE SURE YOU HAVE A PYTHON SERVER UP & RUNNING-

     STEPS TO SET UP THE SERVER-
     1. OPEN TERMINAL. NAVIGATE TO THE PROJECT FOLDER.
     2. PASTE THIS INTO THE TERMINAL & EXECUTE : "python -m rasa_nlu.server -c config.json --server_model_dirs=./model_20170708-070108" 
     3. YOUR SERVER SHOULD BE UP AND RUNNING.

 */
 /*
               This NodeJS app does the following-
               ->Takes message from user as input. Breaks it into actionable utterances. (Basically breaks a paragraph into sentences)
               ->Calls the RASA NL API via the "request" module in node-js and stores the result in form of a JSON
               ->Parses and displays the intent from the JSON if the confidence is greater than the threshold.
               
       */
 var str = "Is it safe for family ? Food available at place or need to arrange from outside ?";
 //Splits the paragraph into sentences whenever a ?,! or . is encountered.
 var output = str.split(/[\.!\?]+/);
 //Requiring the "request" module.
 var request = require('request');
 //Defining iterators and variables that will store data from JSON.
 var i, x;
 //Defining the threshold for getting accurate results.
 var threshold = 0.75;
 //Defining the result array which will store the parsed intents.
 var result = new Array();
 //Logging the actionable utterances and phrases obtained after splitting the message
 console.log("Actionable Sentences are : " + output);
 //Calling the API to parse intent for each actionable utterance
 for (i = 0; i < output.length; i++) {
     request('http://localhost:5000/parse?q=' + output[i], function(error, response, body) {
         //Converting the output JSON into a JavaScript object
         x = JSON.parse(body);
         //Storing the parse intent into the result array if its confidence is greater than the threshold
         if (x.intent.confidence > threshold) {
             result.push(x.intent.name);
         }
     });
 }
 //Function for printing the result array
 function printfunction() {
     //Printing the result array if it has any elements
     if (result.length !== 0) {
         console.log("Parsed Intents are : " + result);
     } else
         console.log("Sorry! I couldnt parse this.");
 }
 //Waiting for the asynchronous processes to complete and calling the print function.
 setTimeout(printfunction, 1000);