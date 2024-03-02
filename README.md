nextperson-prima v2

-Added Address column front-end and back-end
-Added (street,city,state,zip,country) under Address and created an Address Id
-In order to save the address succesfully you need to enter address when creating a new person
-If you try to edit address it won't be saved.



# Project Documentation

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## People API Documentation

### Overview

This API allows for managing a list of people, supporting operations to retrieve all people and to add a new person to the list. It is built using Next.js and Prisma.

### Prisma Schema

The Prisma schema for this project defines the structure of the data related to `Person`. You can find the schema in the `prisma/schema.prisma` file. 

The `Person` model typically looks like this:

```prisma
model Person {
  id        Int     @id @default(autoincrement())
  firstname String
  lastname  String
  phone     String
}
```

### Environment Setup

Before running the project, you need to set up your `.env` file in the project's root directory. This file should include the database connection string:

```
DATABASE_URL="your-database-connection-string"
```

Replace `"your-database-connection-string"` with your actual database connection string.

### Running Migrations

After setting up your `.env` file, run Prisma migrations to set up your database:

```bash
npx prisma migrate dev
```

This command creates the necessary tables in your database according to the Prisma schema.

### API Routes

#### GET /api/people

Returns a list of all people in the database.

##### Sample Request

No payload is required. Simply send a GET request to `/api/people`.

##### Sample Response

```json
[
    {
        "id": 1,
        "firstname": "John",
        "lastname": "Doe",
        "phone": "123-456-7890"
    },
    {
        "id": 2,
        "firstname": "Jane",
        "lastname": "Doe",
        "phone": "098-765-4321"
    }
]
```

#### POST /api/people

Adds a new person to the database.

##### Sample JSON Payload

```json
{
    "firstname": "Alice",
    "lastname": "Smith",
    "phone": "555-1234"
}
```

##### How to Call Using Postman or Thunder Client

1. Set the method to `POST`.
2. Enter the URL `http://localhost:3000/api/people` (adjust the domain/port as necessary for your setup).
3. In the 'Body' tab, select 'raw' and 'JSON'.
4. Paste the sample JSON payload into the body.
5. Send the request.

Upon success, you will receive a `202 Accepted` status code along with the details of the newly added person.

##### Error Handling

- If required fields are missing, the API responds with a `400 Bad Request`.
- For server errors, you will receive a `500 Internal Server Error`.
