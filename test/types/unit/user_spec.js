/* global describe, it, before, beforeEach */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'blueprint-test';

var expect = require('chai').expect;
var Mongo = require('mongodb');
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js'); //making a web request to initialize db
var factory = traceur.require(__dirname + '/../../helpers/factory.js');

var User;
// var sue;



describe('User', function(){
  before(function(done){
    db(function(){
      User = traceur.require(__dirname + '/../../../app/models/user.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('users').drop(function(){
      factory('user', function(users){
        done();
      });
    });
  });

  describe('.create', function(){
    it('should successfully create a user', function(done){
      User.create({email:'bob@aol.com', password:'1234'}, function(u){
        expect(u).to.be.ok;
        expect(u).to.be.an.instanceof(User);
        expect(u._id).to.be.an.instanceof(Mongo.ObjectID);
        expect(u.password).to.have.length(60);
        done();
      });
    });

    it('should NOT successfully create a user', function(done){
      User.create({email:'sue@aol.com', password:'does not matter'}, function(u){
        expect(u).to.be.null;
        done();
      });
    });
  });

  describe('.login', function(){
    it('should successfully login a user', function(done){
      User.login({email:'sue@aol.com', password:'123'}, function(u){
        expect(u).to.be.ok;
        done();
      });
    });

    it('should NOT login user - bad email', function(done){
      User.login({email:'wrong@aol.com', password:'abcd'}, function(u){
        expect(u).to.be.null;
        done();
      });
    });

    it('should NOT login user - bad password', function(done){
      User.login({email:'sue@aol.com', password:'wrong'}, function(u){
        expect(u).to.be.null;
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a user object by userId', function(done){
      User.findById('0123456789abcdef01234567', function(u){
        expect(u).to.be.instanceof(User);
        expect(u.email).to.equal('sue@aol.com');
        done();
      });
    });

    it('should NOT find a user object by null userId', function(done){
      User.findById(null, function(u){
        expect(u).to.be.null;
        done();
      });
    });

    it('should NOT find a user object by bad userId', function(done){
      User.findById('not an id', function(u){
        expect(u).to.be.null;
        done();
      });
    });
  });




});
