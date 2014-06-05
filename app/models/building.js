var buildingCollection = global.nss.db.collection('buildings');
var Mongo = require('mongodb');
// var traceur = require('traceur');
// var Base = traceur.require(__dirname + '/base.js');
// var _ = require('lodash');

class Building{
  static create(obj, fn){
      var building = new Building();
      building._id = Mongo.ObjectID(obj._id);
      building.name = obj.name;
      building.x = parseInt(obj.x);
      building.y = parseInt(obj.y);
      building.locationId = Mongo.ObjectID(obj.locationId);
      building.userId = Mongo.ObjectID(obj.userId);
      buildingCollection.save(building, ()=>fn(building));
  }
  //
  // static findAll(fn) {
  //   Base.findAll(buildingCollection, Building, fn);
  // }
  //
  // static findById(id,fn) {
  //   Base.findById(id, buildingCollection, Building, fn);
  // }
}

module.exports = Building;
