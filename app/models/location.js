var locationCollection = global.nss.db.collection('locations');
var Mongo = require('mongodb');
var traceur = require('traceur');
var Base = traceur.require(__dirname + '/base.js');
// var _ = require('lodash');

class Location{
  static create(obj, fn){
    locationCollection.findOne({name:obj.name}, (e,loc)=>{
      if(!loc  && obj.name!=='' && obj.rate!==''){
        var location = new Location();
        location._id = Mongo.ObjectID(obj._id);
        location.name = obj.name;
        location.rate = parseFloat(obj.rate);
        locationCollection.save(location, ()=>fn(location));
      }else{
        fn(null);
      }
    });
  }

  static findAll(fn) {
    Base.findAll(locationCollection, Location, fn);
  }

  static findById(id,fn) {
    Base.findById(id, locationCollection, Location, fn);
  }
}

module.exports = Location;
