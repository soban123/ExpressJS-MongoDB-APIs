var express = require('express');
const { json } = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { MongoUrl } = require('./Config/keys')
var multer  = require('multer')
const products = require('./models/products')

mongoose.connect(MongoUrl , { useNewUrlParser: true ,useUnifiedTopology: true  })







  

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    console.log(file)
    cb(null, uniqueSuffix   + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage })

/* GET home page. */
router.get('/'  ,function(req, res, next) {
  
// console.log(conn)



});


router.post('/'  ,function(req, res) {
  


console.log(req.body)
 


 res.json(req.body)
});

router.delete('/products/:id'  ,function(req, res) {
  


  console.log(req.params)
   
  products.findByIdAndDelete(req.params.id)
  .then( result => res.json(result) )
  
  });

  router.put('/products/:id'  ,function(req, res) {
  


    console.log(req.body)
    let { title , price , imageUrl } = req.body ;
     
    products.findByIdAndUpdate(req.params.id , { title , price , imageUrl })
    .then( result => res.json('Update') )
    
    });

  router.get('/products/:id'  ,function(req, res) {
  


    console.log(req.params)
     
    products.findById(req.params.id)
    .then( result => res.json(result) )
    
    });


router.get('/home', function(req, res, next) {
  res.send('<h1>  home </h1>')
 });


 
 router.get('/products',async function(req, res, next) {
  
  const item = await products.find()
  res.send(item)
 
  
 });

 router.post('/products', upload.single('image')  ,function(req, res, next) {
  let { title , price , imageUrl } = req.body;
  // let newPath = req.file.path.replace("\\", "/") || req.body.ImageUrl;
  console.log(req.body)

const Item = new products({
  title ,
  price ,
  ImageUrl: imageUrl
})
Item.save()
.then(result => {
  res.json(result)
}) 
   
  
 });

module.exports = router;
