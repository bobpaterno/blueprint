/* global describe, it, afterEach, before, beforeEach */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'blueprint-test';

var expect = require('chai').expect;
var Mongo = require('mongodb');
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js'); //making a web request to initialize db
var factory = traceur.require(__dirname + '/../../helpers/factory.js');
var cp = require('child_process');
var fs = require('fs');

var Floor;

describe('Floor', function(){
  before(function(done){
    db(function(){
      Floor = traceur.require(__dirname + '/../../../app/models/floor.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('floors').drop(function(){
      cp.execFile(__dirname + '/../../fixtures/clean.sh', {cwd:__dirname+'/../../fixtures'}, function(err,stdout,stderr){
        factory('floor', function(floors){
          done();
        });
      });
    });
  });

  afterEach(function(done){
    cp.execFile(__dirname + '/../../fixtures/cleanafter.sh', {cwd:__dirname+'/../../../app/static/img'}, function(err,stdout,stderr){
      done();
    });
  });


  describe('.create', function(){
    it('should create a floor', function(done){
      var fields = {name:['wood'], rate:['5.5']};
      var files = {photo:[{originalFilename:'wood-DELETE.jpg', path:__dirname+'/../../fixtures/copy/wood-DELETE.jpg', size:123}]};
      fields.photo = files.photo;
      Floor.create(fields, function(floor){
        expect(floor).to.be.instanceof(Floor);
        expect(floor._id).to.be.instanceof(Mongo.ObjectID);
        expect(floor.rate).to.be.within(5.4,5.6);
        expect(floor.name).to.equal('wood');
        expect(floor.photo).to.equal('/img/flooring/wood-DELETE.jpg');
        expect(fs.existsSync(__dirname+'/../../../app/static/img/flooring/wood-DELETE.jpg')).to.be.true;
        done();
      });
    });

    it('should NOT create a floor - No Image', function(done){
      var fields = {name:['wood'], rate:['5.5']};
      var files = {photo:[{originalFilename:'wood-DELETE.jpg', path:__dirname+'/../../fixtures/copy/wood-DELETE.jpg', size:0}]};
      fields.photo = files.photo;
      Floor.create(fields, function(floor){
        expect(floor).to.be.null;
        done();
      });
    });

  });

  describe('.findById', function(){
    it('should find a floor object by id', function(done){
      Floor.findById('0123456789abcdef01234567', function(fl){
        expect(fl).to.be.instanceof(Floor);
        expect(fl.name).to.equal('tile');
        expect(fl.rate).to.be.within(5.4,5.6);
        expect(fl.photo).to.equal('/img/flooring/tile-DELETE.jpg');
        done();
      });
    });

    it('should NOT find a floor object by null userId', function(done){
      Floor.findById(null, function(fl){
        expect(fl).to.be.null;
        done();
      });
    });
  });

  describe('.findAll', function(){
    it('should find all floors', function(done){
      Floor.findAll(function(floors){
        expect(floors).to.have.length(2);
        expect(floors[0]).to.be.instanceof(Floor);
        done();
      });
    });
  });


});
