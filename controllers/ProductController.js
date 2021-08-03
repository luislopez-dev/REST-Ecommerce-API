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
  .catch(err => {
    console.log(err.message);
  });

}

exports.editProduct = (req, res, next) => {

  console.log(req.body);

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
    .catch( err => {
      console.log(err.message);
    });

}

exports.getProducts = async (req, res, next) => {

  let start = (Number(req.params["page"]) - 1) * 8;
  
  Product.find().skip(start).limit(9)

  .then( products => {
    res.json(products);
  })
  .catch();
}

exports.deleteProduct = (req, res, next) =>{
  const productId = req.params.productId;
  console.log(req.body);
  Product.findByIdAndRemove(productId)
  .then(res => {
    console.log("Product destroyed");
  })
  .catch(e => {
    console.log(e.message);
  });

}

exports.getSingleProduct = (req, res, next) =>{
  const productId = req.params.productId;
  console.log(productId);
  Product.findById(productId)
  .then(product => {
    res.json(product);
  });
}

exports.getCount = (req, res, next) => {

  Product.countDocuments().then(count => {
    res.json(count);
  });  
}

exports.getItems = (req, res, next) => {
 
  const item = req.params.item;

  Product.find({name: {$regex: item, $options: 'i'} })
  .then( items => {
    res.json(items);
  });
  
}