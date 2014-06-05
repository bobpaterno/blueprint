/* global describe, it, before, beforeEach */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'blueprint-test';

var expect = require('chai').expect;
var Mongo = require('mongodb');
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js'); //making a web request to initialize db
// var factory = traceur.require(__dirname + '/../../helpers/factory.js');

var Building;

describe('Building', function(){
  before(function(done){
    db(function(){
      Building = traceur.require(__dirname + '/../../../app/models/building.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('buildings').drop(function(){
      // factory('building', function(buildings){
        done();
      // });
    });
  });

  describe('.create', function(){
    it('should successfully create a building', function(done){
      Building.create({name:'house', x:'50', y:'60', locationId:'0123456789abcdef01234567', userId:'0123456789abcdef01234568'}, function(b){
        expect(b).to.be.ok;
        expect(b).to.be.an.instanceof(Building);
        expect(b._id).to.be.an.instanceof(Mongo.ObjectID);
        expect(b.locationId).to.be.an.instanceof(Mongo.ObjectID);
        expect(b.userId).to.be.an.instanceof(Mongo.ObjectID);
        expect(b.x).to.deep.equal(50);
        expect(b.y).to.be.a.number;
        done();
      });
    });
  //
  //   it('should NOT successfully create a building - empty name string', function(done){
  //     Building.create({name:'', rate:50}, function(b){
  //       expect(b).to.be.null;
  //       done();
  //     });
  //   });
  //
  //   it('should NOT successfully create a building - empty rate string', function(done){
  //     Building.create({name:'mountain', rate:''}, function(b){
  //       expect(b).to.be.null;
  //       done();
  //     });
  //   });
  });
  //
  //
  // describe('.findById', function(){
  //   it('should find a building object by id', function(done){
  //     Building.findById('0123456789abcdef01234567', function(bld){
  //       expect(bld).to.be.instanceof(Building);
  //       expect(bld.name).to.equal('desert');
  //       expect(bld.rate).to.equal(100);
  //       done();
  //     });
  //   });
  //
  //   it('should NOT find a user object by null userId', function(done){
  //     Building.findById(null, function(bld){
  //       expect(bld).to.be.null;
  //       done();
  //     });
  //   });
  //
  // });
  //
  // describe('.findAll', function(){
  //   it('should find all buildings', function(done){
  //     Building.findAll(function(buildings){
  //       expect(buildings).to.have.length(2);
  //       expect(buildings[0]).to.be.instanceof(Building);
  //       done();
  //     });
  //   });
  // });
  //


});
