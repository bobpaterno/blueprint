/* global describe, it, after, before, beforeEach */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'blueprint-test';

var expect = require('chai').expect;
var Mongo = require('mongodb');
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js'); //making a web request to initialize db
// var factory = traceur.require(__dirname + '/../../helpers/factory.js');
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
        done();
      });
    });

  });

  describe('.create', function(){
    it('should create a floor', function(done){
      var fields = {name:['wood'], rate:['5.5']};
      var files = {photo:[{originalFilename:'wood.jpg', path:__dirname+'/../../fixtures/copy/wood.jpg', size:123}]};
      fields.photo = files.photo;
      Floor.create(fields, function(floor){
        expect(floor).to.be.instanceof(Floor);
        expect(floor._id).to.be.instanceof(Mongo.ObjectID);
        expect(floor.rate).to.be.within(5.4,5.6);
        expect(floor.name).to.equal('wood');
        expect(floor.photo).to.equal('/img/flooring/wood.jpg');
        console.log(__dirname+'/../app/static/img/flooring/wood.jpg');
        expect(fs.existsSync(__dirname+'/../../../app/static/img/flooring/wood.jpg')).to.be.true;
        done();
      });
    });

    it('should NOT create a floor - No Image', function(done){
      var fields = {name:['wood'], rate:['5.5']};
      var files = {photo:[{originalFilename:'wood.jpg', path:__dirname+'/../../fixtures/copy/wood.jpg', size:0}]};
      fields.photo = files.photo;
      Floor.create(fields, function(floor){
        expect(floor).to.be.null;
        done();
      });
    });

  });

  after(function(done){
    cp.execFile(__dirname + '/../../fixtures/cleanafter.sh', {cwd:__dirname+'/../../../app/static/img'}, function(err,stdout,stderr){
      done();
    });
  });

});
