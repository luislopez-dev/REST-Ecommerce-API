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
  .then( res => {
    console.log("Item created succesfully !");
    return;
  })
  .catch(e => {
    console.error(e.message)
  });
}

exports.editProduct = (req, res, next) => {

  const name = req.body.name;
  const price = req.body.price;
  const description = req.body.description;
  const ammount = req.body.ammount;
  const imgURL = req.body.imgURL;
  const productId = req.body._id;
  
  Product.findById(productId)
    .then( product => {      
      product.name = name;
      product.price = price;
      product.description = description;
      product.ammount = ammount;
      product.imgURL = imgURL;
      return product.save();
    })
    .then( res => {
      console.log("Item updated successfully");
    })
    .catch( e => {
      console.error(e.message)
    });

}

exports.getProducts = async (req, res, next) => {
    
  const offset = Number(req.body.offset);
  const limit = Number(req.body.limit);
 
  Product.find().skip(offset).limit(limit)

  .then( products => {
    res.json(products);
  })
  .catch(e => {
    console.error(e.message)
  });
}

exports.deleteProduct = (req, res, next) =>{
  const productId = req.params.productId;
  console.log(req.body);
  Product.findByIdAndRemove(productId)
  .then(res => {
    console.log("Product destroyed");
  })
  .catch(e => {
    console.error(e.message)
  });

}

exports.getSingleProduct = (req, res, next) =>{
  const productId = req.params.productId;
  console.log(productId);
  Product.findById(productId)
  .then(product => {
    res.json(product);
  })
  .catch(e => {
    console.error(e.message)
  })
}