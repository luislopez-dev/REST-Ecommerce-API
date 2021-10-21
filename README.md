# Ecommerce REST API

![alt text](https://bs-uploads.toptal.io/blackfish-uploads/blog/post/seo/og_image_file/og_image/15921/secure-rest-api-in-nodejs-18f43b3033c239da5d2525cfd9fdc98f.png)

## Table of contents

* [Introduction](#introduction)
* [Technology](#technology)
* [Database model](#database-model)
* [Installation](#installation)
* [Run](#run)
* [Endpoints](#endpoints)
* [Licence](#licence)

## Introduction

Ecommerce REST API to implement with any fronted platform. 

## Technology

* Node.js
* Express
* MongoDB
* Mongoose
* NPM

## Database model

All the models can be found in the models directory created using mongoose.

### Product Schema:

* name (String)

* price (Number)

* brand (String)

* manufacturer (String)

* description (String)

* ammount (Number)

* imgURL (String)

### User Schema:

* name (String) 

* email (String)

* password (String)


## Installation

1. Clone this repository  `git clone https://github.com/Luis-Rene-Lopez/Ecommerce-REST-API`

2. Go to the project `cd Ecommerce-REST-API`

3. Install the project dependencies `npm install`

## Run

To run this application, you have to set your own environmental variables. For security reasons, some variables have been hidden from view and used as environmental variables with the help of dotenv package. Below are the variables that you need to set in order to run the application:

* MONGO_URI=  This is the connection string of your MongoDB Atlas database.

* PORT=  This is the port number for running the Node.js server

* SECRET_KEY= This is your secret key for generating JWT tokens

You can start the API server by running `npm start`

## Endpoints

### User registration

![POST](https://img.shields.io/badge/METHOD-POST-blue) **`/api/auth/register`**

Body parameters:

| Name | Required  | Type  | Description |
| :---:| :-:| :-:| :-:|
| name | true | String | User name |
| email | true  | String | User email address |
| password | true | String | User password |

### User login

![POST](https://img.shields.io/badge/METHOD-POST-blue) **`/api/auth/login`**

Body parameters:

| Name | Required  | Type  | Description |
| :---:| :-:| :-:| :-:|
| email | true  | String | User email address |
| password | true | String | User password |


### Create new product

![POST](https://img.shields.io/badge/METHOD-POST-blue) **`/api`**

* Requires token-based authentication

Body parameters:

| Name | Required  | Type  | Description |
| :---:| :-:| :-:| :-:|
| name | true | String | Name of the new product
| price | true | Number | Price of the new product
| description | true | String | Description of the new product
| ammount | true | Number | Available ammount of the product
| imgURL | true | String | Image URL of the new product

### Query products

![POST](https://img.shields.io/badge/METHOD-POST-blue) **`/api/search`**

Body parameters:

| Name | Required  | Type  | Description |
| :---:| :-:| :-:| :-:|
| item | true | String | Name of product to query
| offset | true | Number | Defines the record to start paginating.
| limit | true | String | Defines the max number of records to return for the response.

### Get products

![POST](https://img.shields.io/badge/METHOD-POST-blue) **`/api`**

Body parameters:

| Name | Required  | Type  | Description |
| :---:| :-:| :-:| :-:|
| offset | true | Number | Defines the record to start paginating.
| limit | true | String | Defines the max number of records to return for the response.

### Get details of a specic product

![GET](https://img.shields.io/badge/METHOD-GET-brightgreen) **`/api/:productId`**  

### Update product

![PUT](https://img.shields.io/badge/METHOD-PUT-yellow) **`/api`**

* Requires token-based authentication.

Body parameters:

| Name | Required  | Type  | Description |
| :---:| :-:| :-:| :-:|
| productId | true | String | Product ID |
| name | true | String | Product new name
| price | true | Number | Product new price
| description | true | String | Product new description
| ammount | true | Number | Product new available ammount
| imgURL | true | String | Product new image URL

### Delete product

![DELETE](https://img.shields.io/badge/METHOD-DELETE-red) **`/api/:productId`**

* Requires token-based authentication

## Licence
 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

* MIT License
* Copyright 2021 © Luis Lopez
