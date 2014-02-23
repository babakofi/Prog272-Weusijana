Week05-NodeExpressMongo
=======================
*by Baba Kofi Weusijana*

This applications contains:

- Node
- Express
- MongoDb

It assumes that you have a MongoDB installed named ***test***.

1. Run "node QueryMongo.js" to insert some data into the MongoDb database named ***test***.
2. Run "node server.js" to start the Express webserver and allow Web clients to use the WebApp. It will display any one record from the array of records to the user.  
The WebApp will retrieve the array from the server only once. 
This should occur immediately after your application loads.
Once the array is on the client side, the user will be able to select any one item from the array.

Other features of the WebApp are:

- A place to show the selected record retrieved from the server. 
This would probably be a series of paragraph tags, but other options are acceptable.
- An input element where the user can enter the number of the item they want to retreive.
- A button to press to activate the display of the next item.
