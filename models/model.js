var mongoose = require('mongoose'); 

// Create schema for uploadng image
var imageSchema = new mongoose.Schema({ 
    name: String, 
    desc: String, 
    img: 
    { 
        data: Buffer, 
        contentType: String 
    } 
}); 
  
module.exports = new mongoose.model('Image', imageSchema); 