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
      password_hash: 'terminator'
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

  it('Should issue a token upon successful sign in', function(done){
    var newUser = db.User.build({
      first_name: 'Jackie',
      last_name: 'Chan',
      OrganizationID: 20,
      title: 'Inspector Lee',
      email: 'jackie@chan.com',
      password_hash: 'supercop'
    });
    newUser.save().then(function(x){
      request(app)
        .post('/api/users/signin')
        .send({ email: 'jackie@chan.com', password: 'supercop' })
        .end(function(err, res){
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Enjoy your token!');
          expect(res.body.token).to.exist;
          done();
        });
    });
  });

  it('Should not allow users to sign up with a non-existing organizations', function(done){
    request(app)
      .post('/api/users/signup')
      .send({
        firstName: 'i',
        lastName: 'don\'t',
        jobTitle: 'really',
        email: 'care',
        password: 'about',
        businessName: 'this',
        businessPassword: 'one'
      })
      .end(function(err, res){
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Organization does not exist.');
        done();
      });
  });

  it('Should not allow users to sign up with the wrong organization password', function(done){
    var org = db.Organization.build({
      name: "Pillar of Autumn",
      address: "Installation 347",
      city: "N/A",
      state: "N/A",
      zip: "N/A",
      country: "N/A",
      industry: "Killing Covenant",
      password_hash: "Cortana"
    });
    org.save().then(function(newOrg){
      request(app)
        .post('/api/users/signup')
        .send({
          firstName: 'i',
          lastName: 'don\'t',
          jobTitle: 'really',
          email: 'care',
          password: 'about',
          businessName: 'Pillar of Autumn',
          businessPassword: 'one'
        })
        .end(function(err, res){
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Wrong organization password.');
          done();
        });
    });
  });

  xit('Should not allow allow users to sign up with an existing email address', function(done){

  });

  xit('Should issue a token upon successful sign up', function(done){

  });
});