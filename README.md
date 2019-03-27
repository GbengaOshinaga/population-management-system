# Population Management System

Population management system is an application that manages the data of cities and their populations.

## Getting Started
 - You should install the adonis cli: `npm i -g @adonis/cli`
 - Clone the repository: `git clone https://github.com/GbengaOshinaga/sms-management-application-api.git`
 - CD into the project folder
 - Run `npm install`
 - Generate application key: `adonis key:generate`
 - Create a .env file
 - Start the app: `adonis serve`

## API Docs
Most endpoints require authentication to be accessed. A token generated on login or sign up should be used to make requests to such endpoints

Sign Up - `POST /signup`

Login - `POST /login`

#### Authenticated Endpoints
Create a location - `POST /locations`
 - Required format of data to this endpoint:
   - `name`:- must be unique
   - `number_of_males`:- must be an integer
   - `number_of_females`:- must be an integer

Get locations - `GET /locations`

Update the attributes of a location. The required format in creating a location applies. - `PUT/PATCH /locations/:location-id`

Delete user - `DELETE /locations/:location-id`

Checkout the tests for more details on the endpoints.
