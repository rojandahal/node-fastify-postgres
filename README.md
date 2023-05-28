# Node-Fastify API with postgres
This project was bootstrapped with Fastify-CLI.

Clone this repo using:  
`git clone https://github.com/rojandahal/node-fastify-postgres.git`


## Installation

Install dependencies in app with npm

```bash
  npm install
```
    

## Available Scripts

In the project directory, you can run:

### `npm run dev`
To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```bash
API_VERSION=
SECRET_KEY=
```


## API Reference

#### Signup

```http
  POST /api/v1/signup
```

| Body  | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**|
| `username` | `string` | **Required, Unique** |
| `password` | `string` | **Required**|

#### Login

```http
  POST /api/v1/login
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required** |
| `password`      | `string` | **Required** |

#### Logout

```http
  POST /api/v1/logout
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. The token of logged-in user |

#### Get all Users
```http
  GET /api/v1/users/
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. The token of logged-in user |

#### Get Single User
```http
  GET /api/v1/users/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. The id of the user |
| `token`      | `string` | **Required**. The token of logged-in user |

#### Update a User
```http
  POST /api/v1/users/:id
  ```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. The new username of the user |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. The id of the user |
| `token`      | `string` | **Required**. The token of logged-in user |

#### Delete a User
```http
  POST /api/v1/users/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. The id of the user |
| `token`      | `string` | **Required**. The token of logged-in user |