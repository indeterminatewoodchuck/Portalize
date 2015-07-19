require('dotenv').load();
var db = require('../../../server/models/index.js');
var expect = require('chai').expect;
var request = require('supertest');
var app = require('../../../index.js');

describe('User Controller', function(){

  beforeEach(function(done){
    db.sequelize.sync({force: true}).then(function(){
      done();
    });
  });

  it('Should not authenticate users that don\'t exist', function(done){
    request(app)
      .post('/api/users/signin')
      .send({ email: 'ding@dong.com', password: 'dingdong123' })
      .end(function(err, res){
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Invalid username.');
        done();
      });
  });

  xit('Should not authenticate users that provide invalid passwords', function(){

  });

  xit('Should issue a token upon successful sign in', function(){

  });

});
