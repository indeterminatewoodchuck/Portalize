var expect = require('chai').expect;
var io = require('socket.io-client');
var ioserver = require('socket.io');
var socketTestURL = 'http://127.0.0.1:3000';

var options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('Socket.io Server Routing', function() {

  var server = require('../../index.js');

  it('Should send staffRoom event and customerRoom event when staff member connects after customer', function(done) {
    var customerSocket1 = io.connect(socketTestURL, options);
    var customerData = {
      name: 'Ben',
      email: 'test@test.com',
      question: 'I need help',
      orgName: 'ShoeLocker'
    };
    customerSocket1.on('connect', function(data){
      customerSocket1.emit('customerRequest', customerData);
    });
    var staffSocket1 = io.connect(socketTestURL, options);
    staffSocket1.on('connect', function(data){
      staffSocket1.emit('staffReady', 'ShoeLocker')
    });
    staffSocket1.on('staffRoom', function(name) {
      expect(name).to.equal('room_ShoeLocker_1');
    });
    customerSocket1.on('customerRoom', function(name) {
      expect(name).to.equal('room_ShoeLocker_1');
      staffSocket1.disconnect();
      customerSocket1.disconnect();
      done(); 
    });
  });

  it('Should create new room on "staffReady"', function(done) {
    var staffSocket = io.connect(socketTestURL, options);
    staffSocket.on('connect', function(data){
      staffSocket.emit('staffReady', 'ShoeLocker')
    });
    staffSocket.on('staffRoom', function(name) {
      expect(name).to.equal('room_ShoeLocker_2');
      staffSocket.disconnect();
      done();
    });
  });

  it('Third roomname should equal "room_ShoeLocker_3"', function(done) {
    var staffSocket1 = io.connect(socketTestURL, options);
    staffSocket1.on('connect', function(data){
      staffSocket1.emit('staffReady', 'ShoeLocker')
    });
    staffSocket1.on('staffRoom', function(name) {
      expect(name).to.equal('room_ShoeLocker_3');
      staffSocket1.disconnect();
      done();
    });
  });

  it('"staffRoom" should only be sent to socket connection that sent "staffReady"', function(done) {
    var staffSocket1 = io.connect(socketTestURL, options);
    var staffSocket2 = io.connect(socketTestURL, options);
    staffSocket2.on('connect', function(data){
      staffSocket2.emit('staffReady', 'roomname1')
    });
    staffSocket1.on('staffRoom', function(name) {
      expect(Constructor).to.throw(Error);
    });
    staffSocket2.on('staffRoom', function(name) {
      staffSocket1.disconnect();
      staffSocket2.disconnect();      
      done();
    });
  });

  it('Room names of disconnected staff from previous test are removed from socketroute.rooms array', function(done) {
    var customerSocket1 = io.connect(socketTestURL, options);
    var customerData = {
      name: 'Ben',
      email: 'test@test.com',
      question: 'I need help',
      orgName: 'ShoeLocker'
    };
    customerSocket1.on('connect', function(){
      customerSocket1.emit('customerRequest', customerData);
    });
    var staffSocket1 = io.connect(socketTestURL, options);
    staffSocket1.on('connect', function(){
      staffSocket1.emit('staffReady', 'ShoeLocker');
    });
    staffSocket1.on('staffRoom', function(name) {
      expect(name).to.equal('room_ShoeLocker_5');
    });
    customerSocket1.on('customerRoom', function(name) {
      expect(name).to.equal('room_ShoeLocker_5');
      staffSocket1.disconnect();
      customerSocket1.disconnect();
      done();
    });
  });

  it('Should send customerRoom event to second customer if first customer disconnects before staff member connects', function(done) {
    var customerSocket1 = io.connect(socketTestURL, options);
    var customerSocket2 = io.connect(socketTestURL, options);
    var refCustomer3;
    var refCustomer4;

    var customerData1 = {
      name: 'Ben',
      email: 'test@test.com',
      question: 'I need help',
      orgName: 'ShoeLocker'
    };

    var customerData2 = {
      name: 'George',
      email: 'test2@test.com',
      question: 'Help me!',
      orgName: 'ShoeLocker'
    };

    customerSocket1.on('connect', function() {
      customerSocket1.emit('customerRequest', customerData1);
    });
    customerSocket2.on('connect', function() {
      customerSocket2.emit('customerRequest', customerData2);
    });

    var num = 0;
    var staffSocket1 = io.connect(socketTestURL, options);
    staffSocket1.on('connect', function() {
      staffSocket1.emit('staffReady', 'ShoeLocker');
      staffSocket1.on('queueStatus', function(queue) {
        num += 1;
        if (num === 3) {
          expect(queue.length).to.equal(3);
          customerSocket2.disconnect();
        }
        if (num === 4) {
          expect(queue.length).to.equal(2);
          staffSocket1.disconnect();
          customerSocket1.disconnect();
          refCustomer3.disconnect();
          refCustomer4.disconnect();
          done();
        }
      });
    });

    staffSocket1.on('staffRoom', function(name) {
      expect(name).to.equal('room_ShoeLocker_6');
    });

    customerSocket1.on('customerRoom', function(name) {
      expect(name).to.equal('room_ShoeLocker_6');
      var customerSocket3 = io.connect(socketTestURL, options);
      var customerSocket4 = io.connect(socketTestURL, options);
      var customerData3 = {
        name: 'Catherine',
        email: 'test2@test.com',
        question: 'Help',
        orgName: 'ShoeLocker'
      };
      var customerData4 = {
        name: 'Pancho',
        email: 'test4@test.com',
        question: 'Where is it?',
        orgName: 'ShoeLocker'
      };
      customerSocket3.on('connect', function() {
        refCustomer3 = customerSocket3;
        customerSocket3.emit('customerRequest', customerData3);
      });
      customerSocket4.on('connect', function() {
        refCustomer4 = customerSocket4;
        customerSocket4.emit('customerRequest', customerData4);
      });
    });

  });

  it('Do not emit "staffRoom" to staffSocket if the staff currently in a room with no customer', function(done) {
    var counter = 0;
    var staffSocket3 = io.connect(socketTestURL, options);
    staffSocket3.on('connect', function(){
      staffSocket3.emit('staffReady', 'ShoeLocker');
    });
    staffSocket3.on('staffRoom', function(name) {
      counter += 1;
      if (counter === 1) {
        staffSocket3.emit('staffReady', 'ShoeLocker');
        setTimeout(function() {
          staffSocket3.disconnect();
          done();
        }, 1500);
      }
      if (counter === 2) {
        expect(Constructor).to.throw(Error);
      }
    });

  });

  it('If customer emits "customerRequest" and no staff available, customer should received "staffUnavailable" event', function(done) {
    var customerSocket1 = io.connect(socketTestURL, options);
    var customerData1 = {
      name: 'Steve',
      email: 'test4@test.com',
      question: 'Where is it?',
      orgName: 'ShoeLocker'
    };
    customerSocket1.on('connect', function() {
      customerSocket1.emit('customerRequest', customerData1);
    });

    customerSocket1.on('staffUnavailable', function() {
      customerSocket1.disconnect();
      done();
    });
  });

  it('If customer emits "customerRequest" and there is staff available, send them their place in the queue via "customerQueueStatus"', function(done) {
    var staffSocket5 = io.connect(socketTestURL, options);
    staffSocket5.on('connect', function() {
      staffSocket5.emit('staffReady', 'ShoeLocker');
    });
    var staffQueueCount = 0;
    staffSocket5.on('queueStatus', function(queue) {
      if (staffQueueCount === 3) {
        staffSocket5.disconnect();
        customerSocket1.disconnect();
        customerSocket2.disconnect();
        customerSocket3.disconnect();
        done();
      }
      staffQueueCount += 1;
    });
    var customerSocket1 = io.connect(socketTestURL, options);
    var customerData1 = {
      name: 'Catherine',
      email: 'test2@test.com',
      question: 'Help',
      orgName: 'ShoeLocker'
    };
    customerSocket1.on('connect', function() {
      customerSocket1.emit('customerRequest', customerData1);
    });
    var customerData2 = {
      name: 'Francisco',
      email: 'test4@test.com',
      question: 'Where is it?',
      orgName: 'ShoeLocker'
    };
    var customerSocket2 = io.connect(socketTestURL, options);
    customerSocket2.on('connect', function() {
      customerSocket2.emit('customerRequest', customerData2);
    });
    var customerData3 = {
      name: 'Jake',
      email: 'test1@test.com',
      question: 'What is it?',
      orgName: 'ShoeLocker'
    };
    var customerSocket3 = io.connect(socketTestURL, options);
    customerSocket3.on('connect', function() {
      customerSocket3.emit('customerRequest', customerData3);
    });
    customerSocket2.on('customerQueueStatus', function(num) {
      expect(num).to.equal(1);
    });
    customerSocket3.on('customerQueueStatus', function(num) {
      expect(num).to.equal(2);
    });
  });

});
