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

**Body (FOR_SALE):**

``` json
{
  "Title": "Casa en Heredia con hermosa vista",
  "Description": "Casa amplia de 3 cuartos, 2 baños, cochera para 2 vehículos y una excelente vista a las montañas.",
  "Type": "HOUSE",
  "Action": "FOR_SALE",
  "Price": 95000000,
  "Currency": "CRC",
  "Period": "ONCE",
  "Location": {
    "Province": "HEREDIA",
    "City": "San Rafael",
    "Address": "100 m norte del parque central, Centro"
  },
  "ImageUris": [
    "https://mis-fotos.com/propiedades/heredia-casa-1.jpg",
    "https://mis-fotos.com/propiedades/heredia-casa-1-frente.jpg"
  ],
  "Bedrooms": 3,
  "Bathrooms": 2,
  "AreaM2": 180,
  "GarageSpots": 2,
  "Amenities": [
    "Jardin",
    "Patio amplio",
    "Cochera techada",
    "Pet friendly"
  ],
  "OwnerId": "usr-1765396076722"
}
```

**Body (FOR_RENT):**

``` json
{
  "Title": "Edificio comercial en San José centro",
  "Description": "Edificio de 3 pisos para uso comercial, excelente ubicación en el centro de San José.",
  "Type": "BUILDING",
  "Action": "FOR_RENT",
  "Price": 2500000,
  "Currency": "CRC",
  "Period": "PER_MONTH",
  "Location": {
    "Province": "SAN_JOSE",
    "City": "San José",
    "Address": "Avenida Central, frente al Parque Central"
  },
  "ImageUris": [
    "https://ejemplo.com/edificio1.jpg"
  ],
  "Bedrooms": null,
  "Bathrooms": 4,
  "AreaM2": 500,
  "GarageSpots": 5,
  "Amenities": [
    "Ascensor",
    "Seguridad 24/7",
    "Estacionamiento"
  ],
  "OwnerId": "usr-1765396076722"
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
  "Title": "Casa Remodelada en Heredia",
  "Description": "Casa completamente remodelada con jardín amplio",
  "Price": 99000000
}
```

**Response example:**

``` json
{
    "data": {
        "Title": "Casa Remodelada en Heredia",
        "Description": "Casa completamente remodelada con jardín amplio",
        "Type": "BUILDING",
        "Action": "FOR_RENT",
        "Price": 99000000,
        "Currency": "CRC",
        "Period": "PER_MONTH",
        "Location": {
            "Province": "SAN_JOSE",
            "City": "San José",
            "Address": "Avenida Central, frente al Parque Central"
        },
        "ImageUris": [
            "https://ejemplo.com/edificio1.jpg"
        ],
        "Bedrooms": null,
        "Bathrooms": 4,
        "AreaM2": 500,
        "GarageSpots": 5,
        "Amenities": [
            "Ascensor",
            "Seguridad 24/7",
            "Estacionamiento"
        ],
        "OwnerId": "usr-1765397476813",
        "Id": "prop-1765397777037",
        "CreatedAt": 1765397777037,
        "UpdatedAt": 1765400068875
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
