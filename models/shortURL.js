const mongoose = require('mongoose');
const shortId =require('shortid');
var MongooseAutoIncrementID = require('mongoose-auto-increment-reworked');

const urlSchema= new mongoose.Schema({
    original:{
        type: String,
        required:true
    },
    shortened:{
        type: String,
        required:true,
        default: shortId.generate
    },
    shortenedByid:{
        type: Number,
        required:true,
        default: 0
    },
    clicks:{
        type: Number,
        required:true,
        default:0
    }
})



MongooseAutoIncrementID.MongooseAutoIncrementID.initialise('consecutive');
const plugin = new MongooseAutoIncrementID.MongooseAutoIncrementID(urlSchema, 'URLschema');

plugin.applyPlugin()
  .then(() => {
    // Plugin ready to use! You don't need to wait for this promise - any save queries will just get queued.
    // Every document will have an auto-incremented number value on _id.
  })
  .catch(e => {
    // Plugin failed to initialise
  });
  const MyModel = mongoose.model('URLschema', urlSchema)
module.exports=MyModel;