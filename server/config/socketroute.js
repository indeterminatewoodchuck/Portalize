var socket = module.exports = {};

socket.rooms = {};
/*
  socket.rooms stores the names of rooms of staff who are available to help customers,
  for each individual Organization.

  key: the Organization name (same name as Organization model's "web_name" parameter)

  value: an array of names of all open rooms available for customers to join.
*/

socket.num = 0;
/*
  socket.num is used to generate unique room names
*/

socket.customerQueue = {};
/*
  socket.customerQueue stores the user Socket Id of each customer who is waiting to be
  helped by a staff member, for each individual Organization.

  key: the Organization name (same name as Organization model's "web_name" parameter)

  value: an array of user Socket Ids of those customers who are waiting to be helped by
  staff members.
*/

socket.staff = {};
/*
  socket.staff stores all staff who are currently logged in to the application, for
  each individual Organization

  key: the Organization name (same name as Organization model's "web_name" parameter)

  value: an object with the following key-value pair:
      key: the user Socket Id of the staff member
      value: the name of the room that the staff member is currently in
*/

socket.socketroute = function(io, user) {

  /*
    queueStatus() is used to do the following 2 things:
    1. Notify the staff of a specific Organization when there is a change to the queue of
       Customers looking for help
    2. Notify Customers, who are in the customer queue of a specific Organization, about their
       current position in the customer queue or that there are no staff available to help them
  */
  var queueStatus = function(orgName) {
    socket.staff[orgName] = socket.staff[orgName] || {};
    socket.customerQueue[orgName] = socket.customerQueue[orgName] || [];

    var staffCount = 0;
    for (var staffId in socket.staff[orgName]) {
      staffCount += 1;
      io.to(staffId).emit('queueStatus', socket.customerQueue[orgName]);
    }
    for (var k = 0; k < socket.customerQueue[orgName].length; k++) {
      if (staffCount === 0) {
        io.to(socket.customerQueue[orgName][k].userId).emit('staffUnavailable');
      } else {
        io.to(socket.customerQueue[orgName][k].userId).emit('customerQueueStatus', k + 1);
      }
    }
  };

  user.category = undefined;
  /*
    user.category is used to distinguish whether the client side socket connection is
    of a customer or a staff
  */

  user.organizationName = undefined;
  /*
    user.organizationName keeps track of the Organization name pertaining to the client
    side socket connection
  */

  /*
    A staff member on the client side will emit the 'staffReady' event to the back-end
    to indicate that they are ready to help another customer. Upon receiving the
    'staffReady' event, the back-end will create a room name and send it to the staff member
    via the 'staffRoom' event. The room name will then be added to the
    socket.rooms[organizationName] array to indicate that the room is open for a customer
    to join.
  */
  user.on('staffReady', function(orgName) {

    socket.staff[orgName] = socket.staff[orgName] || {};
    socket.rooms[orgName] = socket.rooms[orgName] || [];
    socket.customerQueue[orgName] = socket.customerQueue[orgName] || []; 

    /*
      Do not create a new room if the staff member emits a 'staffReady' event when they are
      already in a room and are available to help a customer
    */
    if (socket.staff[orgName][user.id]) {
      var currentRoom = socket.staff[orgName][user.id];
      if (socket.rooms[orgName].indexOf(currentRoom) !== -1) {
        return;
      }
    }

    user.category = "staff";
    socket.num += 1;
    user.organizationName = orgName;

    var roomname = "room_" + orgName + "_" + socket.num;
    socket.rooms[orgName].push(roomname);

    socket.staff[orgName][user.id] = roomname;
    io.to(user.id).emit('staffRoom', roomname);

    /*
      Check to see if there are any customers waiting for help. If there are customers
      currently in the socket.customerQueue[organizationName], dequeue the customer who
      joined the customerQueue first, and send that customer the name of an available room.
      Remove the name of that available room from socket.rooms[organizationName]
    */
    if (socket.customerQueue[orgName] && socket.customerQueue[orgName].length > 0) {
      var customerData = socket.customerQueue[orgName].shift();
      io.to(customerData.userId).emit('customerRoom', socket.rooms[orgName].shift());
    }
    queueStatus(orgName);
  });

  /*
    A customer on the client side will emit the 'customerRequest' event to the back-end
    to indicate that they would like to chat with a staff member. Upon receiving the
    'customerRequest' event, the back-end will add the customer's Socket Id to the
    socket.customerQueue[orgName] array.
  */
  user.on('customerRequest', function(requestObject) {
    user.category = "customer";
    user.organizationName = requestObject.orgName;
    var orgName = requestObject.orgName;
    requestObject.userId = user.id;
    socket.customerQueue[orgName] = socket.customerQueue[orgName] || []; 

    /*
      If the customer emits 'customerRequest' when they are already in the customerQueue,
      do nothing
    */
    for (var j = 0; j < socket.customerQueue[orgName].length; j++) {
      if (socket.customerQueue[orgName][j].userId === user.id) {
        return;
      }
    }
    socket.customerQueue[orgName].push(requestObject);

    /*
      Check if there are a room open with a staff member available to help the customer.
      If there is a staff member available, dequeue the room name of the room that was first
      added to socket.rooms[orgName].
    */
    if (socket.rooms[orgName] && socket.rooms[orgName].length > 0) {
      io.to(user.id).emit('customerRoom', socket.rooms[orgName].shift());
      socket.customerQueue[orgName].shift();
    }
    queueStatus(orgName);
  });

  /*
    When a customer or staff member has disconnected their socket connection
  */
  user.on('disconnect', function() {
    if (user.category === "staff") {
      /*
        For a staff member, check to see if that staff person is in a room and is not
        currently helping any customers (indicated by their room name being in
        socket.rooms[organizationName]). If the room name is in
        socket.rooms[organizationName], remove the room name from the array. Then remove the
        staff Socket Id from socket.staff[organizationName]
      */

      var roomIndex = socket.rooms[user.organizationName].indexOf(socket.staff[user.organizationName][user.id]);
      if (roomIndex != -1) {
        socket.rooms[user.organizationName].splice(roomIndex, 1);
      }
      delete socket.staff[user.organizationName][user.id];
    } else if (user.category === "customer") {
      /*
        For a customer, check to see if that customer's Socket Id is in
        socket.customerQueue[organizationName]. If it is, remove it
      */

      for (var m = 0; m < socket.customerQueue[user.organizationName].length; m++) {
        if (socket.customerQueue[user.organizationName][m].userId === user.id) {
          socket.customerQueue[user.organizationName].splice(m, 1);
        }
      }
    }
    queueStatus(user.organizationName);
  });
};
