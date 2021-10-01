# Ecommerce REST API

## Table of contents

* [Introduction](https://github.com/Luis-Rene-Lopez/Eccomerce-Backend-Node#introduction)
* [Run](https://github.com/Luis-Rene-Lopez/Eccomerce-Backend-Node#run)
* [Technology](https://github.com/Luis-Rene-Lopez/Eccomerce-Backend-Node#technology)
* [Database model](https://github.com/Luis-Rene-Lopez/Eccomerce-Backend-Node#database-model)
* [Endpoints](https://github.com/Luis-Rene-Lopez/Eccomerce-Backend-Node#endpoints)
* [Licence](https://github.com/Luis-Rene-Lopez/Eccomerce-Backend-Node#licence)

## Introduction

Ecommerce REST API to implement with any fronted platform. 

## Run

To run this application, you have to set your own environmental variables. For security reasons, some variables have been hidden from view and used as environmental variables with the help of dotenv package. Below are the variables that you need to set in order to run the application:

* MONGO_URI: this is the connection string of your MongoDB Atlas database.

## Technology

* Node.js
* Express
* MongoDB
* Mongoose

## Database model

All the models can be found in the models directory created using mongoose.

### Product Schema:

* name (String)

* price (Number)

* description (String)

* ammount (Number)

* imgURL (String)

### User Schema:

* email (String)

* password (String)

## Endpoints

### `POST` */api*

Creates a new product

Parameters

| Name | required  | type  | Description |
| :---:| :-:| :-:| :-:|
| name | true | String | Name of the new product
| price | true | Number | Price of the new product
| description | true | String | Description of the new product
| ammount | true | Number | Available ammount of the product
| imgURL | true | String | Image URL of the new product

### `GET` /api/:productId  

Get data of a speciic product

### `PUT` /api

Update product

Parameters

| Name | required  | type  | Description |
| :---:| :-:| :-:| :-:|
| productId | true | String | Description |
| name | true | String | New product name
| price | true | Number | New product price
| description | true | String | New product description
| ammount | true | Number | New product available ammount
| imgURL | true | String | New product image URL

### `DELETE` /api/:productId

Delete product

## Licence
 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

* MIT License
* Copyright 2021 © Luis Lopez
