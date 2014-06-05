// var buildingCollection = global.nss.db.collection('buildings');
// var Mongo = require('mongodb');
// var traceur = require('traceur');
// var Base = traceur.require(__dirname + '/base.js');
// var _ = require('lodash');

class Building{
  // static create(obj, fn){
  //   buildingCollection.findOne({name:obj.name}, (e,bld)=>{
  //     if(!bld){
  //       var building = new Building();
  //       building._id = Mongo.ObjectID(obj._id);
  //       building.name = obj.name;
  //       building.rate = parseFloat(obj.rate);
  //       buildingCollection.save(building, ()=>fn(building));
  //     }else{
  //       fn(null);
  //     }
  //   });
  // }
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
