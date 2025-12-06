# 🏠 FindPropertiesApp - API.

A simple REST API for a properties listing app. Provides user management, authentication, and property CRUD.

-   Tech: Node.js, Express, JWT and Azure.
-   Entry: `server.js`.
-   Routes:
    [routes/findpropertiesRoutes.js](routes/findpropertiesRoutes.js).
-   Controllers:
    [controllers/UserController.js](controllers/UserController.js),
    [controllers/PropertyController.js](controllers/PropertyController.js).
-   Models: 
    [models/UserModel.js](models/UserModel.js),
    [models/PropertyModel.js](models/PropertyModel.js).
-   Data: 
    [data/users.json](data/users.json),
    [data/properties.json](data/properties.json).

------------------------------------------------------------------------

## 🔗 URL API - AZURE.

-   Base URL: `test-findpropertiesapp-api-hhezgmdadnfrg6fz.eastus2-01.azurewebsites.net`

Example:

    https://test-findpropertiesapp-api-hhezgmdadnfrg6fz.eastus2-01.azurewebsites.net/

------------------------------------------------------------------------

## 🚀 Getting Started.

``` bash
npm install
npm install express
npm install jsonwebtoken
npm install -D nodemon
node server.js
```

------------------------------------------------------------------------

## 📚 API Endpoints.

All responses follow this structure:

``` json
{
  "data": {},
  "responseCode": 200,
  "message": "Descriptive message"
}
```

## 📝 Note before starting.

Since I am using a student Azure account and a free plan to deploy the API, the container where it is hosted may be restarted from time to time. Therefore, calling /users/getAllUsers at the beginning might return an empty list. It is recommended to follow the flow starting from /auth/signup. Everything is working correctly and has been fully tested.

------------------------------------------------------------------------

## 🔐 Auth.

### ▶ POST `/auth/signup`.

Creates a new user.

**Body:**

``` json
{
  "name": "Ever",
  "email": "ever@test.com",
  "password": "123456"
}
```

**Response example:**

``` json
{
    "data": {
        "name": "Ever",
        "email": "ever@test.com",
        "password": "123456",
        "Id": "usr-1764900624017"
    },
    "responseCode": 200,
    "message": "User inserted successfully."
}
```

------------------------------------------------------------------------

### ▶ POST `/auth/login`.

Authenticates a user.

**Body:**

``` json
{
  "email": "ever@test.com",
  "password": "123456"
}
```

**Response example:**

``` json
{
    "data": {
        "user": {
            "name": "Ever",
            "email": "ever@test.com",
            "password": "123456",
            "Id": "usr-1764900624017"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c3ItMTc2NDkwMDYyNDAxNyIsImVtYWlsIjoiZXZlckB0ZXN0LmNvbSIsImlhdCI6MTc2NDkwMDY4NiwiZXhwIjoxNzY0OTA3ODg2fQ.VPzVHU8ZRrwsMDMGmNIW2uGpjVwRvpmAJqrbYLxjDnY"
    },
    "responseCode": 200,
    "message": "Login successful."
}
```

------------------------------------------------------------------------

## 👤 Users.

### ▶ GET `/users/getAllUsers`.

Lists all users.

**Response example:**

``` json
{
    "data": [
        {
            "name": "Ever",
            "email": "ever@test.com",
            "password": "123456",
            "Id": "usr-1764900624017"
        }
    ],
    "responseCode": 200,
    "message": "Action executed successfully."
}
```

------------------------------------------------------------------------

### ▶ GET `/users/:userId`.

Gets a user by ID.

Using the Id generated.

------------------------------------------------------------------------

### ▶ PUT `/users/:userId`.

Updates a user.

Using the Id generated.

**Body**

``` json
{
  "name": "Ever Barahona",
  "email": "everB@test.com"
}
```

------------------------------------------------------------------------

### ▶ DELETE `/users/:userId`.

Deletes a user.

Using the Id generated.

------------------------------------------------------------------------

## 🏡 Properties.

### ▶ GET `/properties/getAllProperties`.

Lists all properties.

Note: Only those created by the logged-in user appear.

------------------------------------------------------------------------

### ▶ POST `/properties/addProperty`.

Creates a property. 

Using the user token provided by the login.

**Authorization**
Auth Type: Bearer Token.
And paste the user token.

**Body:**

``` json
{
  "Title": "Casa en Heredia",
  "Description": "Casa amplia de 3 cuartos",
  "Type": "HOUSE",
  "Action": "SALE",
  "Price": 95000000,
  "Location": {
    "Province": "Heredia",
    "City": "San Rafael",
    "Address": "Centro"
  },
  "Bedrooms": 3,
  "Bathrooms": 2,
  "GarageSpots": 2
}
```

**Response example:**

``` json
{
    "data": {
        "Title": "Casa en Heredia",
        "Description": "Casa amplia de 3 cuartos",
        "Type": "HOUSE",
        "Action": "SALE",
        "Price": 95000000,
        "Location": {
            "Province": "Heredia",
            "City": "San Rafael",
            "Address": "Centro"
        },
        "Bedrooms": 3,
        "Bathrooms": 2,
        "GarageSpots": 2,
        "OwnerId": "usr-1764900624017",
        "Id": "prop-1764902310072",
        "CreatedAt": 1764902310072,
        "UpdatedAt": 1764902310072
    },
    "responseCode": 200,
    "message": "Property inserted successfully."
}
```

------------------------------------------------------------------------

### ▶ GET `/properties/:propertyId`.

Gets a property by ID.

------------------------------------------------------------------------

### ▶ PUT `/properties/:propertyId`.

Updates a property.

Using the user token provided by the login.

**Authorization**
Auth Type: Bearer Token.
And paste the user token.

**Body**

``` json
{
  "Title": "Remodeled house",
  "Description": "Completely remodeled house with garden",
  "Price": 99000000
}
```

**Response example:**

``` json
{
    "data": {
        "Title": "Remodeled house",
        "Description": "Completely remodeled house with garden",
        "Type": "HOUSE",
        "Action": "SALE",
        "Price": 99000000,
        "Location": {
            "Province": "Heredia",
            "City": "San Rafael",
            "Address": "Centro"
        },
        "Bedrooms": 3,
        "Bathrooms": 2,
        "GarageSpots": 2,
        "OwnerId": "usr-1764900624017",
        "Id": "prop-1764903159681",
        "CreatedAt": 1764903159681,
        "UpdatedAt": 1764903207747
    },
    "responseCode": 200,
    "message": "Property updated successfully."
}
```

------------------------------------------------------------------------

### ▶ GET `/properties/:queryparams`.

Filters and lists properties.

**Optional query params:** - `action` - `type` - `minPrice` -
`maxPrice` - `text` - `ownerId` - `province`

**Example:**

    /properties/getAllProperties?action=SALE&type=HOUSE

------------------------------------------------------------------------

### ▶ DELETE `/properties/:propertyId`.

Deletes a property only if requester is the owner.

Using the user token provided by the login.

**Authorization**
Auth Type: Bearer Token.
And paste the user token.

**Body**

Empty

**Response example:**

``` json
{
    "data": {
        "Id": "prop-1764903159681"
    },
    "responseCode": 200,
    "message": "Property removed properly."
}
```
------------------------------------------------------------------------

## You can also view the same documentation here:

https://documenter.getpostman.com/view/34251653/2sB3dPTAeV

------------------------------------------------------------------------

## 🛡 Notes.

-   Data persistence uses local JSON files in `/data`.
-   IDs are auto-generated if not provided:
    -   Users: `usr-<timestamp>`
    -   Properties: `prop-<timestamp>`
