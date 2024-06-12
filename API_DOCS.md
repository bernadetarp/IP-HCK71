# PawRescue API Documentation

## Endpoints :

List of available endpoints:

Users:
- `POST /login`
- `POST /register`
- `PUT /user-profile`
- `DELETE /user-profile`

&nbsp;

Animals:
- `GET /`
- `GET /:id`

&nbsp;


## 1. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 2. POST /register

Request:

- headers: 

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
}
```

_Response (201 - Created)_

```json
{
  "name": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;


## 3. POST /type

Description:
- Add new type to the database

Request:

- headers: 

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (201 - Created)_

```json
[
  {
    "id": 2,
    "name": "Bus",
    "createdAt": "2024-05-27T14:16:11.542Z",
    "updatedAt": "2024-05-27T14:16:11.542Z"
  }
]
```

_Response (400 - Bad Request)_

```json
{
  "message": "Type is required"
}
```

## 4. GET /

Description:
- Get all animals from database

Request:

- headers: 

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Car",
    "createdAt": "2024-05-27T14:16:11.542Z",
    "updatedAt": "2024-05-27T14:16:11.542Z"
  },
  {
    "id": 2,
    "name": "Bus",
    "createdAt": "2024-05-27T14:16:11.542Z",
    "updatedAt": "2024-05-27T14:16:11.542Z"
  },
  ...,
]
```

## 5. PUT /type/:id

Description:
- Update transportation type based on ID

Request:

- headers: 

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Car Edited",
    "createdAt": "2024-05-27T14:16:11.542Z",
    "updatedAt": "2024-05-27T14:16:11.542Z"
  }
]
```

_Response (400 - Bad Request)_

```json
{
  "message": "Type is required"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```


## 6. POST /transportation

Description:
- Add new transportation to the database

Request:

- headers: 

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "name": "string",
  "description": "string",
  "imgUrl": "string",
  "location": "string",
  "price": "integer",
  "typeId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 3,
  "name": "Toyota Avanza",
  "description": "Avanza keluaran tahun 2018",
  "imgUrl": "https://www.toyota.astra.co.id//sites/default/files/2023-09/2-avanza-gray-metallic.png",
  "location": "Jakarta",
  "price": 150000,
  "typeId": 1,
  "authorId": 1,
  "createdAt": "2024-05-27T14:16:11.542Z",
  "updatedAt": "2024-05-27T14:16:11.542Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Description is required"
}
OR
{
  "message": "Price is required"
}
OR
{
  "message": "Minimum price is 10.000"
}
OR
{
  "message": "Type is required"
},
OR
{
  "message": "User is required"
}
```

&nbsp;

## 7. GET /transportation

Description:
- Get all transportation from database including user data (except password)

Request:

- headers: 

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 3,
    "name": "Toyota Avanza",
    "description": "Avanza keluaran tahun 2018",
    "imgUrl": "https://www.toyota.astra.co.id//sites/default/files/2023-09/2-avanza-gray-metallic.png",
    "location": "Jakarta",
    "price": 150000,
    "typeId": 1,
    "authorId": 1,
    "createdAt": "2024-05-27T14:16:11.542Z",
    "updatedAt": "2024-05-27T14:16:11.542Z",
    "User": {
      "username": "johndoe",
      "email": "johndoe@gmail.com",
      "role": "Staff",
      "phoneNumber": "0812437498",
      "address": "Jakarta"
    }
  },
  ...,
]
```

## 8. GET /transportation/:id


Description:
- Get transportation data based on ID

Request:

- headers: 

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 3,
  "name": "Toyota Avanza",
  "description": "Avanza keluaran tahun 2018",
  "imgUrl": "https://www.toyota.astra.co.id//sites/default/files/2023-09/2-avanza-gray-metallic.png",
  "location": "Jakarta",
  "price": 150000,
  "typeId": 1,
  "authorId": 1,
  "createdAt": "2024-05-27T14:16:11.542Z",
  "updatedAt": "2024-05-27T14:16:11.542Z",
  "User": {
    "username": "johndoe",
    "email": "johndoe@gmail.com",
    "role": "Staff",
    "phoneNumber": "0812437498",
    "address": "Jakarta"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

## 9. PUT /transportation/:id


Description:
- Update transportation data based on ID

Request:

- headers: 

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 3,
  "name": "Toyota Avanza Edited",
  "description": "Avanza keluaran tahun 2018",
  "imgUrl": "https://www.toyota.astra.co.id//sites/default/files/2023-09/2-avanza-gray-metallic.png",
  "location": "Jakarta",
  "price": 150000,
  "typeId": 1,
  "authorId": 1,
  "createdAt": "2024-05-27T14:16:11.542Z",
  "updatedAt": "2024-05-27T14:16:11.542Z",
  "User": {
    "username": "johndoe",
    "email": "johndoe@gmail.com",
    "role": "Staff",
    "phoneNumber": "0812437498",
    "address": "Jakarta"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Description is required"
}
OR
{
  "message": "Price is required"
}
OR
{
  "message": "Minimum price is 10.000"
}
OR
{
  "message": "Type is required"
},
OR
{
  "message": "User is required"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Access Denied"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

## 10. DELETE /transportation/:id

Description:
- Delete transportation by ID

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "<entity name> success to delete"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Access Denied"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;

## 11. PATCH /transportation/:id/img

Description:
- Update imageUrl of transportation data based on ID

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Image <entity name> success to update"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Access Denied"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;

## 12. GET /pub/transportation


Description:
- Get transportation data from database for public site

_Response (200 - OK)_

```json
{
  "page": 1,
  "data": [
    {
      "id": 18,
      "name": "Honda Jazz",
      "description": "Jazz warna merah",
      "imgUrl": "https://www.hondabypass.com/wp-content/uploads/2018/05/padang-honda-brio-satya-hitam-500.png",
      "location": "Jakarta",
      "price": 135000,
      "typeId": 1,
      "authorId": 1,
      "createdAt": "2024-05-31T12:10:43.768Z",
      "updatedAt": "2024-05-31T12:10:43.768Z",
      "Type": {
        "id": 1,
        "name": "Car",
        "createdAt": "2024-05-31T12:10:43.485Z",
        "updatedAt": "2024-05-31T12:10:43.485Z"
      }
    },
    ...,
  ],
  "totalData": 20,
  "totalPage": 2,
  "dataPerPage": 10
}
```

## 13. GET /pub/transportation/:id


Description:
- Get transportation data based on ID for public site

_Response (200 - OK)_

```json
{
  "id": 18,
  "name": "Honda Jazz",
  "description": "Jazz warna merah",
  "imgUrl": "https://www.hondabypass.com/wp-content/uploads/2018/05/padang-honda-brio-satya-hitam-500.png",
  "location": "Jakarta",
  "price": 135000,
  "typeId": 1,
  "authorId": 1,
  "createdAt": "2024-05-31T12:10:43.768Z",
  "updatedAt": "2024-05-31T12:10:43.768Z",
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
