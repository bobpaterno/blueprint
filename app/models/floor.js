'use strict';

var floorCollection = global.nss.db.collection('floors');
var Mongo = require('mongodb');
var fs = require('fs');
// var traceur = require('traceur');
// var Base = traceur.require(__dirname + '/base.js');

class Floor{
  static create(obj, fn){
    floorCollection.findOne({name:obj.name[0]}, (e,fl)=>{
      if(!fl && (obj.photo[0].size * 1)){
        var floor = new Floor();
        floor._id = Mongo.ObjectID(obj._id);
        floor.name = obj.name[0];
        floor.rate = parseFloat(obj.rate[0]);
        floor.photo = '/img/flooring/' + obj.photo[0].originalFilename;
        var flooringDir = `${__dirname}/../static/img/flooring`;
        if(!fs.existsSync(flooringDir)){
          fs.mkdirSync(flooringDir);
        }
        fs.renameSync(obj.photo[0].path, `${flooringDir}/${obj.photo[0].originalFilename}`);
        floorCollection.save(floor, ()=>fn(floor));
      }else{
        fn(null);
      }
    });
  }
}

module.exports = Floor;
