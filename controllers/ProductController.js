const Product = require('../models/Product');

exports.addProduct = (req, res, next) => {

  const name = req.body.name;
  const price = req.body.price;
  const description = req.body.description;
  const ammount = req.body.ammount;
  const imgURL = req.body.imgURL;
  const product = new Product({
      name: name,
      price: price,
      description: description,
      ammount: ammount,
      imgURL: imgURL
  });

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
  const description = req.body.description;
  const ammount = req.body.ammount;
  const imgURL = req.body.imgURL;
  const productId = req.body.productId;  
  
  Product.findById(productId)
  .then( product => {      
    product.name = name;
    product.price = price;
    product.description = description;
    product.ammount = ammount;
    product.imgURL = imgURL;
    return product.save();
  })
  .then( item => {
    res.status(200).send(true);
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

  Product.find().skip(offset).limit(limit)
  .then( products => {
    res.status(200).json(products);
  })
  .catch(err => {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
  });
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
  console.log(productId);
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