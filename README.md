# Booking App
## Project introduction
The application helps to book hotels in Vietnam.
## Functional description
### Server
1. Manage and save data (hotels, rooms, users, transactions)
2. Receive request from admin app and client app
3. Send response to admin app and client app
### Client app
Permit user to:
1. See general information at Home:
  - Each city's number of properties
  - Each type's number of properties
  - Highest rating hotels
2. Search hotels by city, dates and quantity (adults, children, rooms)
3. See the detail of each hotel (address, distance, room types, price...)
4. Register and login to reserved or book hotels, rooms
5. See the history of orders
### Admin app
Permit admin to:
1. See the numbers of clients, earnings, balance, transactions in dashboard
2. See any transaction's detail
3. See, add, update and delete rooms, hotels
## Demo link
1. Server: https://booking-app-llcw.onrender.com
2. Client app: http://booking.tamfullstack.surge.sh
3. Admin app: http://admin.booking.tamfullstack.surge.sh
## Deployment guide (on local)
### Clone this repository
`$ git clone https://github.com/tamfullstack/booking-app.git`
### Run server
`$ cd booking-app/server`  
`$ npm install`  
`$ npm start`
### Run client app
`$ cd booking-app/client-app`  
`$ npm install`  
`$ npm start`
### Run admin app
`$ cd booking-app/admin-app`  
`$ npm install`  
`$ npm start`
