# PawRescue API Documentation

## Endpoints :

List of available endpoints:

Public:
- `GET /`
- `GET /:id`
- `POST /login`
- `POST /register`
- `POST /login-google`
- `POST /forgot-password`
- `GET /reset-password/:UserId/:token`
- `POST /reset-password/:UserId/:token`

User:
- `GET /user-profile`
- `PUT /user-profile`
- `DELETE /user-profile`

Transaction:
- `POST /:id/application-form`
- `POST /:id/generate-midtrans-token`
- `PATCH /:id/payment`

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

## 3. GET /

- **Description:** Retrieve all animals available in the shelter.

_Response (200 - OK)_

```json
[
    {
        "id": 10,
        "intakeType": "OWNER SUR",
        "inDate": "05/30/2023",
        "petName": "HOOCH",
        "description": null,
        "animalType": "DOG",
        "petAge": "2 YEARS",
        "petSize": "LARGE",
        "color": "WHITE",
        "breed": "SIBERIAN HUSKY / MIX",
        "sex": "N",
        "urlLink": "http://www.petharbor.com/get_image.asp?res=DETAIL&id=A505471&location=MONT",
        "crossing": "",
        "status": false,
        "price": 64000,
        "createdAt": "2024-06-13T04:18:30.975Z",
        "updatedAt": "2024-06-13T04:18:30.975Z"
    },
    ...
]
```

&nbsp;

## GET /:id

- **Description:** Retrieve a specific animal by its ID.

_Response (200 - OK)_

```json
{
    "id": 1,
    "intakeType": "CONFISCATE",
    "inDate": "03/18/2023",
    "petName": "ROSCOE",
    "description": "sd",
    "animalType": "DOG",
    "petAge": "5 YEARS",
    "petSize": "MED",
    "color": "BROWN / WHITE",
    "breed": "AM PIT BULL TER",
    "sex": "N",
    "urlLink": "http://www.petharbor.com/get_image.asp?res=DETAIL&id=A489026&location=MONT",
    "crossing": "",
    "status": false,
    "price": 30000,
    "createdAt": "2024-06-13T04:18:30.975Z",
    "updatedAt": "2024-06-13T04:18:30.975Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;

## POST /login-google

- **Description:** Log in using Google authentication.

_Response (200 - OK)_

```json
{
    "access_token": "<JWT Token>"
}
```

&nbsp;

## POST /forgot-password

- **Description:** Request to reset forgotten password.

Request:

- body:

```json
{
  "email": "string",
}
```

_Response (200 - OK)_

```json
{
    "message": "Password reset email sent successfully"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
```

_Response (404 - Bad Request)_

```json
{
  "message": "User Not Found"
}
```


&nbsp;


## POST /reset-password/:UserId/:token

- **Description:** Reset user's forgotten password.

_Response (200 - OK)_

```json
{
    "message": "Password updated!"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Expired Login Session"
}
```

&nbsp;

## Authentication Required Endpoints

For the following endpoints, authentication is required.

---

## GET /user-profile

- **Description:** Get current user's profile / data.

Request:

- headers: 

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
{
    "id": 3,
    "email": "string",
    "name": "string",
    "phoneNumber": "string",
    "imageUrl": "string"
}
```

&nbsp;

## PUT /user-profile

- **Description:** Edit current user's profile / data.

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
    "phoneNumber": "string",
    "imageUrl": "string",
}
```

_Response (200 - OK)_

```json
{
    "message": "Your profile successfully updated"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Name is required"
}
```

&nbsp;

## DELETE /user-profile

- **Description:** Delete current user

Request:

- headers: 

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
{
    "message": "Your account successfully deleted"
}
```

&nbsp;

## POST /:id/application-form

- **Description:** Application form for adopting a pet

Request:

- headers: 

```json
{
   "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
{
    "message": "Please fill in all the data"
}
```

&nbsp;

## POST /:id/generate-midtrans-token

- **Description:** Generate midtrans token

Request:

- headers: 

```json
{
   "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
{
    "midtransToken": "string", 
    "orderId": "string"
}
```

&nbsp;

## POST /:id/payment

- **Description:** Payment gateway using midtrans

Request:

- headers: 

```json
{
   "Authorization": "Bearer <access_token>"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "This transaction already paid"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Transaction not found"
}
```

&nbsp;

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


&nbsp;
