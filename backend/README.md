# API Documentation

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## Overview

This document provides an overview of the API endpoints available in the backend. Each endpoint is associated with a specific controller and handles various operations related to authentication, users, technologies, projects, and experiences.

## Endpoints

### Authentication

- **Sign In**

  - **URL:** `/api/auth/signin`
  - **Method:** `POST`
  - **Request Body:**
    - `email`: string
    - `password`: string
  - **Response:** 200 OK with the user object and a token set in cookies.

  ### Users

- **Get User**

  - **URL:** `/api/users`
  - **Method:** `GET`
  - **Response:** 200 OK with the user object (excluding password).

- **Get User by ID**

  - **URL:** `/api/users/:id`
  - **Method:** `GET`
  - **Response:** 200 OK with the user object (excluding password).

- **Update User by ID**

  - **URL:** `/api/users/:id`
  - **Method:** `PUT`
  - **Request Body:**
    - `name`: string
    - `email`: string
    - `bio`: string
    - `socialLinks`: object
    - `file`: image (optional)
  - **Response:** 200 OK with the updated user object (excluding password).

- **Delete User by ID**
  - **URL:** `/api/users/:id`
  - **Method:** `DELETE`
  - **Response:** 200 OK with a message confirming deletion.

### Technologies

- **Create Technology**

  - **URL:** `/api/technologies`
  - **Method:** `POST`
  - **Request Body:**
    - `name`: string
    - `file`: image (optional)
  - **Response:** 201 Created with the created technology object.

- **Get All Technologies**

  - **URL:** `/api/technologies`
  - **Method:** `GET`
  - **Response:** 200 OK with a list of technologies.

- **Get Technology by ID**

  - **URL:** `/api/technologies/:id`
  - **Method:** `GET`
  - **Response:** 200 OK with the technology object.

- **Update Technology**

  - **URL:** `/api/technologies/:id`
  - **Method:** `PUT`
  - **Request Body:**
    - `name`: string
    - `file`: image (optional)
  - **Response:** 200 OK with the updated technology object.

- **Delete Technology**
  - **URL:** `/api/technologies/:id`
  - **Method:** `DELETE`
  - **Response:** 200 OK with a message confirming deletion.

### Projects

- **Create Project**

  - **URL:** `/api/projects`
  - **Method:** `POST`
  - **Request Body:**
    - `title`: string
    - `description`: string
    - `liveLink`: string
    - `repoLink`: string
    - `file`: image (optional)
  - **Response:** 201 Created with the created project object.

- **Get All Projects**

  - **URL:** `/api/projects`
  - **Method:** `GET`
  - **Response:** 200 OK with a list of projects.

- **Get Project by ID**

  - **URL:** `/api/projects/:id`
  - **Method:** `GET`
  - **Response:** 200 OK with the project object.

- **Update Project**

  - **URL:** `/api/projects/:id`
  - **Method:** `PUT`
  - **Request Body:**
    - `title`: string
    - `description`: string
    - `liveLink`: string
    - `repoLink`: string
    - `file`: image (optional)
  - **Response:** 200 OK with the updated project object.

- **Delete Project**
  - **URL:** `/api/projects/:id`
  - **Method:** `DELETE`
  - **Response:** 200 OK with a message confirming deletion.

### Experiences

- **Create Experience**

  - **URL:** `/api/experiences`
  - **Method:** `POST`
  - **Request Body:**
    - `company`: string
    - `position`: string
    - `description`: string
  - **Response:** 201 Created with the created experience object.

- **Get All Experiences**

  - **URL:** `/api/experiences`
  - **Method:** `GET`
  - **Response:** 200 OK with a list of experiences.

- **Get Experience by ID**

  - **URL:** `/api/experiences/:id`
  - **Method:** `GET`
  - **Response:** 200 OK with the experience object.

- **Update Experience**

  - **URL:** `/api/experiences/:id`
  - **Method:** `PUT`
  - **Request Body:**
    - `company`: string
    - `position`: string
    - `description`: string
  - **Response:** 200 OK with the updated experience object.

- **Delete Experience**
  - **URL:** `/api/experiences/:id`
  - **Method:** `DELETE`
  - **Response:** 200 OK with a message confirming deletion.
