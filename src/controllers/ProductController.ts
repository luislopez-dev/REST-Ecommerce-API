import ProductModel from "../models/Product";
import { Product } from "../interfaces/Product";
import { HttpErr } from "../interfaces/HttpErr";

const addProduct = (req:any, res:any, next:any) => {

  const params = req.body as Product;
  const name = params.name;
  const brand = params.brand;
  const manufacturer = params.manufacturer;  
  const price = params.price; 
  const description = params.description;
  const ammount = params.ammount;
  const imgURL = params.imgURL;
  const product = new ProductModel({name, brand, manufacturer, price, description, ammount, imgURL});

  product.save()
  .then( (item:any) => {
    res.status(201).send(true);
  })
  .catch((err:any) => {
    if(!err.statusCode){
      err.statusCode = 500;          
    }
    next(err);
  });
}

const editProduct = (req:any, res:any, next:any) => {

  const params = req.body as Product;
  const name = params.name;
  const price = params.price;
  const brand = params.brand; 
  const manufacturer = params.manufacturer;  
  const description = params.description;
  const ammount = params.ammount;
  const imgURL = params.imgURL;
  const productId = params._id;  

  ProductModel.findById(productId)

  .then((product:Product) => {  
    
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
      const err = new HttpErr("Product not found");
      err.statusCode = 404;
      throw err;
    }
  })
  .then( () => {
    res.status(200).json({ok:true});
  })
  .catch((err:any) => {
    if(!err.statusCode){
      err.statusCode = 500;          
    }
    next(err);
  });
}

const getProducts = async (req:any, res:any, next:any) => {
    
  type RequestParams = {offset:BigInt, limit: BigInt}
  const params = req.body as RequestParams;
  const offset = params.offset;
  const limit = params.limit;
  let products;
  let total;

  try {
    
    products = await ProductModel.find().skip(offset).limit(limit);
    total =  await ProductModel.countDocuments();
  
  } catch (error) {
    if (error instanceof Error) {      
      const err = new HttpErr(error.message);
      err.statusCode = 500;
      throw err;
    }
  }

  return res.status(200).json({total, products})
}

const deleteProduct = (req:any, res:any, next:any) =>{

  const params = req.params as Product;
  const productId = params._id;
  ProductModel.findByIdAndRemove(productId)
  .then(() => {
    res.status(200).send(true);
  })
  .catch((err:any) => {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
  });
}

const getSingleProduct = (req:any, res:any, next:any) =>{

  const params = req.params as Product;
  const productId = params._id;
  ProductModel.findById(productId)
  .then((product:any) => {
    res.status(200).json(product);
  })
  .catch((err:any) => {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
  })
}

const searchProduct = async (req:any, res:any, next:any) =>{

  type RequestParams = {offset:BigInt, limit: BigInt}
  const params = req.body as RequestParams;
  const offset = params.offset;
  const limit = params.limit;

  const productName = req.body.item;
  let products;
  let total;

  try {
  
    products = await ProductModel.find({name: {$regex: productName, $options:'i'}})
    .skip(offset).limit(limit);

    total =  await ProductModel.countDocuments({name: {$regex: productName, $options:'i'}});
    
  } catch (error) {   
    if(error instanceof Error){
     const err = new HttpErr(error.message);
     err.statusCode = 500;
     throw err;
    }
  }

  return res.status(200).json({total, products});

}

export default {addProduct, editProduct, getProducts, deleteProduct, getSingleProduct, searchProduct}