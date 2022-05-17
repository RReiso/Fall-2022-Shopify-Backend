# Fall 2022 Shopify Internship back end challenge

## Description

This is my solution for Fall 2022 - Shopify Developer Intern Challenge. I built this application with Nodejs and Express for the back end and vanilla JavaScript, Tailwind CSS and Daisy UI for the front end.

## Interact on Replit

The application is deployed on [Replit](https://replit.com/@rreiso/Fall-2022-Shopify-Backend#.replit). You can click `run` to start the app yourself or [see and interact with it here](https://fall-2022-shopify-backend--rreiso.repl.co/).

## Setting up the project locally

1. Clone the repository:

```
git@github.com:RReiso/Fall-2022-Shopify-Backend.git
cd Fall-2022-Shopify-Backend
```

2. Folow the steps in https://www.mongodb.com/docs/atlas/getting-started/ for MongoDB Atlas acount set up. You will need to create a new project, a cluster and two databases (the second one will be used for testing purposes).

3. Create the .env file by using .env.example as a reference:

```
cp .env.example .env
```

4. Add the appropriate MongoDB Atlas database connection strings to the environment variables.

5. Install dependencies:

```
npm install
```

6. Seed the database:

```
npm run seed
```

7. Run the app:

```
npm run dev
```

8. Open http://localhost:3000 to view the app in your browser.

## API endpoints

`GET /items` - returns all items from the database

Example response:

Status code: 200

```
[
    {
        "_id": "62831c05d9e9ad04b486c9a7",
        "name": "Samsung Galaxy A53",
        "description": "Lorem Ipsum",
        "warehouse": "ABC123",
        "isDeleted": false,
        "inStock": 20,
        "money": {
            "price": 529.99,
            "currency": "CAD"
        },
        "__v": 0,
        "createdAt": "2022-05-17T03:52:37.660Z",
        "updatedAt": "2022-05-17T03:52:37.660Z"
    },
    {
        "_id": "62831c05d9e9ad04b486c9aa",
        "name": "ASUS C523 15.6",
        "description": "Lorem Ipsum",
        "warehouse": "GHI789",
        "isDeleted": true,
        "deletionComments": "Lorem ipsum sit dolor",
        "inStock": 9,
          "money": {
            "price": 249.99,
            "currency": "CAD"
        },
        "__v": 0,
        "createdAt": "2022-05-17T03:52:37.661Z",
        "updatedAt": "2022-05-17T03:52:37.661Z"
    },
```

`POST /items` - creates new inventory item

Required fields: `name`, `warehouse`, `inStock`.

Example request object:

```
 {
    name: "Apple iPad 10.2",
    description: "Lorem Ipsum",
    warehouse: "CDF456",
    money: { price: 429.99, currency: "USD" },
    inStock: 15,
  }
```

Example response:

Status code: 200

```
{
    "message": "Inventory item successfully added!",
    "item": {
        "name": "Apple iPad 10.2",
        "description": "Lorem Ipsum",
        "warehouse": "CDF456",
        "isDeleted": false,
        "money": {
            "price": 429.99,
            "currency": "USD"
        },
        "inStock": 15,
        "_id": "62842cc0068844c7ceacd9b6",
        "createdAt": "2022-05-17T23:16:16.023Z",
        "updatedAt": "2022-05-17T23:16:16.023Z",
        "__v": 0
    }
}
```

`PUT /items/:id` - updates inventory item

Example request object:

```
{
    description: "Lorem Ipsum",
    money: {
        price: 799.99,
        currency: "USD"
    }
}
```

Example response:

Status code: 200

```
{
    "money": {
        "price": 799.99,
        "currency": "USD"
    },
    "_id": "62842cc0068844c7ceacd9b6",
    "name": "Apple iPad 10.2",
    "description": "Lorem Ipsum",
    "warehouse": "CDF456",
    "isDeleted": false,
    "inStock": 15,
    "createdAt": "2022-05-17T23:16:16.023Z",
    "updatedAt": "2022-05-17T23:21:12.271Z",
    "__v": 0
}
```

`PUT /items/:id/delete` - sets inventory item's `isDeleted` field to `true`

Example request object:

```
{
    deletionComments: "Lorem Ipsum 123",
}
```

Example response:

Status code: 200

```
{
    "money": {
        "price": 799.99,
        "currency": "USD"
    },
    "_id": "62842cc0068844c7ceacd9b6",
    "name": "Apple iPad 10.2",
    "description": "Lorem Ipsum",
    "warehouse": "CDF456",
    "isDeleted": true,
    "inStock": 15,
    "createdAt": "2022-05-17T23:16:16.023Z",
    "updatedAt": "2022-05-17T23:25:16.492Z",
    "__v": 0,
    "deletionComments": "Lorem ipsum 123"
}
```

`PUT /items/:id/restore` - sets inventory item's `isDeleted` field to `false`

Example request object:

```
{
    deletionComments: "Item was deleted by accident. Restored.",
}
```

Example response:

Status code: 200

```
{
    "money": {
        "price": 799.99,
        "currency": "USD"
    },
    "_id": "62842cc0068844c7ceacd9b6",
    "name": "Apple iPad 10.2",
    "description": "Lorem Ipsum",
    "warehouse": "CDF456",
    "isDeleted": false,
    "inStock": 15,
    "createdAt": "2022-05-17T23:16:16.023Z",
    "updatedAt": "2022-05-17T23:37:14.194Z",
    "__v": 0,
    "deletionComments": "Item was deleted by accident. Restored."
}
```

## Testing

I followed Test Driven Development approach while building the backend API for the inventory app and used Mocha testing framework and Chai assertion library to write the tests.
You can run the tests by executing:

```

npm run test

```

The tests will add items to the testing database and empty the database when finished.

## Dependencies

- axios: ^0.27.2,
- browserify: ^17.0.0,
- chai: ^4.3.6,
- chai-http: ^4.3.0,
- cors: ^2.8.5,
- dotenv: ^16.0.1,
- ejs: ^3.1.8,
- express: ^4.18.1,
- mocha: ^10.0.0,
- mongoose: ^6.3.3,
- supertest: ^6.2.3
