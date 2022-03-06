const Product = require('../models/Product');

exports.addProduct = (req, res, next) => {

  const name = req.body.name;
  const brand = req.body.brand;
  const manufacturer = req.body.manufacturer;  
  const price = req.body.price; 
  const description = req.body.description;
  const ammount = req.body.ammount;
  const imgURL = req.body.imgURL;
  const product = new Product({name, brand, manufacturer, price, description, ammount, imgURL});

  product.save()
  .then( item => {
    res.status(201).send(true);
  })
  .catch(err => {
    if(!err.statusCode){
      err.statusCode = 500;          
    }
    next(err);
  });
}

exports.editProduct = (req, res, next) => {

  const name = req.body.name;
  const price = req.body.price;
  const brand = req.body.brand; 
  const manufacturer = req.body.manufacturer;  
  const description = req.body.description;
  const ammount = req.body.ammount;
  const imgURL = req.body.imgURL;
  const productId = req.body._id;  

  Product.findById(productId)

  .then( product => {  
    
    if(product){

     product.name = name;
     product.price = price;
     product.brand = brand;
     product.manufacturer = manufacturer;
     product.description = description;
     product.ammount = ammount;
     product.imgURL = imgURL;
     return product.save();
    }else{
      const err = new Error("Product not found");
      err.statusCode = 404;
      throw err;
    }
  })
  .then( item => {
    res.status(200).json({ok:true});
  })
  .catch( err => {
    if(!err.statusCode){
      err.statusCode = 500;          
    }
    next(err);
  });
}

exports.getProducts = async (req, res, next) => {
    
  const offset = req.body.offset;
  const limit = req.body.limit;
  let products;
  let total;

  try {
    
    products = await Product.find().skip(offset).limit(limit);
    total =  await Product.countDocuments();
  
  } catch (error) {
    const err = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }

  return res.status(200).json({total, products})
}

exports.deleteProduct = (req, res, next) =>{

  const productId = req.params.productId;
  Product.findByIdAndRemove(productId)
  .then(item => {
    res.status(200).send(true);
  })
  .catch(err => {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
  });
}

exports.getSingleProduct = (req, res, next) =>{
  const productId = req.params.productId;
  Product.findById(productId)
  .then(product => {
    res.status(200).json(product);
  })
  .catch(err => {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
  })
}

exports.searchProduct = async (req, res, next) =>{

  const offset = req.body.offset;
  const limit = req.body.limit;
  const productName = req.body.item;
  let products;
  let total;

  try {
  
    products = await Product.find({name: {$regex: productName, $options:'i'}})
    .skip(offset).limit(limit);

    total =  await Product.countDocuments({name: {$regex: productName, $options:'i'}});
    
  } catch (error) {
    const err = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }

  return res.status(200).json({total, products});

}