/* global describe, it, before, beforeEach */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'blueprint-test';

var expect = require('chai').expect;
var Mongo = require('mongodb');
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js'); //making a web request to initialize db
var factory = traceur.require(__dirname + '/../../helpers/factory.js');

var Location;

describe('Location', function(){
  before(function(done){
    db(function(){
      Location = traceur.require(__dirname + '/../../../app/models/location.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('locations').drop(function(){
      factory('location', function(locations){
        done();
      });
    });
  });

  describe('.create', function(){
    it('should successfully create a location', function(done){
      Location.create({name:'mountain', rate:50}, function(l){
        expect(l).to.be.ok;
        expect(l).to.be.an.instanceof(Location);
        expect(l._id).to.be.an.instanceof(Mongo.ObjectID);
        expect(l.rate).to.equal(50);
        expect(l.rate).to.be.a('number');
        done();
      });
    });

    it('should NOT successfully create a location - empty name string', function(done){
      Location.create({name:'', rate:50}, function(l){
        expect(l).to.be.null;
        done();
      });
    });

    it('should NOT successfully create a location - empty rate string', function(done){
      Location.create({name:'mountain', rate:''}, function(l){
        expect(l).to.be.null;
        done();
      });
    });
  });


  describe('.findById', function(){
    it('should find a location object by id', function(done){
      Location.findById('0123456789abcdef01234567', function(loc){
        expect(loc).to.be.instanceof(Location);
        expect(loc.name).to.equal('desert');
        expect(loc.rate).to.equal(100);
        done();
      });
    });

    it('should NOT find a user object by null userId', function(done){
      Location.findById(null, function(loc){
        expect(loc).to.be.null;
        done();
      });
    });

  });

  describe('.findAll', function(){
    it('should find all locations', function(done){
      Location.findAll(function(locations){
        expect(locations).to.have.length(2);
        expect(locations[0]).to.be.instanceof(Location);
        done();
      });
    });
  });



});
