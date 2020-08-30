// Import stuff
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require("path");
const multer = require('multer'); 
const imgModel = require('../models/model');

// Declare some vars
const directory = 'uploads';
const appDir = path.dirname(require.main.filename);

//  Multer - save image to uploads folder
var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
});  
var upload = multer({ storage: storage }); 

// Routes
// GET Route
router.get('/', (req, res) => { 
    imgModel.find({}, (err, items) => { 
        if (err) { 
            console.log(err); 
        } 
        else {
            fs.readdir(directory, (err, files) => {
                if (err) throw err;
              
                for (const file of files) {
                  fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                  });
                }
              });
            res.render('index', { items: items }); 
        } 
    }); 
}); 


// Uploading the image 
router.post('/', upload.single('image'), (req, res, next) => { 
  
    var obj = { 
        name: req.body.name, 
        desc: req.body.desc, 
        img: { 
            data: fs.readFileSync(path.join(appDir + '/uploads/' + req.file.filename)), 
            contentType: 'image/png'
        } 
    } 
    imgModel.create(obj, (err, item) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            res.redirect('/'); 
        } 
    }); 
});

// Exports routes
module.exports = router;