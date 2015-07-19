require('dotenv').load();
var db = require('../../../server/models/index.js');
var request = require('supertest');
var superagent = require('superagent');
var app = require('../../../index.js');

var agent = superagent.agent();

describe('User Controller', function(){

});
