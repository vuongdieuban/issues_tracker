# Issues Tracker

## Descriptions:

This project emulates service like Bit.ly where user can post a long url and get a short url back, which can redirect to the long url address. User can sign in with their Google Account (OAuth2) and save the shortened urls for re-use.

Live demo at: http://issues.banvuong.com/

## Details:

This project is an issues tracker for personal or team use. User can create and track issues related to projects, have info options realted to status(open/close), priority level and type (bug/feature). Authentication with Google OAuth2 and JWT, role based authorization for view/edit issues.

Main objective of this issue tracker is for me to track my progress when building other future project

### Backend:

**Technologies Used**: NodeJs, ExpressJs, MongoDB, JSON Web Token (JWT), Google OAuth2

1. Implemented REST API CRUD (create-read-update-delete) endpoints to interface with the database MongoDB.
2. Protected route, authentication and authorization with Google OAuth2 and JWT.
3. Server side validation with Joi.
4. Followed MVC design patter and clean code practice

### Frontend:

**Technologies Used**: Javascript/ReactJs, Material UI

1. Interact with REST API backend to perform CRUD (create-read-update-delete) operations
2. Interact with Google API for OAuth2 access token and then send to back-end for authentication and authoriation.
3. Protected route, role based authorization.
4. Filtering, searching, form validation.
5. Follow ReactJs components based approach for ease of code re-use

### Deployment:

Deploy both frontend and backend on Digital Ocean Droplet (Virtual Private Server - Ubuntu Linux). Use Nginx to serve the frontend, PM2 to serve the backend.
