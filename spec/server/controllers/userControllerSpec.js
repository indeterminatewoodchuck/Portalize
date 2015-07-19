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

  it('Should not authenticate users that provide invalid passwords', function(done){

    var newUser = db.User.build({
      first_name: 'Arnold',
      last_name: 'Schwarzennegger',
      OrganizationID: 50,
      title: 'T-1000',
      email: 'governator@california.gov',
      password: 'terminator'
    });
    newUser.save().then(function(user){
      request(app)
        .post('/api/users/signin')
        .send({ email: 'governator@california.gov', password: 'terminate' })
        .end(function(err, res){
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Invalid password.')
          done();
        });
    });
  });

  xit('Should issue a token upon successful sign in', function(){

  });

});
