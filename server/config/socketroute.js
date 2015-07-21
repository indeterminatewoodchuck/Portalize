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
  socket.num is used to generate unique roomnames
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

  var queueStatus = function(orgName) {
    for (var staffId in socket.staff[orgName]) {
      io.to(staffId).emit('queueStatus', socket.customerQueue[orgName]);
    }
  };

  user.category = undefined;
  user.organizationName = undefined;
  user.on('staffReady', function(orgName) {
    user.category = "staff";
    socket.num += 1;
    user.organizationName = orgName;
    var roomname = "room_" + orgName + "_" + socket.num;
    socket.rooms[orgName] = socket.rooms[orgName] || []; 
    socket.rooms[orgName].push(roomname);

    socket.staff[orgName] = socket.staff[orgName] || {};
    socket.staff[orgName][user.id] = roomname;
    io.to(user.id).emit('staffRoom', roomname);
    if (socket.customerQueue[orgName] && socket.customerQueue[orgName].length > 0) {
      var customerId = socket.customerQueue[orgName].shift();
      io.to(customerId).emit('customerRoom', socket.rooms[orgName].shift());
    }
    queueStatus(orgName);
  });

  user.on('customerRequest', function(orgName) {
    user.category = "customer";
    user.organizationName = orgName;
    socket.customerQueue[orgName] = socket.customerQueue[orgName] || []; 
    socket.customerQueue[orgName].push(user.id);
    if (socket.rooms[orgName] && socket.rooms[orgName].length > 0) {
      io.to(user.id).emit('customerRoom', socket.rooms[orgName].shift());
      socket.customerQueue[orgName].shift();
    }
    queueStatus(orgName);
  });

  user.on('disconnect', function() {
    if (user.category === "staff") {
      var roomIndex = socket.rooms[user.organizationName].indexOf(socket.staff[user.organizationName][user.id]);
      if (roomIndex != -1) {
        socket.rooms[user.organizationName].splice(roomIndex, 1);
      }
      delete socket.staff[user.organizationName][user.id];

    } else if (user.category === "customer") {
      var customerIndex = socket.customerQueue[user.organizationName].indexOf(user.id);
      if (customerIndex !== -1) {
        socket.customerQueue[user.organizationName].splice(customerIndex, 1);
        queueStatus(user.organizationName);
      }
    }
  });
};
