# Compass-Challenge-Week8

This is the API REST project, a application that allows you to manage tutors and their pets.

## Prerequisites

Before getting started, make sure you have the following prerequisites installed on your machine:

- Node.js
- MongoDB 

## For install dependencies

Just run
```npm install``` or ```yarn install``` on command prompt.

## For start/run server
Just run
```npm start``` or ```yarn start``` on command prompt .

## Routes

```typescript
// GET /tutors 
// POST /tutor
// POST /pet/:tutorId
// PUT /tutor/:id
// PUT /pet/:petId/tutor/:tutorId 
// DELETE /tutor/:id 
// DELETE /pet/:petId/tutor/:tutorId 
```
Test in
POSTMAN, Insomnia or CURL.

## Usage

Here are some guidelines on how to use the application:

- To create a new tutor, send a POST request to `/tutor` with the tutor data in the request body.
- To update an existing tutor, send a PUT request to `/tutor/:tutorId` with the updated data in the request body.
- To delete a tutor, send a DELETE request to `/tutor/:tutorId`.
- To retrieve all tutors, send a GET request to `/tutor`.

Refer to the API documentation for more details on available routes.
